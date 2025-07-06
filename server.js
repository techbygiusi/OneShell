require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const pty = require('node-pty');
const ping = require('ping');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const connectionsFile = path.join(__dirname, 'connections.json');

function loadConnections() {
  try {
    const data = fs.readFileSync(connectionsFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveConnections(connections) {
  fs.writeFileSync(connectionsFile, JSON.stringify(connections, null, 2));
}

io.on('connection', socket => {
  let sshProcess = null;

  function closeSSH() {
    if (sshProcess) {
      sshProcess.kill();
      sshProcess = null;
    }
  }

  socket.on('get-connections', () => {
    const connections = loadConnections();
    socket.emit('connections-data', connections);
  });

  socket.on('save-connection', (connection) => {
    if (!connection || !connection.name || !connection.ip || !connection.user || !connection.password) return;
    const connections = loadConnections();
    const existingIndex = connections.findIndex(c => c.name === connection.name);
    if (existingIndex !== -1) {
      connections[existingIndex] = connection;
    } else {
      connections.push(connection);
    }
    saveConnections(connections);
    io.emit('connections-data', connections);
  });

  socket.on('delete-connection', (name) => {
    if (!name) return;
    const connections = loadConnections().filter(c => c.name !== name);
    saveConnections(connections);
    io.emit('connections-data', connections);
  });

  socket.on('update-connections-order', (newOrder) => {
    if (!Array.isArray(newOrder)) return;
    saveConnections(newOrder);
    io.emit('connections-data', newOrder);
  });

  socket.on('start-ssh', ({ ip, user, password }) => {
    closeSSH();
    sshProcess = pty.spawn('sshpass', [
      '-p', password,
      'ssh', `${user}@${ip}`,
      '-o', 'StrictHostKeyChecking=no',
      '-o', 'UserKnownHostsFile=/dev/null'
    ], {
      name: 'xterm-color',
      cols: 80,
      rows: 24,
      cwd: process.env.HOME,
      env: process.env
    });

    sshProcess.on('data', data => {
      socket.emit('output', data);
    });

    sshProcess.on('exit', () => {
      socket.emit('ssh-closed');
      sshProcess = null;
    });
  });

  socket.on('input', data => {
    if (sshProcess) sshProcess.write(data);
  });

  socket.on('resize', ({ cols, rows }) => {
    if (sshProcess) sshProcess.resize(cols, rows);
  });

  socket.on('ping-host', async (host) => {
    try {
      const res = await ping.promise.probe(host);
      socket.emit('ping-result', {
        host,
        alive: res.alive,
        time: res.time,
      });
    } catch (err) {
      socket.emit('ping-result', {
        host,
        alive: false,
        time: null,
        error: err.message,
      });
    }
  });

  socket.on('disconnect', () => {
    closeSSH();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
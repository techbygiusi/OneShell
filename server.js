const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const pty = require("node-pty");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve frontend
app.use(express.static("public"));

io.on("connection", socket => {
  console.log("Client connected");

  // Change this to your desired host and username
  const ssh = pty.spawn("ssh", ["user@host"], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });

  ssh.on("data", data => socket.emit("output", data));
  socket.on("input", input => ssh.write(input));
  socket.on("resize", size => ssh.resize(size.cols, size.rows));

  socket.on("disconnect", () => {
    ssh.kill();
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

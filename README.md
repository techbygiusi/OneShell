> ⚠️ **Work in Progress**: OneShell is still under development. Features, UI, and stability may change over time.

# ![OneShell Logo](https://onebitlabs.net/images/oneshell.png)  
**OneShell** – A modern, browser-based SSH terminal

> Manage and connect to your servers directly from the browser – secure, elegant, and efficient.

---

## ✨ Features

- 🔐 Secure SSH sessions over WebSocket
- 💾 Save and manage multiple SSH connections
- 📡 Live connection status with ping
- ⬇ Export and ⬆ Import profiles (JSON)
- 🧲 Drag & drop sorting of connections
- 🎨 Themed terminal with custom fonts & colors
- 📁 Clean UI with branding and file upload/download

![Screenshot](https://github.com/user-attachments/assets/b660c0b6-519e-43f3-90af-b67d9ba46644)

---

## 🚀 Quick Start

### 📥 Pull from Docker Hub

```bash
docker pull calmamedia/oneshell
```

👉 [View on Docker Hub](https://hub.docker.com/r/techbygiusi/oneshell)

### 🖧 Run with Host Networking (Linux only)

```bash
docker run --rm -d --network host --name oneshell calmamedia/oneshell
```

> Enables LAN-level SSH and ping directly from the container.

### 🌐 Or run with port mapping

```bash
docker run --rm -d -p 3000:3000 --name oneshell calmamedia/oneshell
```

🔗 Then open in your browser:  
`http://localhost:3000`

---

## 🧠 How It Works

OneShell is built on proven tools:

- [`xterm.js`](https://xtermjs.org/) – Terminal rendering in the browser
- [`node-pty`](https://github.com/microsoft/node-pty) – Pseudo-terminal interface for Node.js
- `sshpass` + `ssh` – Underlying SSH connections
- AES-GCM encrypted password storage in the browser

---

## 🛠️ Customization

Want your own logo, colors, or favicon?  
Edit the file:

```plaintext
/public/index.html
```

Update the following:

- 🔄 Logo → `<img src="/logo.svg" ... />`
- 🎨 Favicon → `<link rel="icon" href="favicon.ico" />`
- 🌈 Theme → CSS variables or theme configuration

---

## 📂 Persistent Storage

To persist connection settings between container restarts:

```bash
docker run -d -p 3000:3000 \
  -v $(pwd)/data:/app/connections \
  --name oneshell \
  calmamedia/oneshell
```

---

## 📦 Development & Contribution

```bash
git clone https://github.com/techbygiusi/OneShell
cd oneshell
npm install
node server.js
```

Pull requests, suggestions, and issues are welcome!

---

## 📝 License

MIT License  
© [OneBitLabs](https://onebitlabs.net) / Calma Media

📦 Docker Hub: [calmamedia/oneshell](https://hub.docker.com/r/calmamedia/oneshell)  
🔗 GitHub: [github.com/techbygiusi/OneShell](https://github.com/techbygiusi/OneShell)

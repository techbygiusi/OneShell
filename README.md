![OneShell Logo](https://onebitlabs.net/images/oneshell.png)

**OneShell** is a modern, web-based SSH terminal that lets you manage and connect to servers directly from your browser — securely and with style.

---

## ✨ Features

- 🔐 WebSocket-based secure SSH sessions
- 💾 Save and manage multiple SSH connections
- 📡 Live connection status (with ping)
- ⬇ Export and ⬆ Import your connection profiles as JSON
- 🧲 Drag & drop sorting of connections
- 🎨 Themed terminal with custom fonts and colors
- 📁 Clean UI with logo branding and upload/download buttons

---

## 🚀 Getting Started

### Pull from Docker Hub

```bash
docker pull calmamedia/oneshell
```

### Run with Host Networking (Linux Only)

```bash
docker run --rm -d   --network host   --name oneshell   calmamedia/oneshell
```

> 🔸 This allows the container to access devices on the host's local network, enabling full LAN ping and SSH.

### Or Run with Port Mapping

```bash
docker run --rm -d   -p 3000:3000   --name oneshell   calmamedia/oneshell
```

Then open your browser at:  
👉 `http://localhost:3000`

---

## 🧠 How it Works

OneShell uses:

- `xterm.js` for rendering terminal output
- `node-pty` to handle interactive pseudo-terminal processes
- `sshpass` and `ssh` for the underlying connection
- Encrypted password storage in the browser via `AES-GCM`

---

## 🛠️ Customization

Want to change the logo, favicon, or theme color?  
Edit `/public/index.html` and replace:

- Logo → `<img src="/logo.svg" ... />`
- Favicon → `<link rel="icon" href="favicon.ico" />`
- Theme → CSS variables or update terminal theme config

---

## 📂 Volumes & Persistence

If you'd like to persist connection settings between container restarts, mount a volume:

```bash
docker run -d -p 3000:3000   -v $(pwd)/data:/app/connections   --name oneshell   calmamedia/oneshell
```

---

## 📦 Development

Clone the repo and run it locally:

```bash
git clone https://github.com/techbygiusi/OneShell
cd oneshell
npm install
node server.js
```

---

## 📝 License

MIT License  
© OneBitLabs / Calma Media
# Click Crab 🦀

> A lightweight, local-only CLI tool for pinning shell commands and directory paths you don't want to lose.

**No cloud. No accounts. No analytics. Just fast terminal commands and predictable local storage.**

---

## ✨ Features

- 🎯 **Pin Commands** - Save complex shell commands with optional names
- 📁 **Clip Paths** - Quick navigation to frequently used directories
- 💾 **Local Storage** - Your data stays on your machine in plain JSON
- 🚫 **Zero Dependencies** - Pure Node.js, no external packages
- 📦 **Tiny** - Only ~10KB total package size
- 🖥️ **Cross-Platform** - Works on Windows, macOS, and Linux

---

## 🚀 Installation

### npm (Recommended)
```bash
npm install -g click-crab
```

### Windows (Manual)
Download `install.bat` from releases and double-click it.

### From Source
```bash
git clone https://github.com/Hashdevlol/click-crab.git
cd click-crab
npm link
```

---

## 📖 Quick Start

```bash
# Pin a command
cc pin "docker ps -a"
cc pin "npm run build" --name build

# List all pinned commands
cc list

# Run command #1
cc run 1

# Clip a directory path
cc clip ~/projects/api
cc clip C:\Users\Me\Documents  # Windows

# List all clipped paths
cc clips

# Jump to a clipped path
cd "$(cc jump 1)"  # Unix/Linux/Mac
```

---

## 📚 Commands

### Command Management

| Command | Description | Example |
|---------|-------------|---------|
| `cc pin <command>` | Save a shell command | `cc pin "docker ps"` |
| `cc pin <command> -n <name>` | Save with a custom name | `cc pin "npm test" -n test` |
| `cc list` | Show all pinned commands | `cc list` |
| `cc run <id>` | Execute a pinned command | `cc run 1` |
| `cc unpin <id>` | Remove a pinned command | `cc unpin 2` |

### Path Management

| Command | Description | Example |
|---------|-------------|---------|
| `cc clip [path]` | Save a directory path | `cc clip ~/projects` |
| `cc clips` | Show all clipped paths | `cc clips` |
| `cc jump <id>` | Output path for use with cd | `cd "$(cc jump 1)"` |
| `cc unclip <id>` | Remove a clipped path | `cc unclip 1` |

### Utilities

| Command | Description |
|---------|-------------|
| `cc info` | Show storage location and stats |
| `cc help` | Display help message |
| `cc version` | Show version number |

---

## 💡 Use Cases

### For Developers
```bash
# Save your common dev commands
cc pin "npm run dev" -n dev
cc pin "npm test" -n test
cc pin "docker-compose up -d" -n docker

# Save project directories
cc clip ~/code/frontend
cc clip ~/code/backend
cc clip ~/code/mobile

# Quick access
cc run 1  # Start dev server
cd "$(cc jump 2)"  # Jump to backend
```

### For DevOps
```bash
# Kubernetes shortcuts
cc pin "kubectl get pods -n production" -n pods
cc pin "kubectl logs -f" -n logs
cc pin "terraform plan" -n plan

# Infrastructure directories
cc clip ~/infra/aws
cc clip ~/infra/kubernetes
cc clip ~/infra/terraform
```

### For System Admins
```bash
# System diagnostics
cc pin "df -h" -n disk
cc pin "free -m" -n memory
cc pin "netstat -tuln" -n ports

# Important directories
cc clip /var/log
cc clip /etc/nginx
cc clip /var/www
```

---

## 🛠️ Advanced Usage

### Shell Integration (Recommended)

Make jumping to paths even easier by adding a shell function:

**Bash/Zsh** (`~/.bashrc` or `~/.zshrc`):
```bash
# Quick jump function
cj() {
  cd "$(cc jump "$1")"
}

# Quick run function
cr() {
  cc run "$1"
}
```

**PowerShell** (`$PROFILE`):
```powershell
function cj { cd (cc jump $args[0]) }
function cr { cc run $args[0] }
```

**Fish** (`~/.config/fish/config.fish`):
```fish
function cj
  cd (cc jump $argv[1])
end
```

Then use:
```bash
cj 1  # Jump to path #1
cr 2  # Run command #2
```

---

## 📂 Storage

All data is stored locally in plain JSON files:

**Location:**
- Unix/Linux/Mac: `~/.click-crab/`
- Windows: `C:\Users\YourName\.click-crab\`

**Files:**
- `commands.json` - Your pinned commands
- `paths.json` - Your clipped directory paths

**Benefits:**
- ✅ Human-readable format
- ✅ Easy to back up (just copy the folder)
- ✅ Version control friendly
- ✅ No database required
- ✅ You own your data

**Example `commands.json`:**
```json
[
  {
    "id": 1,
    "command": "docker ps -a",
    "name": "containers",
    "timestamp": "2026-01-30T12:00:00.000Z"
  }
]
```

---

## 🎨 Philosophy

Click Crab is built on five core principles:

1. **🏠 Local-only** - Your data never leaves your machine
2. **🔓 No lock-in** - Plain JSON files you can edit, backup, or migrate anytime
3. **⚡ Zero config** - Works immediately after install, no setup required
4. **⌨️ Terminal-first** - Designed for keyboard-driven workflows
5. **🎯 Boring tech** - Reliable, predictable, and maintainable

**What Click Crab is NOT:**
- ❌ Not a cloud-based service
- ❌ Not a snippet manager with syntax highlighting
- ❌ Not a command history analyzer
- ❌ Not a shell replacement or framework

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

**What we welcome:**
- 🐛 Bug fixes
- ⚡ Performance improvements
- 📚 Documentation improvements
- ✨ Code quality improvements

**What we won't accept:**
- ☁️ Cloud sync or storage features
- 🖥️ Web UI or graphical interface
- 🤖 AI/ML features
- 📊 Analytics or telemetry
- 🔄 Background processes or daemons

---

## 📊 Project Stats

- **Package Size:** ~10KB
- **Dependencies:** 0
- **Supported Node.js:** >=14.0.0
- **Platforms:** Windows, macOS, Linux
- **License:** MIT

---

## 🐛 Troubleshooting

### Command not found: cc

**Solution:** Make sure npm's global bin directory is in your PATH:

```bash
# Check npm global path
npm config get prefix

# Add to PATH (add this to your shell config)
export PATH="$(npm config get prefix)/bin:$PATH"
```

### Storage location

To see where your data is stored:
```bash
cc info
```

### Reset everything

To start fresh:
```bash
# Unix/Linux/Mac
rm -rf ~/.click-crab

# Windows
rmdir /s %USERPROFILE%\.click-crab
```

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

Copyright (c) 2026 [@0xHashlol](https://twitter.com/0xHashlol)

---

## 🙏 Acknowledgments

Built with care for developers who value simplicity and local storage.

**Special thanks to:**
- Everyone who values privacy and local-first software
- The Node.js community
- All contributors and users

---

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/click-crab)
- [GitHub Repository](https://github.com/Hashdevlol/click-crab)
- [Report Issues](https://github.com/Hashdevlol/click-crab/issues)
- [Twitter: @0xHashlol](https://twitter.com/0xHashlol)

---

## ⭐ Show Your Support

If you find Click Crab useful, please consider:
- ⭐ Starring this repo
- 🐦 Sharing on Twitter
- 📝 Writing a blog post
- 💬 Telling your friends

---

<p align="center">
  <strong>🦀 Keep it simple. Keep it local. 🦀</strong>
</p>

<p align="center">
  Made with ❤️ by <a href="https://twitter.com/0xHashlol">@0xHashlol</a>
</p>

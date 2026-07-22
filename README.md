# Atelier Keeper

> Discord scheduling assistant for creators, communities, and project management.

Atelier Keeper is a Discord bot designed to manage schedules, reminders, and notifications. It supports automatic reminders, direct messages, and channel notifications with a lightweight JSON-based storage system.

---

## ✨ Features

- 📅 Create schedules
- 🔔 Multiple reminder offsets
- 💬 Channel notifications
- 📩 Direct message reminders
- ✏️ Edit schedules
- 🗑 Delete schedules
- ❌ Cancel schedules
- 📋 List active schedules
- ℹ️ View schedule details
- ⚡ Automatic scheduler
- 👑 Owner-only commands

---

## 📁 Project Structure

```
src/
├── commands/
├── config/
├── events/
├── handlers/
├── models/
├── repository/
├── scheduler/
├── services/
└── utils/
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/scriptbal/atelier-keeper.git
```

Install dependencies

```bash
npm install
```

Create an `.env` file

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_APPLICATION_ID
GUILD_ID=YOUR_GUILD_ID
```

Deploy slash commands

```bash
npm run deploy
```

Start the bot

```bash
npm start
```

Development mode

```bash
npm run dev
```

---

## 📦 Commands

### Schedule

- `/schedule`
- `/schedule-list`
- `/schedule-info`
- `/schedule-edit`
- `/schedule-delete`
- `/schedule-cancel`

### Utility

- `/ping`

---

## ⚙️ Tech Stack

- Node.js
- Discord.js v14
- ES Modules
- JSON Storage

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Scriptbal**

GitHub:
https://github.com/scriptbal
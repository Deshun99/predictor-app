# 🧠 Predictor App

A smart, web-based **card sequence prediction tool** designed for arcade-style games. Built using React, it supports intelligent predictions, card listings, and version-controlled updates via GitHub Actions.

![Version Badge](https://img.shields.io/github/v/tag/Deshun99/predictor-app?label=version&style=flat-square)

---

## 🔮 Features

- 🎴 Predict the **next card** in a sequence (3rd/4th card prediction)
- 📋 Display card **deck lists** by version
- 🎼 Background music when viewing card lists
- 🔁 Barcode orientation toggle (up/down)
- 🛠 Automated version bumping via commit messages
- 📝 Auto-generated release notes and changelogs

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Deshun99/predictor-app.git
cd predictor-app
```

### 2. Install frontend dependencies

```bash
npm install
npm run dev
```
---

## 🧪 Prediction Modes

| Mode         | Description                                |
|--------------|--------------------------------------------|
| **3rd Card** | Predicts next card from first two cards    |
| **4th Card** | Predicts next card from first three cards  |
| **Card List**| Displays the full sequence per deck        |

---

## 🔧 Developer Guide

### Add New Cards

Update the following files:
- `src/backend/decks/ver1.jsx`, `ver2.jsx`, etc.
- Card prediction logic in `predictorLogic.js`

### Enable Background Music

Music file (e.g. `/public/ilookleftlookright.mp3`) plays when users enter the **Card List** view and submit a version.

### Semantic Commit Format

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for auto bumping:

```bash
git commit -m "feat: add prediction for deck 2 #minor"
```

| Type     | Description                    | Tag Trigger |
|----------|--------------------------------|-------------|
| `feat:`  | New feature                    | `#minor`    |
| `fix:`   | Bug fix                        | `#patch`    |
| `chore:` | Build process or tooling change| `#none`     |

---

## 📦 Release & Changelog

Releases and changelogs are automated via GitHub Actions.

- 🏷 **Releases**: https://github.com/Deshun99/predictor-app/releases
- 📜 **Changelog**: [CHANGELOG.md](./CHANGELOG.md)

---

## 🤝 Contributors

- **@Deshun99** — Developer & Maintainer

---

## 🛡 License

This project is licensed under the MIT License. See `LICENSE` for details.

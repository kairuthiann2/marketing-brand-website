# Deployment & GitHub Push Guide

This document describes how to push this project to GitHub for future reference and when onboarding collaborators or moving to a new machine.

---

## Prerequisites

- **Git** installed and configured (name + email)
- **Node.js** and **npm** (for building Tailwind CSS)
- **GitHub account** with SSH keys or credential manager set up

---

## Initial Push to a New Repository

### 1. Create the repository on GitHub

- Go to [github.com/new](https://github.com/new)
- Create an empty repo (do **not** initialize with README)
- Note the repo URL, e.g. `https://github.com/USERNAME/REPO.git`

### 2. Fix Git safe directory (Windows, if needed)

If Git reports "dubious ownership", run:

```bash
git config --global --add safe.directory 'C:/FULL/PATH/TO/PROJECT'
```

Replace the path with your actual project path.

### 3. Initialize and push

```bash
# Navigate to project
cd path/to/Gabu-personal-brand-website

# Add safe directory (one-time, if needed)
git config --global --add safe.directory "$(pwd)"

# Initialize (if not already a repo)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Victor personal brand website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/USERNAME/REPO.git

# Push
git branch -M main
git push -u origin main
```

---

## Subsequent Pushes (Ongoing Work)

```bash
# 1. Build CSS (if you changed styles or Tailwind classes)
npm run build

# 2. Stage changes
git add .

# 3. Commit
git commit -m "Brief description of changes"

# 4. Push
git push
```

---

## First-Time Setup (New Clone / New Machine)

```bash
# 1. Clone the repo
git clone https://github.com/USERNAME/REPO.git
cd REPO

# 2. Install dependencies
npm install

# 3. Build CSS
npm run build

# 4. Open index.html in a browser, or use a local server
```

---

## Current Remote

This project is pushed to:

- **Repository:** [https://github.com/kairuthiann2/marketing-brand-website](https://github.com/kairuthiann2/marketing-brand-website)
- **Branch:** `main`
- **Remote name:** `origin`

---

## File Checklist

| Action        | Files                                      |
|---------------|---------------------------------------------|
| Always commit | `index.html`, `portfolio.html`, `services.html`, `style.css`, `tailwind.config.js`, `js/`, `images/`, `dist/output.css`, `package.json`, `package-lock.json` |
| Never commit  | `node_modules/` (in .gitignore)             |

---

## Documentation Maintenance

When new or important steps are added to this guide, **update the README** (`README.md`) so it reflects the latest workflow. Keep the README's Deployment section in sync with any changes here.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm` not recognized | Install Node.js, restart terminal |
| Dubious ownership | Run `git config --global --add safe.directory 'PATH'` |
| Push rejected | Pull first: `git pull origin main --rebase`, then push |
| Styles broken after clone | Run `npm install` and `npm run build` |

# NEXUS VAULT 🎮

Next-generation game review publication and interactive community consensus hub.

![Nexus Vault](https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2138330/ss_5c4b46c61d7d1d5903835a68eac6582b4e62367f.1920x1080.jpg)

## Features

- **Official Steam Poster Art**: High-resolution key visual assets directly from verified Steam store CDNs with zero broken links and automatic fallbacks.
- **Dual-Score Paradigm**: Official Nexus Critic Verdict paired with live dynamic community consensus calculated from actual gamer submissions.
- **Deep Editorial Analysis**: Comprehensive review breakdowns with score radars across Gameplay, Story, Visuals, Audio, and Performance, plus structured Pros & Cons.
- **Interactive Community Review Engine**:
  - Rating slider with 0.1 precision and colored grade tags (Legendary Masterpiece, Great, Solid, Skip It)
  - Playtime hour logger and platform tags (PC, PS5, Xbox Series X/S, Steam Deck)
  - Playstyle categorization (Lore Hunter, Completionist, Hardcore, Casual)
  - Difficulty perception indicators
  - Upvote & helpfulness reactions with persistence in local storage
- **Live Gamer Feed**: Filterable by game, sortable by most helpful, highest rated, or newest.
- **Search & Multi-Filter**: Real-time search across titles, developers, and genres, with category and platform filters.
- **Interactive GitHub Export Guide**: In-app modal with 1-click terminal commands to push the codebase to your GitHub account and deploy to GitHub Pages or Vercel.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## Pushing to Your GitHub Repository

### Step 1: Create a new repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter repository name (e.g. `nexus-vault`).
3. Set visibility to **Public** (leave "Add a README file" unchecked).
4. Click **Create repository**.

### Step 2: Push your local code
Run the following commands in your terminal:

```bash
# 1. Initialize git
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: initial commit of Nexus Vault game review blogsite"

# 4. Set branch to main
git branch -M main

# 5. Connect your remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nexus-vault.git

# 6. Push to GitHub
git push -u origin main
```

---

## Free Deployment (GitHub Pages)

1. In your GitHub repository, open the **Settings** tab.
2. Select **Pages** from the left navigation.
3. Under **Build and deployment > Source**, choose **Deploy from a branch** (select `main` branch, `/ (root)` folder) or deploy via **Vercel / Netlify** with 1-click Vite import.
4. Your site will be live at:
   `https://<YOUR_USERNAME>.github.io/nexus-vault/`

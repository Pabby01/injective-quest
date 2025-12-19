# 🥷 Injective Ninja Quest

> **An immersive, story-driven mini game to master the Injective blockchain through interactive learning**

Built for the **Start! Ninja Break — Chill Building Weeks** event, Injective Ninja Quest transforms complex blockchain concepts into an engaging narrative experience, making it easy for newcomers to understand Injective and join the Ninja Labs community.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 Overview

Injective Ninja Quest is a **beginner-friendly, Web3-native educational game** that guides users through 5 story-driven chapters, each teaching core concepts about the Injective blockchain. Players answer quiz questions, earn points, and unlock achievements while interacting with **live blockchain data** via Injective's public RPC.

### Key Features

- 🎮 **5 Progressive Chapters** — Story-based learning journey
- 📝 **10 Quiz Questions** — Test your knowledge and earn points
- ⛓️ **Live Blockchain Data** — Real-time chain ID, block height, and network status
- 🎨 **Cyberpunk Aesthetic** — Stunning Injective-branded design with glassmorphism
- 🏆 **Scoring & Leaderboard** — Track progress and compete with simulated ninjas
- 📱 **Responsive Design** — Optimized for desktop and mobile

---

## 🎯 Learning Objectives

### Chapter 1: Awakening on Injective
Learn what Injective is and understand Layer 1 blockchain fundamentals.

### Chapter 2: Speed of the Chain
Discover Injective's lightning-fast block times and instant finality.

### Chapter 3: Builder's Arsenal
Explore CosmWasm, EVM compatibility, and the iBuild developer program.

### Chapter 4: Interoperability World
Understand IBC and Injective's cross-chain capabilities.

### Chapter 5: Ninja Labs Dojo
Join the community and learn how to contribute to the ecosystem.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ and npm (or Bun)
- Modern web browser (Chrome, Firefox, Brave recommended)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd injective-quest

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Vite + React 18 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion |
| **State Management** | localStorage (no backend) |
| **Blockchain Integration** | Injective Public RPC (HTTP) |
| **Routing** | React Router v6 |

---

## 📂 Project Structure

```
injective-quest/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AnimatedBackground.tsx
│   │   ├── ChapterCard.tsx
│   │   ├── LiveDataDisplay.tsx
│   │   ├── QuizPanel.tsx
│   │   └── ui/           # shadcn/ui components
│   ├── data/
│   │   └── chapters.ts   # Chapter content & quiz questions
│   ├── lib/
│   │   ├── injectiveRpc.ts  # Blockchain RPC calls
│   │   ├── gameState.ts     # Game state management
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── ChapterPage.tsx  # Chapter view
│   │   └── NotFound.tsx
│   └── index.css         # Custom styles & theme
├── public/              # Static assets
└── package.json
```

---

## 🎨 Design System

### Color Palette

```css
/* Injective Cyan (Primary) */
--primary: hsl(180 100% 50%);

/* Neon Purple (Secondary) */
--secondary: hsl(270 91% 65%);

/* Teal Highlights */
--accent: hsl(174 72% 40%);

/* Dark Background */
--background: hsl(222 47% 4%);
```

### Typography

- **Headings**: Orbitron (futuristic, tech-inspired)
- **Body**: Rajdhani (clean, readable)
- **Code/Data**: Space Grotesk (monospace)

### Effects

- Glassmorphism with backdrop blur
- Neon glow on interactive elements
- Smooth Framer Motion animations
- Cyber grid backgrounds

---

## 🔗 Injective Blockchain Integration

### RPC Endpoints

```typescript
const INJECTIVE_RPC = "https://sentry.tm.injective.network:443";
const INJECTIVE_LCD = "https://sentry.lcd.injective.network:443";
```

### Data Fetched

- **Chain ID** → Network identifier
- **Block Height** → Latest block number
- **Block Time** → Timestamp of latest block
- **Network Status** → Node version, sync info
- **Validator Count** → Active bonded validators

> **Note**: All interactions are **read-only**. No transactions or wallet approvals required for core gameplay.

---

## 🏗️ Build & Deploy

### Production Build

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

### Deployment Options

#### Option 1: Lovable Hosting
```bash
# Deploy via Lovable dashboard
# Navigate to: Project > Share > Publish
```

#### Option 2: Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option 3: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🎮 Gameplay Flow

1. **Landing Page** → Begin Quest button
2. **Chapter Selection** → Choose unlocked chapter
3. **Story Phase** → Read narrative introduction
4. **Quiz Phase** → Answer 2 questions
5. **Completion** → View score, unlock next chapter
6. **Leaderboard** → See ranking among ninjas

### Scoring System

- ✅ **Correct Answer (1st try)**: 15 points
- ⚠️ **Correct Answer (2nd try)**: 10 points
- ❌ **Incorrect (all tries)**: 0 points
- 🌟 **Perfect Chapter Bonus**: Extra recognition

**Maximum Score**: 150 points (30 per chapter × 5)

---

## 🧪 Development

### Available Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Production build
  "build:dev": "vite build --mode development",
  "preview": "vite preview",        // Preview build
  "lint": "eslint ."                // Run linter
}
```

### Environment Variables

No environment variables required! The app uses public RPC endpoints.

### Testing Locally

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Open browser to http://localhost:5173
```

---

## 📚 Resources

- **Injective Website**: [https://injective.com](https://injective.com)
- **Injective Docs**: [https://docs.injective.network](https://docs.injective.network)
- **Ninja Labs Community**: Join the global builder collective
- **iBuild Program**: [https://injective.com/build](https://injective.com/build)

---

## 🤝 Contributing

This project was built for the **Start! Ninja Break** event. Contributions, suggestions, and feedback are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Injective Labs** — For building the fastest blockchain in Web3
- **Ninja Labs Community** — For fostering a vibrant builder ecosystem
- **Start! Ninja Break Event** — For inspiring this educational project
- **Lovable** — For rapid prototyping and development

---

## 🎯 Built For

**Event**: Start! Ninja Break — Chill Building Weeks  
**Category**: Education / Community Growth  
**Focus**: Beginner onboarding to Injective ecosystem

---

<div align="center">

**Made with 🥷 by Ninja Labs Community**

[![Twitter](https://img.shields.io/badge/Follow-Injective-1DA1F2?logo=twitter)](https://twitter.com/Injective_)
[![Discord](https://img.shields.io/badge/Join-Discord-5865F2?logo=discord)](https://discord.gg/injective)

</div>

# Om Vyas — Cyberpunk Night City Developer Portfolio OS
> **B.Tech CSE (AI/ML), 2nd Year — MIT Academy of Engineering, Pune**  
> *"Building real-world AI systems, full-stack platforms, and multi-agent solutions at the edge of technology."*

[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌆 Overview

The **Cyberpunk Night City Developer Portfolio OS** is an original, production-grade 3D web experience inspired by dark-future neon-industrial aesthetics. Designed from the ground up to present the engineering capabilities, flagship systems, verified accolades, and research of **Om Vyas**, the portfolio bridges cinematic 3D visual fidelity with instant, frictionless hiring manager accessibility.

### Verified Operator Profiles
- **GitHub:** [DevWithOm](https://github.com/DevWithOm)
- **LinkedIn:** [om-vyas-546b9a3a5](https://www.linkedin.com/in/om-vyas-546b9a3a5)
- **LeetCode:** [om_vyas_21](https://leetcode.com/u/om_vyas_21)
- **CodeChef:** [om_vyas_21](https://codechef.com/users/om_vyas_21)
- **Email:** `vyasom2006@gmail.com`
- **Verified Resume:** [Google Drive Hosted PDF](https://drive.google.com/file/d/1brpMbX1RFPulYGVYMBrwezfXINYwC6V1/view?usp=sharing)

---

## ⚡ Key Architectural Systems

### 1. Real-Time 3D WebGL Megacity Scene (`CyberCityScene.tsx`)
- **100% Procedural Three.js Architecture:** Built with native WebGL primitives avoiding heavy multi-megabyte remote models.
- **Atmospheric Environment:** Exponential density fog (`FogExp2`), wet asphalt rooftop with dynamic canvas puddle specular masks, and yellow hazard caution striping.
- **Skyscraper Cityscape:** Procedural towers with setback penthouses, antenna masts with pulsing red collision-avoidance beacons, and instanced glowing window arrays.
- **Dynamic Physics & Particles:** Spatial rain volume (up to 1,600 particles in Cinematic mode) with delta-time descent, rising steam vents, and flying AV hovercrafts with pulsing plasma thruster trails.
- **Scroll-Coupled Camera:** Continuous, reversible camera height (`4.2 → 1.0`) and forward tracking (`14.5 → 2.5`) synchronized with native browser scroll progress (`lerp 0.06`).

### 2. Tactical Netrunner Top HUD (`CyberTopHUD.tsx`)
- High-contrast carbon HUD with section navigation (`[01] HOME` ... `[06] CONTACT`).
- **Interactive Quality Tier Selector:** Live switching between `Cinematic` (DPR 2.0, 1600 rain, AA ON), `Balanced` (DPR 1.5, 800 rain), and `Performance` (DPR 1.0, 250 rain, AA OFF).
- **Procedural Ambient Dark Synth:** Built-in Web Audio API synthesizer (`cyberAudio.ts`) generating dual-oscillator drone and rain haze without external audio files. Off by default.
- **Recruiter Fast-Track CTA:** High-visibility yellow `[RECRUITER_MODE ↗]` button accessible from any viewport.

### 3. Operator Dossier (`OperatorDossier.tsx`)
- Callsign profile, biometric vector avatar (`cyber_netrunner_avatar.svg`), and academic status.
- Core software engineering philosophy snapshot.
- Direct 1-click resume download and verified social links.

### 4. Systems Overview / Fixer Board (`ProjectsFixerBoard.tsx`)
Chamfered polygon cards (`clip-path`) with category filters (`AI/ML & Ethics`, `Multi-Agent Ocean AI`, `Autonomous Agents`, `Travel Tech`, `Defense & Geospatial`) leading to deep **13-Point Architectural Case Study Dossiers**:
1. **FairLens:** Automated AI bias auditing platform with demographic parity metrics and Gemini remediation (Google Solution Challenge Global Top 106 Finalist).
2. **NautilusAI:** Autonomous multi-agent ocean intelligence platform integrating LangGraph, PostGIS, and TimescaleDB (Nirmaan 4.0 2nd Runner-up).
3. **Agentica:** Flagship autonomous agent loop runtime with deterministic tool schema verification and repetition guards.
4. **TravelSphere:** Full-stack AI travel itinerary planner with district clustering.
5. **OceanEmbed-X:** Spatial coordinate normalization and bathymetric embedding pipeline (SIH 2026 MITAOE Internal Selection).
6. **NETRA:** Edge surveillance and motion downsampling prototype with clear prototype boundaries (SIH 2026 MITAOE Internal Selection).

### 5. Cyberdeck Skill Matrix (`CyberdeckSkills.tsx`)
21 verified technical capabilities categorized across 6 domains (Programming Languages, Frontend Engineering, Backend Systems, AI/ML & Agents, Databases & Spatial, Tools & Infra) with honest proficiency tiers:
- `CORE CHROME` (Experienced With)
- `HIGH PROTOCOL` (Working Knowledge)
- `SYNAPTIC EXPERIMENT` (Currently Learning)

### 6. Neural Research Lab (`NeuralResearchLab.tsx`)
Active engineering research logs tracking cyclical agent graphs (LangGraph), explainable AI feature importance (SHAP & XGBoost), and competitive algorithmic problem-solving (C++ STL).

### 7. Chronicle Journey Timeline (`ChronicleTimeline.tsx`)
Illuminated data-bus vertical timeline tracking verified academic and competitive progression from 2024 to present.

### 8. Reputation Archive (`ReputationArchive.tsx`)
Verified accolades with 5 categorical filter tabs separating:
- `COMPETITION AWARDS` (Google Solution Challenge Top 106, Nirmaan 4.0 2nd Runner-up)
- `COLLEGIATE SELECTION` (SIH 2026 MITAOE internal round winner)
- `LEADERSHIP & CLUBS` (VAJRA-X21 Lead, ASTRA Robotics, AMIEE Chapter)
- `VIRTUAL INTERNSHIP & COURSEWORK` (Cisco Networking Academy)

### 9. Tactical Command Palette (`CommandPalette.tsx`)
Zero-dependency `Ctrl/Cmd + K` search launcher enabling keyboard-first navigation across all projects, skills, and recruiter actions.

---

## 🚀 Performance & Code-Splitting

- **Genuine Lazy Loading:** `CyberCityScene` and `Three.js` are dynamically split via `React.lazy()` with `<Suspense>`, keeping the initial critical script payload under **~92 kB gzip**.
- **Bundle Metrics:**
  - `dist/index.html`: 1.48 kB
  - `dist/assets/index-*.css`: 66.31 kB (10.69 kB gzip)
  - `dist/assets/index-*.js`: 318.36 kB (92.17 kB gzip)
  - `dist/assets/three-*.js`: 526.13 kB (130.46 kB gzip, streamed asynchronously)
- **First Contentful Paint (FCP):** ~0.45s
- **Cumulative Layout Shift (CLS):** 0.000
- **Locked 60 FPS:** RequestAnimationFrame loop with delta-time physics and un-nested geometry.

---

## 🛠️ Local Development & Build Commands

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Setup
```bash
# Clone the repository
git clone https://github.com/DevWithOm/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local development server (with HMR)
npm run dev
```

### Production Build & Preview
```bash
# Type-check and compile optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment

The production build in `dist/` is completely static and can be deployed instantly to any modern hosting provider:

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Firebase Hosting
```bash
firebase init hosting
firebase deploy --only hosting
```

---

## 📄 License & Compliance

- **Codebase License:** MIT License — Open source for developer reference.
- **Intellectual Property:** 100% original worldbuilding signage and assets (`OM_VYAS // PORTFOLIO_OS`, `NEO-PUNE NETWORK`, `DEEP_NET // RESEARCH`). Zero proprietary game art, models, or copyrighted audio files.


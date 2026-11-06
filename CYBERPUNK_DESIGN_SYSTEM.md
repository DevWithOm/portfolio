# CYBERPUNK 2077 × EDGERUNNERS DESIGN SYSTEM
## Design Language, Palette, Chamfer Geometry & Interface Tokens

**System Version:** 4.0 — Night City / Portfolio_OS v2.0  
**Target:** Om Vyas Developer Portfolio  
**Author:** Creative Director & Principal Frontend Architect  

---

## 1. Visual Identity & Atmosphere

The design system blends the physical industrial grit of *Cyberpunk 2077* (dark carbon surfaces, wet asphalt reflections, segmented borders, technical monospace metadata) with the kinetic graphic impact of *Cyberpunk: Edgerunners* (vivid signal-yellow accents, cyan data conduits, magenta neon flourishes, and bold chamfered containers).

```text
+--------------------------------------------------------------------------+
|  OM VYAS_    [01] HOME  [02] PROJECTS  [03] TECH  ...  [RECRUITER_MODE ↗]|
+--------------------------------------------------------------------------+
|                                                                          |
|  [\\ NIGHT CITY // PORTFOLIO_OS v2.0 ]                                   |
|  ██████  ███   ███   ██    ██  ██    ██   █████    ██████                |
|  ██  ██  ████ ████   ██    ██   ██  ██   ██   ██  ██                     |
|  ██  ██  ██ ███ ██   ██    ██    ████    ███████   █████                 |
|  ██████  ██  █  ██    ██  ██      ██     ██   ██       ██                |
|  B.Tech CSE (AI/ML) – MITAOE, Pune                                       |
|                                                                          |
|  [> ENTER_PORTFOLIO →]   [RECRUITER_QUICKVIEW 👤]                        |
|  +----------------+ +---------------+ +-------------+ +---------------+   |
|  | 7+ Major Honors| | 6 Projects    | | 21 Skills   | | Top 106 Global|   |
|  +----------------+ +---------------+ +-------------+ +---------------+   |
|                                                                          |
+--------------------------------------------------------------------------+
```

---

## 2. Core Palette Tokens

### Surface & Environment Tokens
```css
--city-void: #07090D;          /* Deepest abyss black backdrop */
--city-carbon: #0D1117;        /* Primary container & card surface */
--city-steel: #1A222D;         /* Border frames, structural girders, dividers */
--city-concrete: #283341;      /* Secondary surface accents & badges */
--city-asphalt-wet: #0A0D12;   /* Reflective ground plane baseline */
```

### Neon Signal & Accent Tokens
```css
--signal-yellow: #FCEE0A;      /* Primary hero accent, key CTAs, high-priority status */
--signal-yellow-glow: rgba(252, 238, 10, 0.4);
--neon-cyan: #00E5FF;          /* Technical data conduit, telemetry, code blocks */
--neon-cyan-glow: rgba(0, 229, 255, 0.35);
--neon-magenta: #FF2E88;       /* Edgerunner highlight, visual accents, warning badges */
--neon-magenta-glow: rgba(255, 46, 136, 0.35);
--warning-red: #FF4B4B;        /* Critical alert, challenge flags, prototype limits */
```

### Typography Color Tokens
```css
--text-primary: #F4F5F7;        /* Crisp high-contrast reading text */
--text-secondary: #94A3B8;      /* Monospace labels, metadata, subtitles */
--text-muted: #64748B;          /* Structural indices, bracket prefixes */
```

---

## 3. Typography Hierarchy

| Level | Size | Weight | Tracking | Family | Usage |
|---|---|---|---|---|---|
| **Display H1** | `2.5rem – 4.5rem` (40–72px) | Black (`900`) | `-0.04em` | Angular Cyber Display / Sans | Hero Name `OM VYAS_` |
| **Section H2** | `1.75rem – 2.5rem` (28–40px) | Black (`900`) | `-0.02em` | Display Sans | Section headers (`PROJECTS`, `TECH`) |
| **Contract H3**| `1.125rem – 1.35rem` (18–22px)| ExtraBold (`800`) | `-0.01em` | Condensed Sans | Mission contract names, modal titles |
| **Monospace HUD**| `0.6875rem – 0.8125rem` (11–13px)| Bold (`700`) | `+0.08em` | Technical Monospace | `[01] HOME`, `[\\ NIGHT CITY //]`, metadata |
| **Body Primary**| `0.875rem – 0.95rem` (14–15px)| Medium (`500`) | `normal` | High-legibility Sans | Project case study body, summaries |
| **Badge Micro** | `0.625rem – 0.6875rem` (10–11px)| Black (`900`) | `+0.06em` | Monospace | `TOP 106 (GLOBAL)`, `PRODUCTION`, `AI/ML` |

---

## 4. Chamfered Geometric Surfaces & HUD Classes

To break away from generic rounded cards, Cyberpunk OS v2.0 uses diagonal 45-degree chamfers and technical corner clips:

### 1. Chamfered Cyber Card (`.cyber-card`)
```css
.cyber-card {
  background: rgba(13, 17, 23, 0.88);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(26, 34, 45, 0.9);
  clip-path: polygon(
    0 0,
    calc(100% - 14px) 0,
    100% 14px,
    100% 100%,
    14px 100%,
    0 calc(100% - 14px)
  );
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8);
}
```

### 2. Signal Yellow Action Button (`.btn-signal-yellow`)
```css
.btn-signal-yellow {
  background: #FCEE0A;
  color: #07090D;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-signal-yellow:hover {
  background: #FFFFFF;
  box-shadow: 0 0 25px rgba(252, 238, 10, 0.6);
  transform: translateY(-2px);
}
```

### 3. Ghost Cyberdeck Button (`.btn-cyber-ghost`)
```css
.btn-cyber-ghost {
  background: rgba(26, 34, 45, 0.6);
  color: #F4F5F7;
  border: 1px solid rgba(255, 255, 255, 0.2);
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
}
.btn-cyber-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00E5FF;
  color: #00E5FF;
}
```

---

## 5. Anti-Slop Safeguards

1. **No Gratuitous Gimmicks:** Glitch and chromatic aberration are reserved strictly for button click feedback or section transitions.
2. **Text Legibility First:** All reading text is rendered with high-contrast neutral backgrounds (`rgba(13, 17, 23, 0.95)`) ensuring comfortable scanning for recruiters.
3. **No Decorative Fake Charts:** KPIs represent verified reality (`7+ Major Honors`, `6 Flagship Projects`, `21 Tech Skills`, `Top 106 Google SC`).


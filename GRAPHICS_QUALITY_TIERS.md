# GRAPHICS QUALITY TIERS: ADAPTIVE RUNTIME PROFILING
## Hardware Scalability, DPR Capping, Particle Budgets & Fallback Engine

**System:** Night City 3D Engine Adaptive Tier Controller  
**Author:** 3D WebGL Systems Architect  

---

## 1. Quality Tiers Overview & Configuration

To satisfy Section 13.7 of the master prompt, the 3D WebGL engine implements three runtime quality tiers with automatic hardware detection and a user-facing HUD quality toggle:

```text
[Hardware Capability Check]
          │
          ├── Desktop GPU (Webgl2, >4GB VRAM) ─────► [TIER 1: CINEMATIC DESKTOP]
          │                                            (Full Reflections, 1500 Rain, Bloom, 60 FPS)
          │
          ├── Mid-tier / Laptop (Integrated GPU) ──► [TIER 2: BALANCED (DEFAULT)]
          │                                            (PBR Wetness, 600 Rain, Capped DPR 1.5)
          │
          └── Mobile / Low-Power / Fallback ────────► [TIER 3: PERFORMANCE / MOBILE]
                                                       (Optimized Geometry, 200 Rain, Capped DPR 1.0)
```

---

## 2. Technical Feature Matrix

| Engine Feature | Tier 1: Cinematic Desktop | Tier 2: Balanced (Default) | Tier 3: Performance / Mobile |
|---|---|---|---|
| **Target Frame Rate** | Stable 55–60 FPS | Stable 45–60 FPS | Stable 30–60 FPS |
| **Device Pixel Ratio (DPR)** | `Math.min(window.devicePixelRatio, 2.0)` | `Math.min(window.devicePixelRatio, 1.5)` | Capped at `1.0` |
| **Rain Particle Count** | 1,500 active streaks | 600 active streaks | 200 active streaks (or CSS rain) |
| **Wet Asphalt Reflection** | Real-time planar specular roughness shader | Static high-specular puddle maps | Low-cost roughness approximation |
| **Flying AV Traffic** | 3 vehicles with luminous light-streak ribbons | 2 vehicles with point light thrusters | 1 vehicle with simplified trail |
| **Volumetric Distance Fog** | High-density exponential squared fog | Standard linear depth fog | Simplified linear background fog |
| **Shadow / Lighting Passes** | Multi-point directional + 3 practical point lights | 1 directional + 1 key point light | Single directional key light |
| **Billboard Animations** | 60 FPS canvas dynamic rendering | 30 FPS throttled texture update | Static emissive texture |
| **Reduced Motion Override** | Disables camera sweep & settles on stable hero angle | Disables camera sweep & settles on stable angle | Freezes all particle motion |

---

## 3. Dynamic Quality Tier Controller (`src/components/cyberpunk/QualityController.ts`)

Users can inspect their current FPS and manually switch between `CINEMATIC`, `BALANCED`, and `PERFORMANCE` directly from the top HUD or settings drawer. The setting is persisted in `localStorage` under `cyber_quality_tier`.

If WebGL2 context creation fails or WebGL is disabled by the client, the application smoothly engages the **Layered Cyberpunk Poster Fallback**, ensuring that all text, navigation, project case studies, and resume downloads remain 100% accessible.


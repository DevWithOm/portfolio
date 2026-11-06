# NIGHT CITY AAA ENVIRONMENT UPGRADE PLAN & ASSET PROVENANCE MANIFEST
**Milestone:** Night City AAA Graphics Remediation  
**Project:** Om Vyas Cyberpunk Developer Portfolio OS  
**Architects:** Senior AAA Environment Artist, Technical Artist & Three.js Graphics Engineer  
**Date:** 2026-11-07  

---

## 1. Architectural Strategy & Design Overview

The goal of this remediation is to transform the 3D environment in `CyberCityScene.tsx` from primitive box-based geometry into a visually dense, multi-layered, cinematic cyberpunk metropolis that matches the visual ambition of AAA game art direction.

```
+---------------------------------------------------------------------------------------------------+
|                                     NIGHT CITY SKYLINE VIEW                                       |
|                                                                                                   |
|  [Background] Deep Horizon Megastructures • Setback Penthouses • Pulsing Aviation Beacons Fog     |
|                                                                                                   |
|  [Midground]  Tiered Corporate Towers • Multi-Tier Facade Trims • Illuminated Skybridges         |
|               Layered Holographic Billboards • Flowing Highway Traffic Ribbons (Light Trails)     |
|                                                                                                   |
|  [Foreground] Wet Rooftop Terrace • Procedural Planar Reflection Puddles • Hazard Railings        |
|               HVAC Compressors with Animated Fan Blades • Industrial Conduits & Steam Vents       |
|               Hero Netrunner Operative with Articulated Trench, Boots, Neural Jack & Visor        |
|                                                                                                   |
|  [Atmosphere] Directional Wind-Driven Rain Streaks • Volumetric Light Fog • Selective Bloom       |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Environment Composition Breakdown

### 2.1 Foreground: Rooftop Terrace & Hero Operative
- **Rooftop Terrace Surface:**
  - Wet asphalt composite substrate with industrial perimeter parapet walls and coping stones.
  - High-visibility hazard caution striping along the perimeter ledge.
  - Real-time planar reflection puddle plane using `three/addons/objects/Reflector.js`, reflecting neon billboards, skyscrapers, and vehicle thrusters dynamically on the wet ground.
- **Industrial Infrastructure:**
  - Steel ventilation ducts and exhaust manifolds.
  - HVAC compressor units with rotating fan blades in the cooling grates.
  - High-voltage electrical conduit pipes and junction boxes.
  - Communications antenna mast with red flashing collision-avoidance beacons.
  - Continuous rising steam plumes from exhaust vents.
- **Hero Netrunner Operative:**
  - Anatomically proportioned cyberpunk operative seated on the stone parapet overlooking the canyon.
  - Layered attire: Heavy dark carbon high-collar trench coat with yellow cyber-fiber piping, tactical vest with modular pouches, reinforced knee-plated combat trousers, combat boots, and tactical gloves.
  - Cybernetic augmentations: Illuminated optical HUD visor with eye diode, neural data jack on the temple, and a glowing data-cable routed along the forearm to a waist cyberdeck.
  - Dynamic rim lighting emphasizing silhouette edge separation from the dark background.

### 2.2 Midground: Tower Architecture & Transit Infrastructure
- **Skyscraper Architectural Modules:**
  - Stepped, multi-tiered skyscraper geometry with setbacks, roof penthouses, and recessed facades instead of plain flat boxes.
  - Instanced architectural window arrays with randomized luminescent patterns (warm amber, cyan, neon magenta, and unlit corporate offices).
  - Vertical structural columns, horizontal mechanical utility bands, and exterior steel bracing trusses.
- **Transit & Highway Skybridges:**
  - Multi-lane elevated skybridge connecting major corporate towers across the central chasm.
  - Continuous animated highway traffic light ribbons: dual-directional vehicle streams with red taillight streaks and bright white/cyan headlight trails flowing smoothly across lanes.
- **Layered Holographic Billboards:**
  - Primary high-resolution holographic billboard: `OM_VYAS // PORTFOLIO_OS` with animated scanlines, neon magenta border, and sub-headers.
  - Secondary corporate billboard: `NEO-PUNE NETWORK // v2.0` with yellow warning brackets.
  - Tertiary research billboard: `DEEP_NET // RESEARCH` with active data metrics.
  - Holographic midground signs: `CYBERDECK ACCESS` and `FIXER CONTRACTS`.
- **Flying AV Spinners (Aerodynes):**
  - Aerodynamic wedge-fuselage hovercrafts with forward canards, side intake scoops, and cockpit glass.
  - Forward-projecting directional headlights casting volumetric light cones into the rain.
  - Dual plasma thrusters with animated luminous light-trail ribbons that interpolate smoothly across 3D flight paths using delta time.

### 2.3 Background: Skyline Depth & Atmospheric Perspective
- **Deep Skyline:** Distant megatowers rising into the upper cloud layer, fading naturally into atmospheric fog (`FogExp2`, density `0.0032`).
- **Aviation Warning Beacons:** Dual-phase red and amber aviation collision-avoidance beacons atop distant spires flashing with asynchronous sine modulation.
- **Atmospheric Perspective:** Density falloff creating realistic aerial perspective, making foreground objects pop with sharp specular contrast while distant structures dissolve into moody city haze.

---

## 3. Materials, Lighting & Post-Processing Pipeline

### 3.1 PBR Material Setup
- **Standard Mesh Pipeline:** `MeshStandardMaterial` utilizing roughness, metalness, normal maps, and emissive channels.
- **Wet Rooftop Floor:** Planar reflector coupled with normal perturbation maps to create localized puddle reflections while preserving matte roughness on dry concrete.
- **Windows & Neon:** High emissive values (`emissiveIntensity: 1.5 - 2.5`) mapped to selective bloom thresholds.

### 3.2 Lighting Rig
- **Ambient Fill:** Deep navy/slate ambient light (`0x0A0F1D`, intensity `0.45`) ensuring dark shadows remain readable without clipping to pitch black.
- **Canyon Key Light:** Directional Cyan key light (`0x00E5FF`, intensity `1.6`) angled from upper-left (`[-30, 25, 15]`) casting realistic soft shadow maps.
- **Billboard Warm Rim Light:** Directional Magenta/Amber rim light (`0xFF2E88`, intensity `1.2`) from right (`[28, 20, 8]`) backlighting the operative's trench coat.
- **Rooftop Local Point Light:** Signal Yellow spotlight (`0xFCEE0A`, intensity `1.8`, range `20`) anchored to the rooftop access bulkhead providing local ground spill.

### 3.3 Shadow Mapping
- Enabled via `renderer.shadowMap.enabled = true` and `renderer.shadowMap.type = THREE.PCFSoftShadowMap`.
- Shadows cast by the operative and rooftop mechanical structures onto the terrace floor.

### 3.4 Post-Processing Chain
- Built using `EffectComposer`, `RenderPass`, `UnrealBloomPass`, and `OutputPass`:
  - **Resolution:** Render target matching container dimensions scaled by quality tier DPR.
  - **UnrealBloomPass:** Threshold `0.65`, Strength `0.45`, Radius `0.35`. Tuned specifically so neon signs and thrusters bloom vividly without washing out text readability.
  - **OutputPass & ACES Filmic Tone Mapping:** Exposure `1.15` providing cinema-grade contrast and tonal range.

---

## 4. Weather & Atmospheric Systems

### 4.1 Wind-Driven Directional Rain Streaks
- Replaced square point dots with **directional line segments / oriented streak geometry**.
- Rain particles feature vertical velocity (`-35 units/s`) coupled with a crosswind vector (`-4.5 units/s`), creating realistic diagonal rain streaks.
- Depth distribution: 1,600 streaks in Cinematic tier layered across foreground (`z: 0 to 12`), midground (`z: -5 to -30`), and skyline (`z: -30 to -70`).

### 4.2 Rising Industrial Steam Vents
- Low-pressure steam emitting from HVAC outlets with continuous upward drift, horizontal turbulence, and opacity fade-out before resetting.

---

## 5. Camera Scroll Choreography & Lifecycle Architecture

### 5.1 Stale Closure Fix
- **Problem:** In previous versions, the render loop read `scrollYProgress` from an outer closure or re-mounted the entire scene on every scroll event.
- **Solution:** Introduce a mutable ref:
  ```typescript
  const scrollYProgressRef = useRef(scrollYProgress);
  useEffect(() => {
    scrollYProgressRef.current = scrollYProgress;
  }, [scrollYProgress]);
  ```
- The 60 FPS animation loop reads `scrollYProgressRef.current` directly, ensuring fluid interpolation without re-mounting or re-running the Three.js setup effect.

### 5.2 Scroll Choreography Curve
- **Wide Establishing Shot (`progress 0.0`):** Camera at `[0, 4.2, 14.5]`, looking across the rooftop ledge to the full panorama of Night City.
- **Descent & Forward Glide (`progress 0.0 → 0.4`):** Camera descends (`y: 4.2 → 2.2`) and glides forward (`z: 14.5 → 6.0`), framing the operative in heroic silhouette against the glowing canyon.
- **Content Transition (`progress 0.4 → 1.0`):** Camera settles into a stable low-angle background vantage (`y: 1.2`, `z: 2.0`), providing a dynamic ambient background behind the readable portfolio cards without visual clutter.

### 5.3 Resource Lifecycle & Disposal
- Full disposal pattern:
  - Traverse scene and dispose every `BufferGeometry`.
  - Dispose all `Material` instances and associated `Texture` maps.
  - Dispose `Reflector` render targets.
  - Dispose `EffectComposer` and pass render targets.
  - Clean up event listeners (`resize`, `visibilitychange`).
  - Pause `requestAnimationFrame` loop when `document.visibilityState === 'hidden'`.

---

## 6. Asset Provenance Manifest

| Asset Name | Category | Provenance / Author | License | Description / Texture Specs | Optimization Applied |
|---|---|---|---|---|---|
| **Wet Asphalt Reflector** | PBR Shader Texture | Custom Procedural Texture Generator | MIT | Procedural 1024×1024 Canvas Normal & Roughness map | Canvas rendered once into `CanvasTexture`, GPU mipmapped |
| **Hazard Warning Stripes** | Environmental Trim | Custom Procedural Generator | MIT | 512×32 repeating diagonal caution pattern (`#FCEE0A` on `#0A0A0A`) | Instanced UV repeat mapping, zero memory footprint |
| **Neon Billboards (1, 2, 3)** | Holographic Signage | Custom Canvas Shaders | MIT | 512×512 & 512×256 dynamic canvas textures with scanlines | Rendered onto low-poly plane quads with alpha transparency |
| **Window Grid Arrays** | Architecture Facade | Three.js Instanced Buffer Geometry | MIT | Instanced PlaneGeometry matrices with multi-hue emissive channels | Single draw-call for 200+ illuminated windows |
| **Highway Traffic Ribbons** | Urban Infrastructure | Custom Animated Shader Quad | MIT | Dual-lane animated UV pulse simulating high-speed headlights & taillights | Mathematical sine-wave UV scrolling, zero external textures |
| **Hero Netrunner Operative** | Character Art | Original Multi-Layered Modular Mesh | MIT | Articulated operative mesh (coat, vest, collar, gauntlets, neural jack, visor) | Merged static group with optimized PBR materials |
| **AV Aerodyne Spinners** | Urban Traffic | Original Three.js Geometry Model | MIT | Swept fuselage, cockpit canopy, dual thrusters, light trails | Delta-time spline interpolation, instanced trails |
| **Directional Rain Streaks** | Weather Particle Engine | LineSegments BufferGeometry | MIT | 1600 directional vertex pairs with alpha gradient | Single draw call with vertex buffer attribute updates |
| **Ambient Synth Engine** | Audio Synthesizer | Custom Web Audio API Engine | MIT | Procedural dual-oscillator drone + pink noise rain buffer | 100% procedural, zero audio files, license safe |

---

## 7. Graphics Quality Tiers Matrix

| Feature | Cinematic Tier | Balanced Tier | Performance Tier |
|---|---|---|---|
| **Device Pixel Ratio (DPR)** | Capped at 2.0 | Capped at 1.5 | Capped at 1.0 |
| **Post-Processing (Bloom)** | Enabled (`UnrealBloomPass`) | Enabled (Reduced resolution) | Disabled (Direct WebGL render) |
| **Planar Reflection** | Real-time `Reflector` (512×512) | Real-time `Reflector` (256×256) | Static PBR Specular Sheen |
| **Shadow Maps** | Enabled (`PCFSoftShadowMap`) | Enabled (`BasicShadowMap`) | Disabled |
| **Rain Particles** | 1,600 Directional Streaks | 800 Directional Streaks | 250 Streaks |
| **Highway Traffic Ribbons** | Active Dual-Directional | Active Single-Directional | Static Luminescent Lane |
| **Flying AV Hovercrafts** | 3 Active with Headlights | 2 Active | 1 Active |
| **Target Frame Rate** | 60 FPS (Dedicated GPU) | 60 FPS (Standard GPU) | 60 FPS (Low-Power / Mobile) |


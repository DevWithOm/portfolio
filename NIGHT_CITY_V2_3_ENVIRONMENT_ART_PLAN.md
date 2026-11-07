# NIGHT CITY V2.3 — ENVIRONMENT ART & SPATIAL EXECUTION PLAN

**Production Phase:** Night City V2.3 Asset-Based Transformation  
**Art Director & Technical Director:** Senior AAA Environment Art Director, Three.js Graphics Engineer  
**Branch:** `Cyberpunk-2077`  
**Authoritative Source Code:** `src/components/cyberpunk/CyberCityScene.tsx`  

---

## 1. Executive Direction & Spatial Zoning

Night City V2.3 establishes an **asset-based AAA environment pipeline** replacing primitive placeholder geometry with authored 3D binary glTF 2.0 assets (`.glb`), complete PBR surface responses, and a three-tier spatial level-of-detail (LOD) architecture.

### Spatial Zoning Strategy

```
+-----------------------------------------------------------------------------------------+
| FAR FIELD (> 70m)                                                                       |
| - Central Siphon Megatower Cone Spire (y: 88m)                                          |
| - Distant Industrial Arcology Massings                                                  |
| - 380 Instanced Windows (THREE.InstancedMesh, 1 draw call)                              |
| - Dual Needle Towers with Skybridge                                                     |
| - Volumetric Fog Separation (THREE.FogExp2, density: 0.0034)                            |
+-----------------------------------------------------------------------------------------+
| MID FIELD (20m - 70m)                                                                   |
| - Tower 1: Corporate Skyscraper Complex (corporate_skyscraper.glb)                      |
|   * Structural Corner Columns, Recessed Window Embrasures (Front + Right)               |
|   * Setback Penthouse Crown & Mechanical Louver Band                                    |
|   * Facade Billboard Frames: NEURON // DYNAMICS & A.I.D.A.                              |
| - Tower 2: Secondary Brutalist Stepped Arcology (secondary_arcology.glb)                |
|   * 3-Tier Cantilevered Balconies & Vertical Service Conduit Track                      |
| - High-Speed Aerodyne Spinners in Right Canyon (x: 11.5 - 21.0)                         |
| - Deep Canyon Highway & Traffic Light Ribbons (y: -5.5, z: -46.0)                       |
+-----------------------------------------------------------------------------------------+
| NEAR FIELD (0m - 20m)                                                                   |
| - Hero Rooftop Terrace Base Deck (32m x 22m)                                            |
| - Localized Organic Puddle Boundaries & Wet Aggregate Gravel Canvas                     |
| - Localized True Planar Reflector (PlaneGeometry(16, 9))                                |
| - Authored Hero Operative (cyber_operative.glb) seated on parapet ledge                 |
|   * Red Tactical Cyber-Helmet, Signal Yellow Ballistic Jacket                          |
|   * Hex-Core Neural Falcon Glyph (OV_SYS // 714)                                        |
|   * Telemetry LEDs, Leg Harness Straps, Combat Boots                                    |
| - Industrial Rooftop Machinery (rooftop_machinery.glb)                                  |
|   * Louvered HVAC Compressor with Rotating Fan, Flanged Conduit Pipes                   |
|   * Electrical Breaker Cabinets & Sheet Metal Exhaust Ducts                             |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Geometry & Asset Architecture

### A. Corporate Skyscraper Complex (`corporate_skyscraper.glb`)
- **Dimensions:** 11.4m × 56.4m × 11.4m.
- **Structural Integrity:** 4 extruded corner columns (`0.85m × 42.4m × 0.85m`) providing genuine cast shadows and depth.
- **Window Reveals:** 10 floors × 5 bays of recessed window reveals on both the front and camera-visible right facades, eliminating disconnected 2D floating planar window decals.
- **Mechanical Levels:** Louvered ventilation service band at mid-height (`y = 22.5m`).
- **Crown & Communications:** Stepped setback penthouse crown with perimeter maintenance gantry, communications lattice mast, and pulsed aviation warning beacon.

### B. Secondary Brutalist Arcology (`secondary_arcology.glb`)
- **Dimensions:** 13m base tier × 48m total height.
- **Massing:** 3-tier stepped pyramidal setbacks with cantilevered service terraces and maintenance walkways.
- **Service Core:** External vertical conduit shaft with cyan runner track extending the full 48m height.

### C. Hero Cyber-Netrunner Operative (`cyber_operative.glb`)
- **Anatomy & Proportions:** Human skeletal proportions configured in a seated stance commanding the rooftop edge.
- **Tactical Costume:** Ballistic jacket in signal yellow (`#F5CE13`), cross-body tactical webbing harness with metal buckles, high collar, and reinforced shoulder pauldrons.
- **Cyberware:** Titanium forearm chassis with optical telemetry data conduit on right arm and amber status LED on left arm.
- **Headwear:** Chiseled angular cyber-helmet in crimson (`#DE1A35`) with horizontal cyan optical sensor slit (`#00E5FF`).
- **Insignia:** Original Hex-Core Neural Falcon back glyph (`OV_SYS // 714`).

### D. Flying Aerodyne Spinners (`aerodyne_spinner.glb`)
- **Fuselage:** Low-slung faceted titanium hull with underside keel.
- **Intake System:** Twin forward wedge intake pontoons with illuminated vertical radiator slats (cyan glow `#00E5FF`).
- **Aerodynamics:** Swept wings with upturned winglet fins and amber leading-edge trim lines (`#F59E0B`).
- **Propulsion:** Dual side ducted hover turbine nacelles with glowing intake rings and dual rear plasma jet thrusters with luminous contrail ribbons.

### E. Rooftop Mechanical Equipment (`rooftop_machinery.glb`)
- **HVAC Unit:** Industrial compressor enclosure with horizontal louver slits, protective grille, and animated cooling fan blades.
- **Piping:** Flanged steel conduit pipes with bolted connection rings and mounting brackets.
- **Electrical Core:** Breaker junction cabinet with door seams, hazard caution striping, and status LED.

---

## 3. PBR Material Specification Workflow

All surfaces feature distinct material identities calibrated for physically-based rendering:

| Material Name | Base Color | Roughness | Metalness | Visual Response |
| :--- | :--- | :--- | :--- | :--- |
| **Titanium Composite** | `#0B1019` | 0.22 | 0.88 | Crisp specular highlights on vehicle and column edges |
| **Ballistic Fabric** | `#F5CE13` | 0.35 | 0.14 | Subtle sheen on jacket folds without plastic gloss |
| **Tactical Armor** | `#090D14` | 0.72 | 0.25 | Matte light absorption on chest plates and cargo pants |
| **Chiseled Helmet** | `#DE1A35` | 0.28 | 0.42 | Semi-gloss crimson reflection with chiseled edge highlights |
| **Curtain Wall Glass** | `#00E5FF` | 0.05 | 0.95 | High reflectivity with 0.80 transparency |
| **Galvanized Sheet Duct** | `#475569` | 0.30 | 0.75 | Diffuse metallic industrial response on terrace ducts |
| **Wet Asphalt Substrate** | `#0B0F17` | 0.38 | 0.55 | Gritty aggregate grain with localized specular puddle reflections |

---

## 4. Asynchronous Loading & Optimization Strategy

1. **Non-Blocking Progressive Enhancement:** The scene initializes instantly with baseline proxies so the initial DOM, hero text, and primary CTAs render with zero network delay.
2. **GLTFLoader Execution:** Authored `.glb` assets load asynchronously in the background. As each model resolves, it seamlessly swaps into the scene hierarchy and disposes of the proxy geometry.
3. **Memory Management:** Every loaded geometry, material, and texture is tracked in `disposableGeometries`, `disposableMaterials`, and `disposableTextures` for 100% GPU memory reclamation on unmount.
4. **Reduced Motion Lifecycle:** When `reducedMotion` is enabled, the render loop executes a single static frame (`renderSingleFrame()`) and terminates `requestAnimationFrame` scheduling, preventing unnecessary CPU/GPU power consumption while maintaining full page interactivity.

# NIGHT CITY ASSET PROVENANCE MANIFEST V2
**Milestone:** Night City Environment Art Overhaul V2  
**Project:** Om Vyas Cyberpunk Developer Portfolio OS  
**Date:** 2026-11-07  
**Compliance Standard:** 100% Original Authored Geometry & Procedural PBR Textures (Zero Copyrighted / Ripped Franchise Assets)  

---

## 1. Asset Inventory & Provenance Directory

| Asset Component | Implementation Type | Geometry Class | Material & Texture Pipeline | Author / License |
|---|---|---|---|---|
| **Hero Netrunner Operative** | Authored Multi-Part Composite Mesh | `CapsuleGeometry`, `ExtrudeGeometry`, `CylinderGeometry`, `SphereGeometry` | PBR Roughness/Metalness with Emissive Cyan Neural Diode & Yellow Cyber-Collar | Original In-House / MIT |
| **Corporate Monolith (Tower 1)** | Stepped Facade Skyscraper | Extruded Curtain Wall with Recessed Mullions & Angled Crown | High-rise PBR Metalness (`0.75`), Roughness (`0.32`), Canvas Emissive Sign | Original In-House / MIT |
| **Terraced Arcology (Tower 2)** | 3-Tier Stepped Pyramidal Skyscraper | Stepped Setback Blocks with Exterior Bracing Trusses | Structural Concrete (`roughness: 0.65`) + Tinted Glass | Original In-House / MIT |
| **Hexagonal Corporate Spire (Tower 3)** | Cylindrical/Octagonal High-Rise | 8-Sided Extruded Tower with Vertical Fluting & Mechanical Collar | Anodized Titanium (`metalness: 0.85`) + Cyan LED Trims | Original In-House / MIT |
| **Wedge Rooftop Tower (Tower 4)** | Angled Roof Skyscraper | Angled Slanted Crown with Service Gantries & Antennas | Weathered Carbon Composite (`roughness: 0.45`) | Original In-House / MIT |
| **Instanced Window Arrays** | Hardware Instancing Engine | `THREE.InstancedMesh(PlaneGeometry, 450)` | Single-Draw-Call Emissive Matrix (Amber, Cyan, Magenta, Unlit) | Three.js Core / MIT |
| **Distant Skyline Landmarks (3)** | Horizon Megastructures | Siphon Monolith, Twin Needle Spires, Heavy Arcology | Exponential Fog Depth Falloff + Asynchronous Beacon Diodes | Original In-House / MIT |
| **Elevated Lower Canyon Highway** | Transit Infrastructure | Extruded Highway Viaduct with Barrier Rails & Support Pillars | Structural Concrete + Dynamic Canvas UV Headlight/Taillight Streaks | Original In-House / MIT |
| **AV-01 Tactical Spinner** | Flying Aerodyne Vehicle | Swept Aerodynamic Fuselage, Wing Canards, Twin Intakes | High-Gloss Carbon + Forward Projection Lights + Dual Thruster Trails | Original In-House / MIT |
| **AV-02 High-Speed Interceptor** | Flying Courier Vehicle | Dart Needle Fuselage, Swept Delta Wings, Center Ion Engine | Matte Stealth Finish + Neon Accent Line + Delta-Time Motion | Original In-House / MIT |
| **Wet Rooftop Terrace** | Hero Floor Environment | Structural Deck + Parapet Wall + Metal Railings + HVAC Turbines | Real Three.js `Reflector` Planar Mirror + Procedural Asphalt Puddle Mask | Three.js Addons / MIT |
| **Directional Rain Engine** | Atmospheric Weather | `LineSegments` BufferGeometry with Velocity & Crosswind | Wind-Angled Line Streaks with Motion Stretch & Text-Safe Zone | Original In-House / MIT |
| **Procedural Dark Synth Audio** | Audio Synthesizer | Web Audio API AudioBuffer + Dual Detuned Oscillators | 100% Procedural Web Audio API Code (Zero Audio MP3/WAV Files) | Original In-House / MIT |

---

## 2. Intellectual Property & License Verification

- **Zero Game Rips:** No 3D models, textures, sound bites, or interface assets were extracted, decrypted, or imported from *Cyberpunk 2077* or *Cyberpunk: Edgerunners*.
- **Original Signage:** All worldbuilding signage (`OM_VYAS // PORTFOLIO_OS`, `NEO-PUNE NETWORK // v2.0`, `DEEP_NET // RESEARCH`, `CYBERDECK ACCESS`) was authored in code via HTML5 Canvas texture generation.
- **Hardware Instancing:** Repeated architectural windows use true `THREE.InstancedMesh` with a single transformation buffer, ensuring high visual density under a minimal draw call count.


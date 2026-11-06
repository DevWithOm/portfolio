# CITY ENVIRONMENT ASSET MANIFEST
## 3D Geometry, Shader Materials, Textures & Provenance Registry

**System:** Night City 3D WebGL Environmental Engine  
**Author:** Lead 3D Technical Artist  
**Licensing Standard:** Original Procedural Generation & CC0 Open Resources  

---

## 1. Asset Registry & Provenance Summary

To ensure strict compliance with Section 10 and Section 13.10 (Intellectual Property & Asset Rules), **zero proprietary game models, ripped textures, official logos, or copyrighted game files are utilized**. All geometry, lighting rigs, billboard shaders, and particle systems are procedurally authored in Three.js and pure GLSL.

| Asset ID | Category | Description | Geometry / Source | Shader / Material Type | License / Provenance |
|---|---|---|---|---|---|
| `geo-roof-platform` | Foreground Architecture | Wet rooftop concrete & asphalt terrace with puddle depression | Extruded Box with Chamfer Edge | PBR MeshStandardMaterial with wetness roughness mask | Original Procedural Authoring |
| `geo-roof-props` | Set Dressing | Industrial HVAC units, conduit pipes, and antenna spires | Cylinder & Box Geometries | Metallic Roughness PBR | Original Procedural Authoring |
| `geo-tower-corpo-01` | Midground Skyscraper | 42-story corporate slab tower with cantilevered apex | Tiered Box with Instanced Windows | Emissive Window Grid Shader | Original Procedural Authoring |
| `geo-tower-industrial-02` | Midground Skyscraper | Heavy industrial monolith with exterior seismic trusses | Box + Diagonal Truss Cylinders | Dark Steel PBR with Cyan Edge Strips | Original Procedural Authoring |
| `geo-tower-needle-03` | Background Landmark | High-altitude communication spire with aviation beacon | Tapered Cone & Box Spire | Rough Matte Metal with Pulsing Red Emissive Tip | Original Procedural Authoring |
| `geo-skybridge-01` | Infrastructure | Elevated glass/steel transit skybridge between towers | Box with Inset Glass Slits | PBR Transparent Glass & Dark Metal | Original Procedural Authoring |
| `geo-av-spinner-01` | Dynamic Vehicle | Low-altitude flying aerodyne hover car | Aerodynamic Box & Wedge Hull | Dual Thruster PointLights + Neon Ribbon Trails | Original Procedural Authoring |
| `geo-character-edgerunner` | Hero Focal Figure | Silhouette figure seated on ledge in yellow jacket | Stylized Low-Poly Geometry | Two-tone Matte PBR (Yellow Coat + Dark Pants) | Original Stylized Articulation |
| `mat-rain-particles` | Atmospheric Weather | 1,500 continuous rain drop streaks with velocity vectors | BufferGeometry with Float32 velocity attributes | Additive Blended LineBasicMaterial | Original Procedural Particle Engine |
| `mat-ground-reflection` | Water & Asphalt | Real-time puddle reflection and specular wetness | Custom PBR Ground Shading | Roughness Inversion Shader with Puddle Mask | Original GLSL Shading |
| `tex-billboard-fictional`| Animated Media | Digital signage for fictional megacorps ("NEO-PUNE", "NETRUNNER") | Dynamic HTML5 Canvas 2D Render-to-Texture | Emissive Canvas Texture (1.8 intensity) | Original Fictional Artwork |

---

## 2. IP Boundaries & Independence Affirmation

1. **Unofficial Fan-Inspired Tribute:** This project is an independent creative developer portfolio inspired by the cyberpunk aesthetic.
2. **No Proprietary Code/Models:** No assets were extracted from CD PROJEKT RED's *Cyberpunk 2077* or Studio TRIGGER's *Cyberpunk: Edgerunners*.
3. **Fictional Entity Names:** Billboards and holographic displays feature original developer-themed concepts:
   - `PORTFOLIO_OS v2.0`
   - `NEO-PUNE NETWORKING`
   - `AI_SYSTEMS // DEEP_NET`
   - `LANGGRAPH_RUNTIMES`
   - `FAIRLENS_ETHICS`


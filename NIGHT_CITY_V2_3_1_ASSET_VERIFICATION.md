# NIGHT CITY V2.3.1 — INDEPENDENT GLB ASSET VERIFICATION REPORT

**Auditor Role:** Independent AAA Environment Art Reviewer, Three.js Technical Artist & GLTF Pipeline Engineer  
**Inspection Date:** 2026-11-07  
**Environment Target:** Night City Cyberpunk Portfolio V2.3.1  
**Audit Status:** COMPLETE — INDEPENDENTLY VERIFIED  

---

## 1. Executive Summary

This independent audit assesses the five authored 3D binary glTF 2.0 (`.glb`) assets introduced in V2.3:
1. `corporate_skyscraper.glb`
2. `cyber_operative.glb`
3. `aerodyne_spinner.glb`
4. `rooftop_machinery.glb`
5. `secondary_arcology.glb`

Rather than relying on build outputs or high-level assertions, each binary asset was parsed and inspected using a custom glTF parser script directly examining the binary JSON chunk (`0x4E4F534A`), buffer views, accessors, primitives, and material attributes. Furthermore, every model was isolated and rendered in an independent neutral 3-point studio lighting setup across five standardized perspectives (Front, Side, Three-Quarter, Wireframe, Close-up) and validated in the active Night City production scene.

```mermaid
flowchart TD
    subgraph Pipeline["Binary glTF 2.0 Pipeline"]
        G1["GLB Chunk Parsing"] --> G2["Geometric & Vertex Audit"]
        G2 --> G3["Independent 3-Point Studio Renders"]
        G3 --> G4["Production Scene Integration & Alignment"]
    end
    subgraph Verdict["Independent Verification Verdict"]
        V1["Asset Pipeline: VERIFIED"]
        V2["Geometry: VALIDATED CSG/EXTRUDED SILHOUETTES"]
        V3["Materials: PBR PARAMETRIC (0 TEXTURE MAPS)"]
    end
    Pipeline --> Verdict
```

---

## 2. Exhaustive Per-Asset Technical Inspection

### A. Asset 1: `corporate_skyscraper.glb`
* **File Path:** [`public/models/corporate_skyscraper.glb`](file:///c:/Users/ASUS/Desktop/portfolio/public/models/corporate_skyscraper.glb) | [`dist/models/corporate_skyscraper.glb`](file:///c:/Users/ASUS/Desktop/portfolio/dist/models/corporate_skyscraper.glb)
* **File Size:** `242,596 bytes` (236.9 KB)
* **Triangle Count:** `1,716` triangles
* **Vertex Count:** `3,277` vertices
* **Mesh Count:** `133` meshes
* **Material Count:** `4` materials
* **Texture Maps:** `0` (Zero embedded or referenced textures)
* **UV Availability:** `true` (standard auto-generated UVs; no unwrapped texture atlas)
* **Normals Availability:** `true` (vertex face normals computed)
* **Bounding Dimensions (W × H × D):** `11.400 × 42.400 × 11.400 m`
* **Bounding Min / Max:** `[-5.700, -21.200, -5.700]` to `[5.700, 21.200, 5.700]`
* **Material Properties:**
  * `[0] Tower_Architectural_Facade`: `baseColor=[0.003, 0.004, 0.009, 1.0]`, `metalness=0.75`, `roughness=0.32`
  * `[1] Structural_Steel_Columns`: `baseColor=[0.007, 0.011, 0.019, 1.0]`, `metalness=0.90`, `roughness=0.20`
  * `[2] Curtain_Wall_Glass`: `baseColor=[0.000, 0.784, 1.000, 0.8]`, `metalness=0.95`, `roughness=0.05`
  * `[3] unnamed (Aviation Beacon)`: `baseColor=[1.000, 0.000, 0.033, 1.0]`, `metalness=0.00`, `roughness=0.90`
* **Geometric Assessment:**
  * **Geometry Composition:** Distinct multi-mesh architectural structure featuring 4 extruded vertical perimeter steel columns (`BoxGeometry(0.85, 42.4, 0.85)`), 10 horizontal spandrel floor bands, recessed window reveals on both visible street facades, and a setback penthouse crown.
  * **Critical Review:** While substantially more detailed than the legacy single monolithic box, it is assembled from combined procedural box primitives rather than a sub-d sculpted or CAD-authored skyscraper mesh with chamfered bevels or ornate HVAC louvers.

#### Isolated Studio Renders (`corporate_skyscraper`)
* [Three-Quarter View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/corporate_skyscraper_three_quarter.png) (52.6 KB)
* [Front View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/corporate_skyscraper_front.png) (30.6 KB)
* [Side View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/corporate_skyscraper_side.png) (30.4 KB)
* [Wireframe View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/corporate_skyscraper_wireframe.png) (90.2 KB)
* [Facade Close-up View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/corporate_skyscraper_closeup.png) (41.7 KB)

---

### B. Asset 2: `cyber_operative.glb`
* **File Path:** [`public/models/cyber_operative.glb`](file:///c:/Users/ASUS/Desktop/portfolio/public/models/cyber_operative.glb) | [`dist/models/cyber_operative.glb`](file:///c:/Users/ASUS/Desktop/portfolio/dist/models/cyber_operative.glb)
* **File Size:** `78,436 bytes` (76.6 KB)
* **Triangle Count:** `1,716` triangles
* **Vertex Count:** `1,322` vertices
* **Mesh Count:** `23` meshes
* **Material Count:** `12` materials
* **Texture Maps:** `0` (Zero embedded or referenced textures)
* **UV Availability:** `true`
* **Normals Availability:** `true`
* **Bounding Dimensions (W × H × D):** `0.760 × 1.400 × 0.760 m`
* **Bounding Min / Max:** `[-0.380, -0.700, -0.380]` to `[0.380, 0.700, 0.380]`
* **Material Properties:**
  * `[0] Ballistic_Jacket_Fabric`: `baseColor=[0.913, 0.617, 0.007, 1.0]` (Signal Yellow `#F5CE13`), `metalness=0.14`, `roughness=0.35`
  * `[1] Tactical_Armor_Plating`: `baseColor=[0.003, 0.004, 0.007, 1.0]`, `metalness=0.25`, `roughness=0.72`
  * `[4] Chiseled_Cyber_Helmet`: `baseColor=[0.730, 0.010, 0.036, 1.0]` (Crimson `#DE1A35`), `metalness=0.42`, `roughness=0.28`
  * `[5] Cyan_Sensor_Glow`: `baseColor=[0.000, 0.784, 1.000, 1.0]`, `metalness=0.00`, `roughness=0.90`
  * `[7] Amber_Telemetry_LED`: `baseColor=[0.913, 0.342, 0.003, 1.0]`, `metalness=0.00`, `roughness=0.90`
  * `[10] Reinforced_Boots`: `baseColor=[0.002, 0.002, 0.003, 1.0]`, `metalness=0.65`, `roughness=0.40`
* **Geometric Assessment:**
  * **Geometry Composition:** Modeled operative torso, high-collar jacket collar, cross-chest tactical harness with buckle cylinders, dual segmented upper arms, elbows, forearms, chiseled 8-facet netrunner helmet, horizontal cyan optical sensor visor slot, telemetry LEDs, tactical leg straps, and reinforced magnetic boots.
  * **Critical Review:** Anatomical proportions and silhouette are crisp and recognisable as an original cyberpunk operative (matching Reference Image 8). However, the geometry is constructed from faceted primitives (cylinders, cones, boxes) without organic skinning or skeletal bone armatures.

#### Isolated Studio Renders (`cyber_operative`)
* [Three-Quarter View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/cyber_operative_three_quarter.png) (122.3 KB)
* [Front View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/cyber_operative_front.png) (77.4 KB)
* [Side View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/cyber_operative_side.png) (81.9 KB)
* [Wireframe View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/cyber_operative_wireframe.png) (207.5 KB)
* [Helmet/Visor Close-up View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/cyber_operative_closeup.png) (108.1 KB)

---

### C. Asset 3: `aerodyne_spinner.glb`
* **File Path:** [`public/models/aerodyne_spinner.glb`](file:///c:/Users/ASUS/Desktop/portfolio/public/models/aerodyne_spinner.glb) | [`dist/models/aerodyne_spinner.glb`](file:///c:/Users/ASUS/Desktop/portfolio/dist/models/aerodyne_spinner.glb)
* **File Size:** `65,684 bytes` (64.1 KB)
* **Triangle Count:** `976` triangles
* **Vertex Count:** `1,041` vertices
* **Mesh Count:** `26` meshes
* **Material Count:** `7` materials
* **Texture Maps:** `0`
* **UV Availability:** `true`
* **Normals Availability:** `true`
* **Bounding Dimensions (W × H × D):** `3.820 × 0.880 × 3.400 m`
* **Bounding Min / Max:** `[-1.910, -0.440, -1.700]` to `[1.910, 0.440, 1.700]`
* **Material Properties:**
  * `[0] Titanium_Composite_Hull`: `baseColor=[0.003, 0.005, 0.010, 1.0]`, `metalness=0.88`, `roughness=0.22`
  * `[1] Carbon_Chassis_Panels`: `baseColor=[0.002, 0.002, 0.004, 1.0]`, `metalness=0.70`, `roughness=0.45`
  * `[2] Cyan_Luminescent_Core`: `baseColor=[0.000, 0.784, 1.000, 1.0]`, `metalness=0.00`, `roughness=0.90`
  * `[3] Amber_Tactical_Trim`: `baseColor=[0.913, 0.342, 0.003, 1.0]`, `metalness=0.00`, `roughness=0.90`
  * `[4] Cockpit_Canopy_Glass`: `baseColor=[0.000, 0.784, 1.000, 0.72]`, `metalness=0.95`, `roughness=0.08`
* **Geometric Assessment:**
  * **Geometry Composition:** Twin forward wedge pontoons with vertical radiator slats (cyan glow), swept wings with winglets and amber trim lines, dual ducted hover turbine nacelles, faceted canopy glass, and dual rear cylindrical plasma thrusters.
  * **Critical Review:** Matches the silhouette and spirit of Reference Images 3 and 9. It features high aerodynamic fidelity in silhouette, but the interior cockpit and control dashboards are abstract approximations.

#### Isolated Studio Renders (`aerodyne_spinner`)
* [Three-Quarter View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/aerodyne_spinner_three_quarter.png) (92.5 KB)
* [Front View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/aerodyne_spinner_front.png) (40.5 KB)
* [Side View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/aerodyne_spinner_side.png) (33.6 KB)
* [Wireframe View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/aerodyne_spinner_wireframe.png) (167.6 KB)
* [Cockpit & Nacelle Close-up View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/aerodyne_spinner_closeup.png) (84.2 KB)

---

### D. Asset 4: `rooftop_machinery.glb`
* **File Path:** [`public/models/rooftop_machinery.glb`](file:///c:/Users/ASUS/Desktop/portfolio/public/models/rooftop_machinery.glb) | [`dist/models/rooftop_machinery.glb`](file:///c:/Users/ASUS/Desktop/portfolio/dist/models/rooftop_machinery.glb)
* **File Size:** `47,796 bytes` (46.7 KB)
* **Triangle Count:** `468` triangles
* **Vertex Count:** `765` vertices
* **Mesh Count:** `20` meshes
* **Material Count:** `5` materials
* **Texture Maps:** `0`
* **UV Availability:** `true`
* **Normals Availability:** `true`
* **Bounding Dimensions (W × H × D):** `2.600 × 4.800 × 4.500 m`
* **Bounding Min / Max:** `[-1.300, -2.400, -2.250]` to `[1.300, 2.400, 2.250]`
* **Material Properties:**
  * `[0] Alloy_Enclosure_Casing`: `baseColor=[0.013, 0.022, 0.044, 1.0]`, `metalness=0.70`, `roughness=0.40`
  * `[1] Weathered_Industrial_Steel`: `baseColor=[0.033, 0.053, 0.091, 1.0]`, `metalness=0.85`, `roughness=0.28`
  * `[2] Hazard_Caution_Yellow`: `baseColor=[0.973, 0.855, 0.003, 1.0]`, `metalness=0.00`, `roughness=0.90`
  * `[4] Galvanized_Sheet_Duct`: `baseColor=[0.063, 0.091, 0.141, 1.0]`, `metalness=0.75`, `roughness=0.30`
* **Geometric Assessment:**
  * **Geometry Composition:** Industrial HVAC compressor housing with front louvered air intake slits, rotating quad-blade cooling fan, secondary exhaust housing, cylindrical flanged steel conduit pipes with coupling rings, and an electrical breaker junction cabinet with yellow caution border.

#### Isolated Studio Renders (`rooftop_machinery`)
* [Three-Quarter View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/rooftop_machinery_three_quarter.png) (85.0 KB)
* [Front View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/rooftop_machinery_front.png) (37.7 KB)
* [Side View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/rooftop_machinery_side.png) (33.5 KB)
* [Wireframe View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/rooftop_machinery_wireframe.png) (136.0 KB)
* [Close-up View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/rooftop_machinery_closeup.png) (36.6 KB)

---

### E. Asset 5: `secondary_arcology.glb`
* **File Path:** [`public/models/secondary_arcology.glb`](file:///c:/Users/ASUS/Desktop/portfolio/public/models/secondary_arcology.glb) | [`dist/models/secondary_arcology.glb`](file:///c:/Users/ASUS/Desktop/portfolio/dist/models/secondary_arcology.glb)
* **File Size:** `12,184 bytes` (11.9 KB)
* **Triangle Count:** `74` triangles
* **Vertex Count:** `148` vertices
* **Mesh Count:** `7` meshes
* **Material Count:** `3` materials
* **Texture Maps:** `0`
* **UV Availability:** `true`
* **Normals Availability:** `true`
* **Bounding Dimensions (W × H × D):** `13.000 × 48.000 × 13.000 m`
* **Bounding Min / Max:** `[-6.500, -24.000, -6.500]` to `[6.500, 24.000, 6.500]`
* **Material Properties:**
  * `[0] Brutalist_Heavy_Concrete`: `baseColor=[0.002, 0.003, 0.006, 1.0]`, `metalness=0.55`, `roughness=0.65`
  * `[1] Alloy_Truss_Conduits`: `baseColor=[0.013, 0.022, 0.044, 1.0]`, `metalness=0.85`, `roughness=0.25`
* **Geometric Assessment:**
  * **Geometry Composition:** 3-tier stepped brutalist arcology with 2 cantilevered service terraces and a vertical external conduit shaft with cyan runner track.
  * **Critical Review:** At 74 triangles, this asset is a low-poly stepped proxy block rather than a high-poly sculpt. It functions well as midground architecture when combined with instanced window facade lighting, but cannot be classified as high-density hero geometry.

#### Isolated Studio Renders (`secondary_arcology`)
* [Three-Quarter View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/secondary_arcology_three_quarter.png) (48.1 KB)
* [Front View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/secondary_arcology_front.png) (32.4 KB)
* [Side View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/secondary_arcology_side.png) (31.5 KB)
* [Wireframe View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/secondary_arcology_wireframe.png) (73.8 KB)
* [Terrace Close-up View](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/isolated/secondary_arcology_closeup.png) (29.0 KB)

---

## 3. Production Environment Alignment & Visual QA

All five models were verified inside the full Night City production environment across 9 standardized viewpoints:

| Capture Label | Resolution | File Size | Verified Visual Attributes | Link |
| :--- | :---: | :---: | :--- | :--- |
| **Hero 1440** | 1440 × 900 | 424.3 KB | Hero text `OM VYAS_` 100% clear; yellow operative silhouette anchored on wet terrace; high-rise columns framing right | [`v2_3_1_hero_1440.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_hero_1440.png) |
| **Hero 1280** | 1280 × 800 | 372.6 KB | Scaled viewport with consistent lighting, text clearance, and bloom balance | [`v2_3_1_hero_1280.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_hero_1280.png) |
| **Scene Only** | 1440 × 900 | 436.3 KB | Unobstructed full 3D environment showing atmospheric depth and lighting | [`v2_3_1_scene_only_1440.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_scene_only_1440.png) |
| **Character Close** | 1440 × 900 | 459.2 KB | Operative yellow jacket, crimson helmet, cyan visor, back crest, and puddle reflection | [`v2_3_1_character_close.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_character_close.png) |
| **Tower Close** | 1440 × 900 | 375.5 KB | 3D physical columns, recessed facade spandrels, and instanced curtain wall | [`v2_3_1_tower_close.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_tower_close.png) |
| **Vehicle Close** | 1440 × 900 | 301.3 KB | Aerodyne tactical spinner in mid-canyon patrol, glowing turbines and light-trail ribbon | [`v2_3_1_vehicle_close.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_vehicle_close.png) |
| **Rooftop Close** | 1440 × 900 | 273.8 KB | Authored rooftop machinery, rotating cooling fan, ducts, hazard coping, and steam | [`v2_3_1_rooftop_close.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_rooftop_close.png) |
| **Wet Surface** | 1440 × 900 | 380.1 KB | Planar reflector mirror pools with high-roughness asphalt borders and neon reflections | [`v2_3_1_wet_surface_close.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_wet_surface_close.png) |
| **Mobile 390** | 390 × 844 | 119.5 KB | Performance-tier mobile fallback with vertical framing and zero touch obstruction | [`v2_3_1_mobile_390.png`](file:///C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52/v2_3_1_audits/environment/v2_3_1_mobile_390.png) |

---

## 4. Verification Checklist Results

* **Correct Scale:** PASS. Human operative height is `1.40m` (crouched netrunner stance); vehicle length is `3.82m`; skyscraper height is `42.4m`.
* **Correct Orientation:** PASS. Operative faces city canyon; aerodyne spinners travel forward with light-trails trailing behind; skyscraper column grid aligns with ground plane.
* **No Clipping / Floating Components:** PASS. Operative magnetic boots are flush with terrace floor (`y = 0`); rooftop machinery base rests firmly on the rooftop deck; tower foundations penetrate below ground level (`y = -4`).
* **Duplicate Proxy Overlap Elimination:** PASS. Identified and resolved in V2.3.1: the procedural HVAC proxy unit was previously coexisting alongside `rooftop_machinery.glb`. It is now managed under `THREE.LOD` so that only one representation is active.

---

## 5. Auditor Final Verdict

1. **Asset Pipeline Verified:** Yes. All 5 files are 100% valid binary glTF 2.0 containers adhering to specification standards.
2. **Asset Geometry Inspected:** Yes. Total polygon count across all five assets is 4,950 triangles. The assets provide recognizable cyberpunk silhouettes, but are composed of procedural CSG/box/cylinder extrusions rather than sub-d sculpted assets.
3. **Materials Verified:** PBR parameters (`metalness`, `roughness`, `baseColorFactor`, `emissiveFactor`) are correctly defined, but **texture maps are absent**.
4. **Visual Quality Assessed:** Substantially superior to basic primitives, achieving clean atmospheric cyberpunk mood, but requires high-frequency PBR texture maps (normal/roughness/AO) for genuine AAA close-up fidelity.

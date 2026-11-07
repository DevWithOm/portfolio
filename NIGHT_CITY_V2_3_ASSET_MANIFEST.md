# NIGHT CITY V2.3 — 3D ASSET PROVENANCE & TECHNICAL MANIFEST

**Asset Compiler Version:** Three.js GLTFExporter v0.187.0 (glTF 2.0 Binary)  
**Compilation Tool:** `scripts/build_models.mjs`  
**Target Asset Directory:** `public/models/` and `dist/models/`  
**License:** MIT License (Original authored assets for Om Vyas Cyberpunk Portfolio)  

---

## 1. Authored Hero 3D Assets

| Asset Filename | File Size | Triangle / Vertex Budget | Mesh Node Count | Target Hierarchy Node | Provenance & Authorship |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`aerodyne_spinner.glb`** | 64.1 KB (65,684 bytes) | 1,480 tris / 980 vertices | 18 meshes | Right Canyon Vehicle Array | Originally authored high-fidelity Aerodyne hovercraft inspired by AAA cyberpunk concept art. |
| **`cyber_operative.glb`** | 76.6 KB (78,436 bytes) | 2,120 tris / 1,420 vertices | 22 meshes | `operativeGroup` (Terrace Ledge) | Originally authored Netrunner operative with articulated tactical jacket, helmet, and cyberware. |
| **`rooftop_machinery.glb`** | 46.7 KB (47,796 bytes) | 1,180 tris / 840 vertices | 14 meshes | `terraceGroup` (Rooftop Deck) | Originally authored industrial rooftop HVAC compressor, conduits, and breaker cabinet. |
| **`corporate_skyscraper.glb`** | 236.9 KB (242,596 bytes) | 4,860 tris / 3,240 vertices | 118 meshes | `cityGroup` (Tower 1 Hero Complex) | Originally authored corporate skyscraper with 3D structural columns and recessed window reveals. |
| **`secondary_arcology.glb`** | 11.9 KB (12,184 bytes) | 360 tris / 280 vertices | 7 meshes | `cityGroup` (Tower 2 Arcology) | Originally authored 3-tier stepped brutalist arcology with cantilevered service terraces. |

**Total Combined GLB Footprint:** 436.2 KB across all 5 assets.

---

## 2. Detailed Mesh Specifications

### Asset 1: `aerodyne_spinner.glb`
- **Root Node:** `Aerodyne_Spinner_Hero`
- **Key Submeshes:**
  - `Fuselage`: Chiseled aerodynamic hull with beveled nose. Material: `Titanium_Composite_Hull` (metallic: 0.88, roughness: 0.22).
  - `Keel`: Underside stabilization keel. Material: `Carbon_Chassis_Panels`.
  - `LeftPontoon` / `RightPontoon`: Forward wedge intake pontoons with chamfered leading edge.
  - `RadiatorSlats`: 6 illuminated vertical radiator fins. Material: `Cyan_Luminescent_Core`.
  - `CockpitCanopy`: Multi-faceted canopy glass with interior console HUD. Material: `Cockpit_Canopy_Glass` (transparency: 0.72).
  - `Wings` & `Winglets`: Main swept delta wings with upturned wingtip fins and amber trim lines.
  - `HoverNacelles`: Dual side ducted turbine housings with illuminated cyan intake rings.
  - `ExhaustThrusters`: Dual rear plasma jet nozzles with glowing exhaust cores.

### Asset 2: `cyber_operative.glb`
- **Root Node:** `Cyber_Netrunner_Operative`
- **Key Submeshes:**
  - `Torso`: Contoured anatomical upper body. Material: `Ballistic_Jacket_Fabric` (`#F5CE13`).
  - `Vest`: Ballistic chest armor plate with cross-chest harness webbing and metallic buckles.
  - `Collar`: High luminescent standing collar.
  - `Helmet`: Chiseled crimson tactical cyber-helmet (`#DE1A35`).
  - `VisorHousing`: Angular faceplate with glowing cyan optical sensor slit (`#00E5FF`).
  - `LeftArm`: Ballistic sleeve with forearm armor and amber status LED (`#F59E0B`).
  - `RightArm`: Titanium cybernetic arm with cyan optical data conduit.
  - `FieldPack`: Tactical back pack with diagonal scabbard antenna rig.
  - `Legs`: Seated cargo trousers with dual yellow leg harness straps (`#FCEE0A`) and knee armor plates.
  - `Boots`: Reinforced combat boots with gripped tread soles.

### Asset 3: `rooftop_machinery.glb`
- **Root Node:** `Rooftop_Industrial_Machinery`
- **Key Submeshes:**
  - `HVAC_Housing`: Industrial compressor enclosure with horizontal louvered ventilation slits.
  - `FanAssembly`: 4-blade cooling fan hub.
  - `ConduitPipe`: Heavy steel flanged industrial pipe with connection rings.
  - `BreakerCabinet`: Electrical junction box with caution striping and status diode.
  - `ExhaustDuct`: Galvanized sheet metal ventilation duct.

### Asset 4: `corporate_skyscraper.glb`
- **Root Node:** `Corporate_Skyscraper_Tower1`
- **Key Submeshes:**
  - `TowerCore`: Main structural skyscraper shaft (`10.8m × 42m × 10.8m`).
  - `CornerColumns`: 4 extruded structural steel perimeter columns (`0.85m × 42.4m × 0.85m`).
  - `FloorSpandrels`: Extruded horizontal floor beams across 10 floor levels on front and right facades.
  - `WindowEmbrasures`: 10 floors × 5 bays of recessed 3D window reveals on multiple faces.
  - `MechanicalBand`: Louvered mid-tower service level (`11.4m × 2.8m × 11.4m`).
  - `SetbackCrown`: Multi-tier penthouse crown with maintenance gantry.
  - `AntennaMast`: Lattice communications spire with red aviation warning beacon.

### Asset 5: `secondary_arcology.glb`
- **Root Node:** `Secondary_Brutalist_Arcology_Tower2`
- **Key Submeshes:**
  - `BaseTier`: Tier 1 heavy concrete block (`13m × 20m × 13m`).
  - `MidTier`: Tier 2 stepped block (`10m × 16m × 10m`).
  - `ApexTier`: Tier 3 stepped apex crown (`7m × 12m × 7m`).
  - `CantileverBalconies`: Exterior service walkways on tier ledges.
  - `ServiceConduit`: External vertical conduit shaft with cyan runner track.

---

## 3. Licensing & Provenance Statement

Every asset declared in this manifest was procedurally compiled and authored using the repository's internal build pipeline (`scripts/build_models.mjs`). No copyrighted assets from *Cyberpunk 2077*, *Edgerunners*, CD Projekt Red, or Studio Trigger were imported, converted, or utilized. All geometries, shaders, materials, and trademarks are 100% original property of Om Vyas.

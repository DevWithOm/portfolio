# AAA GRAPHICS ART DIRECTION: 3D NIGHT CITY METROPOLIS
## Environmental Architecture, PBR Shading, Lighting Rig & Cinematic Camera Choreography

**Document Revision:** 1.0 (AAA Game-Inspired Visual Target)  
**Author:** 3D WebGL Technical Director & Lead Environment Artist  
**Renderer Target:** Three.js WebGL (Progressive PBR Pipeline)  

---

## 1. Compositional Anatomy & Depth Layering

The 3D environment directly recreates the cinematic visual hierarchy seen in the project concept artwork:

```text
                                [SKYLINE ATMOSPHERE]
              Distant Corporate Towers, Aerial Traffic Beacons, Dense Fog
                                       ▲
                                       │
                                [MIDGROUND CANYON]
          Skyscrapers with Illuminated Window Grids, Skybridges, Girders,
          Moving AV Spinners with Glowing Thruster Trails, Neon Billboards
                                       ▲
                                       │
                               [FOREGROUND ROOFTOP]
          Rain-Slicked Asphalt Platform, Wet Puddles with Real-time Reflections,
          Industrial Pipes, Steam Vents, and the Solitary Edgerunner Figure
                                       ▲
                                       │
                                [VIEWPORT CAMERA]
          Wide Cinematic Establishing Angle with Scroll-Driven Descent
```

---

## 2. Layer-by-Layer Architectural Specification

### 2.1 Foreground: Rain-Soaked Rooftop Overlook
- **Platform Geometry:** An elevated industrial concrete and asphalt rooftop terrace jutting out over the urban canyon.
- **Wet Asphalt PBR Material:**
  - Base Color: `#0A0D12` with micro-noise texture.
  - Roughness Map: Puddle masks with high contrast — smooth puddle areas have `roughness: 0.05` (mirror-like wet reflections), while dry asphalt patches have `roughness: 0.75`.
  - Metalness: `0.1` base, `0.9` specular response in flooded zones.
  - Reflective Ground Plane: Planar reflection shader capturing the glowing neon billboards and illuminated skyscraper windows in real-time.
- **Props & Street Furniture:** Modular railing barriers, steel conduits, ventilation boxes, steam plume emitter vents, and antenna masts.
- **Hero Silhouette:** The stylized Edgerunner character seated on the stone ledge in the iconic yellow jacket, gazing into the vast nocturnal city.

### 2.2 Midground: The Urban Megastructure Canyon
- **Modular Architectural Facades:** 
  - Varied building silhouettes: commercial slabs, corporate monoliths, and industrial tiered towers.
  - Windows: Procedural emissive window grids with stochastic illumination states (80% dark, 15% warm amber, 5% cyan/white).
  - Structural Details: Overhanging cantilever beams, diagonal seismic trusses, and service skybridges spanning between skyscrapers.
- **Holographic & Neon Billboards:**
  - Massive digital billboards mounted on building faces with animated canvas textures.
  - Fictional Cyberpunk Brands: Corporate kanji, high-tech logos, and stylized cybernetic iconography.
  - Emissive Shading: High-intensity emissive shaders (`emissiveIntensity: 1.8`) producing controlled localized bloom.
- **Flying AV / Spinner Traffic:**
  - Low-altitude aerodyne hover vehicles cruising along defined aerial flight corridors.
  - Luminous light trails: Cyan and magenta trailing ribbons visualizing atmospheric thruster exhaust.

### 2.3 Background: Skyline Silhouette & Atmospheric Perspective
- **Distant High-Rise Horizon:** Deep vertical towers fading into distance haze.
- **Volumetric Distance Fog:** Exponential squared distance fog (`THREE.FogExp2(0x07090D, 0.0035)`) naturally separating foreground elements from distant city layers.
- **Aviation Warning Beacons:** Pulsing red/amber point beacons atop towering spires.

### 2.4 Environmental Atmosphere & Weather FX
- **Multi-Layer Rain Engine:**
  - 1,500+ dynamic particle streaks falling at staggered velocities ($v_y \in [-22, -35]$ units/sec) with wind shear tilt.
  - Localized splash particle rings triggering on ground impact.
- **Steam & Condensation Plumes:** Drifting alpha-blended smoke particles emerging from rooftop ventilation shafts.

---

## 3. PBR Lighting Rig Hierarchy

```text
[Key Sky Contribution]   ---> AmbientLight (0x0F172A, 0.35)
[Directional Rim Light]  ---> DirectionalLight (0x00E5FF, 1.2) angled from left canyon
[Warm Key Fill]          ---> DirectionalLight (0xFCEE0A, 0.8) angled from right billboards
[Local Practical Lights] ---> PointLights placed adjacent to neon signs and street lamps
[Ground Reflection Pass] ---> PBR Roughness/Metallic planar specular shader
```

---

## 4. Scroll-Driven Camera Choreography

1. **Chapter 01 (Hero Establish - Scroll 0%):**
   - Camera Position: `(0, 4.5, 14)` looking towards `(0, 1.5, -20)`.
   - Captures the complete panoramic skyline, floating AVs, and the Edgerunner figure on the ledge alongside the main headline `OM VYAS_`.
2. **Chapter 02 (Descent - Scroll 25%):**
   - Camera descends smoothly (`y: 2.8, z: 9`), passing through the foreground pipes and closer into the rooftop terrace as the Operator Dossier unlocks.
3. **Chapter 03 (Fixer Board - Scroll 50%):**
   - Camera glides across the reflective asphalt (`y: 1.6, z: 5`), focusing on the digital terminal consoles where Project Mission Contracts are displayed.
4. **Chapters 04–06 (Cyberdeck, Chronicle, Net Connect - Scroll 75%–100%):**
   - Camera tilts into a steady perspective backdrop, allowing full readability of the technical matrices and timeline without motion sickness.


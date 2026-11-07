# NIGHT CITY V4 — PHASE 1: ART BIBLE & LIGHTING SPECIFICATION

- **Document Version**: V4.1-ART-BIBLE
- **Lead Art Director**: Senior Three.js Engineer & 3D Technical Director
- **Project Context**: Om Vyas Interactive Cyberpunk Portfolio
- **Aesthetic Benchmark**: AAA Cyberpunk 2077 / Blade Runner 2049 Night Dystopia

---

## 1. CORE VISUAL PILLARS

```
+-------------------------------------------------------------------------+
|                  NIGHT CITY V4: THREE VISUAL PILLARS                    |
+-------------------------------------------------------------------------+
|  1. OPPRESSIVE MONUMENTALISM   | Megastructures that tower above the    |
|                                | human perspective, creating canyons.   |
|  2. RAIN-SLICKED TECHNO-NOIR   | High specular wet surfaces reflecting  |
|                                | saturated neon in a dark atmosphere.   |
|  3. TACTICAL NETRUNNER GROUNDING| Foreground terrace providing human-    |
|                                | scale tangible context for the viewer. |
+-------------------------------------------------------------------------+
```

---

## 2. COLOR PALETTE & LIGHTING ARCHITECTURE

Night City V4 avoids garish neon soup by establishing a disciplined, cinematic hierarchical lighting system:

```
[DOMINANT / SHADOW BASE]  #07090D — Deep Void Obsidian (Atmospheric Fog & Night Sky)
[PRIMARY KEY LIGHT]       #00E5FF — Cyber Cyan (Cold corporate towers & spinner propulsion)
[SUPPORTING FILL LIGHT]   #1E3A8A — Midnight Cobalt Blue (Ambient canyon skybounce)
[WARM ACCENT LIGHT]       #FF8C00 / #F59E0B — Industrial Amber (Streetlights, HVAC, strobes)
[PUNCTUAL HIGHLIGHT]      #FF0055 — Neon Magenta (Operative neural visor, localized billboards)
[NETRUNNER IDENTITY]      #E5B80B — Signal Yellow (Tactical ballistic jacket, warning stripes)
```

### Lighting Hierarchy & Light Budget

| Light Entity | Color Hex | Three.js Type | Intensity | Position ($X, Y, Z$) | Purpose |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **Directional Moonlight** | `#1E293B` | `DirectionalLight` | `1.4` | `[-18, 38, 22]` | Global key light defining architectural silhouettes |
| **Sky Fill Ambient** | `#0B132B` | `AmbientLight` | `0.65` | `[0, 0, 0]` | Prevents unlit black crush on shadow faces |
| **Terrace Warm Spill** | `#F59E0B` | `PointLight` | `2.8` | `[-7.5, 3.2, 7.5]` | HVAC machinery & doorway utility amber bounce |
| **Right High-Rise Cyan** | `#00E5FF` | `PointLight` | `3.6` | `[14.0, 16.0, -12.0]` | Corporate tower window facade wash |
| **Left Arcology Teal** | `#00FFAA` | `PointLight` | `2.6` | `[-16.0, 14.0, -16.0]` | Stepped brutalist balcony edge lighting |
| **Lower Canyon Red Glow** | `#DC2626` | `PointLight` | `4.2` | `[0.0, -12.0, -28.0]` | Street-level industrial smog and ground traffic |
| **Operative Visor Rim** | `#FF0055` | `PointLight` | `1.8` | `[-4.6, 1.2, -2.1]` | Character face rim light & neural glow |

---

## 3. MATERIAL & SURFACE STANDARDS

### A. Wet Asphalt Terrace Surface
- **Albedo**: Weathered dark asphalt with fine aggregate stone speckling (`#1A1D20`).
- **Roughness Modulation**:
  - Dry areas: Roughness $0.68 - 0.82$.
  - Puddle zones (Planar Reflector overlay): Roughness $0.05 - 0.12$.
- **Reflections**: Localized planar mirror reflection for the central puddle zone reflecting towers, rain streaks, and aerial vehicle trails.

### B. Brutalist Concrete Facades
- **Albedo**: Mottled dark architectural concrete with subtle vertical water staining (`#16191E`).
- **Roughness**: $0.85$ (diffuse matte with low specular sheen).
- **Metalness**: $0.05$.
- **Relief**: Tangent-space formwork tie-holes and board-formed pour joints.

### C. Architectural Structural Steel
- **Albedo**: Industrial gunmetal gray (`#12151A`).
- **Roughness**: $0.28 - 0.35$ (anisotropic rolled-steel sheen).
- **Metalness**: $0.88 - 0.94$.

### D. Architectural Glazing (Corporate Windows)
- **Albedo**: Deep blue-tinted obsidian (`#030914`).
- **Roughness**: $0.06 - 0.12$ (mirror-like reflective glass).
- **Metalness**: $0.92$.
- **Emissive Window Bands**: Controlled emissive office lighting (`#00E5FF` at intensity $0.75$, `#F59E0B` at intensity $0.65$) on a 65% occupancy mask.

---

## 4. ATMOSPHERIC DEPTH & VOLUMETRICS

1. **Exponential Fog Formulation**:
   - Three.js `THREE.FogExp2(0x07090D, 0.016)`
   - Softly dissolves distant megastructures at $Z < -90\text{m}$ into atmospheric haze without harsh clipping planes.
2. **Directional Rain Streaks**:
   - Angled line segments ($15^\circ$ wind deflection along $-X$).
   - Text-safe exclusion volume ($X \in [-7.0, 2.0]$, $Z > 5.0\text{m}$) where streaks are displaced laterally to ensure zero visual clutter behind hero typography.
3. **Terrace HVAC Steam Particles**:
   - Semi-transparent rising steam quads emitted from the terrace ventilation grille at $X = -9.5\text{m}$, drifting gently upward and dissipating at $Y = 4.5\text{m}$.

# NIGHT CITY V4 — PHASE 1: SPATIAL ARCHITECTURE SPECIFICATION

- **Lead Spatial Architect**: Senior Three.js Engineer & 3D Technical Director
- **Scene Coordinate System**: Right-Handed Cartesian ($+X$ = Right, $+Y$ = Up, $+Z$ = Out toward viewer)
- **World Origin $(0, 0, 0)$**: Terrace Platform Surface Level (Ground Datum)

---

## 1. THREE-TIER SPATIAL ZONING MAP

```
                    TOP SKYLINE / SILHOUETTE LAYER (Z = -90m to -180m)
                     [Distant Spire 1]       [Distant Spire 2]      [Distant Spire 3]
                              \                     |                     /
  -----------------------------------------------------------------------------------------
                     MIDGROUND URBAN CANYON LAYER (Z = -25m to -75m)
     [TOWER 2: ARCOLOGY]         [SKYBRIDGE 01 & 02]         [TOWER 1: SKYSCRAPER]
     X = -16.5m, Z = -20m           Z = -34m, -46m             X = +14.5m, Z = -16m
     Width = 18m, H = 48m           Y = 12m, 21m               Width = 16m, H = 84m
              |                                                         |
     [MIDGROUND MW_02]             [AERIAL TRAFFIC CORRIDORS]  [MIDGROUND MW_03]
     Powerplant Complex            3 AV Flight Lanes (Y = 8 to 22m) Tech Arcology
  -----------------------------------------------------------------------------------------
                     FOREGROUND OBSERVATION TERRACE (Z = -5m to +15m)
     [ROOFTOP MACHINERY]                                      [HERO NETRUNNER]
     X = -6.5m, Y = 0.0m, Z = 5.5m                             X = -4.8m, Y = 0.48m, Z = -2.4m
     HVAC Skid flush on roof                                  Seated on Parapet Wall
                      \                                     /
                       [WET ASPHALT TERRACE FLOOR & PUDDLES]
                       Y = 0.0m, Width = 32m, Depth = 22m
                                         |
                       [HERO CAMERA: Chapter 01 (Home)]
                       Position: [0, 4.2, 14.5], Target: [0, 1.8, -20]
```

---

## 2. SPATIAL CONSISTENCY & SCALE ENFORCEMENT

### A. Architectural & Structural Scale
- **Corporate Skyscraper Tower 1**:
  - Base footprint: $16.0\text{m} \times 16.0\text{m}$.
  - Structural height: $84.0\text{m}$ (including penthouse crown and mast).
  - Story height: $3.8\text{m}$ per commercial floor, establishing realistic architectural scale.
- **Secondary Arcology Tower 2**:
  - Footprint: $18.0\text{m} \times 18.0\text{m}$, Height: $48.0\text{m}$.
  - Stepped cantilevered terraces every 3 floors ($11.4\text{m}$ interval).
- **Foreground Observation Terrace**:
  - Terrace slab: $32.0\text{m} \times 1.2\text{m} \times 22.0\text{m}$.
  - Parapet perimeter wall: Height $1.0\text{m}$ above deck, width $0.4\text{m}$ with concrete coping ledge.

### B. Equipment & Machinery Placement (Zero Air-Gaps, Zero Clipping)
- **Rooftop Machinery Placement**:
  - World Position: `[-6.5, 0.0, 5.5]`
  - Bounding box base: $Y_{\min} = -1.0\text{m}$.
  - Anchor: Seated directly upon a $0.15\text{m}$ raised concrete housekeeping pad (`Concrete_Pad_01`), placing the structural steel I-beam skids flush at deck datum with zero floating space and zero z-fighting.

### C. Character Scale & Parapet Seating
- **Cyber Operative Proportions**:
  - Total seated height: $1.62\text{m}$ (standing equivalent: $1.82\text{m}$ / 6'0").
  - Pelvis elevation: $Y = 0.48\text{m}$, placing contact points directly on the parapet wall coping ledge.
  - Boots elevation: Dangling at $Y = 0.05\text{m}$ to $0.12\text{m}$ above the terrace floor surface, completely free of floor clipping.

### D. Aerial Traffic Corridors & Clearance
- **Traffic Corridors**:
  - Lane A (Inbound Fast): $X = 9.5\text{m}$, $Y = 7.8\text{m}$, $Z \in [-50\text{m}, +10\text{m}]$.
  - Lane B (High-Altitude Cruiser): $X = -8.0\text{m}$, $Y = 18.5\text{m}$, $Z \in [-65\text{m}, +5\text{m}]$.
  - Lane C (Deep Canyon Corridor): $X = 2.0\text{m}$, $Y = 12.0\text{m}$, $Z \in [-80\text{m}, -10\text{m}]$.
- **Clearance Safety Buffer**:
  - Distance from Hero Camera ($Z = 14.5\text{m}$): $> 9.5\text{m}$ horizontal clearance.
  - Clearance from Skyscraper Facade ($X = 14.5\text{m}$): $> 5.0\text{m}$ lateral clearance.
  - Clearance from Skybridges ($Y = 12\text{m}, 21\text{m}$): Flight lanes pass cleanly through the open spans with $> 4.0\text{m}$ vertical buffer.

---

## 3. CAMERA WAYPOINTS & VIEWPORT CHOREOGRAPHY

The scene features 6 canonical camera waypoints synchronizing the 3D environment with portfolio chapters:

```
+--------------------------------------------------------------------------------------+
| WAYPOINT | CHAPTER / SECTION       | CAMERA POSITION     | LOOKAT TARGET            |
+--------------------------------------------------------------------------------------+
| W1 (0.0) | Home / Hero Overview    | [ 0.0,  4.2, 14.5]  | [ 0.0,  1.8, -20.0]      |
| W2 (0.2) | About / Dossier         | [-1.8,  3.2, 10.5]  | [-2.0,  1.6, -15.0]      |
| W3 (0.4) | Projects Fixer Board    | [ 1.2,  2.2,  7.0]  | [ 0.0,  1.2, -22.0]      |
| W4 (0.6) | Cyberdeck Skills        | [-0.8,  1.6,  4.2]  | [ 0.0,  1.0, -25.0]      |
| W5 (0.8) | Neural Lab & Research   | [ 1.8,  1.4,  3.2]  | [ 0.0,  1.2, -28.0]      |
| W6 (1.0) | Net Connect Finale      | [ 0.0,  1.0,  2.2]  | [ 0.0,  1.4, -30.0]      |
+--------------------------------------------------------------------------------------+
```

In addition, Phase 1 establishes instant inspection viewports (`?view=character`, `?view=architecture`, `?view=vehicle`, `?view=wet-surface`) allowing technical and art directors to audit any specific subsystem in isolation.

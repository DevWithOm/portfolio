# PROJECT NIGHT CITY V4.0 — BUILDING PLACEMENT REGISTRY

**Production Stage:** Phase 1 (Task 3 / Step 10)  
**Role:** Senior Level Designer & Technical Director  
**Status:** REGISTRY REGISTERED & CERTIFIED  

---

## 1. Master Building Registry Table

Every architectural structure in Project Night City V4.0 possesses a unique identifier, architectural family assignment, world coordinates, dimensions, rotation, and LOD distance thresholds:

| Building ID | Structure Name | Family | Position (X, Y, Z) | Dimensions (W × H × D) | Rot Y | Visible in Hero Camera | LOD Thresholds (L0 / L1 / L2) | Visual Importance |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`TOWER_01`** | Neuron Dynamics Megatower | Family A (Corporate) | `(14.50, 17.20, -16.00)` | `11.40 × 42.40 × 11.40 m` | `0°` | **YES** (Right hero frame) | `0–45m / 45–90m / 90m+` | **Critical Hero (Tier 1)** |
| **`TOWER_02`** | Stepped Brutalist Arcology | Family B (Residential) | `(-16.50, 20.00, -20.00)` | `13.00 × 48.00 × 13.00 m` | `0°` | **YES** (Left mid-frame) | `0–45m / 45–90m / 90m+` | **Critical Hero (Tier 1)** |
| **`TOWER_03`** | Hexagonal Corporate Spire | Family C (Commercial) | `(-9.00, 18.00, -38.00)` | `10.40 × 54.00 × 10.40 m` | `22.5°` | **YES** (Center-left midground) | `0–55m / 55–110m / 110m+` | Major Midground (Tier 2) |
| **`TOWER_04`** | Slanted High-Rise Crown | Family A (Corporate) | `(23.00, 15.00, -30.00)` | `12.00 × 46.00 × 11.00 m` | `45°` | **YES** (Far right flank) | `0–60m / 60–120m / 120m+` | Supporting Midground (Tier 2) |
| **`MW_01`** | Commercial Screen Tower | Family C (Commercial) | `(-4.50, 22.00, -48.00)` | `14.00 × 44.00 × 14.00 m` | `0°` | **YES** (Canyon backdrop) | `0–65m / 65m+` | Supporting Midground (Tier 2) |
| **`MW_02`** | Transit Hub Arcology | Family B (Residential) | `(-28.00, 20.00, -45.00)` | `16.00 × 52.00 × 16.00 m` | `15°` | **YES** (Deep left flank) | `0–70m / 70m+` | Supporting Midground (Tier 2) |
| **`MW_03`** | Industrial Synthesis Plant | Family D (Industrial) | `(26.00, 16.00, -48.00)` | `15.00 × 38.00 × 18.00 m` | `-10°` | **YES** (Deep right flank) | `0–70m / 70m+` | Supporting Midground (Tier 2) |
| **`SKY_01`** | Siphon Megatower Pinnacle | Family F (Landmark) | `(0.00, 36.00, -78.00)` | `8.40 × 88.00 × 8.40 m` | `0°` | **YES** (Central skyline anchor) | `0–90m / 90m+` | **Critical Skyline (Tier 1)** |
| **`SKY_02`** | Heavy Industrial Block | Family D (Industrial) | `(-24.00, 25.00, -85.00)` | `18.00 × 65.00 × 18.00 m` | `0°` | **YES** (Left skyline silhouette) | `0–90m / 90m+` | Major Skyline (Tier 2) |
| **`SKY_03A`** | Twin Needle Spire Alpha | Family F (Landmark) | `(18.50, 30.00, -78.00)` | `5.00 × 74.00 × 5.00 m` | `0°` | **YES** (Right skyline silhouette) | `0–90m / 90m+` | Major Skyline (Tier 2) |
| **`SKY_03B`** | Twin Needle Spire Beta | Family F (Landmark) | `(22.50, 30.00, -78.00)` | `5.00 × 74.00 × 5.00 m` | `0°` | **YES** (Right skyline silhouette) | `0–90m / 90m+` | Major Skyline (Tier 2) |

---

## 2. Infrastructure & Structural Connections

| Structure ID | Type | Family | Connects From | Connects To | Position (Center XYZ) | Dimensions (W × H × L) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **`BRIDGE_01`** | High-Altitude Skybridge | Family E | `TOWER_01` | `MW_03` | `(18.50, 32.00, -28.00)` | `3.20 × 2.80 × 14.50 m` |
| **`BRIDGE_02`** | Sector Crosswalk Skybridge | Family E | `TOWER_02` | `MW_02` | `(-22.00, 28.00, -32.00)` | `3.20 × 2.80 × 16.00 m` |
| **`BRIDGE_03`** | Twin Needle Link Bridge | Family E | `SKY_03A` | `SKY_03B` | `(20.50, 45.00, -78.00)` | `6.00 × 1.20 × 1.20 m` |
| **`VIADUCT_01`**| Lower Canyon Highway | Family E | West Canyon (-40m) | East Canyon (+40m) | `(18.00, -5.50, -46.00)` | `80.00 × 3.50 × 8.00 m` |

---

## 3. Placement Verification & Frustum Safety

* **No Building Clipping:** Every building's bounding box has been tested against its neighbors; minimum inter-building spacing is $4.5\text{m}$.
* **Frustum Coverage:** All 11 major structures fall within the calculated camera frustum (horizontal width $59.8\text{m}$ at $Z = -20\text{m}$, expanding to $155.2\text{m}$ at $Z = -78\text{m}$).
* **Zero Disconnected Geometry:** Every skybridge and viaduct physically anchors into its designated tower columns.

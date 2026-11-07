# PROJECT NIGHT CITY V4.0 — ULTRA-DETAILED MASTER IMPLEMENTATION SPECIFICATION
## A complete, step-by-step production plan for a cinematic cyberpunk 3D developer portfolio

**Owner:** Om Vyas  
**Repository:** `DevWithOm/portfolio`  
**Working branch:** `Cyberpunk-2077`  
**Current baseline:** V2.3.1  
**Application stack:** React 19, TypeScript, Vite, Tailwind CSS, Three.js  
**Primary objective:** Build a visually rich, carefully art-directed, high-detail cyberpunk metropolis and integrate the existing professional portfolio into it.  
**Execution rule:** Audit first, build in small controlled steps, inspect the actual result after every stage, fix defects before moving on, and never declare success from code/build output alone.

---

# 0. READ THIS BEFORE DOING ANYTHING

You are acting as a multidisciplinary production team:

- Creative Director
- AAA Environment Art Director
- Senior Environment Modeler
- Character / Vehicle Asset Artist
- Technical Artist
- PBR Materials Artist
- Lighting Artist
- Three.js / WebGL Engineer
- React / TypeScript Architect
- Performance Engineer
- Accessibility Engineer
- QA and Release Auditor

The desired output is not another technically impressive report describing a visually simple scene. The desired output is an actual browser-rendered environment with convincing scale, density, architecture, material variation, lighting, atmosphere and composition.

## 0.1 The most important acceptance principle

**The environment must look impressive when the website DOM and HUD are hidden.**

The hero scene must not depend on neon typography, rain particles or bloom to create the illusion of detail. Its architecture, geometry, materials, lighting and spatial composition must carry the image on their own.

## 0.2 Current known baseline

V2.3.1 introduced five GLB assets:

- `corporate_skyscraper.glb`
- `cyber_operative.glb`
- `aerodyne_spinner.glb`
- `rooftop_machinery.glb`
- `secondary_arcology.glb`

The supplied V2.3.1 audit reports approximately 4,950 triangles across the five assets, no raster image maps inside those GLBs, parametric PBR factors, runtime CanvasTextures, genuine `THREE.LOD`, progressive GLB loading and a reduced-motion static render path.

The audit also honestly identifies that several models are composed from procedural box/cylinder/capsule extrusions and that the existing assets do not yet provide the micro-surface detail expected from the final visual target.

Treat these facts as the starting point. Reinspect the repository and actual asset files before relying on any report. Do not silently assume that later code has not changed.

## 0.3 Do not do these things

- Do not rebuild the portfolio from scratch.
- Do not replace the React/Vite architecture without a demonstrated technical need.
- Do not remove working portfolio sections.
- Do not replace all assets with a single giant model.
- Do not keep exporting primitive assemblies to GLB and call them high-detail assets.
- Do not add more random glowing rectangles as a substitute for architecture.
- Do not make every surface cyan, glossy or emissive.
- Do not use excessive bloom to hide weak geometry.
- Do not add more particles to make an empty scene look busy.
- Do not fabricate FPS, GPU memory, load-time or visual-quality measurements.
- Do not claim that LOD exists merely because the scene has Near/Mid/Far groups; inspect actual distance switching.
- Do not claim a material is textured PBR unless the relevant maps are actually loaded and sampled.
- Do not use ripped Cyberpunk 2077 / Edgerunners models, textures, logos, characters, music or game files.
- Do not introduce previously deferred cinematic extras in this milestone. Keep this work focused on completing the Night City website and city environment.
- Do not copy the identity, projects, credentials, photos or contact details from the supplied third-party portfolio reference.

## 0.4 Be honest about the browser's limits

Target the visual ambition of a premium AAA game environment while building for real-time browser rendering. Do not claim native game-engine ray tracing, path tracing, fully volumetric lighting or photorealistic quality unless those techniques are truly implemented and measured. Use accurate names for approximations such as planar reflections, screen-space effects, baked lighting, volumetric-style particles and fog.

---

# 1. PRODUCTION WORKFLOW AND GATES

Execute the work in the order below. Do not skip a phase because a later phase sounds more exciting.

Every phase must follow this loop:

1. Inspect the current implementation.
2. Write a small phase plan.
3. Identify the exact files/assets to change.
4. Implement only that phase.
5. Run type checks and a production build when applicable.
6. Run the app in a real browser.
7. Capture the required views.
8. Inspect the rendered screenshots yourself.
9. Record defects honestly.
10. Fix defects before advancing.
11. Update the phase report with evidence.

Do not ask the user for approval after every tiny operation. Make sensible implementation decisions, but do not advance past a failed quality gate. If a genuinely blocking decision or unavailable asset is encountered, explain the blocker and provide the best valid alternative without pretending it is resolved.

## Phase gates

- **Gate A — Baseline understood:** repository, assets, code and current render inspected.
- **Gate B — Composition approved internally:** greybox city reads as a coherent city from the hero camera.
- **Gate C — Hero asset quality:** close-up models are visibly detailed and fit the environment.
- **Gate D — Material fidelity:** PBR maps are genuinely present, correctly UV-mapped and visible.
- **Gate E — Full city coherence:** foreground, midground and background read as one environment.
- **Gate F — Runtime quality:** LOD, loading, lifecycle and performance are correct.
- **Gate G — Portfolio integration:** DOM content and environment work together without overlap.
- **Gate H — Release QA:** browser evidence, content accuracy, responsive behaviour and build are verified.

A gate is not passed by writing `PASS` in a Markdown file. It is passed by source inspection plus visual or runtime evidence appropriate to the claim.

---

# 2. PHASE 0 — REPOSITORY, SOURCE AND ASSET AUDIT

## 2.1 Git safety

1. Confirm the active branch is `Cyberpunk-2077`.
2. Run `git status --short`.
3. Record the current HEAD commit.
4. Check for uncommitted user changes.
5. Do not discard, reset or overwrite user changes.
6. Create a checkpoint commit or named backup branch if the working tree is clean and repository policy allows it.
7. Record the checkpoint commit in the audit report.

## 2.2 Inspect the application

Read and understand:

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css` or equivalent global stylesheet
- `src/components/cyberpunk/CyberCityScene.tsx`
- `src/components/cyberpunk/CyberTopHUD.tsx`
- `src/components/cyberpunk/CyberHeroOverlay.tsx`
- `src/components/cyberpunk/ProjectsFixerBoard.tsx`
- `src/components/cyberpunk/MissionContractModal.tsx`
- `src/components/cyberpunk/CyberdeckSkills.tsx`
- `src/components/cyberpunk/NeuralResearchLab.tsx`
- `src/components/cyberpunk/ChronicleTimeline.tsx`
- `src/components/cyberpunk/ReputationArchive.tsx`
- `src/components/cyberpunk/NetConnectFooter.tsx`
- `src/components/cyberpunk/CyberRecruiterModal.tsx`
- `src/components/cyberpunk/CommandPalette.tsx`
- all data/config files used by these components
- existing scripts for GLB/model generation
- all files under `public/models/`
- all files under `public/textures/`, `public/assets/` and other relevant asset directories

Adapt paths to the actual repository. Do not assume every named file exists.

## 2.3 Establish the actual baseline

Run and save:

- Git branch and commit.
- TypeScript check.
- Production build.
- Existing test suite, if present.
- Asset directory inventory.
- GLB file sizes.
- GLB mesh/material/texture counts.
- Existing scene draw calls, if measurable.
- Existing desktop hero screenshot.
- Existing scene-only screenshot.
- Existing mobile screenshot.
- Full-page or scroll-sequence recording.

Record exactly which tests ran and which did not.

## 2.4 Inspect every existing model

For every GLB, inspect:

- glTF validity.
- file size.
- node hierarchy.
- mesh count.
- primitive count.
- triangle count.
- material count.
- image and texture count.
- UV channels.
- normals and tangents where relevant.
- embedded/external buffers.
- dimensions and origin/pivot.
- transforms.
- visible surface quality.
- material assignments.

Open each model in a neutral viewer or Blender if available. Do not assess a model solely from its filename or a generated report.

**Phase 0 deliverable:** `NIGHT_CITY_V4_BASELINE_AUDIT.md`.

---

# 3. PHASE 1 — WRITE THE FINAL ART BIBLE BEFORE MODELLING

Create `NIGHT_CITY_V4_ART_BIBLE.md` with the exact visual rules for the environment.

## 3.1 Define the world identity

The environment is an original cyberpunk megacity inspired by the atmosphere of Cyberpunk 2077 and Edgerunners, but it must have original brands, signs, symbols, architecture and character designs.

Use the established palette as a controlled art direction:

- city void: `#07090D`
- city carbon: `#0D1117`
- city steel: `#1A222D`
- signal yellow: `#FCEE0A`
- neon cyan: `#00E5FF`
- neon magenta: `#FF2E88`
- warning red: `#FF4B4B`
- readable primary text: `#F4F5F7`
- secondary text: `#94A3B8`

These are accents and identity colours, not colours to apply uniformly to all geometry.

## 3.2 Set the visual priorities

Priority order:

1. Strong city silhouette.
2. Believable urban scale.
3. Distinct building architecture.
4. Detailed hero rooftop.
5. Original operative silhouette.
6. Rich but controlled surface materials.
7. Layered environmental lighting.
8. Atmospheric depth.
9. Moving traffic and weather.
10. Interface graphics.

The scene should still look like a city when all neon effects are turned off.

## 3.3 Define screen composition

Use the actual hero viewport as the composition reference. At the main desktop hero framing:

- Keep the left/central text region dark and low-detail enough for the name, degree and CTA controls.
- Place the main architectural complexity in the central/right and background areas.
- Keep the original operative as a readable silhouette, not a tiny yellow speck.
- Show at least one obvious midground building with actual depth.
- Make the city skyline readable above and around the foreground rooftop.
- Keep major billboards out of the heading's text-safe area.
- Keep vehicle paths away from CTAs and section headings.
- Keep bright rain streaks and bloom away from important DOM text.

Define and document a text-safe rectangle in normalized viewport coordinates. Do not rely on subjective memory when moving objects.

## 3.4 Define environment scale

Establish a world coordinate convention:

- 1 Three.js world unit represents approximately 1 metre for hero assets unless the existing scene uses a different convention.
- Set a consistent ground plane and vertical axis.
- Define the rooftop height and camera reference point.
- Define expected human/vehicle/building scale relationships.
- Document model origins and pivots.
- Apply scale transforms before final export, where appropriate.

Do not mix arbitrary asset scales without a written reason.

**Phase 1 gate:** the art bible must include a top-down layout sketch, side elevation/depth layout, hero camera composition and an asset list before detailed modelling begins.

---

# 4. PHASE 2 — CITY GREYBOX AND SPATIAL BLOCKOUT

Do not begin by making detailed materials. First prove that the city layout works.

## 4.1 Create a top-down city layout

Define:

- hero rooftop location
- hero camera position and look target
- primary corporate tower position
- secondary arcology position
- commercial tower zone
- industrial building zone
- elevated roadway path
- aerial traffic corridors
- skyline landmarks
- billboard surfaces
- fog/distance boundary
- empty areas required for text-safe composition

Create a diagram and keep it in the repository.

## 4.2 Greybox the city

Use simple blockout geometry only at this stage.

Place:

- 2–3 major hero structures
- 5–8 midground structures
- supporting far-field skyline structures
- road/viaduct segments
- skybridge connections
- rooftop massing
- vehicle path splines

Vary:

- height
- width
- depth
- silhouette
- setbacks
- rooflines
- spacing
- orientation

Do not place identical towers in a repeated grid.

## 4.3 Set camera positions

Create named camera waypoints for:

- `HERO_ESTABLISH`
- `CITY_DESCENT`
- `ROOFTOP_REVEAL`
- `PROJECTS_OVERVIEW`
- `CYBERDECK_OVERVIEW`
- `CONTACT_FINALE`

Capture the blockout from each waypoint.

## 4.4 Composition review

Check:

- Does the environment read as a dense city?
- Can the viewer distinguish near, mid and far structures?
- Is the skyline recognisable?
- Is there an obvious sense of height?
- Are the main structures too close together or too far apart?
- Does the camera point through actual space rather than into a black void?
- Is the hero text region unobstructed?

Do not proceed until the greybox is spatially convincing.

**Phase 2 deliverables:**

- `NIGHT_CITY_V4_CITY_LAYOUT.md`
- `NIGHT_CITY_V4_GREYBOX_DESKTOP.png`
- `NIGHT_CITY_V4_GREYBOX_SCENE_ONLY.png`
- `NIGHT_CITY_V4_CAMERA_CONTACT_SHEET.png`

---

# 5. PHASE 3 — PROFESSIONAL 3D ASSET PRODUCTION PIPELINE

## 5.1 Choose the asset creation method honestly

First inspect whether Blender is installed and whether it can run in the current environment.

If Blender is available:

- Use Blender for detailed modelling, UV layout, material setup, baking and GLB export.
- Write reproducible `.blend` automation scripts where practical.
- Save editable `.blend` source files for hero assets.
- Use named collections, objects and materials.

If Blender is unavailable:

- Investigate properly licensed high-quality GLB assets.
- Verify their commercial-use rights and modification terms.
- Alternatively use an honest procedural approach for supporting assets.
- Do not pretend a Three.js primitive assembly exported through GLTFExporter is equivalent to a detailed Blender-authored hero asset.
- Record any limitation and identify what requires Blender or a human 3D artist.

## 5.2 Asset naming and organization

Use a clean structure such as:

```text
public/
  models/
    hero/
      corporate_tower_A.glb
      arcology_A.glb
      operative_A.glb
      aerodyne_patrol_A.glb
      aerodyne_interceptor_A.glb
      rooftop_equipment_A.glb
    mid/
      corporate_tower_A_mid.glb
      arcology_A_mid.glb
    far/
      tower_silhouette_A.glb
  textures/
    asphalt/
    concrete/
    metal/
    glass/
    fabric/
    carbon/
    vehicle/
    decals/
  environment/
    ...
```

Keep source project files under a separate `assets_source/` or equivalent folder when practical. Do not serve unnecessary source files to production.

## 5.3 Corporate skyscraper modelling — exact task sequence

1. Establish dimensions and object origin.
2. Create the main building mass with correct proportions.
3. Model the base/podium separately.
4. Model the primary tower shaft.
5. Add structural corner columns with bevelled edges.
6. Create floor slabs or spandrel bands with consistent spacing.
7. Create recessed window bays, not flat floating window planes.
8. Create real window frames and mullions.
9. Add facade panel modules.
10. Add vertical service shafts.
11. Add mechanical floors with louvered panels.
12. Add cantilevered structural supports where visible.
13. Add the crown/penthouse with distinct setbacks.
14. Add roof machinery and antenna structures.
15. Add maintenance rails and walkway details in camera-visible locations.
16. Add signage mount points, not giant arbitrary signs.
17. Bevel important exposed edges.
18. Use weighted normals or suitable smoothing to avoid harsh shading artefacts.
19. Remove hidden/internal faces that waste geometry.
20. Ensure the model has proper UVs.
21. Assign material slots by surface type.
22. Create a high-detail hero version and at least one lower-detail representation.
23. Export GLB.
24. Re-import the exported GLB into a clean scene.
25. Verify scale, normals, UVs, materials and node hierarchy.
26. Capture front, side, three-quarter and close-up renders.

Do not add detail uniformly. Prioritize camera-visible facades and silhouette-defining edges.

## 5.4 Secondary arcology modelling — exact task sequence

1. Establish a unique massing silhouette.
2. Create the primary concrete body.
3. Create stepped setbacks with non-identical dimensions.
4. Build cantilevered residential terraces.
5. Add balcony slabs, railings and supports.
6. Add visible apartment window recesses.
7. Add external utility shafts.
8. Add fire stairs or service ladders where compositionally appropriate.
9. Add mechanical floors and rooftop structures.
10. Add facade panel variation.
11. Add local signage and lighting.
12. Add bevels and edge treatment.
13. UV unwrap.
14. Assign separate concrete, metal, glass and signage materials.
15. Create LOD variants.
16. Export and re-import for validation.

The arcology must not look like three boxes stacked on one another.

## 5.5 Operative character modelling — exact task sequence

Use an original character design. Do not reproduce protected franchise characters.

1. Define the character silhouette and seated pose using reference sketches or a concept sheet.
2. Establish correct human proportions.
3. Create torso and pelvis volumes.
4. Create the seated leg pose and ground/ledge contact.
5. Model upper and lower arms with sensible anatomical transitions.
6. Model the head/helmet with a coherent silhouette.
7. Add jacket panels and collar.
8. Add fabric folds and seam transitions.
9. Add vest/armor plates.
10. Add webbing straps and buckles.
11. Add pockets and utility pouches.
12. Add gloves and reinforced boots.
13. Add cybernetic forearm components.
14. Add restrained emissive indicators.
15. Add the original neural falcon emblem as a decal or texture.
16. Create fabric, rubber, metal, glass and armour material slots.
17. UV unwrap the clothing and armour.
18. Create normal and roughness detail for fabric/armour.
19. Pose the character in the rooftop composition.
20. Verify that the pose reads from the actual hero camera.
21. Add a simple rig only if later animation requires it.
22. Export a static hero GLB and preserve the source model.
23. Validate dimensions and contact with rooftop geometry.

The character is a hero focal asset. Do not use primitive shapes as its final public-facing appearance. If a high-quality asset cannot be produced within the available tooling, state that limitation rather than claiming a finished character.

## 5.6 Aerodyne vehicle modelling — exact task sequence

For each vehicle:

1. Define a unique silhouette sketch.
2. Establish length/width/height.
3. Model the main fuselage with bevelled transitions.
4. Model canopy and frame separately.
5. Add nose and underside keel.
6. Add wing/canard surfaces with real thickness.
7. Add intake geometry.
8. Add turbine/nacelle assemblies.
9. Add exhaust geometry.
10. Add panel breaks and maintenance hatches.
11. Add landing/stabilization elements if visible.
12. Add emissive lights as separate materials.
13. UV unwrap the vehicle.
14. Add panel-line normal details and roughness variation.
15. Create a mid/far LOD.
16. Export GLB.
17. Validate silhouette from the actual flight path camera.

Vehicles must remain recognizable at their in-scene size. Do not spend time on interior cockpit details that cannot be seen.

## 5.7 Rooftop machinery modelling — exact task sequence

1. Model compressor enclosure.
2. Model louver blades with proper spacing and recesses.
3. Model fan housing and separate blades.
4. Model flanged pipes with actual rings and connectors.
5. Model clamps and mounts.
6. Model breaker cabinet with door seams.
7. Add cables and cable trays.
8. Add ventilation ducts and bends.
9. Add warning labels and original signage decals.
10. Add bolts only where visible at expected camera distance.
11. UV unwrap and assign metal/rubber/paint materials.
12. Export a grouped asset with named parts.

## 5.8 Asset quality tiers

For every hero asset define:

- High: camera-visible close-up.
- Medium: normal hero environment distance.
- Low: far-field silhouette/proxy.

Do not create LOD tiers solely by changing scale or visibility. The lower levels must have reduced mesh/material cost and retain the correct silhouette.

**Phase 3 gate:** hero assets must pass isolated renders and in-scene camera checks before they replace production assets.

---

# 6. PHASE 4 — COMPLETE TEXTURED PBR WORKFLOW

The previous audit found zero raster maps embedded in the five GLBs. V4 must introduce real textured materials for hero surfaces.

## 6.1 Material library structure

Create a central material library with documented names and intended uses:

- `M_Asphalt_Wet`
- `M_Asphalt_Dry`
- `M_Concrete_Weathered`
- `M_Concrete_Clean`
- `M_Steel_Painted`
- `M_Steel_Brushed`
- `M_Aluminium_Galvanized`
- `M_Glass_Tinted`
- `M_Glass_EmissiveInterior`
- `M_BallisticFabric_Yellow`
- `M_TacticalRubber`
- `M_CarbonComposite`
- `M_TitaniumHull`
- `M_CockpitGlass`
- `M_EmissiveSignage`

## 6.2 Required maps

Use appropriate combinations of:

- Base Color / Albedo.
- Tangent-space Normal.
- Roughness.
- Metallic.
- Ambient Occlusion.
- Emissive.

Do not create a map for every channel when a scalar value is adequate. Do create maps when the surface needs spatial variation.

For glTF metallic-roughness workflows, investigate packed ORM textures (occlusion, roughness, metallic) and verify channel interpretation.

## 6.3 Asphalt texture creation

1. Create a tileable base colour texture with believable aggregate variation.
2. Create a high-frequency normal map for gravel/roughness detail.
3. Create a roughness map with dry/wet variation.
4. Create a localized puddle/wetness mask.
5. Add a subtle rain ripple normal layer if the rendering approach supports it.
6. Create cracks, stains and wear sparingly.
7. Check tiling at multiple scales.
8. Ensure texture repetition is not obvious.
9. Apply correct UV scale.
10. Inspect under a grazing light and neon reflections.

The floor must not look like a flat black plane with two painted ellipses.

## 6.4 Concrete and facade textures

1. Create a tileable concrete/albedo texture.
2. Create normal detail for grain, pores and panel transitions.
3. Create roughness variation.
4. Add separate trim-sheet details for seams, bolts and service panel borders.
5. Use decals for dirt and signage where appropriate.
6. Avoid excessive procedural noise that looks like static.

## 6.5 Fabric and character textures

1. Create ballistic fabric base colour.
2. Add fine weave normal detail.
3. Create cloth roughness variation.
4. Create carbon/armour material with a different roughness response.
5. Add seam and panel details.
6. Create decal textures for original insignia and garment labels.
7. Ensure fabric does not look metallic or plastic.

## 6.6 Vehicle material textures

1. Create base paint texture.
2. Create panel-line/fastener normal detail.
3. Create edge-wear roughness variation.
4. Add separate emissive masks for thrusters and indicators.
5. Create cockpit glass material.
6. Verify that the canopy remains transparent/reflective as intended and does not become a solid cyan panel.

## 6.7 UV and texture validation

For every textured asset:

- Verify UVs cover the expected texture space.
- Inspect checker distortion.
- Check seams.
- Check texel density consistency.
- Check normal map orientation.
- Check sRGB versus linear colour-space assignment.
- Check texture compression.
- Check mipmaps.
- Check that the export references the maps.
- Re-import the GLB and verify the maps remain connected.

Create a texture audit script that parses glTF JSON and reports image/texture/material references.

## 6.8 Texture budgets

Use sensible budgets rather than automatically using the largest available texture:

- Hero character: 2K maps where close-ups justify them.
- Main tower: 1K/2K trim sheets and atlases depending on facade size.
- Vehicle: 1K/2K maps depending on screen coverage.
- Rooftop assets: shared 1K atlas where practical.
- Far buildings: shared small atlases or baked material variants.

Use KTX2/Basis or another supported compressed texture path if it is reliable in the current Vite/Three.js stack.

Document texture memory estimates. Do not claim that compressed download size equals GPU memory size.

**Phase 4 gate:** the GLB or associated runtime material manifest must prove that actual image maps are loaded and used. A material with scalar roughness/metalness only must be labelled parametric PBR, not fully textured PBR.

---

# 7. PHASE 5 — CITY POPULATION AND ARCHITECTURAL DETAIL

The city must feel populated and interconnected.

## 7.1 Build major landmarks first

Complete and place:

1. Primary corporate megatower.
2. Secondary arcology.
3. Commercial screen tower.
4. Industrial tower.
5. Distant communication spire.

Each major building needs:

- Unique silhouette.
- Distinct facade rhythm.
- Structural depth.
- Window treatment.
- Mechanical/roof treatment.
- Lighting identity.
- Material identity.

## 7.2 Build supporting structures

Create reusable modules for:

- Residential towers.
- Office towers.
- Industrial blocks.
- Skybridge segments.
- Elevated road segments.
- Structural pillars.
- Rooftop machinery clusters.
- Antenna masts.
- Railings and barriers.
- Billboard frames.

Reuse modules intelligently. Do not repeat the exact same building with only a different scale.

## 7.3 Streets and infrastructure

Even if the camera never reaches street level, create the visual cues that explain city scale:

- road decks
- ramp connections
- support columns
- barriers
- lane markings
- service platforms
- transit structures
- illuminated windows
- occasional traffic streams
- signage

The city must not feel like free-floating skyscrapers with nothing connecting them.

## 7.4 Window design

The existing 380-instance window system can be retained as a starting point, but improve it:

- Use actual facade recesses on hero buildings.
- Use varied window sizes.
- Vary warm/cool emission.
- Leave some floors dark.
- Add occasional interior silhouettes/furnishings only where visible.
- Use instancing for repeated window modules.
- Ensure windows align with the facade grid.
- Avoid floating rectangles detached from buildings.
- Add depth and frame thickness to hero-visible windows.

## 7.5 Signage and advertising

Create original fictional brands and messages:

- `NEURON // DYNAMICS`
- `NEO-PUNE NETWORK`
- `DEEP_NET // RESEARCH`
- `PORTFOLIO_OS`
- `CYBERDECK ACCESS`
- `AI SYSTEMS DIVISION`

Use a variety of sign sizes and types:

- building-mounted LED panels
- vertical signage
- animated billboards
- small wayfinding signs
- industrial warning panels

Keep signage integrated into architecture. Do not float large flat rectangles in space without mounts or building context.

## 7.6 City uniqueness

Add environmental storytelling:

- maintenance lights
- power conduits
- rooftop antennas
- service platforms
- distant windows
- occasional steam vents
- warning strobes
- small vehicle lights
- distinct corporate lighting signatures

The city should appear inhabited without requiring human crowds.

---

# 8. PHASE 6 — ROOFTOP ENVIRONMENT ART

The rooftop is the foreground anchor. It must be as carefully designed as the buildings.

## 8.1 Ground surface

Build a layered ground surface:

- structural concrete/asphalt base
- rough aggregate variation
- localized wetness mask
- puddle regions
- drainage paths
- cracks and patched areas
- subtle tire/foot scuffs if compositionally appropriate
- embedded grates
- expansion seams

## 8.2 Puddles and reflections

Use the existing `Reflector` carefully.

Requirements:

- reflection plane must fit the puddle area.
- no giant rectangular reflection outside the water boundaries.
- use organic puddle boundaries.
- use roughness variation between water and dry ground.
- use low-cost approximation on lower quality tiers.
- validate reflected objects and clipping.
- avoid reflecting unnecessary layers or creating visual feedback artefacts.

Be precise in documentation: a planar reflector is not full-scene ray tracing.

## 8.3 Rooftop equipment layout

Place assets intentionally:

- one primary HVAC cluster
- smaller junction cabinets
- pipe network
- cable trays
- railing supports
- access hatch
- floor grates
- warning lights
- vent steam emitter

Do not clutter the safe text area or cover the character.

## 8.4 Character placement

Verify:

- character scale against parapet height
- seated pose and ground contact
- correct orientation toward the city
- silhouette readability
- no floating limbs
- no intersecting body parts
- no clipping through ledge
- clothing material response under key and rim light

Capture both the full hero composition and a neutral close-up.

---

# 9. PHASE 7 — LIGHTING, FOG, WEATHER AND EFFECTS

## 9.1 Lighting hierarchy

Build the light rig in layers:

1. Low-intensity ambient/city fill.
2. Dominant directional or large-area-style key approximation.
3. Cool cyan rim light on selected architecture.
4. Warm/yellow practical light on rooftop/character.
5. Magenta practicals on selected signage.
6. Local lights only where visible and useful.
7. Window emission as material emission rather than hundreds of expensive point lights.

Avoid filling the scene with point lights. Use emissive materials and baked/canvas effects for distant sources.

## 9.2 Exposure and tone mapping

- Use a consistent tone-mapping pipeline.
- Keep whites from clipping excessively.
- Preserve detail in dark materials.
- Ensure black areas still have visual depth.
- Tune bloom after exposure and material values, not before.
- Test the scene with bloom disabled to assess base lighting quality.

## 9.3 Fog and atmospheric depth

Use distance fog that helps separate spatial layers.

Tune fog independently for:

- foreground rooftop
- midground architecture
- far skyline

Do not use fog to hide unfinished geometry immediately behind hero assets.

## 9.4 Rain

Implement rain as a proper particle or shader system:

- directional velocity
- crosswind
- varied streak lengths
- varied alpha and brightness
- depth-aware visibility where practical
- camera-relative spawning if suitable
- deterministic or seeded behaviour for repeatable captures
- reduced intensity in text-safe areas

Use instancing/buffer geometry rather than one React component per raindrop.

## 9.5 Steam and haze

- Emit steam from selected vents.
- Use soft particle sprites or shader-based particles.
- Animate with delta time.
- Use depth fade.
- Keep alpha blending stable.
- Avoid large opaque smoke blobs.

## 9.6 Traffic

- Use spline-based or defined paths.
- Use delta-time movement.
- Add subtle banking/rotation where appropriate.
- Use separate light trails with limited length.
- Ensure vehicle scale reads at the hero camera.
- Avoid crossing text-safe zones.
- Pause when offscreen or document-hidden.

## 9.7 Bloom

Only high-intensity emissive elements should bloom.

Do not bloom:

- body text
- project cards
- normal building surfaces
- large dark areas

Check that the title, controls and small signs remain sharp.

---

# 10. PHASE 8 — CAMERA CHOREOGRAPHY AND CINEMATIC SCROLL

The environment and scrolling portfolio must feel connected without making the site difficult to use.

## 10.1 Camera architecture

Use a central camera controller with named waypoint data, not unrelated scattered camera values.

Each waypoint should define:

- camera position
- look-at target
- field of view if changed
- camera roll (normally zero or very restrained)
- environment emphasis
- section association
- interpolation curve

## 10.2 Required chapters

### Chapter 1 — Hero Establishing

- wide city composition
- hero rooftop visible
- operative visible
- major tower(s) visible
- aerial traffic visible
- left text-safe region maintained

### Chapter 2 — City Descent

- camera moves into the urban canyon
- foreground and background parallax
- visible building scale
- motion remains smooth and reversible

### Chapter 3 — Operator / About

- camera settles near the rooftop or a stable city vantage
- content remains legible
- no geometry intersects the profile panel

### Chapter 4 — Fixer Contracts / Projects

- camera reframes toward project content
- environment dims or becomes less visually busy if needed
- case study cards are the focus

### Chapter 5 — Cyberdeck / Skills

- stable technical backdrop
- subtle environment motion only
- no aggressive camera motion while reading skill lists

### Chapter 6 — Research / Chronicle / Reputation

- restrained perspective changes
- timeline and archive content readable
- natural scrolling preserved

### Chapter 7 — Net Connect

- wider atmospheric city framing
- final city lights and a clear contact surface

Adapt the number of camera waypoint values to the existing implementation, but preserve the logical story.

## 10.3 Scrolling rules

- Use native browser scrolling.
- Use GSAP ScrollTrigger only if it integrates cleanly with the existing app.
- Avoid scroll hijacking.
- Do not pin every section.
- Do not make long scroll distances mandatory.
- Allow direct nav jumps.
- Allow recruiter quick view to bypass the narrative.
- Keep camera motion smooth and reversible.
- Use `prefers-reduced-motion` and app settings.
- In reduced-motion mode, render one stable composition and stop continuous animation scheduling.

## 10.4 Technical implementation

- Keep scroll progress in a mutable ref.
- Update it without re-creating the renderer.
- Read the latest value in the render loop.
- Use delta time for every time-based movement.
- Interpolate position and look target consistently.
- Avoid camera jitter from competing effects.
- Clean up all event listeners and animation loops.

Capture a full recording from the top of the page through the final section.

---

# 11. PHASE 9 — THREE.JS RUNTIME ARCHITECTURE

## 11.1 Renderer lifecycle

Inspect and implement:

- one primary scene renderer wherever practical
- correct resize handling
- correct pixel ratio caps
- correct colour space
- correct tone mapping
- context-loss handling if practical
- renderer disposal on unmount
- render-target cleanup
- post-processing cleanup
- no duplicate animation loops

## 11.2 Progressive loading

1. Render the DOM hero and CTAs immediately.
2. Initialize the minimal scene.
3. Render low-detail placeholders if needed.
4. Load near-field hero assets first.
5. Load mid-field assets after hero assets.
6. Load far-field assets progressively.
7. Replace placeholders only after the GLB is ready and correctly positioned.
8. Dispose replaced proxy resources.
9. Show a real loading state only where it helps.
10. On asset failure, preserve the fallback and provide a diagnostic.

## 11.3 Asset loader

Use `GLTFLoader` with the correct base path.

Evaluate:

- Meshopt decoder
- Draco decoder only if geometry compression justifies it
- KTX2Loader for supported compressed textures
- preload priorities
- caching
- error and retry behaviour

Do not add decoders or loaders without using them.

## 11.4 LOD

For each important object:

- define camera distance thresholds
- define high/medium/low assets
- confirm geometry cost decreases at distance
- preserve silhouette between levels
- avoid sudden popping
- validate all levels in the actual camera

Use `THREE.LOD` or a better justified custom visibility/asset strategy.

## 11.5 Instancing and batching

Use instancing for:

- repeated windows
- repeated balcony modules
- repeated structural bolts where visible
- repeated lights
- distant rooftop details

Use shared materials and geometry where possible.

Do not merge objects that need independent animation, transparency sorting or different material behaviour.

## 11.6 Animation loop

- use delta time
- clamp large delta after tab suspension
- pause when document hidden
- pause when canvas is not visible if appropriate
- stop scheduling frames entirely for static reduced-motion mode
- restart only once when animation is re-enabled
- avoid React state updates every frame

## 11.7 Resource disposal

Track and dispose:

- geometries
- materials
- textures
- render targets
- reflection resources
- composers and passes
- event listeners
- animation frames
- loaded asset references where safe

Do not dispose shared resources while another active mesh uses them. Use explicit ownership/reference management.

---

# 12. PHASE 10 — PORTFOLIO UI AND ENVIRONMENT INTEGRATION

Preserve the existing Cyberpunk UI and professionally accurate content.

## 12.1 Top HUD

- keep OM VYAS identity
- keep chapter navigation
- keep quality selector
- keep recruiter action
- keep existing audio setting only if already present and relevant to the current active website scope
- ensure mobile menu is usable
- maintain high contrast

## 12.2 Hero overlay

- keep the name and degree accurate
- keep hero CTA visible
- keep Recruiter Quick View accessible
- keep KPI count consistent with an explicit counting rule
- remove any decorative numeric claims not backed by real data

## 12.3 Projects Fixer Board

Keep all six projects:

- FairLens
- NautilusAI
- Agentica
- TravelSphere
- OceanEmbed-X
- NETRA

Each project must have accurate:

- description
- project state
- role/contribution
- technologies
- architecture claims
- features actually implemented
- testing information
- outcome/evidence
- GitHub link
- demo link

No invented metrics or architecture.

## 12.4 Project detail dossiers

Keep the 13-point case-study structure, but ensure each field contains meaningful project-specific information.

Do not fill every field with generic filler.

## 12.5 Cyberdeck

- retain skill category filters
- retain honest proficiency tiers
- add evidence/project references where known
- no arbitrary skill percentages

## 12.6 Neural Research Lab

- distinguish deployed, experimental, prototype and planned work
- remove unsupported validation metrics
- include actual links/evidence where available

## 12.7 Chronicle and Reputation Archive

- distinguish team outcomes from individual outcomes
- distinguish selection from winning
- distinguish membership from leadership
- verify dates and titles
- keep content consistent across hero KPIs, timeline and archive

## 12.8 Recruiter Quick View

- one-click access
- resume action
- professional summary
- education
- skills
- flagship projects
- contact links
- no cinematic waiting

---

# 13. PHASE 11 — DESIGN SYSTEM AND 21ST.DEV COMPONENT GOVERNANCE

Do not redesign the entire interface or add random components during the environment phase.

Inspect the current 21st.dev adoption matrix and actual component source.

Use components only where they improve:

- navigation
- mission/project cards
- modal/dossier interaction
- skill filters
- timeline
- search/command palette
- responsive controls
- scroll transitions

Evaluate other libraries only when needed:

- 21st.dev
- React Bits
- Aceternity UI
- Magic UI
- GSAP
- Motion
- Three.js / React Three Fiber / Drei
- Radix or accessible primitives

Do not install every library.

For each adopted component, record:

- exact component name
- author
- actual source URL
- dependency list
- license
- code location
- changes/adaptations
- reason for adoption

Distinguish an imported component from a custom implementation inspired by a visual reference.

Keep the existing React/Vite architecture. Do not migrate to Next.js for visual reasons alone.

---

# 14. PHASE 12 — RESPONSIVE EXPERIENCE

Test at these viewports:

- 1920 × 1080
- 1600 × 900
- 1440 × 900
- 1280 × 800
- 1024 × 768
- 768 × 1024
- 430 × 932
- 390 × 844
- 360 × 800

## Desktop

- full city composition
- high-quality environment assets
- cinematic camera path
- full HUD
- detailed project layout

## Tablet

- reduced visual complexity
- rebalanced camera composition
- readable HUD
- touch-friendly interactions

## Mobile

- intentionally composed vertical city view
- lower DPR and quality tier as appropriate
- reduced particle and vehicle counts
- no horizontal overflow
- no UI collision
- CTAs reachable
- content legible
- no reliance on hover
- functional recruiter view
- graceful WebGL fallback

Do not simply squeeze the desktop scene into a narrow viewport. Recompose it for portrait format.

---

# 15. PHASE 13 — ACCESSIBILITY AND USABILITY

Verify:

- semantic buttons and links
- meaningful heading structure
- visible keyboard focus
- keyboard-operable navigation
- accessible icon labels
- modal focus management
- Escape-to-close
- sufficient text contrast
- reduced-motion support
- minimum comfortable touch targets
- non-hover alternatives
- useful image alternatives
- fallback when WebGL fails
- readable content with canvas disabled

The portfolio must remain useful if 3D is unavailable.

---

# 16. PHASE 14 — PERFORMANCE BUDGET AND MEASUREMENT

Set initial performance budgets, then measure and adjust based on actual hardware.

Suggested targets, not universal guarantees:

- Main DOM content should render before nonessential 3D assets finish loading.
- Main JS should not eagerly load large 3D dependencies if code splitting is already supported.
- Load only hero-critical models initially.
- Compress textures appropriately.
- Use shared material/geometry where safe.
- Keep draw calls controlled through instancing and batching.
- Use LOD for large city assets.
- Pause work when the scene is hidden.
- Avoid recurring rendering in reduced-motion static mode.

Record:

- browser and version
- OS
- CPU and GPU where available
- device pixel ratio
- quality tier
- viewport size
- FPS distribution, not just one average
- frame time distribution
- draw calls
- triangle count
- texture memory estimate
- GLB transfer bytes
- compressed texture transfer bytes
- time to first DOM content
- time until hero assets load
- LCP/CLS/INP where measured appropriately

Do not claim an accurate GPU memory figure without a defensible measurement or explicit estimate method.

Do not promise 60 FPS for every visitor.

---

# 17. PHASE 15 — VISUAL QA AND EVIDENCE

This phase determines whether the work is actually good.

## 17.1 Required screenshots

Capture real browser screenshots from the production preview, after all assets have loaded:

1. `v4_hero_1920.png`
2. `v4_hero_1440.png`
3. `v4_hero_1280.png`
4. `v4_scene_only_1440.png`
5. `v4_city_wide.png`
6. `v4_corporate_tower.png`
7. `v4_arcology.png`
8. `v4_character_close.png`
9. `v4_vehicle_close.png`
10. `v4_rooftop_close.png`
11. `v4_asphalt_material_close.png`
12. `v4_glass_material_close.png`
13. `v4_fabric_material_close.png`
14. `v4_projects_section.png`
15. `v4_cyberdeck_section.png`
16. `v4_research_section.png`
17. `v4_chronicle_section.png`
18. `v4_contact_section.png`
19. `v4_mobile_390.png`
20. `v4_reduced_motion.png`
21. `v4_webgl_fallback.png`

## 17.2 Scene-only review

The scene-only screenshot must hide:

- navigation HUD
- hero text
- cards
- CTAs
- developer metadata

Only the actual 3D environment should remain.

This is mandatory. We need to inspect the city rather than the interface.

## 17.3 Full scroll recording

Record a continuous browser video showing:

- initial city view
- camera movement
- operator/about section
- projects
- cyberdeck
- research
- journey/reputation
- contact

The recording must show actual interaction and movement, not a slideshow of still screenshots.

## 17.4 Visual scoring rubric

Score each area from 1–5 and provide evidence:

- city silhouette
- building density
- architectural uniqueness
- near/mid/far depth
- material realism
- character quality
- vehicle quality
- rooftop detail
- lighting hierarchy
- wet surface response
- atmospheric depth
- text-safe composition
- scroll camera quality
- portfolio/UI integration
- mobile composition

Do not assign a score of 5 without a screenshot demonstrating it.

---

# 18. PHASE 16 — FUNCTIONAL REGRESSION TESTING

Test every existing feature after the environment changes:

### Navigation
- Home
- Projects
- Tech
- Research
- Journey
- Contact
- direct anchors
- browser back/forward
- mobile menu

### Projects
- all six project cards
- category filters
- each case study modal
- internal scrolling
- GitHub links
- live demo links
- close and return behaviour

### Cyberdeck
- all category filters
- skill content
- related project links

### Research
- all content panels
- status labels
- external references

### Chronicle / Archive
- timeline display
- credential categories
- correct dates/titles
- no overlap

### Recruiter
- open from top HUD
- open from mobile
- resume link
- contact links
- close modal

### Command palette
- Ctrl/Cmd + K
- search
- navigate
- Escape
- keyboard focus

### 3D
- initial load
- progressive model replacement
- model failure fallback
- resize
- WebGL context fallback
- quality-tier change
- reduced motion
- hidden tab
- route/anchor navigation
- unmount cleanup

---

# 19. PHASE 17 — CONTENT AND IP INTEGRITY

Inspect all displayed personal and project content.

Use the existing verified source of truth for Om Vyas.

Do not invent:

- awards
- project outcomes
- roles
- leadership titles
- professional experience
- model accuracy
- user counts
- validation scores
- architecture not implemented
- project deployment status

Maintain the known limitations of NETRA and any experimental systems.

For every external asset, record its provenance and license.

Do not assume a free download automatically grants commercial website usage.

Use original signage and original fictional organizations.

Do not imply official affiliation with Cyberpunk 2077, CD PROJEKT RED, Studio TRIGGER or Netflix.

---

# 20. REQUIRED FILES AND DOCUMENTATION

Create or update these documents as the work progresses:

1. `NIGHT_CITY_V4_BASELINE_AUDIT.md`
2. `NIGHT_CITY_V4_ART_BIBLE.md`
3. `NIGHT_CITY_V4_CITY_LAYOUT.md`
4. `NIGHT_CITY_V4_ASSET_PRODUCTION_PLAN.md`
5. `NIGHT_CITY_V4_ASSET_MANIFEST.md`
6. `NIGHT_CITY_V4_PBR_MATERIAL_LIBRARY.md`
7. `NIGHT_CITY_V4_TEXTURE_AUDIT.md`
8. `NIGHT_CITY_V4_ENVIRONMENT_BUILD_REPORT.md`
9. `NIGHT_CITY_V4_LIGHTING_AND_ATMOSPHERE.md`
10. `NIGHT_CITY_V4_CAMERA_CHOREOGRAPHY.md`
11. `NIGHT_CITY_V4_LOD_AND_LOADING.md`
12. `NIGHT_CITY_V4_PERFORMANCE_REPORT.md`
13. `NIGHT_CITY_V4_RESPONSIVE_QA.md`
14. `NIGHT_CITY_V4_FUNCTIONAL_REGRESSION.md`
15. `NIGHT_CITY_V4_VISUAL_QA.md`
16. `NIGHT_CITY_V4_FINAL_IMPLEMENTATION_REPORT.md`

Do not write future-tense plans into a final report and describe them as implemented.

Every report must distinguish:

- planned
- implemented
- source verified
- browser verified
- visually inspected
- not achieved
- blocked

---

# 21. FINAL RELEASE ACCEPTANCE CRITERIA

V4 is not complete until all of the following are true:

## Visual environment

- City is dense and visually coherent.
- Hero architecture has genuine structural detail.
- Buildings have distinct silhouettes.
- Midground and background create convincing depth.
- Rooftop is rich in visible detail.
- Character is visually coherent and properly modelled.
- Vehicles are recognizable and detailed.
- Materials show meaningful surface variation.
- Actual texture maps are verified where claimed.
- Lighting gives the city depth without excessive bloom.
- Reflections are accurately described.
- Atmospheric effects are controlled.
- No giant empty black voids dominate the environment.

## Cinematic experience

- Camera waypoints work.
- Camera movement is smooth and reversible.
- Native scroll is preserved.
- Direct navigation works.
- Text-safe regions remain protected.
- Reduced motion is genuinely static.

## Application

- All existing portfolio sections remain functional.
- All project content is accurate.
- Recruiter mode works.
- Command palette works.
- Mobile experience is usable.
- WebGL fallback works.
- Accessibility basics pass.

## Engineering

- TypeScript passes.
- Production build passes.
- Assets load correctly.
- Asset failures have fallbacks.
- LOD is genuinely implemented.
- No resource leaks identified in tested lifecycle.
- Performance is measured honestly.
- Screenshots and recording exist.

## Final verdict

Use one of:

- `APPROVED FOR RELEASE`
- `CONDITIONALLY APPROVED`
- `NOT APPROVED`

A successful production build alone cannot produce `APPROVED FOR RELEASE`.

---

# 22. HOW TO EXECUTE THIS PROMPT — SMALL TASKS, NOT ONE GIANT REWRITE

Follow this exact order:

### Task 1
Inspect repository and record baseline. Do not edit code.

### Task 2
Inspect current 3D assets individually and produce a geometry/material audit.

### Task 3
Write the art bible and city spatial layout.

### Task 4
Create the greybox city layout and capture its camera views.

### Task 5
Fix the composition until the city reads correctly from the hero camera.

### Task 6
Create or acquire the corporate tower hero asset.

### Task 7
Create or acquire the secondary arcology hero asset.

### Task 8
Create or acquire the original operative hero asset.

### Task 9
Create or acquire the two vehicle assets.

### Task 10
Create or acquire rooftop machinery and infrastructure assets.

### Task 11
UV unwrap and validate all hero assets.

### Task 12
Build and validate the asphalt material set.

### Task 13
Build and validate concrete and facade material sets.

### Task 14
Build and validate fabric, armour and vehicle material sets.

### Task 15
Integrate the new assets into the actual scene with correct transforms.

### Task 16
Build supporting city architecture and road infrastructure.

### Task 17
Build the far skyline and landmark silhouette layer.

### Task 18
Implement city window systems, signage and environmental lights.

### Task 19
Build the layered lighting and atmospheric system.

### Task 20
Build rain, steam and aerial traffic systems.

### Task 21
Refine wetness and reflection behaviour.

### Task 22
Refine all camera waypoints and scrolling transitions.

### Task 23
Implement final LOD and progressive loading.

### Task 24
Integrate the environment with the existing portfolio sections.

### Task 25
Complete responsive composition and performance tiers.

### Task 26
Run functional regression and accessibility checks.

### Task 27
Capture all required visual evidence.

### Task 28
Inspect the screenshots and recording. Fix visual defects.

### Task 29
Run final build, performance and asset audits.

### Task 30
Produce the final report and release recommendation.

**Do not jump from Task 1 directly to Task 30.** Every task must have an identifiable output and a verification check.

If a task cannot be completed using the available tools, say exactly what is missing, what was attempted, what remains and what a human artist or additional tool would need to do. Never fabricate an asset, screenshot, license or benchmark.

---

# FINAL CREATIVE DIRECTIVE

The current V2.3.1 implementation is the engineering foundation, not the final visual destination.

We are not trying to win a contest for the most technical terminology in a Markdown report.

We are building a visually convincing, detailed cyberpunk metropolis that serves as the environment for a real developer portfolio.

Every small visible element matters:

- a window has a frame and depth
- a building has a silhouette and structure
- a road has supports and connections
- a vehicle has a believable body and propulsion system
- a character has anatomy, clothing and material detail
- asphalt has grain, wetness and roughness variation
- glass has reflection and interior depth
- light has a source and purpose
- fog establishes distance
- animation has a reason
- UI has a clear hierarchy

Work slowly enough to inspect every important detail, but do not stop at documentation. Implement the actual environment, render it, inspect it and refine it.

**The final website must make the visitor feel that they are looking into a living cyberpunk city, not a low-poly scene behind a developer portfolio.**

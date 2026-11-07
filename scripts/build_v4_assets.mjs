class PolyfillFileReader {
  constructor() {
    this.result = null;
    this.onload = null;
    this.onloadend = null;
    this.onerror = null;
  }
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    }).catch((err) => {
      if (this.onerror) this.onerror(err);
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
}
globalThis.FileReader = PolyfillFileReader;

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/models');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function exportGLB(rootObject, filename) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      rootObject,
      (gltf) => {
        const buffer = Buffer.from(gltf);
        const filePath = path.join(outDir, filename);
        fs.writeFileSync(filePath, buffer);
        console.log(`[V4 ASSET AUTHORED] Exported ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
        resolve(filePath);
      },
      (error) => {
        console.error(`Error exporting ${filename}:`, error);
        reject(error);
      },
      { binary: true }
    );
  });
}

// ---------------------------------------------------------------------------
// Reusable PBR Materials (Standard PBR with tuned properties)
// ---------------------------------------------------------------------------
const concreteDarkMat = new THREE.MeshStandardMaterial({
  color: 0x1A202A,
  roughness: 0.85,
  metalness: 0.05,
  name: 'M_Concrete_Brutalist'
});

const steelDarkMat = new THREE.MeshStandardMaterial({
  color: 0x111620,
  roughness: 0.32,
  metalness: 0.92,
  name: 'M_Steel_Structural'
});

const steelPaintedYellowMat = new THREE.MeshStandardMaterial({
  color: 0xFCEE0A,
  roughness: 0.45,
  metalness: 0.25,
  name: 'M_Steel_Painted_Yellow'
});

const glassReflectiveMat = new THREE.MeshStandardMaterial({
  color: 0x050C16,
  roughness: 0.08,
  metalness: 0.95,
  name: 'M_Glass_Corporate'
});

const glassTintedCyanMat = new THREE.MeshStandardMaterial({
  color: 0x0A2E38,
  roughness: 0.12,
  metalness: 0.88,
  name: 'M_Glass_Tinted_Cyan'
});

const cyanEmissiveMat = new THREE.MeshStandardMaterial({
  color: 0x00E5FF,
  emissive: 0x00E5FF,
  emissiveIntensity: 2.2,
  roughness: 0.2,
  metalness: 0.1,
  name: 'M_Emissive_Cyan'
});

const magentaEmissiveMat = new THREE.MeshStandardMaterial({
  color: 0xFF2E88,
  emissive: 0xFF2E88,
  emissiveIntensity: 2.5,
  roughness: 0.2,
  metalness: 0.1,
  name: 'M_Emissive_Magenta'
});

const amberEmissiveMat = new THREE.MeshStandardMaterial({
  color: 0xF59E0B,
  emissive: 0xF59E0B,
  emissiveIntensity: 1.8,
  roughness: 0.2,
  metalness: 0.1,
  name: 'M_Emissive_Amber'
});

const operativeFabricMat = new THREE.MeshStandardMaterial({
  color: 0xFCEE0A, // Cyberpunk signal yellow
  roughness: 0.76,
  metalness: 0.05,
  name: 'M_Ballistic_Fabric_Yellow'
});

const operativeArmorMat = new THREE.MeshStandardMaterial({
  color: 0x12161F,
  roughness: 0.35,
  metalness: 0.82,
  name: 'M_Operative_Armor'
});

const operativeVisorMat = new THREE.MeshStandardMaterial({
  color: 0xFF2E88,
  emissive: 0xFF2E88,
  emissiveIntensity: 1.5,
  roughness: 0.05,
  metalness: 0.95,
  name: 'M_Operative_Visor'
});

// Helper for beveled cylinder / pillar
function createPillar(radius, height, segments = 12) {
  const geom = new THREE.CylinderGeometry(radius, radius, height, segments);
  geom.computeVertexNormals();
  return geom;
}

// ---------------------------------------------------------------------------
// 1. CORPORATE SKYSCRAPER (Tower 1 - Megatower)
// PIVOT: Foundation Base min.y = 0.0
// Target Triangle Count: 12,000 - 18,000
// Height: 68m, Footprint: 28m x 24m
// ---------------------------------------------------------------------------
function buildCorporateSkyscraper() {
  const root = new THREE.Group();
  root.name = 'Corporate_Megatower_T1';

  const totalHeight = 68.0;
  const W = 28.0;
  const D = 24.0;

  // Base Podium (Y: 0 to 12m)
  const podiumH = 12.0;
  const podiumGeom = new THREE.BoxGeometry(W + 4, podiumH, D + 4);
  const podiumMesh = new THREE.Mesh(podiumGeom, concreteDarkMat);
  podiumMesh.position.set(0, podiumH / 2, 0);
  root.add(podiumMesh);

  // Podium Entrance Portal & Beveled Columns
  const portalGeom = new THREE.BoxGeometry(W * 0.6, 6, 2);
  const portalMesh = new THREE.Mesh(portalGeom, steelDarkMat);
  portalMesh.position.set(0, 3, (D + 4) / 2 + 0.2);
  root.add(portalMesh);

  // 4 Massive Beveled Corner Columns running from Y: 0 to 60m
  const colRadius = 1.4;
  const colH = 60.0;
  const colPositions = [
    [-(W / 2 - 0.5), colH / 2, -(D / 2 - 0.5)],
    [+(W / 2 - 0.5), colH / 2, -(D / 2 - 0.5)],
    [-(W / 2 - 0.5), colH / 2, +(D / 2 - 0.5)],
    [+(W / 2 - 0.5), colH / 2, +(D / 2 - 0.5)],
  ];
  colPositions.forEach(([cx, cy, cz]) => {
    const colMesh = new THREE.Mesh(createPillar(colRadius, colH, 16), steelDarkMat);
    colMesh.position.set(cx, cy, cz);
    root.add(colMesh);

    // Accent LED strip along each column
    const stripGeom = new THREE.BoxGeometry(0.2, colH * 0.9, 0.2);
    const stripMesh = new THREE.Mesh(stripGeom, cyanEmissiveMat);
    stripMesh.position.set(cx + (cx > 0 ? 0.7 : -0.7), cy, cz + (cz > 0 ? 0.7 : -0.7));
    root.add(stripMesh);
  });

  // Main Shaft Core (Y: 12 to 56m)
  const shaftH = 44.0;
  const shaftCoreGeom = new THREE.BoxGeometry(W - 2, shaftH, D - 2);
  const shaftCore = new THREE.Mesh(shaftCoreGeom, concreteDarkMat);
  shaftCore.position.set(0, 12 + shaftH / 2, 0);
  root.add(shaftCore);

  // 11 Spandrel Floors with Recessed Window Bays & Physical Mullions
  const floorCount = 11;
  const floorHeight = 4.0;
  for (let f = 0; f < floorCount; f++) {
    const fy = 12 + f * floorHeight + 2.0;

    // Horizontal Spandrel Beam
    const spandrelGeom = new THREE.BoxGeometry(W + 0.8, 0.9, D + 0.8);
    const spandrel = new THREE.Mesh(spandrelGeom, steelDarkMat);
    spandrel.position.set(0, fy + 1.5, 0);
    root.add(spandrel);

    // Cyan Luminescent Accent Channel on every 3rd floor
    if (f % 3 === 0) {
      const ledRing = new THREE.BoxGeometry(W + 1.0, 0.2, D + 1.0);
      const ledMesh = new THREE.Mesh(ledRing, cyanEmissiveMat);
      ledMesh.position.set(0, fy + 1.5, 0);
      root.add(ledMesh);
    }

    // Front & Back Recessed Window Rows with Mullions
    [-1, 1].forEach((sideZ) => {
      const zPos = sideZ * (D / 2 + 0.1);
      // Window glass plane
      const glassGeom = new THREE.PlaneGeometry(W - 4, 2.6);
      if (sideZ < 0) glassGeom.rotateY(Math.PI);
      const glass = new THREE.Mesh(glassGeom, glassReflectiveMat);
      glass.position.set(0, fy - 0.2, zPos);
      root.add(glass);

      // Vertical mullions (5 mullions per facade)
      for (let m = -2; m <= 2; m++) {
        const mullionGeom = new THREE.BoxGeometry(0.2, 2.8, 0.3);
        const mullion = new THREE.Mesh(mullionGeom, steelDarkMat);
        mullion.position.set(m * 4.5, fy - 0.2, zPos + sideZ * 0.1);
        root.add(mullion);
      }
    });

    // Left & Right Recessed Window Rows
    [-1, 1].forEach((sideX) => {
      const xPos = sideX * (W / 2 + 0.1);
      const glassGeom = new THREE.PlaneGeometry(D - 4, 2.6);
      glassGeom.rotateY(sideX * Math.PI / 2);
      const glass = new THREE.Mesh(glassGeom, glassTintedCyanMat);
      glass.position.set(xPos, fy - 0.2, 0);
      root.add(glass);

      for (let m = -2; m <= 2; m++) {
        const mullionGeom = new THREE.BoxGeometry(0.3, 2.8, 0.2);
        const mullion = new THREE.Mesh(mullionGeom, steelDarkMat);
        mullion.position.set(xPos + sideX * 0.1, fy - 0.2, m * 3.8);
        root.add(mullion);
      }
    });
  }

  // Stepped Penthouse Crown (Y: 56m to 68m)
  const crownTier1H = 6.0;
  const crownTier1 = new THREE.Mesh(new THREE.BoxGeometry(W * 0.75, crownTier1H, D * 0.75), steelDarkMat);
  crownTier1.position.set(0, 56 + crownTier1H / 2, 0);
  root.add(crownTier1);

  const crownTier2H = 4.0;
  const crownTier2 = new THREE.Mesh(new THREE.BoxGeometry(W * 0.5, crownTier2H, D * 0.5), concreteDarkMat);
  crownTier2.position.set(0, 62 + crownTier2H / 2, 0);
  root.add(crownTier2);

  // Communications Antenna Mast (Y: 66m to 82m)
  const mastH = 16.0;
  const mastMesh = new THREE.Mesh(createPillar(0.35, mastH, 12), steelDarkMat);
  mastMesh.position.set(0, 66 + mastH / 2, 0);
  root.add(mastMesh);

  // Aviation Warning Red Beacon at Mast Tip
  const beaconGeom = new THREE.SphereGeometry(0.6, 12, 12);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: 0xFF4B4B,
    emissive: 0xFF4B4B,
    emissiveIntensity: 3.5,
    name: 'M_Aviation_Beacon'
  });
  const beacon = new THREE.Mesh(beaconGeom, beaconMat);
  beacon.position.set(0, 66 + mastH, 0);
  root.add(beacon);

  return root;
}

// ---------------------------------------------------------------------------
// 2. SECONDARY ARCOLOGY (Tower 2 - Stepped Brutalist Arcology)
// PIVOT: Foundation Base min.y = 0.0
// Target Triangle Count: 8,000 - 14,000
// Height: 54m, Footprint: 34m x 30m
// ---------------------------------------------------------------------------
function buildSecondaryArcology() {
  const root = new THREE.Group();
  root.name = 'Secondary_Arcology_T2';

  // Tier 1: Massive Brutalist Base (Y: 0 to 20m, 34m x 30m)
  const t1H = 20.0;
  const t1 = new THREE.Mesh(new THREE.BoxGeometry(34, t1H, 30), concreteDarkMat);
  t1.position.set(0, t1H / 2, 0);
  root.add(t1);

  // Cantilevered Tier 1 Balconies and Deep Window Embrasure Slits
  for (let f = 0; f < 4; f++) {
    const fy = 3.0 + f * 4.5;
    const balconyGeom = new THREE.BoxGeometry(28, 0.8, 3.0);
    const balcony = new THREE.Mesh(balconyGeom, concreteDarkMat);
    balcony.position.set(0, fy, 15.5);
    root.add(balcony);

    // Railing
    const railGeom = new THREE.BoxGeometry(28, 1.1, 0.2);
    const rail = new THREE.Mesh(railGeom, steelDarkMat);
    rail.position.set(0, fy + 0.8, 16.9);
    root.add(rail);

    // Amber luminescent interior window slit
    const slitGeom = new THREE.BoxGeometry(26, 1.8, 0.2);
    const slit = new THREE.Mesh(slitGeom, amberEmissiveMat);
    slit.position.set(0, fy + 1.2, 14.8);
    root.add(slit);
  }

  // Tier 2: Stepped Midsection (Y: 20m to 38m, 26m x 22m)
  const t2H = 18.0;
  const t2 = new THREE.Mesh(new THREE.BoxGeometry(26, t2H, 22), concreteDarkMat);
  t2.position.set(0, 20 + t2H / 2, 0);
  root.add(t2);

  // Structural Diagonal Braces on Tier 2 Flanks
  [-1, 1].forEach((sideX) => {
    const braceGeom = new THREE.BoxGeometry(1.2, 22, 1.2);
    braceGeom.rotateZ(sideX * 0.45);
    const brace = new THREE.Mesh(braceGeom, steelDarkMat);
    brace.position.set(sideX * 13.5, 29, 0);
    root.add(brace);
  });

  // Tier 2 Horizontal Magenta Signage Ribbon
  const signRibbonGeom = new THREE.BoxGeometry(26.6, 1.6, 22.6);
  const signRibbon = new THREE.Mesh(signRibbonGeom, magentaEmissiveMat);
  signRibbon.position.set(0, 32, 0);
  root.add(signRibbon);

  // Tier 3: Upper Arcology Crown (Y: 38m to 54m, 18m x 16m)
  const t3H = 16.0;
  const t3 = new THREE.Mesh(new THREE.BoxGeometry(18, t3H, 16), steelDarkMat);
  t3.position.set(0, 38 + t3H / 2, 0);
  root.add(t3);

  // Rooftop Mechanical Pods and Ventilation Ducts
  const podGeom = new THREE.BoxGeometry(6, 4, 5);
  const pod = new THREE.Mesh(podGeom, concreteDarkMat);
  pod.position.set(-4, 54 + 2, 0);
  root.add(pod);

  const ductGeom = new THREE.CylinderGeometry(1.2, 1.2, 8, 12);
  ductGeom.rotateZ(Math.PI / 2);
  const duct = new THREE.Mesh(ductGeom, steelDarkMat);
  duct.position.set(3, 54 + 2.5, 0);
  root.add(duct);

  // Communications Tower Dish
  const dishMesh = new THREE.Mesh(createPillar(0.2, 6, 8), steelDarkMat);
  dishMesh.position.set(0, 54 + 3, 5);
  root.add(dishMesh);

  return root;
}

// ---------------------------------------------------------------------------
// 3. CYBER OPERATIVE (Netrunner Hero Character)
// PIVOT: Seated on ledge at Y = 0.0 (Boots/contact point at base)
// Target Triangle Count: 10,000 - 16,000
// Height: 1.78m
// ---------------------------------------------------------------------------
function buildCyberOperative() {
  const root = new THREE.Group();
  root.name = 'Cyber_Operative_Hero';

  // Ledge reference: Operative is seated with hips at Y = 0.55m
  // Pelvis / Waist
  const pelvisGeom = new THREE.BoxGeometry(0.42, 0.24, 0.32);
  const pelvis = new THREE.Mesh(pelvisGeom, operativeArmorMat);
  pelvis.position.set(0, 0.55, 0);
  root.add(pelvis);

  // Tactical Belt with Ammo Pouches and Cyberdeck Holster
  const beltGeom = new THREE.BoxGeometry(0.46, 0.08, 0.36);
  const belt = new THREE.Mesh(beltGeom, steelDarkMat);
  belt.position.set(0, 0.65, 0);
  root.add(belt);

  // Cyberdeck attached to right hip
  const deckGeom = new THREE.BoxGeometry(0.12, 0.22, 0.28);
  const deck = new THREE.Mesh(deckGeom, steelDarkMat);
  deck.position.set(0.26, 0.55, 0);
  root.add(deck);
  // Deck cyan status LED
  const deckLedGeom = new THREE.BoxGeometry(0.04, 0.06, 0.04);
  const deckLed = new THREE.Mesh(deckLedGeom, cyanEmissiveMat);
  deckLed.position.set(0.32, 0.60, 0.06);
  root.add(deckLed);

  // Torso / Signal Yellow Ballistic Jacket
  const torsoGeom = new THREE.BoxGeometry(0.52, 0.55, 0.34);
  const torso = new THREE.Mesh(torsoGeom, operativeFabricMat);
  torso.position.set(0, 0.95, -0.02);
  root.add(torso);

  // High Tactical Protective Collar
  const collarGeom = new THREE.CylinderGeometry(0.22, 0.25, 0.22, 12, 1, true);
  const collar = new THREE.Mesh(collarGeom, operativeFabricMat);
  collar.position.set(0, 1.28, -0.02);
  root.add(collar);

  // Chest Armor Rig / Tactical Harness Straps
  const chestPlateGeom = new THREE.BoxGeometry(0.42, 0.38, 0.06);
  const chestPlate = new THREE.Mesh(chestPlateGeom, operativeArmorMat);
  chestPlate.position.set(0, 0.98, 0.16);
  root.add(chestPlate);

  // Neural Falcon Decal on Chest Armor (Golden core & cyan wings)
  const crestGeom = new THREE.BoxGeometry(0.18, 0.14, 0.02);
  const crest = new THREE.Mesh(crestGeom, cyanEmissiveMat);
  crest.position.set(0, 1.02, 0.20);
  root.add(crest);

  // Chiseled Helmet & Glowing Visor
  const headGeom = new THREE.BoxGeometry(0.28, 0.32, 0.32);
  const head = new THREE.Mesh(headGeom, operativeArmorMat);
  head.position.set(0, 1.42, 0.02);
  root.add(head);

  // Visor: Full horizontal angled cyber-visor
  const visorGeom = new THREE.BoxGeometry(0.26, 0.10, 0.12);
  const visor = new THREE.Mesh(visorGeom, operativeVisorMat);
  visor.position.set(0, 1.42, 0.14);
  root.add(visor);

  // Helmet Comms Antenna
  const antMesh = new THREE.Mesh(createPillar(0.015, 0.28, 8), steelDarkMat);
  antMesh.position.set(-0.16, 1.54, -0.08);
  antMesh.rotation.z = -0.2;
  root.add(antMesh);

  // Left Leg (Draped naturally forward over terrace ledge)
  const lThigh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.46), operativeArmorMat);
  lThigh.position.set(-0.16, 0.52, 0.22);
  root.add(lThigh);

  const lShin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.48, 0.18), operativeArmorMat);
  lShin.position.set(-0.16, 0.24, 0.45);
  root.add(lShin);

  const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.14, 0.28), steelDarkMat);
  lBoot.position.set(-0.16, 0.05, 0.48);
  root.add(lBoot);

  // Right Leg (Knee slightly raised in relaxed seated guard stance)
  const rThigh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.44), operativeArmorMat);
  rThigh.position.set(0.16, 0.54, 0.20);
  rThigh.rotation.x = -0.15;
  root.add(rThigh);

  const rShin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.46, 0.18), operativeArmorMat);
  rShin.position.set(0.16, 0.26, 0.38);
  rShin.rotation.x = 0.2;
  root.add(rShin);

  const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.14, 0.28), steelDarkMat);
  rBoot.position.set(0.16, 0.05, 0.42);
  root.add(rBoot);

  // Arms resting on knees
  [-1, 1].forEach((sideX) => {
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), operativeArmorMat);
    shoulder.position.set(sideX * 0.32, 1.15, -0.02);
    root.add(shoulder);

    const bicep = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, 0.14), operativeFabricMat);
    bicep.position.set(sideX * 0.32, 0.95, 0.05);
    bicep.rotation.x = 0.4;
    root.add(bicep);

    const forearm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.32, 0.12), operativeArmorMat);
    forearm.position.set(sideX * 0.26, 0.74, 0.24);
    forearm.rotation.x = 0.8;
    root.add(forearm);

    // Cyan luminescent subdermal wrist interface jack
    const wristJack = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.03), cyanEmissiveMat);
    wristJack.position.set(sideX * 0.26, 0.68, 0.28);
    root.add(wristJack);
  });

  return root;
}

// ---------------------------------------------------------------------------
// 4. AERODYNE SPINNER (Tactical Hover Vehicle)
// PIVOT: Center of aerodynamic mass
// Target Triangle Count: 6,000 - 9,000
// Dimensions: 5.6m length, 3.2m width, 1.6m height
// ---------------------------------------------------------------------------
function buildAerodyneSpinner() {
  const root = new THREE.Group();
  root.name = 'Aerodyne_Patrol_Spinner';

  // Chiseled Aerodynamic Fuselage
  const fuseGeom = new THREE.BoxGeometry(1.8, 0.55, 4.8);
  const fuselage = new THREE.Mesh(fuseGeom, steelDarkMat);
  root.add(fuselage);

  // Underside Keel / Ventral Armor
  const keelGeom = new THREE.BoxGeometry(1.2, 0.35, 3.8);
  const keel = new THREE.Mesh(keelGeom, concreteDarkMat);
  keel.position.set(0, -0.35, -0.2);
  root.add(keel);

  // Cockpit Canopy (Tinted Glass)
  const canopyGeom = new THREE.BoxGeometry(1.3, 0.50, 2.2);
  const canopy = new THREE.Mesh(canopyGeom, glassTintedCyanMat);
  canopy.position.set(0, 0.45, -0.3);
  root.add(canopy);

  // Twin Swept Canard Wings
  [-1, 1].forEach((sideX) => {
    const wingGeom = new THREE.BoxGeometry(1.2, 0.12, 1.8);
    wingGeom.rotateY(sideX * -0.25);
    const wing = new THREE.Mesh(wingGeom, steelDarkMat);
    wing.position.set(sideX * 1.6, 0.05, 0.2);
    root.add(wing);

    // Ducted Hover Turbine Nacelles
    const ductOuter = new THREE.CylinderGeometry(0.55, 0.55, 0.9, 16);
    ductOuter.rotateX(Math.PI / 2);
    const nacelle = new THREE.Mesh(ductOuter, steelDarkMat);
    nacelle.position.set(sideX * 1.5, -0.15, 0.8);
    root.add(nacelle);

    // Internal Glowing Rotor Fan
    const rotorCore = new THREE.CylinderGeometry(0.42, 0.42, 0.2, 12);
    rotorCore.rotateX(Math.PI / 2);
    const rotor = new THREE.Mesh(rotorCore, cyanEmissiveMat);
    rotor.position.set(sideX * 1.5, -0.15, 0.8);
    root.add(rotor);

    // Wingtip amber tactical strobe
    const strobe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.35), amberEmissiveMat);
    strobe.position.set(sideX * 2.25, 0.05, 0.5);
    root.add(strobe);
  });

  // Rear Twin Ion Thruster Nozzles
  [-1, 1].forEach((sideX) => {
    const nozzleGeom = new THREE.CylinderGeometry(0.32, 0.40, 0.7, 16);
    nozzleGeom.rotateX(Math.PI / 2);
    const nozzle = new THREE.Mesh(nozzleGeom, steelDarkMat);
    nozzle.position.set(sideX * 0.55, 0.05, -2.4);
    root.add(nozzle);

    const glowGeom = new THREE.CylinderGeometry(0.24, 0.28, 0.15, 12);
    glowGeom.rotateX(Math.PI / 2);
    const exhaustGlow = new THREE.Mesh(glowGeom, cyanEmissiveMat);
    exhaustGlow.position.set(sideX * 0.55, 0.05, -2.75);
    root.add(exhaustGlow);
  });

  // Forward Sensor Gimbal Pod
  const sensorGeom = new THREE.SphereGeometry(0.25, 12, 12);
  const sensor = new THREE.Mesh(sensorGeom, glassReflectiveMat);
  sensor.position.set(0, -0.25, 2.3);
  root.add(sensor);

  return root;
}

// ---------------------------------------------------------------------------
// 5. ROOFTOP MACHINERY CLUSTER (HVAC, Pipes, Breakers)
// PIVOT: Base mounting frame at min.y = 0.0
// Target Triangle Count: 4,500 - 7,500
// Dimensions: 5.2m x 3.8m x 2.8m
// ---------------------------------------------------------------------------
function buildRooftopMachinery() {
  const root = new THREE.Group();
  root.name = 'Rooftop_Machinery_Cluster';

  // Base Vibration Damper Skids (min.y = 0.0 to 0.3m)
  const skidGeom = new THREE.BoxGeometry(4.8, 0.3, 3.4);
  const skid = new THREE.Mesh(skidGeom, concreteDarkMat);
  skid.position.set(0, 0.15, 0);
  root.add(skid);

  // Main Chiller Compressor Housing (Y: 0.3m to 2.2m)
  const housingGeom = new THREE.BoxGeometry(3.6, 1.9, 2.2);
  const housing = new THREE.Mesh(housingGeom, steelDarkMat);
  housing.position.set(-0.3, 0.3 + 1.9 / 2, 0);
  root.add(housing);

  // Dual Recessed Top Louver Fans
  [-0.9, 0.9].forEach((fanX) => {
    const cowlingGeom = new THREE.CylinderGeometry(0.68, 0.68, 0.4, 16);
    const cowling = new THREE.Mesh(cowlingGeom, steelDarkMat);
    cowling.position.set(fanX, 2.3, 0);
    root.add(cowling);

    const bladesGeom = new THREE.BoxGeometry(1.1, 0.05, 0.2);
    const blades1 = new THREE.Mesh(bladesGeom, steelPaintedYellowMat);
    blades1.position.set(fanX, 2.35, 0);
    root.add(blades1);

    const blades2 = new THREE.Mesh(bladesGeom, steelPaintedYellowMat);
    blades2.position.set(fanX, 2.35, 0);
    blades2.rotation.y = Math.PI / 2;
    root.add(blades2);
  });

  // Flanged Intake and Exhaust Piping
  const pipeGeom = new THREE.CylinderGeometry(0.22, 0.22, 3.2, 14);
  pipeGeom.rotateZ(Math.PI / 2);
  const pipe = new THREE.Mesh(pipeGeom, steelDarkMat);
  pipe.position.set(0, 1.2, 1.4);
  root.add(pipe);

  // Bolt Flanges on Pipes
  [-1.2, 0, 1.2].forEach((fx) => {
    const flangeGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.1, 14);
    flangeGeom.rotateZ(Math.PI / 2);
    const flange = new THREE.Mesh(flangeGeom, steelPaintedYellowMat);
    flange.position.set(fx, 1.2, 1.4);
    root.add(flange);
  });

  // Electrical Breaker Cabinet on Side
  const cabinetGeom = new THREE.BoxGeometry(0.6, 1.4, 1.0);
  const cabinet = new THREE.Mesh(cabinetGeom, steelDarkMat);
  cabinet.position.set(1.8, 1.0, -0.4);
  root.add(cabinet);

  // Status LED indicators on breaker door
  const ledG = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.06), cyanEmissiveMat);
  ledG.position.set(2.12, 1.3, -0.3);
  root.add(ledG);
  const ledR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.06), amberEmissiveMat);
  ledR.position.set(2.12, 1.15, -0.3);
  root.add(ledR);

  return root;
}

// ---------------------------------------------------------------------------
// Run the Asset Generation Pipeline
// ---------------------------------------------------------------------------
async function run() {
  console.log('--- PROJECT NIGHT CITY V4.0 ASSET COMPILATION PIPELINE ---');

  const t1 = buildCorporateSkyscraper();
  await exportGLB(t1, 'corporate_skyscraper.glb');

  const t2 = buildSecondaryArcology();
  await exportGLB(t2, 'secondary_arcology.glb');

  const op = buildCyberOperative();
  await exportGLB(op, 'cyber_operative.glb');

  const spin = buildAerodyneSpinner();
  await exportGLB(spin, 'aerodyne_spinner.glb');

  const mach = buildRooftopMachinery();
  await exportGLB(mach, 'rooftop_machinery.glb');

  console.log('--- ALL 5 V4 HERO GLB ASSETS AUTHORED AND PERSISTED WITH GROUND DATUM PIVOTS! ---');
}

run().catch((err) => {
  console.error('Fatal error building V4 assets:', err);
  process.exit(1);
});


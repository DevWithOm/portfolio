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
        console.log(`[AUTHORED ASSET] Exported ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
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

// -------------------------------------------------------------
// 1. HERO VEHICLE: Aerodyne Tactical Spinner (aerodyne_spinner.glb)
// -------------------------------------------------------------
function buildAerodyneSpinner() {
  const group = new THREE.Group();
  group.name = 'Aerodyne_Spinner_Hero';

  // Materials with PBR attributes
  const titaniumHullMat = new THREE.MeshStandardMaterial({
    color: 0x0B1019,
    metalness: 0.88,
    roughness: 0.22,
    name: 'Titanium_Composite_Hull'
  });
  const carbonChassisMat = new THREE.MeshStandardMaterial({
    color: 0x06080D,
    metalness: 0.7,
    roughness: 0.45,
    name: 'Carbon_Chassis_Panels'
  });
  const cyanGlowMat = new THREE.MeshBasicMaterial({
    color: 0x00E5FF,
    name: 'Cyan_Luminescent_Core'
  });
  const amberGlowMat = new THREE.MeshBasicMaterial({
    color: 0xF59E0B,
    name: 'Amber_Tactical_Trim'
  });
  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0x00E5FF,
    transparent: true,
    opacity: 0.72,
    metalness: 0.95,
    roughness: 0.08,
    name: 'Cockpit_Canopy_Glass'
  });

  // Main Chiseled Aerodynamic Fuselage
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.46, 3.4), titaniumHullMat);
  fuselage.position.set(0, 0, 0);
  fuselage.castShadow = true;
  group.add(fuselage);

  // Underside Aerodynamic Keel
  const keel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 2.8), carbonChassisMat);
  keel.position.set(0, -0.28, 0.1);
  group.add(keel);

  // Twin Forward Intake Wedge Pontoons
  for (const side of [-1, 1]) {
    const pontoon = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.34, 1.4), titaniumHullMat);
    pontoon.position.set(side * 0.74, -0.05, -1.25);
    pontoon.castShadow = true;
    group.add(pontoon);

    // Illuminated Vertical Radiator Slats in Pontoons
    for (let s = -0.1; s <= 0.1; s += 0.08) {
      const slat = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.24), cyanGlowMat);
      slat.position.set(side * 0.74 + s, -0.05, -1.96);
      group.add(slat);
    }

    // Side Ducted Hover Turbine Nacelles with Rotating Flow Rings
    const nacelleHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.48, 12), carbonChassisMat);
    nacelleHousing.rotation.x = Math.PI / 2;
    nacelleHousing.position.set(side * 1.45, -0.06, 0.4);
    nacelleHousing.castShadow = true;
    group.add(nacelleHousing);

    // Glowing Cyan Intake Core Ring
    const nacelleRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.035, 8, 16), cyanGlowMat);
    nacelleRing.position.set(side * 1.45, -0.06, 0.4);
    group.add(nacelleRing);
  }

  // Swept Wings with Upturned Winglets
  const wings = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 1.25), titaniumHullMat);
  wings.position.set(0, 0.06, 0.32);
  wings.castShadow = true;
  group.add(wings);

  // Amber Leading Edge Pinstripe Trims
  const wingTrim = new THREE.Mesh(new THREE.BoxGeometry(3.82, 0.09, 0.06), amberGlowMat);
  wingTrim.position.set(0, 0.06, 0.94);
  group.add(wingTrim);

  // Upturned Winglet Fins
  for (const side of [-1, 1]) {
    const winglet = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.85), titaniumHullMat);
    winglet.position.set(side * 1.9, 0.26, 0.25);
    winglet.rotation.z = side * -0.25;
    group.add(winglet);
  }

  // Multi-Faceted Cockpit Canopy
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.44, 8, 6), canopyMat);
  canopy.scale.set(0.96, 0.54, 1.92);
  canopy.position.set(0, 0.38, -0.22);
  group.add(canopy);

  // Cockpit Console HUD Glow
  const hudConsole = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.35), cyanGlowMat);
  hudConsole.position.set(0, 0.3, -0.45);
  group.add(hudConsole);

  // Twin Rear Plasma Jet Thrusters
  for (const side of [-1, 1]) {
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.45, 10), carbonChassisMat);
    nozzle.rotation.x = Math.PI / 2;
    nozzle.position.set(side * 0.48, 0.02, 1.72);
    group.add(nozzle);

    const plasmaCore = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.12, 8), cyanGlowMat);
    plasmaCore.rotation.x = Math.PI / 2;
    plasmaCore.position.set(side * 0.48, 0.02, 1.92);
    group.add(plasmaCore);
  }

  // Dual Projector Headlights
  for (const side of [-1, 1]) {
    const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.08), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    headlight.position.set(side * 0.45, 0.08, -1.72);
    group.add(headlight);
  }

  return group;
}

// -------------------------------------------------------------
// 2. HERO OPERATIVE: Articulated Cyber-Netrunner (cyber_operative.glb)
// -------------------------------------------------------------
function buildCyberOperative() {
  const group = new THREE.Group();
  group.name = 'Cyber_Netrunner_Operative';

  // High-Grade PBR Materials
  const jacketMat = new THREE.MeshStandardMaterial({
    color: 0xF5CE13, // High-visibility signal yellow
    roughness: 0.35,
    metalness: 0.14,
    name: 'Ballistic_Jacket_Fabric'
  });
  const blackTacticalMat = new THREE.MeshStandardMaterial({
    color: 0x090D14,
    roughness: 0.72,
    metalness: 0.25,
    name: 'Tactical_Armor_Plating'
  });
  const redHelmetMat = new THREE.MeshStandardMaterial({
    color: 0xDE1A35, // Crimson tactical helmet
    roughness: 0.28,
    metalness: 0.42,
    name: 'Chiseled_Cyber_Helmet'
  });
  const cyanGlowMat = new THREE.MeshBasicMaterial({
    color: 0x00E5FF,
    name: 'Cyan_Sensor_Glow'
  });
  const amberGlowMat = new THREE.MeshBasicMaterial({
    color: 0xF59E0B,
    name: 'Amber_Telemetry_LED'
  });
  const bootMat = new THREE.MeshStandardMaterial({
    color: 0x05070A,
    roughness: 0.4,
    metalness: 0.65,
    name: 'Reinforced_Boots'
  });

  // Torso in Signal Yellow Tactical Jacket
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.58, 6, 12), jacketMat);
  torso.position.set(0, 0.95, 0);
  torso.castShadow = true;
  group.add(torso);

  // Ballistic Chest Armor Plate
  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.52, 0.48), blackTacticalMat);
  vest.position.set(0, 0.9, 0.04);
  vest.castShadow = true;
  group.add(vest);

  // Cross-Chest Tactical Webbing Harness with Utility Buckles
  const strap = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.52), blackTacticalMat);
  strap.rotation.z = 0.45;
  strap.position.set(0, 0.94, 0.05);
  group.add(strap);

  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.54), new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.9, roughness: 0.2 }));
  buckle.position.set(0, 0.94, 0.06);
  group.add(buckle);

  // Luminescent High Collar
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.28, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xFCEE0A }));
  collar.position.set(0, 1.36, 0.04);
  collar.rotation.x = 0.1;
  group.add(collar);

  // Angular Red Tactical Cyber-Helmet
  const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.46), redHelmetMat);
  helmet.position.set(0, 1.56, 0.02);
  helmet.castShadow = true;
  group.add(helmet);

  // Chiseled Facemask / Visor Chassis
  const visorHousing = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.36, 4), redHelmetMat);
  visorHousing.rotation.x = -Math.PI / 4;
  visorHousing.rotation.y = Math.PI / 4;
  visorHousing.position.set(0, 1.54, 0.22);
  group.add(visorHousing);

  // Optical Sensor Diode Slit (Cyan Luminescent)
  const sensorSlot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.04), cyanGlowMat);
  sensorSlot.position.set(0, 1.58, 0.28);
  group.add(sensorSlot);

  // Comms Antenna & Data Port
  const commsAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.38, 6), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 }));
  commsAntenna.rotation.z = -0.3;
  commsAntenna.position.set(-0.24, 1.76, -0.1);
  group.add(commsAntenna);

  // Left Arm (Ballistic Sleeve & Cyber-Forearm Plating)
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.52, 6, 8), jacketMat);
  leftArm.position.set(-0.46, 0.82, 0.22);
  leftArm.rotation.x = -0.42;
  leftArm.castShadow = true;
  group.add(leftArm);

  const leftLed = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), amberGlowMat);
  leftLed.position.set(-0.54, 0.72, 0.35);
  group.add(leftLed);

  // Right Arm (Titanium Cybernetic Arm Chassis)
  const rightArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.52, 6, 8), jacketMat);
  rightArm.position.set(0.46, 0.82, 0.22);
  rightArm.rotation.x = -0.42;
  rightArm.castShadow = true;
  group.add(rightArm);

  const rightConduit = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.65, 6), cyanGlowMat);
  rightConduit.position.set(0.48, 0.82, 0.22);
  rightConduit.rotation.x = -0.42;
  group.add(rightConduit);

  // Back Field Tech Pack & Scabbard
  const backPack = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.58, 0.24), blackTacticalMat);
  backPack.position.set(0, 0.96, -0.36);
  backPack.castShadow = true;
  group.add(backPack);

  const scabbard = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6), new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.85, roughness: 0.2 }));
  scabbard.rotation.z = 0.55;
  scabbard.position.set(0.12, 1.15, -0.46);
  group.add(scabbard);

  // Seated Legs (Pelvis & Thighs)
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.65, 6, 8), blackTacticalMat);
    leg.position.set(side * 0.25, 0.15, -0.36);
    leg.rotation.x = 0.82;
    leg.castShadow = true;
    group.add(leg);

    // Yellow Leg Harness Straps
    const legStrap = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 6, 12), new THREE.MeshBasicMaterial({ color: 0xFCEE0A }));
    legStrap.position.set(side * 0.25, 0.25, -0.28);
    legStrap.rotation.x = Math.PI / 2.5;
    group.add(legStrap);

    // Knee Armor Plate
    const kneeArmor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.06), blackTacticalMat);
    kneeArmor.position.set(side * 0.25, 0.12, -0.15);
    group.add(kneeArmor);

    // Armored Boots with Gripped Soles
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.42), bootMat);
    boot.position.set(side * 0.25, -0.38, -0.62);
    group.add(boot);
  }

  return group;
}

// -------------------------------------------------------------
// 3. ROOFTOP MACHINERY: Industrial Mechanical Kit (rooftop_machinery.glb)
// -------------------------------------------------------------
function buildRooftopMachinery() {
  const group = new THREE.Group();
  group.name = 'Rooftop_Industrial_Machinery';

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.85,
    roughness: 0.28,
    name: 'Weathered_Industrial_Steel'
  });
  const darkAlloyMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.7,
    roughness: 0.4,
    name: 'Alloy_Enclosure_Casing'
  });
  const sheetDuctMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.75,
    roughness: 0.3,
    name: 'Galvanized_Sheet_Duct'
  });
  const warningYellowMat = new THREE.MeshBasicMaterial({
    color: 0xFCEE0A,
    name: 'Hazard_Caution_Yellow'
  });

  // A. Main HVAC Compressor Enclosure
  const hvac = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.9, 2.2), darkAlloyMat);
  hvac.position.set(0, 0.95, 0);
  hvac.castShadow = true;
  group.add(hvac);

  // Louvered Side Ventilation Slits on HVAC
  for (let y = 0.3; y <= 1.6; y += 0.22) {
    const louver = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 0.05), steelMat);
    louver.position.set(0, y, 1.12);
    group.add(louver);
  }

  // 4-Blade Cooling Fan Assembly inside housing
  const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 12), steelMat);
  fanHub.position.set(0, 1.05, 1.15);
  group.add(fanHub);

  for (let b = 0; b < 4; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.03), steelMat);
    blade.rotation.z = (b * Math.PI) / 2;
    blade.position.set(0, 1.05, 1.15);
    group.add(blade);
  }

  // B. Heavy Industrial Flanged Pipe Conduit
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.8, 12), steelMat);
  pipe.rotation.z = Math.PI / 2;
  pipe.position.set(0, 0.35, -1.8);
  pipe.castShadow = true;
  group.add(pipe);

  // Pipe Flanges
  for (const px of [-1.8, 0, 1.8]) {
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 12), steelMat);
    flange.rotation.z = Math.PI / 2;
    flange.position.set(px, 0.35, -1.8);
    group.add(flange);
  }

  // C. Electrical Junction Breaker Box
  const breakerBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.4), darkAlloyMat);
  breakerBox.position.set(-1.8, 0.75, 0);
  breakerBox.castShadow = true;
  group.add(breakerBox);

  // Caution Hazard Stripe on Breaker Door
  const cautionStrip = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.1, 0.02), warningYellowMat);
  cautionStrip.position.set(-1.8, 0.85, 0.21);
  group.add(cautionStrip);

  // Status LED on Breaker Box (Cyan)
  const statusLed = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0x00E5FF }));
  statusLed.position.set(-1.8, 1.1, 0.21);
  group.add(statusLed);

  // D. Sheet Metal Ventilation Exhaust Duct
  const duct = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 4.5), sheetDuctMat);
  duct.position.set(2.4, 0.7, 0);
  duct.castShadow = true;
  group.add(duct);

  return group;
}

// -------------------------------------------------------------
// 4. CORPORATE SKYSCRAPER COMPLEX: Tower 1 Monolith (corporate_skyscraper.glb)
// -------------------------------------------------------------
function buildCorporateSkyscraper() {
  const group = new THREE.Group();
  group.name = 'Corporate_Skyscraper_Tower1';

  const facadeConcreteMat = new THREE.MeshStandardMaterial({
    color: 0x0A0E18,
    metalness: 0.75,
    roughness: 0.32,
    name: 'Tower_Architectural_Facade'
  });
  const columnSteelMat = new THREE.MeshStandardMaterial({
    color: 0x141B26,
    metalness: 0.9,
    roughness: 0.2,
    name: 'Structural_Steel_Columns'
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x00E5FF,
    transparent: true,
    opacity: 0.8,
    metalness: 0.95,
    roughness: 0.05,
    name: 'Curtain_Wall_Glass'
  });

  // Main Skyscraper Core (11m x 42m x 11m)
  const core = new THREE.Mesh(new THREE.BoxGeometry(10.8, 42, 10.8), facadeConcreteMat);
  core.position.set(0, 21, 0);
  group.add(core);

  // 4 Corner Structural Columns with 3D Depth
  for (const cx of [-5.4, 5.4]) {
    for (const cz of [-5.4, 5.4]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.85, 42.4, 0.85), columnSteelMat);
      col.position.set(cx, 21.2, cz);
      col.castShadow = true;
      group.add(col);
    }
  }

  // Recessed Horizontal Floor Spandrel Bands (Every 3.5m)
  for (let y = 3.5; y <= 38.5; y += 3.5) {
    const spandrelFront = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.45, 0.35), columnSteelMat);
    spandrelFront.position.set(0, y, 5.45);
    group.add(spandrelFront);

    const spandrelSide = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 11.2), columnSteelMat);
    spandrelSide.position.set(5.45, y, 0);
    group.add(spandrelSide);
  }

  // Recessed Window Reveal Modules with Real Geometry (Front & Right Facades)
  for (let floor = 0; floor < 10; floor++) {
    const fy = 5.5 + floor * 3.5;
    for (let bay = -2; bay <= 2; bay++) {
      // Front Facade Window Reveal
      const winFront = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.15), glassMat);
      winFront.position.set(bay * 2.0, fy, 5.42);
      group.add(winFront);

      // Right Facade Window Reveal (visible from camera view!)
      const winRight = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 1.2), glassMat);
      winRight.position.set(5.42, fy, bay * 2.0);
      group.add(winRight);
    }
  }

  // Mechanical Floor with Louver Slits (Mid-Tower Service Band)
  const mechBand = new THREE.Mesh(new THREE.BoxGeometry(11.4, 2.8, 11.4), columnSteelMat);
  mechBand.position.set(0, 22.5, 0);
  group.add(mechBand);

  // Setback Penthouse Crown
  const crown = new THREE.Mesh(new THREE.BoxGeometry(7.6, 5.2, 7.6), facadeConcreteMat);
  crown.position.set(0, 44.6, 0);
  crown.castShadow = true;
  group.add(crown);

  // Rooftop Perimeter Parapet & Maintenance Gantry
  const roofParapet = new THREE.Mesh(new THREE.BoxGeometry(7.9, 0.8, 7.9), columnSteelMat);
  roofParapet.position.set(0, 47.4, 0);
  group.add(roofParapet);

  // Heavy Communications Antenna Mast & Lightning Rod
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.18, 9.5, 8), columnSteelMat);
  mast.position.set(0, 51.5, 0);
  group.add(mast);

  const mastStrut = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 1.6), columnSteelMat);
  mastStrut.position.set(0, 48.5, 0);
  group.add(mastStrut);

  // Aviation Warning Hazard Strobe Beacon (Red)
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), new THREE.MeshBasicMaterial({ color: 0xFF0033 }));
  beacon.position.set(0, 56.4, 0);
  group.add(beacon);

  return group;
}

// -------------------------------------------------------------
// 5. SECONDARY ARCOLOGY: Stepped Brutalist Arcology (secondary_arcology.glb)
// -------------------------------------------------------------
function buildSecondaryArcology() {
  const group = new THREE.Group();
  group.name = 'Secondary_Brutalist_Arcology_Tower2';

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x070A12,
    metalness: 0.55,
    roughness: 0.65,
    name: 'Brutalist_Heavy_Concrete'
  });
  const alloyTrussMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.85,
    roughness: 0.25,
    name: 'Alloy_Truss_Conduits'
  });

  // Tier 1 Base Block (13m x 20m x 13m)
  const baseTier = new THREE.Mesh(new THREE.BoxGeometry(13, 20, 13), concreteMat);
  baseTier.position.set(0, 10, 0);
  baseTier.castShadow = true;
  group.add(baseTier);

  // Tier 2 Mid Block Setback (10m x 16m x 10m)
  const midTier = new THREE.Mesh(new THREE.BoxGeometry(10, 16, 10), concreteMat);
  midTier.position.set(0, 28, 0);
  midTier.castShadow = true;
  group.add(midTier);

  // Tier 3 Apex Crown Setback (7m x 12m x 7m)
  const apexTier = new THREE.Mesh(new THREE.BoxGeometry(7, 12, 7), concreteMat);
  apexTier.position.set(0, 42, 0);
  apexTier.castShadow = true;
  group.add(apexTier);

  // Cantilevered Service Balconies on Tier Ledges
  const balcony1 = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.45, 1.4), alloyTrussMat);
  balcony1.position.set(0, 20.2, 5.8);
  group.add(balcony1);

  const balcony2 = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.45, 1.4), alloyTrussMat);
  balcony2.position.set(0, 36.2, 4.3);
  group.add(balcony2);

  // External Vertical Service Conduit Shaft running up the building face
  const conduitShaft = new THREE.Mesh(new THREE.BoxGeometry(0.65, 48, 0.65), alloyTrussMat);
  conduitShaft.position.set(3.8, 24, 5.3);
  group.add(conduitShaft);

  // Illuminated Cyan Conduit Runner Track
  const conduitLight = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 47), new THREE.MeshBasicMaterial({ color: 0x00E5FF }));
  conduitLight.position.set(3.8, 24, 5.64);
  group.add(conduitLight);

  return group;
}

// -------------------------------------------------------------
// MAIN BUILD EXECUTION
// -------------------------------------------------------------
async function buildAll() {
  console.log('=== NIGHT CITY V2.3: AUTHORED GLB 3D ASSET COMPILATION ===');

  await exportGLB(buildAerodyneSpinner(), 'aerodyne_spinner.glb');
  await exportGLB(buildCyberOperative(), 'cyber_operative.glb');
  await exportGLB(buildRooftopMachinery(), 'rooftop_machinery.glb');
  await exportGLB(buildCorporateSkyscraper(), 'corporate_skyscraper.glb');
  await exportGLB(buildSecondaryArcology(), 'secondary_arcology.glb');

  console.log('=== ALL 5 AUTHORED 3D GLB ASSETS EXPORTED SUCCESSFULLY ===');
}

buildAll().catch((err) => {
  console.error('Fatal export error:', err);
  process.exit(1);
});


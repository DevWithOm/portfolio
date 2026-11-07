import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type QualityTier = 'cinematic' | 'balanced' | 'performance';

interface CyberCitySceneProps {
  scrollYProgress?: number;
  qualityTier?: QualityTier;
  reducedMotion?: boolean;
}

export const CyberCityScene: React.FC<CyberCitySceneProps> = ({
  scrollYProgress = 0,
  qualityTier = 'balanced',
  reducedMotion = false
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  // Mutable ref for scroll progress to eliminate stale closures and prevent scene re-mounting
  const scrollYProgressRef = useRef<number>(scrollYProgress);
  useEffect(() => {
    scrollYProgressRef.current = scrollYProgress;
  }, [scrollYProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. WebGL Support Validation
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Resource tracking for complete disposal
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];

    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposableGeometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      disposableMaterials.push(m);
      return m;
    };
    const trackTex = <T extends THREE.Texture>(t: T): T => {
      disposableTextures.push(t);
      return t;
    };

    // 2. Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070B);
    const fogDensity = qualityTier === 'performance' ? 0.0042 : 0.0034;
    scene.fog = new THREE.FogExp2(0x05070B, fogDensity);

    // 3. Perspective Camera
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    camera.position.set(0, 4.2, 14.5);
    camera.lookAt(0, 1.8, -20);

    // 4. WebGL Renderer with Soft Shadow Mapping
    const dprCap = qualityTier === 'cinematic' ? 2.0 : qualityTier === 'balanced' ? 1.5 : 1.0;
    const renderer = new THREE.WebGLRenderer({
      antialias: qualityTier !== 'performance',
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    if (qualityTier !== 'performance') {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else {
      renderer.shadowMap.enabled = false;
    }

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 5. Post-Processing Pipeline (Cinematic & Balanced tiers)
    let composer: EffectComposer | null = null;
    if (qualityTier !== 'performance') {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomStrength = qualityTier === 'cinematic' ? 0.45 : 0.32;
      const bloomRadius = 0.35;
      const bloomThreshold = 0.65;
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        bloomStrength,
        bloomRadius,
        bloomThreshold
      );
      composer.addPass(bloomPass);

      const outputPass = new OutputPass();
      composer.addPass(outputPass);
    }

    // 6. Cinematic Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0a101f, 0.45);
    scene.add(ambientLight);

    // Canyon Key Light from upper-left (casts soft shadows)
    const cyanKey = new THREE.DirectionalLight(0x00E5FF, 1.65);
    cyanKey.position.set(-28, 24, 14);
    if (qualityTier !== 'performance') {
      cyanKey.castShadow = true;
      cyanKey.shadow.mapSize.width = 1024;
      cyanKey.shadow.mapSize.height = 1024;
      cyanKey.shadow.camera.near = 5;
      cyanKey.shadow.camera.far = 75;
      cyanKey.shadow.camera.left = -16;
      cyanKey.shadow.camera.right = 16;
      cyanKey.shadow.camera.top = 16;
      cyanKey.shadow.camera.bottom = -16;
      cyanKey.shadow.bias = -0.0005;
    }
    scene.add(cyanKey);

    // Billboard Warm Magenta Rim Light from right
    const warmRim = new THREE.DirectionalLight(0xFF2E88, 1.3);
    warmRim.position.set(28, 18, 6);
    scene.add(warmRim);

    // Local Terrace Spotlight
    const yellowAccent = new THREE.PointLight(0xFCEE0A, 1.8, 22, 1.2);
    yellowAccent.position.set(0, 3.2, 0);
    scene.add(yellowAccent);

    // 7. Foreground: Rooftop Terrace & True Planar Reflector
    const terraceGroup = new THREE.Group();

    // Structural Base Deck with Localized Puddle Boundaries (Inspired by Reference Image 5)
    const platformGeo = trackGeo(new THREE.BoxGeometry(32, 1.2, 22));
    const asphaltCanvas = document.createElement('canvas');
    asphaltCanvas.width = 1024;
    asphaltCanvas.height = 1024;
    const aCtx = asphaltCanvas.getContext('2d')!;
    
    // Gritty macro gravel concrete base
    aCtx.fillStyle = '#090D15';
    aCtx.fillRect(0, 0, 1024, 1024);

    // Realistic aggregate gravel grain and surface wear
    for (let i = 0; i < 600; i++) {
      aCtx.fillStyle = Math.random() > 0.5 ? '#141B26' : '#06080D';
      aCtx.fillRect(Math.random() * 1024, Math.random() * 1024, 3 + Math.random() * 6, 3 + Math.random() * 6);
    }

    // Localized natural puddle pools with organic curved boundaries
    aCtx.fillStyle = '#04060A'; // Deep water pool base
    aCtx.beginPath();
    aCtx.moveTo(420, 480);
    aCtx.bezierCurveTo(340, 520, 360, 680, 520, 740);
    aCtx.bezierCurveTo(680, 800, 840, 720, 880, 600);
    aCtx.bezierCurveTo(920, 480, 780, 420, 620, 440);
    aCtx.closePath();
    aCtx.fill();

    // Secondary localized puddle lobe
    aCtx.beginPath();
    aCtx.ellipse(280, 420, 140, 80, -0.2, 0, Math.PI * 2);
    aCtx.fill();

    // Subtle wet asphalt gradient rim around puddles
    aCtx.strokeStyle = '#101722';
    aCtx.lineWidth = 14;
    aCtx.stroke();

    const asphaltTex = trackTex(new THREE.CanvasTexture(asphaltCanvas));
    asphaltTex.wrapS = THREE.RepeatWrapping;
    asphaltTex.wrapT = THREE.RepeatWrapping;
    asphaltTex.repeat.set(2, 2);

    const platformMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x0B0F17,
      roughness: 0.38,
      metalness: 0.55,
      map: asphaltTex
    }));
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, -0.6, 6);
    platform.receiveShadow = true;
    terraceGroup.add(platform);

    // Believable Localized Planar Reflector for Puddles (Positioned over main pool)
    if (qualityTier !== 'performance') {
      const reflectorGeo = trackGeo(new THREE.PlaneGeometry(16, 9));
      const reflectorSize = qualityTier === 'cinematic' ? 512 : 256;
      const groundReflector = new Reflector(reflectorGeo, {
        clipBias: 0.003,
        textureWidth: reflectorSize,
        textureHeight: reflectorSize,
        color: 0x556677
      });
      groundReflector.position.set(2.0, 0.02, 5.2);
      groundReflector.rotation.x = -Math.PI / 2;
      terraceGroup.add(groundReflector);
    }

    // Parapet Wall & Coping Ledge
    const parapetGeo = trackGeo(new THREE.BoxGeometry(32, 0.5, 0.9));
    const parapetMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.45,
      metalness: 0.35
    }));
    const parapet = new THREE.Mesh(parapetGeo, parapetMat);
    parapet.position.set(0, 0.25, -2.55);
    parapet.receiveShadow = true;
    terraceGroup.add(parapet);

    // Yellow Hazard Caution Stripes along coping
    const hazardCanvas = document.createElement('canvas');
    hazardCanvas.width = 512;
    hazardCanvas.height = 32;
    const hCtx = hazardCanvas.getContext('2d')!;
    hCtx.fillStyle = '#0a0a0a';
    hCtx.fillRect(0, 0, 512, 32);
    hCtx.fillStyle = '#FCEE0A';
    for (let s = 0; s < 512; s += 32) {
      hCtx.beginPath();
      hCtx.moveTo(s, 0);
      hCtx.lineTo(s + 16, 0);
      hCtx.lineTo(s, 32);
      hCtx.lineTo(s - 16, 32);
      hCtx.fill();
    }
    const hazardTex = trackTex(new THREE.CanvasTexture(hazardCanvas));
    hazardTex.wrapS = THREE.RepeatWrapping;
    hazardTex.repeat.set(16, 1);
    const hazardGeo = trackGeo(new THREE.PlaneGeometry(32, 0.22));
    const hazardMat = trackMat(new THREE.MeshBasicMaterial({ map: hazardTex }));
    const hazardStrip = new THREE.Mesh(hazardGeo, hazardMat);
    hazardStrip.position.set(0, 0.51, -2.15);
    hazardStrip.rotation.x = -Math.PI / 2;
    terraceGroup.add(hazardStrip);

    // Industrial Metal Railings
    const railMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 }));
    const railTopGeo = trackGeo(new THREE.CylinderGeometry(0.04, 0.04, 32, 8));
    const railTop = new THREE.Mesh(railTopGeo, railMat);
    railTop.rotation.z = Math.PI / 2;
    railTop.position.set(0, 1.15, -2.8);
    terraceGroup.add(railTop);

    const postGeo = trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 0.7, 8));
    for (let p = -14; p <= 14; p += 3.5) {
      const post = new THREE.Mesh(postGeo, railMat);
      post.position.set(p, 0.8, -2.8);
      terraceGroup.add(post);
    }

    // Industrial Infrastructure: Ventilation Duct & HVAC Compressors
    const ductGeo = trackGeo(new THREE.BoxGeometry(1.6, 1.4, 8));
    const ductMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.75, roughness: 0.3 }));
    const duct = new THREE.Mesh(ductGeo, ductMat);
    duct.position.set(-9.5, 0.7, 4);
    duct.castShadow = true;
    duct.receiveShadow = true;
    terraceGroup.add(duct);

    // HVAC Compressor Unit with Animated Fan
    const hvacGeo = trackGeo(new THREE.BoxGeometry(2.4, 1.8, 2));
    const hvacMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.6, roughness: 0.4 }));
    const hvac = new THREE.Mesh(hvacGeo, hvacMat);
    hvac.position.set(-6.5, 0.9, 5.5);
    hvac.castShadow = true;
    hvac.receiveShadow = true;
    terraceGroup.add(hvac);

    // HVAC Rotating Fan
    const fanGroup = new THREE.Group();
    const fanBladeGeo = trackGeo(new THREE.BoxGeometry(0.12, 1.1, 0.03));
    const fanBladeMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x0F172A }));
    for (let f = 0; f < 4; f++) {
      const blade = new THREE.Mesh(fanBladeGeo, fanBladeMat);
      blade.rotation.z = (f * Math.PI) / 2;
      fanGroup.add(blade);
    }
    fanGroup.position.set(-6.5, 1.1, 6.52);
    terraceGroup.add(fanGroup);

    // Conduit Pipes
    const pipeGeo = trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 12, 8));
    const pipeMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x64748B, metalness: 0.85, roughness: 0.2 }));
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(-4, 0.25, 1.5);
    terraceGroup.add(pipe);

    scene.add(terraceGroup);

    // 8. Original Hero Cyber-Netrunner Operative (Articulated Tactical Chassis)
    // Inspired by turn-around concept art: Tactical yellow jacket, red cyber-helmet, leg harness
    const operativeGroup = new THREE.Group();

    // High-spec PBR materials
    const jacketMat = trackMat(new THREE.MeshStandardMaterial({ 
      color: 0xF5CE13, 
      roughness: 0.35, 
      metalness: 0.15 
    }));
    const jacketTrimMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x0A0D14, roughness: 0.8, metalness: 0.1 }));
    const vestMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x080C14, roughness: 0.7, metalness: 0.3 }));
    const pantsMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x090C12, roughness: 0.65 }));
    const helmetMat = trackMat(new THREE.MeshStandardMaterial({ color: 0xDE1A35, roughness: 0.25, metalness: 0.4 }));
    const bootMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x06080D, roughness: 0.35, metalness: 0.65 }));
    const cyberGlowCyan = trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF }));
    const cyberGlowYellow = trackMat(new THREE.MeshBasicMaterial({ color: 0xFCEE0A }));
    const cyberGlowAmber = trackMat(new THREE.MeshBasicMaterial({ color: 0xF59E0B }));

    // Torso in high-visibility tactical yellow ballistic jacket
    const torso = new THREE.Mesh(trackGeo(new THREE.CapsuleGeometry(0.38, 0.58, 6, 12)), jacketMat);
    torso.position.set(0, 0.95, 0);
    torso.castShadow = true;
    operativeGroup.add(torso);

    // Tactical Armor Vest with ballistic plating & webbing straps
    const vest = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.72, 0.52, 0.48)), vestMat);
    vest.position.set(0, 0.9, 0.04);
    vest.castShadow = true;
    operativeGroup.add(vest);

    // Cross-body tactical utility strap (Black harness webbing)
    const strapGeo = trackGeo(new THREE.BoxGeometry(0.1, 0.8, 0.52));
    const strap = new THREE.Mesh(strapGeo, jacketTrimMat);
    strap.rotation.z = 0.45;
    strap.position.set(0, 0.94, 0.05);
    operativeGroup.add(strap);

    // Original Emblem: Hex-Core Neural Falcon / Cyber-Vortex Glyph (100% Original IP)
    const crestCanvas = document.createElement('canvas');
    crestCanvas.width = 256;
    crestCanvas.height = 256;
    const cCtx = crestCanvas.getContext('2d')!;
    cCtx.clearRect(0, 0, 256, 256);
    
    // Outer hexagonal circuit ring
    cCtx.strokeStyle = '#FCEE0A';
    cCtx.lineWidth = 6;
    cCtx.beginPath();
    for (let a = 0; a < 6; a++) {
      const angle = (a * Math.PI) / 3;
      const x = 128 + 90 * Math.cos(angle);
      const y = 128 + 90 * Math.sin(angle);
      if (a === 0) cCtx.moveTo(x, y);
      else cCtx.lineTo(x, y);
    }
    cCtx.closePath();
    cCtx.stroke();

    // Geometric Neural Falcon Wing Glyphs (Crimson & Cyan)
    cCtx.fillStyle = '#FF1838';
    // Left Cyber-Wing
    cCtx.beginPath();
    cCtx.moveTo(128, 90);
    cCtx.lineTo(60, 60);
    cCtx.lineTo(40, 110);
    cCtx.lineTo(80, 140);
    cCtx.lineTo(55, 170);
    cCtx.lineTo(105, 160);
    cCtx.lineTo(128, 185);
    cCtx.closePath();
    cCtx.fill();

    // Right Cyber-Wing
    cCtx.beginPath();
    cCtx.moveTo(128, 90);
    cCtx.lineTo(196, 60);
    cCtx.lineTo(216, 110);
    cCtx.lineTo(176, 140);
    cCtx.lineTo(201, 170);
    cCtx.lineTo(151, 160);
    cCtx.lineTo(128, 185);
    cCtx.closePath();
    cCtx.fill();

    // Central Hex Core (Cyan Luminescent)
    cCtx.fillStyle = '#00E5FF';
    cCtx.beginPath();
    for (let a = 0; a < 6; a++) {
      const angle = (a * Math.PI) / 3 + Math.PI / 6;
      const x = 128 + 26 * Math.cos(angle);
      const y = 128 + 26 * Math.sin(angle);
      if (a === 0) cCtx.moveTo(x, y);
      else cCtx.lineTo(x, y);
    }
    cCtx.closePath();
    cCtx.fill();

    // Technical Operative Stencil Text: 'OV_SYS // 714'
    cCtx.fillStyle = '#FFFFFF';
    cCtx.font = 'bold 16px monospace';
    cCtx.textAlign = 'center';
    cCtx.fillText('OV_SYS // 714', 128, 225);

    const crestTex = trackTex(new THREE.CanvasTexture(crestCanvas));
    const crestMat = trackMat(new THREE.MeshBasicMaterial({ map: crestTex, transparent: true, side: THREE.DoubleSide }));
    const crestMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(0.55, 0.55)), crestMat);
    crestMesh.position.set(0, 0.95, -0.32);
    crestMesh.rotation.y = Math.PI;
    operativeGroup.add(crestMesh);

    // Luminescent High Collar (Signal Yellow)
    const collar = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.28, 0.32, 0.28, 12, 1, true)), cyberGlowYellow);
    collar.position.set(0, 1.36, 0.04);
    collar.rotation.x = 0.1;
    operativeGroup.add(collar);

    // Angular Red Tactical Cyber-Helmet (matches turn-around reference)
    const helmetHead = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.42, 0.44, 0.46)), helmetMat);
    helmetHead.position.set(0, 1.56, 0.02);
    helmetHead.castShadow = true;
    operativeGroup.add(helmetHead);

    // Angular Chiseled Facemask / Visor Housing
    const visorChassisGeo = trackGeo(new THREE.ConeGeometry(0.28, 0.36, 4));
    const visorChassis = new THREE.Mesh(visorChassisGeo, helmetMat);
    visorChassis.rotation.x = -Math.PI / 4;
    visorChassis.rotation.y = Math.PI / 4;
    visorChassis.position.set(0, 1.54, 0.22);
    operativeGroup.add(visorChassis);

    // Glowing Optical Sensor Slot (Cyan Diode Slit)
    const sensorSlot = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.28, 0.06, 0.04)), cyberGlowCyan);
    sensorSlot.position.set(0, 1.58, 0.28);
    operativeGroup.add(sensorSlot);

    // Tactical Comms Antenna & Data Port
    const commsAntenna = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.015, 0.015, 0.38, 6)), trackMat(new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 })));
    commsAntenna.rotation.z = -0.3;
    commsAntenna.position.set(-0.24, 1.76, -0.1);
    operativeGroup.add(commsAntenna);

    // Left Arm (Tactical Ballistic Sleeve + Forearm Cyber-Plating)
    const leftArm = new THREE.Mesh(trackGeo(new THREE.CapsuleGeometry(0.12, 0.52, 6, 8)), jacketMat);
    leftArm.position.set(-0.46, 0.82, 0.22);
    leftArm.rotation.x = -0.42;
    leftArm.castShadow = true;
    operativeGroup.add(leftArm);

    // Left Forearm Telemetry Status Diode (Amber)
    const leftLed = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.025, 6, 6)), cyberGlowAmber);
    leftLed.position.set(-0.54, 0.72, 0.35);
    operativeGroup.add(leftLed);

    // Right Arm (Titanium Cybernetic Arm Chassis)
    const rightArm = new THREE.Mesh(trackGeo(new THREE.CapsuleGeometry(0.12, 0.52, 6, 8)), jacketMat);
    rightArm.position.set(0.46, 0.82, 0.22);
    rightArm.rotation.x = -0.42;
    rightArm.castShadow = true;
    operativeGroup.add(rightArm);

    // Glowing Neural Data Conduit Cable running down right arm
    const wireGeo = trackGeo(new THREE.CylinderGeometry(0.014, 0.014, 0.65, 6));
    const wire = new THREE.Mesh(wireGeo, cyberGlowCyan);
    wire.position.set(0.48, 0.82, 0.22);
    wire.rotation.x = -0.42;
    operativeGroup.add(wire);

    // Back Field Tech Pack / Chassis
    const backPackGeo = trackGeo(new THREE.BoxGeometry(0.46, 0.58, 0.24));
    const backPackMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x0E1420, metalness: 0.6, roughness: 0.4 }));
    const backPack = new THREE.Mesh(backPackGeo, backPackMat);
    backPack.position.set(0, 0.96, -0.36);
    operativeGroup.add(backPack);

    // Tactical Scabbard / Antenna Rig mounted diagonally across back pack
    const scabbardGeo = trackGeo(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 6));
    const scabbardMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.85, roughness: 0.2 }));
    const scabbard = new THREE.Mesh(scabbardGeo, scabbardMat);
    scabbard.rotation.z = 0.55;
    scabbard.position.set(0.12, 1.15, -0.46);
    operativeGroup.add(scabbard);

    // Contoured Legs in Tactical Dark Cargo Trousers
    const leftLeg = new THREE.Mesh(trackGeo(new THREE.CapsuleGeometry(0.14, 0.65, 6, 8)), pantsMat);
    leftLeg.position.set(-0.25, 0.15, -0.36);
    leftLeg.rotation.x = 0.82;
    leftLeg.castShadow = true;
    operativeGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(trackGeo(new THREE.CapsuleGeometry(0.14, 0.65, 6, 8)), pantsMat);
    rightLeg.position.set(0.25, 0.15, -0.36);
    rightLeg.rotation.x = 0.82;
    rightLeg.castShadow = true;
    operativeGroup.add(rightLeg);

    // Tactical Yellow Leg Harness Straps (matching turn-around concept)
    const legStrapGeo = trackGeo(new THREE.TorusGeometry(0.16, 0.02, 6, 12));
    const leftStrap = new THREE.Mesh(legStrapGeo, cyberGlowYellow);
    leftStrap.position.set(-0.25, 0.25, -0.28);
    leftStrap.rotation.x = Math.PI / 2.5;
    operativeGroup.add(leftStrap);

    const rightStrap = new THREE.Mesh(legStrapGeo, cyberGlowYellow);
    rightStrap.position.set(0.25, 0.25, -0.28);
    rightStrap.rotation.x = Math.PI / 2.5;
    operativeGroup.add(rightStrap);

    // Reinforced Combat Boots with Tread Soles
    const leftBoot = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.28, 0.32, 0.42)), bootMat);
    leftBoot.position.set(-0.25, -0.38, -0.62);
    operativeGroup.add(leftBoot);

    const rightBoot = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.28, 0.32, 0.42)), bootMat);
    rightBoot.position.set(0.25, -0.38, -0.62);
    operativeGroup.add(rightBoot);

    // Position operative seated on the parapet ledge commanding the view
    operativeGroup.position.set(-4.8, 0.48, -2.4);
    operativeGroup.rotation.y = 0.42;
    scene.add(operativeGroup);

    // 9. Midground & Background: 4 Distinct Buildings & 3 Skyline Landmarks
    const cityGroup = new THREE.Group();
    const beaconMeshes: THREE.Mesh[] = [];

    // TOWER 1 (Right Hero Monolith Tower): Stepped Facade with Billboard & Setback Crown
    const t1Geo = trackGeo(new THREE.BoxGeometry(11, 42, 11));
    const t1Mat = trackMat(new THREE.MeshStandardMaterial({ color: 0x0A0E18, roughness: 0.32, metalness: 0.75 }));
    const t1 = new THREE.Mesh(t1Geo, t1Mat);
    t1.position.set(14.5, 17, -16);
    cityGroup.add(t1);

    // T1 Setback Penthouse Crown
    const t1PhGeo = trackGeo(new THREE.BoxGeometry(7.5, 4.5, 7.5));
    const t1PhMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x080C14, roughness: 0.4, metalness: 0.8 }));
    const t1Ph = new THREE.Mesh(t1PhGeo, t1PhMat);
    t1Ph.position.set(14.5, 40.25, -16);
    cityGroup.add(t1Ph);

    // T1 Antenna Mast & Strobe Beacon
    const t1Mast = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.08, 0.16, 8, 8)), trackMat(new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 })));
    t1Mast.position.set(14.5, 46.5, -16);
    cityGroup.add(t1Mast);
    const t1Beacon = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.25, 8, 8)), trackMat(new THREE.MeshBasicMaterial({ color: 0xFF0033 })));
    t1Beacon.position.set(14.5, 50.6, -16);
    cityGroup.add(t1Beacon);
    beaconMeshes.push(t1Beacon);

    // TOWER 2 (Left Stepped Arcology Tower): 3-Tier Stepped Pyramidal Skyscraper
    const t2Base = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(13, 20, 13)), trackMat(new THREE.MeshStandardMaterial({ color: 0x080B12, roughness: 0.65, metalness: 0.5 })));
    t2Base.position.set(-16.5, 8, -20);
    cityGroup.add(t2Base);

    const t2Mid = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(10, 16, 10)), trackMat(new THREE.MeshStandardMaterial({ color: 0x07090F, roughness: 0.55, metalness: 0.6 })));
    t2Mid.position.set(-16.5, 26, -20);
    cityGroup.add(t2Mid);

    const t2Top = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(7, 12, 7)), trackMat(new THREE.MeshStandardMaterial({ color: 0x05070B, roughness: 0.45, metalness: 0.7 })));
    t2Top.position.set(-16.5, 40, -20);
    cityGroup.add(t2Top);

    // TOWER 3 (Hexagonal Corporate Spire): 8-Sided Cylinder/Prism Tower
    const t3Geo = trackGeo(new THREE.CylinderGeometry(5.2, 5.8, 54, 8));
    const t3Mat = trackMat(new THREE.MeshStandardMaterial({ color: 0x070B14, roughness: 0.28, metalness: 0.85 }));
    const t3 = new THREE.Mesh(t3Geo, t3Mat);
    t3.position.set(-9, 18, -38);
    cityGroup.add(t3);

    // T3 Cyan LED Ring Collar
    const t3Ring = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(5.4, 0.15, 8, 16)), trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF })));
    t3Ring.rotation.x = Math.PI / 2;
    t3Ring.position.set(-9, 40, -38);
    cityGroup.add(t3Ring);

    // TOWER 4 (Slanted Wedge High-Rise): Angled Wedge Crown Tower
    const t4Geo = trackGeo(new THREE.BoxGeometry(12, 46, 11));
    const t4Mat = trackMat(new THREE.MeshStandardMaterial({ color: 0x080C16, roughness: 0.45, metalness: 0.65 }));
    const t4 = new THREE.Mesh(t4Geo, t4Mat);
    t4.position.set(23, 15, -30);
    cityGroup.add(t4);

    // T4 Slanted Wedge Roof
    const t4RoofGeo = trackGeo(new THREE.CylinderGeometry(0.2, 6, 8, 4));
    const t4Roof = new THREE.Mesh(t4RoofGeo, t4Mat);
    t4Roof.position.set(23, 42, -30);
    t4Roof.rotation.y = Math.PI / 4;
    cityGroup.add(t4Roof);

    // SKYLINE LANDMARK 1 (Central Siphon Megatower): Hyper-tall Spire rising to y = 88
    const s1Geo = trackGeo(new THREE.ConeGeometry(4.2, 88, 6));
    const s1Mat = trackMat(new THREE.MeshStandardMaterial({ color: 0x030508, roughness: 0.4, metalness: 0.9 }));
    const s1 = new THREE.Mesh(s1Geo, s1Mat);
    s1.position.set(0, 36, -72);
    cityGroup.add(s1);
    const s1Beacon = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.35, 8, 8)), trackMat(new THREE.MeshBasicMaterial({ color: 0xFF0033 })));
    s1Beacon.position.set(0, 80.5, -72);
    cityGroup.add(s1Beacon);
    beaconMeshes.push(s1Beacon);

    // SKYLINE LANDMARK 2 (Left Heavy Industrial Arcology Block)
    const s2Geo = trackGeo(new THREE.BoxGeometry(18, 65, 18));
    const s2Mat = trackMat(new THREE.MeshStandardMaterial({ color: 0x020407, roughness: 0.5, metalness: 0.7 }));
    const s2 = new THREE.Mesh(s2Geo, s2Mat);
    s2.position.set(-24, 25, -85);
    cityGroup.add(s2);

    // SKYLINE LANDMARK 3 (Right Twin Needle Spire Complex)
    const s3a = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(1.2, 2.5, 74, 6)), s1Mat);
    s3a.position.set(18.5, 30, -78);
    cityGroup.add(s3a);
    const s3b = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(1.2, 2.5, 74, 6)), s1Mat);
    s3b.position.set(22.5, 30, -78);
    cityGroup.add(s3b);
    const s3Bridge = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(6, 1.2, 1.2)), trackMat(new THREE.MeshBasicMaterial({ color: 0xFCEE0A })));
    s3Bridge.position.set(20.5, 45, -78);
    cityGroup.add(s3Bridge);

    // 10. True Hardware Window Instancing (THREE.InstancedMesh)
    // Single draw-call for hundreds of illuminated windows across the city!
    const windowTotalCount = 380;
    const windowGeo = trackGeo(new THREE.PlaneGeometry(0.68, 0.44));
    const windowMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    const instancedWindows = new THREE.InstancedMesh(windowGeo, windowMat, windowTotalCount);

    const dummy = new THREE.Object3D();
    const windowColors = [
      new THREE.Color(0x00E5FF), // Cyan
      new THREE.Color(0xFCEE0A), // Amber / Yellow
      new THREE.Color(0xFF2E88), // Neon Magenta
      new THREE.Color(0x94A3B8), // Cool White
      new THREE.Color(0x0D131F)  // Off-duty dark office
    ];

    let instIndex = 0;
    const towerFacadeBases = [
      { x: 14.5, y: 17, z: -16, w: 11, h: 40, d: 11, rotY: 0 },
      { x: -16.5, y: 26, z: -20, w: 10, h: 32, d: 10, rotY: 0 },
      { x: 23, y: 15, z: -30, w: 12, h: 44, d: 11, rotY: 0 }
    ];

    towerFacadeBases.forEach((b) => {
      const rows = 12;
      const cols = 5;
      for (let r = 0; r < rows && instIndex < windowTotalCount; r++) {
        for (let c = 0; c < cols && instIndex < windowTotalCount; c++) {
          if (Math.random() > 0.38) {
            dummy.position.set(
              b.x - b.w / 2 + 1.2 + c * 2.1,
              b.y - b.h / 2 + 4 + r * 2.8,
              b.z + b.d / 2 + 0.05
            );
            dummy.rotation.y = b.rotY;
            dummy.updateMatrix();
            instancedWindows.setMatrixAt(instIndex, dummy.matrix);

            const pickedColor = windowColors[Math.floor(Math.random() * windowColors.length)];
            instancedWindows.setColorAt(instIndex, pickedColor);
            instIndex++;
          }
        }
      }
    });

    instancedWindows.instanceMatrix.needsUpdate = true;
    if (instancedWindows.instanceColor) {
      instancedWindows.instanceColor.needsUpdate = true;
    }
    cityGroup.add(instancedWindows);

    // 11. Elevated Lower Canyon Highway (Relocated Strictly to Right Canyon Gap)
    // Deep at y = -5.5, z = -46.0 on the right side only (x: 8.0 to 32.0)
    // This ensures ZERO horizontal traffic light streaks cross the hero CTA buttons or central view!
    const highwayViaductGeo = trackGeo(new THREE.BoxGeometry(26, 1.4, 3.2));
    const highwayViaductMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x090D17, roughness: 0.6, metalness: 0.4 }));
    const highwayViaduct = new THREE.Mesh(highwayViaductGeo, highwayViaductMat);
    highwayViaduct.position.set(18.0, -5.5, -46.0);
    cityGroup.add(highwayViaduct);

    // Highway Traffic Ribbons (Subtle distant headlights & taillights deep in right canyon floor)
    const trafficGeo = trackGeo(new THREE.PlaneGeometry(25.6, 0.4));
    const trafficCanvas = document.createElement('canvas');
    trafficCanvas.width = 512;
    trafficCanvas.height = 32;
    const tCtx = trafficCanvas.getContext('2d')!;
    tCtx.fillStyle = '#06080D';
    tCtx.fillRect(0, 0, 512, 32);
    tCtx.fillStyle = '#FF1744'; // Red taillights
    for (let x = 0; x < 512; x += 44) {
      tCtx.fillRect(x, 4, 24, 8);
    }
    tCtx.fillStyle = '#E0F2FE'; // Cyan-white headlights
    for (let x = 22; x < 512; x += 44) {
      tCtx.fillRect(x, 18, 22, 8);
    }
    const trafficTex = trackTex(new THREE.CanvasTexture(trafficCanvas));
    trafficTex.wrapS = THREE.RepeatWrapping;
    const trafficMat = trackMat(new THREE.MeshBasicMaterial({ map: trafficTex, transparent: true }));
    const trafficMesh = new THREE.Mesh(trafficGeo, trafficMat);
    trafficMesh.position.set(18.0, -4.7, -45.8);
    trafficMesh.rotation.x = -Math.PI / 4;
    cityGroup.add(trafficMesh);

    // 12. Original Night City Advertising Structures (100% Original IP)
    // A. Tower 1 Upper Sign: "NEURON // DYNAMICS" with Neural Brain Hologram (inspired by reference art)
    const neuronCanvas = document.createElement('canvas');
    neuronCanvas.width = 512;
    neuronCanvas.height = 256;
    const nCtx = neuronCanvas.getContext('2d')!;
    nCtx.fillStyle = '#060A14';
    nCtx.fillRect(0, 0, 512, 256);
    
    // Cyan Outer Border Frame with notched corners
    nCtx.strokeStyle = '#00E5FF';
    nCtx.lineWidth = 6;
    nCtx.strokeRect(10, 10, 492, 236);

    // Glowing Magenta Dot-Matrix Neural Brain Hologram
    nCtx.fillStyle = '#FF2E88';
    // Draw procedural hemispheric brain nodes
    const brainNodes = [
      // Left hemisphere
      { x: 190, y: 70 }, { x: 215, y: 55 }, { x: 240, y: 60 },
      { x: 170, y: 95 }, { x: 195, y: 90 }, { x: 220, y: 85 }, { x: 245, y: 90 },
      { x: 160, y: 125 }, { x: 185, y: 120 }, { x: 215, y: 115 }, { x: 245, y: 120 },
      { x: 175, y: 150 }, { x: 205, y: 145 }, { x: 235, y: 150 },
      // Right hemisphere
      { x: 322, y: 70 }, { x: 297, y: 55 }, { x: 272, y: 60 },
      { x: 342, y: 95 }, { x: 317, y: 90 }, { x: 292, y: 85 }, { x: 267, y: 90 },
      { x: 352, y: 125 }, { x: 327, y: 120 }, { x: 297, y: 115 }, { x: 267, y: 120 },
      { x: 337, y: 150 }, { x: 307, y: 145 }, { x: 277, y: 150 }
    ];

    // Synaptic connecting axon lines
    nCtx.strokeStyle = 'rgba(255, 46, 136, 0.45)';
    nCtx.lineWidth = 1.8;
    for (let i = 0; i < brainNodes.length; i++) {
      for (let j = i + 1; j < brainNodes.length; j++) {
        const dx = brainNodes[i].x - brainNodes[j].x;
        const dy = brainNodes[i].y - brainNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 42) {
          nCtx.beginPath();
          nCtx.moveTo(brainNodes[i].x, brainNodes[i].y);
          nCtx.lineTo(brainNodes[j].x, brainNodes[j].y);
          nCtx.stroke();
        }
      }
    }

    // Glowing Synaptic Dot Nodes
    for (const node of brainNodes) {
      nCtx.beginPath();
      nCtx.arc(node.x, node.y, 4.2, 0, Math.PI * 2);
      nCtx.fill();
    }

    // Corporate Typography: NEURON // DYNAMICS
    nCtx.fillStyle = '#FFFFFF';
    nCtx.font = '900 28px sans-serif';
    nCtx.textAlign = 'center';
    nCtx.fillText('NEURON // DYNAMICS', 256, 195);

    nCtx.fillStyle = '#00E5FF';
    nCtx.font = 'bold 13px monospace';
    nCtx.fillText('SYNAPSE COGNITION LABS // SECTOR 04', 256, 222);

    const neuronTex = trackTex(new THREE.CanvasTexture(neuronCanvas));
    const neuronMat = trackMat(new THREE.MeshBasicMaterial({ map: neuronTex, transparent: true, side: THREE.DoubleSide }));
    const neuronSign = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(9.0, 4.5)), neuronMat);
    neuronSign.position.set(14.5, 31.0, -10.3);
    neuronSign.rotation.y = -0.35;
    cityGroup.add(neuronSign);

    // B. Tower 1 Lower Billboard: "A.I.D.A. // NEURAL INTERFACE" (Original Synthetic AI Assistant)
    const aidaCanvas = document.createElement('canvas');
    aidaCanvas.width = 512;
    aidaCanvas.height = 640;
    const aidaCtx = aidaCanvas.getContext('2d')!;
    aidaCtx.fillStyle = '#060A14';
    aidaCtx.fillRect(0, 0, 512, 640);

    // Magenta outer glowing neon frame (matches reference image framing)
    aidaCtx.strokeStyle = '#FF2E88';
    aidaCtx.lineWidth = 14;
    aidaCtx.strokeRect(10, 10, 492, 620);

    // Holographic background grid
    aidaCtx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
    aidaCtx.lineWidth = 2;
    for (let gx = 20; gx < 500; gx += 40) {
      aidaCtx.beginPath();
      aidaCtx.moveTo(gx, 20);
      aidaCtx.lineTo(gx, 500);
      aidaCtx.stroke();
    }
    for (let gy = 20; gy < 500; gy += 40) {
      aidaCtx.beginPath();
      aidaCtx.moveTo(20, gy);
      aidaCtx.lineTo(492, gy);
      aidaCtx.stroke();
    }

    // Stylized Cybernetic Android Silhouette (Original Synthetic AI Operator)
    aidaCtx.fillStyle = '#0E1729';
    aidaCtx.beginPath();
    aidaCtx.moveTo(230, 130);
    aidaCtx.bezierCurveTo(205, 90, 270, 65, 325, 75);
    aidaCtx.bezierCurveTo(385, 85, 415, 145, 405, 215);
    aidaCtx.bezierCurveTo(405, 285, 365, 355, 315, 385);
    aidaCtx.lineTo(265, 435);
    aidaCtx.lineTo(195, 425);
    aidaCtx.bezierCurveTo(215, 375, 235, 315, 225, 255);
    aidaCtx.closePath();
    aidaCtx.fill();

    // Magenta Rim Backlight Glow along android profile
    aidaCtx.strokeStyle = '#FF2E88';
    aidaCtx.lineWidth = 8;
    aidaCtx.beginPath();
    aidaCtx.moveTo(325, 75);
    aidaCtx.bezierCurveTo(385, 85, 415, 145, 405, 215);
    aidaCtx.bezierCurveTo(405, 285, 365, 355, 315, 385);
    aidaCtx.stroke();

    // Cyan Fiber-Optic Tendrils & Circuit Conduits
    aidaCtx.strokeStyle = '#00E5FF';
    aidaCtx.lineWidth = 5;
    aidaCtx.beginPath();
    aidaCtx.moveTo(240, 115);
    aidaCtx.bezierCurveTo(285, 105, 345, 120, 380, 170);
    aidaCtx.stroke();

    aidaCtx.beginPath();
    aidaCtx.moveTo(225, 155);
    aidaCtx.bezierCurveTo(265, 150, 325, 170, 355, 225);
    aidaCtx.stroke();

    // Cyber Optical Visor Band (Cyan Luminescent Sensor Slit)
    aidaCtx.fillStyle = '#00E5FF';
    aidaCtx.beginPath();
    aidaCtx.moveTo(295, 200);
    aidaCtx.lineTo(360, 210);
    aidaCtx.lineTo(345, 230);
    aidaCtx.lineTo(290, 215);
    aidaCtx.closePath();
    aidaCtx.fill();

    // Horizontal Holographic Scanlines
    aidaCtx.fillStyle = 'rgba(255, 46, 136, 0.12)';
    for (let sy = 20; sy < 620; sy += 12) {
      aidaCtx.fillRect(14, sy, 484, 5);
    }

    // Bottom Typography: A.I.D.A. // NEURAL INTERFACE
    aidaCtx.fillStyle = '#FCEE0A';
    aidaCtx.font = '900 42px sans-serif';
    aidaCtx.textAlign = 'center';
    aidaCtx.fillText('A.I.D.A.', 256, 545);

    aidaCtx.fillStyle = '#00E5FF';
    aidaCtx.font = 'bold 20px monospace';
    aidaCtx.fillText('SYNTHETIC AI // ARCHITECTURE', 256, 580);

    aidaCtx.fillStyle = '#94A3B8';
    aidaCtx.font = '14px monospace';
    aidaCtx.fillText('PORTFOLIO_OS // NIGHT CITY', 256, 608);

    const aidaTex = trackTex(new THREE.CanvasTexture(aidaCanvas));
    const aidaMat = trackMat(new THREE.MeshBasicMaterial({ map: aidaTex, transparent: true, side: THREE.DoubleSide }));
    const aidaBillboard = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(9.5, 12.0)), aidaMat);
    aidaBillboard.position.set(14.5, 18.0, -10.3);
    aidaBillboard.rotation.y = -0.35;
    cityGroup.add(aidaBillboard);

    // C. Left Rooftop Scaffolding & Vertical Neon Sign (Relocated Far Outside Hero Text Zone)
    // Shifted to x = -24.0, z = -20.0 to guarantee 100% text-safe area for "OM VYAS_" heading
    const scaffoldGroup = new THREE.Group();
    const trussMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.25 }));
    
    // Vertical Truss Legs
    for (let lx of [-1.2, 1.2]) {
      for (let lz of [-1.0, 1.0]) {
        const leg = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.06, 0.06, 16, 6)), trussMat);
        leg.position.set(lx, 8, lz);
        scaffoldGroup.add(leg);
      }
    }
    // Horizontal crossbars
    for (let yb = 2; yb <= 15; yb += 3) {
      const barX = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(2.4, 0.08, 0.08)), trussMat);
      barX.position.set(0, yb, 1.0);
      scaffoldGroup.add(barX);
      const barZ = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.08, 0.08, 2.0)), trussMat);
      barZ.position.set(1.2, yb, 0);
      scaffoldGroup.add(barZ);
    }

    // Vertical Japanese/Cyber Neon Sign hanging on Scaffolding
    const vSignCanvas = document.createElement('canvas');
    vSignCanvas.width = 256;
    vSignCanvas.height = 512;
    const vCtx = vSignCanvas.getContext('2d')!;
    vCtx.fillStyle = '#070C16';
    vCtx.fillRect(0, 0, 256, 512);
    vCtx.strokeStyle = '#FF2E88';
    vCtx.lineWidth = 10;
    vCtx.strokeRect(8, 8, 240, 496);

    vCtx.fillStyle = '#00E5FF';
    vCtx.font = '900 36px monospace';
    vCtx.textAlign = 'center';
    vCtx.fillText('OM', 128, 80);
    vCtx.fillText('VYAS', 128, 125);

    vCtx.fillStyle = '#FCEE0A';
    vCtx.font = 'bold 28px sans-serif';
    vCtx.fillText('オム・ヴィアス', 128, 195);
    vCtx.fillText('ネオ・プネ', 128, 240);

    vCtx.fillStyle = '#FF2E88';
    vCtx.font = 'bold 24px monospace';
    vCtx.fillText('AI // NET', 128, 310);
    vCtx.fillText('SYS // ENG', 128, 350);

    vCtx.fillStyle = '#00E5FF';
    vCtx.font = 'bold 20px monospace';
    vCtx.fillText('> DEEP LAB', 128, 420);

    const vSignTex = trackTex(new THREE.CanvasTexture(vSignCanvas));
    const vSignMat = trackMat(new THREE.MeshBasicMaterial({ map: vSignTex, side: THREE.DoubleSide }));
    const vSignMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(4.2, 8.4)), vSignMat);
    vSignMesh.position.set(0, 9, 1.1);
    scaffoldGroup.add(vSignMesh);

    // Relocated to x = -24.0, z = -20.0 (Far left peripheral edge)
    scaffoldGroup.position.set(-24.0, 0.5, -20.0);
    scaffoldGroup.rotation.y = 0.35;
    cityGroup.add(scaffoldGroup);

    scene.add(cityGroup);

    // 13. Distinctive Flying Aerodyne Vehicles (AV-01 Tactical Spinner & AV-02 Interceptor)
    // Inspired by reference aerodyne art: twin forward wedge pontoons with vertical radiator slats
    // Strictly routed through the right-hand canyon (x: 10.0 to 22.0) to protect the hero text zone!
    const vehicles: { mesh: THREE.Group; speed: number; startZ: number; rangeZ: number }[] = [];
    const vehicleCount = qualityTier === 'cinematic' ? 3 : qualityTier === 'balanced' ? 2 : 1;

    for (let i = 0; i < vehicleCount; i++) {
      const avGroup = new THREE.Group();

      if (i % 2 === 0) {
        // AV-01 TACTICAL AERODYNE SPINNER (Twin Forward Wedge Pontoons + Ducted Turbines)
        const hullGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.45, 3.4));
        const hullMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x0C101A, metalness: 0.9, roughness: 0.2 }));
        const hull = new THREE.Mesh(hullGeo, hullMat);
        avGroup.add(hull);

        // Twin Forward Wedge Intake Pontoons (matches reference vehicle art)
        const pontoonGeo = trackGeo(new THREE.BoxGeometry(0.38, 0.32, 1.4));
        const leftPontoon = new THREE.Mesh(pontoonGeo, hullMat);
        leftPontoon.position.set(-0.72, -0.06, -1.2);
        avGroup.add(leftPontoon);

        const rightPontoon = new THREE.Mesh(pontoonGeo, hullMat);
        rightPontoon.position.set(0.72, -0.06, -1.2);
        avGroup.add(rightPontoon);

        // Illuminated Vertical Radiator Slats in Pontoons (Cyan Glow)
        const slatMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF }));
        const leftSlat = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(0.28, 0.22)), slatMat);
        leftSlat.position.set(-0.72, -0.06, -1.91);
        avGroup.add(leftSlat);

        const rightSlat = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(0.28, 0.22)), slatMat);
        rightSlat.position.set(0.72, -0.06, -1.91);
        avGroup.add(rightSlat);

        // Swept Aerodynamic Wings with Winglets
        const wingGeo = trackGeo(new THREE.BoxGeometry(3.6, 0.08, 1.2));
        const wing = new THREE.Mesh(wingGeo, hullMat);
        wing.position.set(0, 0.05, 0.3);
        avGroup.add(wing);

        // Orange/Amber Trim Lines along wings (matches reference art)
        const trimGeo = trackGeo(new THREE.BoxGeometry(3.62, 0.09, 0.08));
        const trimMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xF59E0B }));
        const wingTrim = new THREE.Mesh(trimGeo, trimMat);
        wingTrim.position.set(0, 0.06, 0.88);
        avGroup.add(wingTrim);

        // Multi-Faceted Cockpit Canopy Glass with Cyan HUD Interior
        const canopy = new THREE.Mesh(trackGeo(new THREE.SphereGeometry(0.44, 8, 6)), trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.85 })));
        canopy.scale.set(0.95, 0.55, 1.9);
        canopy.position.set(0, 0.36, -0.2);
        avGroup.add(canopy);

        // Dual Ducted Hover Turbine Nacelles with Glowing Cyan Rings
        const nacelleGeo = trackGeo(new THREE.CylinderGeometry(0.32, 0.32, 0.45, 10));
        const nacelleMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x1A222D, metalness: 0.8 }));
        const nacelleRingMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF }));

        const leftNacelle = new THREE.Mesh(nacelleGeo, nacelleMat);
        leftNacelle.rotation.x = Math.PI / 2;
        leftNacelle.position.set(-1.4, -0.08, 0.4);
        avGroup.add(leftNacelle);
        const leftRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(0.28, 0.03, 6, 12)), nacelleRingMat);
        leftRing.position.set(-1.4, -0.08, 0.4);
        avGroup.add(leftRing);

        const rightNacelle = new THREE.Mesh(nacelleGeo, nacelleMat);
        rightNacelle.rotation.x = Math.PI / 2;
        rightNacelle.position.set(1.4, -0.08, 0.4);
        avGroup.add(rightNacelle);
        const rightRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(0.28, 0.03, 6, 12)), nacelleRingMat);
        rightRing.position.set(1.4, -0.08, 0.4);
        avGroup.add(rightRing);

        // Dual Rear Plasma Jet Thrusters
        const t1 = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.16, 0.22, 0.45, 8)), slatMat);
        t1.rotation.x = Math.PI / 2;
        t1.position.set(-0.48, 0, 1.7);
        avGroup.add(t1);
        const t2 = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.16, 0.22, 0.45, 8)), slatMat);
        t2.rotation.x = Math.PI / 2;
        t2.position.set(0.48, 0, 1.7);
        avGroup.add(t2);

        // Luminous Cyan Light-Trail Ribbon
        const trail = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(1.2, 7.5)), trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.35, side: THREE.DoubleSide })));
        trail.rotation.x = Math.PI / 2;
        trail.position.set(0, 0, 5.4);
        avGroup.add(trail);
      } else {
        // AV-02 HIGH-SPEED INTERCEPTOR (Needle Dart Fuselage with Swept Delta Wings)
        const dartGeo = trackGeo(new THREE.ConeGeometry(0.5, 3.8, 6));
        const dartMat = trackMat(new THREE.MeshStandardMaterial({ color: 0x0E1420, metalness: 0.95, roughness: 0.15 }));
        const dart = new THREE.Mesh(dartGeo, dartMat);
        dart.rotation.x = -Math.PI / 2;
        avGroup.add(dart);

        // Swept Delta Wings
        const deltaWingGeo = trackGeo(new THREE.BoxGeometry(3.0, 0.06, 1.6));
        const deltaWing = new THREE.Mesh(deltaWingGeo, dartMat);
        deltaWing.position.set(0, 0, 0.6);
        avGroup.add(deltaWing);

        // Center Ion Thruster (Neon Magenta)
        const ion = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.22, 0.28, 0.5, 8)), trackMat(new THREE.MeshBasicMaterial({ color: 0xFF2E88 })));
        ion.rotation.x = Math.PI / 2;
        ion.position.set(0, 0, 1.9);
        avGroup.add(ion);

        const ionTrail = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(0.9, 7.5)), trackMat(new THREE.MeshBasicMaterial({ color: 0xFF2E88, transparent: true, opacity: 0.4, side: THREE.DoubleSide })));
        ionTrail.rotation.x = Math.PI / 2;
        ionTrail.position.set(0, 0, 5.6);
        avGroup.add(ionTrail);
      }

      // STRICTLY RIGHT SIDE CANYON POSITIONING: x between +11.0 and +21.0
      const posX = 11.5 + i * 4.5;
      const posY = 7.5 + i * 2.5;
      avGroup.position.set(posX, posY, -18 - i * 14.0);
      scene.add(avGroup);

      vehicles.push({
        mesh: avGroup,
        speed: 8.5 + i * 3.0, // Speed in units per second
        startZ: 5,
        rangeZ: 60
      });
    }

    // 14. Directional Rain Streaks with Text-Safe Volume
    const rainCount = qualityTier === 'cinematic' ? 1600 : qualityTier === 'balanced' ? 800 : 250;
    const rainPositions = new Float32Array(rainCount * 6);
    const rainVelocities = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      let rx = (Math.random() - 0.5) * 48;
      let rz = (Math.random() - 0.5) * 52;
      const ry = Math.random() * 32;

      // Text-Safe Zone: In near-camera volume (z > 5, x between -7 and 2), displace rain outward to avoid obscuring hero text
      if (rz > 5 && rx > -7 && rx < 2) {
        rx += rx > -2.5 ? 4.5 : -4.5;
      }

      const streakLen = 0.55 + Math.random() * 0.45;
      rainPositions[i * 6] = rx;
      rainPositions[i * 6 + 1] = ry;
      rainPositions[i * 6 + 2] = rz;
      rainPositions[i * 6 + 3] = rx - 0.12;
      rainPositions[i * 6 + 4] = ry - streakLen;
      rainPositions[i * 6 + 5] = rz + 0.04;

      rainVelocities[i] = 28 + Math.random() * 8;
    }

    const rainGeo = trackGeo(new THREE.BufferGeometry());
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = trackMat(new THREE.LineBasicMaterial({
      color: 0x93C5FD,
      transparent: true,
      opacity: 0.52
    }));
    const rainLines = new THREE.LineSegments(rainGeo, rainMat);
    scene.add(rainLines);

    // Rising Steam Particles from Terrace Vent
    const steamCount = qualityTier === 'performance' ? 30 : 80;
    const steamPositions = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = -9.5 + (Math.random() - 0.5) * 1.8;
      steamPositions[i * 3 + 1] = 1.4 + Math.random() * 3.2;
      steamPositions[i * 3 + 2] = 4 + (Math.random() - 0.5) * 1.8;
    }
    const steamGeo = trackGeo(new THREE.BufferGeometry());
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = trackMat(new THREE.PointsMaterial({
      color: 0x94A3B8,
      size: 0.42,
      transparent: true,
      opacity: 0.26
    }));
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    scene.add(steamPoints);

    // 14. Asynchronous Authored GLB 3D Asset Loader (Progressive Non-Blocking Enhancement)
    // Loads original binary glTF 2.0 assets asynchronously without blocking critical hero text or CTAs
    const gltfLoader = new GLTFLoader();
    const basePath = (import.meta as any).env?.BASE_URL || './';
    const modelsPath = basePath.endsWith('/') ? `${basePath}models/` : `${basePath}/models/`;

    // A. Hero Vehicle: Authored Aerodyne Tactical Spinner GLB
    gltfLoader.load(`${modelsPath}aerodyne_spinner.glb`, (gltf) => {
      const authoredModel = gltf.scene;
      authoredModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          trackGeo(m.geometry);
          if (Array.isArray(m.material)) m.material.forEach(trackMat);
          else trackMat(m.material);
          m.castShadow = true;
        }
      });
      // Replace procedural spinner on even vehicles
      vehicles.forEach((veh, idx) => {
        if (idx % 2 === 0) {
          while (veh.mesh.children.length > 0) {
            veh.mesh.remove(veh.mesh.children[0]);
          }
          const clone = authoredModel.clone();
          veh.mesh.add(clone);
          const trail = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(1.2, 7.5)), trackMat(new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.35, side: THREE.DoubleSide })));
          trail.rotation.x = Math.PI / 2;
          trail.position.set(0, 0, 5.4);
          veh.mesh.add(trail);
        }
      });
      if (reducedMotion) renderSingleFrame();
    }, undefined, (err) => {
      console.warn('Asynchronous GLB load fallback for vehicle:', err);
    });

    // B. Hero Cyber-Netrunner Operative GLB
    gltfLoader.load(`${modelsPath}cyber_operative.glb`, (gltf) => {
      const authoredOperative = gltf.scene;
      authoredOperative.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          trackGeo(m.geometry);
          if (Array.isArray(m.material)) m.material.forEach(trackMat);
          else trackMat(m.material);
          m.castShadow = true;
        }
      });
      // Swap out proxy operative with high-poly authored operative
      while (operativeGroup.children.length > 0) {
        operativeGroup.remove(operativeGroup.children[0]);
      }
      operativeGroup.add(authoredOperative);
      operativeGroup.add(crestMesh); // Preserves original Hex-Core crest on back
      if (reducedMotion) renderSingleFrame();
    }, undefined, (err) => {
      console.warn('Asynchronous GLB load fallback for operative:', err);
    });

    // C. Rooftop Mechanical Equipment GLB
    gltfLoader.load(`${modelsPath}rooftop_machinery.glb`, (gltf) => {
      const authoredMachinery = gltf.scene;
      authoredMachinery.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          trackGeo(m.geometry);
          if (Array.isArray(m.material)) m.material.forEach(trackMat);
          else trackMat(m.material);
          m.castShadow = true;
          m.receiveShadow = true;
        }
      });
      authoredMachinery.position.set(-6.5, 0, 4.5);
      terraceGroup.add(authoredMachinery);
      if (reducedMotion) renderSingleFrame();
    }, undefined, (err) => {
      console.warn('Asynchronous GLB load fallback for rooftop machinery:', err);
    });

    // D. Corporate Skyscraper Tower 1 Complex GLB
    gltfLoader.load(`${modelsPath}corporate_skyscraper.glb`, (gltf) => {
      const authoredTower1 = gltf.scene;
      authoredTower1.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          trackGeo(m.geometry);
          if (Array.isArray(m.material)) m.material.forEach(trackMat);
          else trackMat(m.material);
          m.castShadow = true;
          m.receiveShadow = true;
        }
      });
      authoredTower1.position.set(14.5, 0, -16);
      cityGroup.add(authoredTower1);
      // Hide proxy basic boxes
      t1.visible = false;
      t1Ph.visible = false;
      t1Mast.visible = false;
      if (reducedMotion) renderSingleFrame();
    }, undefined, (err) => {
      console.warn('Asynchronous GLB load fallback for Tower 1:', err);
    });

    // E. Secondary Brutalist Arcology Tower 2 GLB
    gltfLoader.load(`${modelsPath}secondary_arcology.glb`, (gltf) => {
      const authoredTower2 = gltf.scene;
      authoredTower2.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          trackGeo(m.geometry);
          if (Array.isArray(m.material)) m.material.forEach(trackMat);
          else trackMat(m.material);
          m.castShadow = true;
          m.receiveShadow = true;
        }
      });
      authoredTower2.position.set(-16.5, 0, -20);
      cityGroup.add(authoredTower2);
      // Hide proxy basic boxes
      t2Base.visible = false;
      t2Mid.visible = false;
      t2Top.visible = false;
      if (reducedMotion) renderSingleFrame();
    }, undefined, (err) => {
      console.warn('Asynchronous GLB load fallback for Tower 2:', err);
    });

    // 15. Six Cinematic Camera Waypoints for Chapter Storytelling
    const waypoints = [
      { progress: 0.0, pos: new THREE.Vector3(0, 4.2, 14.5), target: new THREE.Vector3(0, 1.8, -20) },      // Chapter 01: Home / Hero
      { progress: 0.2, pos: new THREE.Vector3(-1.8, 3.2, 10.5), target: new THREE.Vector3(-2.0, 1.6, -15) }, // Chapter 02: About / Dossier
      { progress: 0.4, pos: new THREE.Vector3(1.2, 2.2, 7.0), target: new THREE.Vector3(0, 1.2, -22) },     // Chapter 03: Projects Fixer Board
      { progress: 0.6, pos: new THREE.Vector3(-0.8, 1.6, 4.2), target: new THREE.Vector3(0, 1.0, -25) },    // Chapter 04: Cyberdeck Skills
      { progress: 0.8, pos: new THREE.Vector3(1.8, 1.4, 3.2), target: new THREE.Vector3(0, 1.2, -28) },     // Chapter 05: Neural Lab & Journey
      { progress: 1.0, pos: new THREE.Vector3(0, 1.0, 2.2), target: new THREE.Vector3(0, 1.4, -30) }        // Chapter 06: Contact Finale
    ];

    const currentCamPos = camera.position.clone();
    const currentCamTarget = new THREE.Vector3(0, 1.8, -20);

    // 16. Event Handlers & Visibility API
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) {
        composer.setSize(w, h);
      }
      if (reducedMotion) {
        renderSingleFrame();
      }
    };
    window.addEventListener('resize', handleResize);

    let animFrameId: number | null = null;
    let lastTime = performance.now();
    let beaconTime = 0;

    // True Visibility Pause: Cancels requestAnimationFrame when hidden, restarts on visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameId !== null) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      } else {
        lastTime = performance.now();
        if (!reducedMotion && animFrameId === null) {
          animFrameId = requestAnimationFrame(animate);
        } else if (reducedMotion) {
          renderSingleFrame();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Single static frame renderer for zero-overhead reduced motion lifecycle
    const renderSingleFrame = () => {
      camera.position.copy(waypoints[0].pos);
      camera.lookAt(waypoints[0].target);
      if (composer && qualityTier !== 'performance') {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    // 17. The 60 FPS Render & Animation Loop
    const animate = (currentTime: number) => {
      if (reducedMotion) return;

      animFrameId = requestAnimationFrame(animate);

      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      beaconTime += delta;

      // Animate Directional Rain Streaks
      const rPos = rainGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        const dy = rainVelocities[i] * delta;
        const dx = dy * 0.15;
        rPos[i * 6] -= dx;
        rPos[i * 6 + 1] -= dy;
        rPos[i * 6 + 3] -= dx;
        rPos[i * 6 + 4] -= dy;

        if (rPos[i * 6 + 1] < 0) {
          let rx = (Math.random() - 0.5) * 48;
          let rz = (Math.random() - 0.5) * 52;
          if (rz > 5 && rx > -7 && rx < 2) {
            rx += rx > -2.5 ? 4.5 : -4.5;
          }
          const streakLen = 0.55 + Math.random() * 0.45;
          rPos[i * 6] = rx;
          rPos[i * 6 + 1] = 28 + Math.random() * 4;
          rPos[i * 6 + 2] = rz;
          rPos[i * 6 + 3] = rx - 0.12;
          rPos[i * 6 + 4] = rPos[i * 6 + 1] - streakLen;
          rPos[i * 6 + 5] = rz + 0.04;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;

      // Animate Flying AVs with Delta-Time Physics!
      vehicles.forEach((veh) => {
        veh.mesh.position.z += veh.speed * delta;
        if (veh.mesh.position.z > veh.startZ) {
          veh.mesh.position.z = veh.startZ - veh.rangeZ;
        }
      });

      // Animate Highway Traffic Light Ribbons in Lower Canyon
      trafficTex.offset.x = (trafficTex.offset.x + delta * 0.4) % 1;

      // Animate HVAC Cooling Fan
      fanGroup.rotation.z += delta * 6.5;

      // Animate Rising Steam
      const sPos = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        sPos[i * 3 + 1] += 0.85 * delta;
        if (sPos[i * 3 + 1] > 4.5) {
          sPos[i * 3 + 1] = 1.4;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Asynchronous Strobe Aviation Hazard Beacons
      const beaconPulse = Math.sin(beaconTime * 4.2) > 0.4 ? 1.0 : 0.08;
      beaconMeshes.forEach((b) => {
        (b.material as THREE.MeshBasicMaterial).color.setHex(beaconPulse > 0.5 ? 0xFF0033 : 0x2A0005);
      });

      // Check inspection view mode presets (?view=character, ?view=architecture, ?view=wet-surface, ?view=vehicle)
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const viewMode = urlParams?.get('view');

      let targetPos = waypoints[0].pos;
      let targetLookAt = waypoints[0].target;

      if (viewMode === 'character') {
        targetPos = new THREE.Vector3(-3.4, 1.35, 0.4);
        targetLookAt = new THREE.Vector3(-4.8, 0.95, -2.4);
      } else if (viewMode === 'architecture') {
        targetPos = new THREE.Vector3(7.0, 18.0, 3.5);
        targetLookAt = new THREE.Vector3(14.5, 19.0, -14.0);
      } else if (viewMode === 'vehicle') {
        targetPos = new THREE.Vector3(9.5, 7.8, -14.0);
        targetLookAt = new THREE.Vector3(11.5, 7.5, -18.0);
      } else if (viewMode === 'wet-surface') {
        targetPos = new THREE.Vector3(0, 0.65, 3.2);
        targetLookAt = new THREE.Vector3(0, 0.05, -1.0);
      } else {
        // Camera Scroll Choreography across the 6 Waypoints (Reads mutable ref!)
        const p = Math.min(Math.max(scrollYProgressRef.current, 0), 1);
        for (let i = 0; i < waypoints.length - 1; i++) {
          const w1 = waypoints[i];
          const w2 = waypoints[i + 1];
          if (p >= w1.progress && p <= w2.progress) {
            const t = (p - w1.progress) / (w2.progress - w1.progress);
            targetPos = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, t);
            targetLookAt = new THREE.Vector3().lerpVectors(w1.target, w2.target, t);
            break;
          }
        }
      }

      currentCamPos.lerp(targetPos, 0.06);
      currentCamTarget.lerp(targetLookAt, 0.06);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamTarget);

      // Render via Post-Processing Composer (Cinematic/Balanced) or direct WebGL (Performance)
      if (composer && qualityTier !== 'performance') {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    // Reduced Motion Lifecycle: Render once without scheduling recurring animation frames
    if (reducedMotion) {
      renderSingleFrame();
    } else {
      animFrameId = requestAnimationFrame(animate);
    }

    // 18. Comprehensive Resource Disposal
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }

      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());

      if (composer) {
        composer.dispose();
      }
      renderer.dispose();
      scene.clear();
    };
  }, [qualityTier, reducedMotion]);

  if (!hasWebGL) {
    return (
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 30%, #0d1627 0%, #07090d 80%)'
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default CyberCityScene;

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Precomputed CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawScanlines[rowOffset] = 0;
    rgbaBuffer.copy(rawScanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(rawScanlines, { level: 6 });
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// ---------------------------------------------------------------------------
// Procedural Noise Utilities
// ---------------------------------------------------------------------------
function createNoise2D(seed = 1337) {
  let s = seed;
  function rnd() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  }
  const p = new Uint8Array(512);
  for (let i = 0; i < 256; i++) p[i] = Math.floor(rnd() * 256);
  for (let i = 0; i < 256; i++) p[i + 256] = p[i];

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(t, a, b) { return a + t * (b - a); }
  function grad(hash, x, y) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  return function(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y, B = p[X + 1] + Y;
    return lerp(v,
      lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
      lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1))
    );
  };
}

const noise2D = createNoise2D(42);

function fbm(x, y, octaves = 4, lacunarity = 2.0, gain = 0.5) {
  let total = 0, freq = 1, amp = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    total += noise2D(x * freq, y * freq) * amp;
    max += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return total / max;
}

function heightToNormalBuffer(heights, width, height, strength = 2.0) {
  const buf = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const xL = (x - 1 + width) % width;
      const xR = (x + 1) % width;
      const yU = (y - 1 + height) % height;
      const yD = (y + 1) % height;

      const hL = heights[y * width + xL];
      const hR = heights[y * width + xR];
      const hU = heights[yU * width + x];
      const hD = heights[yD * width + x];

      const dx = (hR - hL) * strength;
      const dy = (hD - hU) * strength;
      const dz = 1.0;

      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const nx = (-dx / len) * 0.5 + 0.5;
      const ny = (-dy / len) * 0.5 + 0.5;
      const nz = (dz / len) * 0.5 + 0.5;

      const idx = (y * width + x) * 4;
      buf[idx] = Math.round(nx * 255);
      buf[idx + 1] = Math.round(ny * 255);
      buf[idx + 2] = Math.round(nz * 255);
      buf[idx + 3] = 255;
    }
  }
  return buf;
}

const outBase = path.resolve('public', 'textures');

function savePng(subPath, buf) {
  const fullPath = path.join(outBase, subPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, buf);
  console.log(`[PBR TEXTURE] Generated ${subPath} (${(buf.length / 1024).toFixed(1)} KB)`);
}

// ---------------------------------------------------------------------------
// 1. ASPHALT PBR SET (1024x1024)
// ---------------------------------------------------------------------------
console.log('Generating Asphalt PBR maps (1024x1024)...');
{
  const W = 1024, H = 1024;
  const albedoBuf = Buffer.alloc(W * H * 4);
  const ormBuf = Buffer.alloc(W * H * 4);
  const heights = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const hIdx = y * W + x;

      const macro = (fbm(x * 0.005, y * 0.005, 4) + 1) * 0.5;
      const micro = (fbm(x * 0.05, y * 0.05, 3) + 1) * 0.5;
      const grain = ((x * 17 + y * 31) % 100) / 1000 - 0.05;
      const val = Math.min(1, Math.max(0, macro * 0.4 + micro * 0.5 + grain));
      heights[hIdx] = val;

      // Dark asphalt aggregate
      const baseLum = 18 + val * 24;
      albedoBuf[idx] = Math.round(baseLum * 1.0);
      albedoBuf[idx + 1] = Math.round(baseLum * 1.05);
      albedoBuf[idx + 2] = Math.round(baseLum * 1.15);
      albedoBuf[idx + 3] = 255;

      // Organic puddle basins
      const puddleNoise = (fbm(x * 0.003, y * 0.003, 3) + 1) * 0.5;
      const isPuddle = puddleNoise > 0.60 ? Math.min(1, (puddleNoise - 0.60) * 5) : 0;

      // ORM: R=AO, G=Roughness, B=Metallic
      const ao = Math.round((0.75 + val * 0.25) * 255);
      const roughnessVal = Math.round((0.85 * (1 - isPuddle) + 0.08 * isPuddle) * 255);
      const metallicVal = Math.round((0.02 * isPuddle) * 255);

      ormBuf[idx] = ao;
      ormBuf[idx + 1] = roughnessVal;
      ormBuf[idx + 2] = metallicVal;
      ormBuf[idx + 3] = 255;
    }
  }

  const normalBuf = heightToNormalBuffer(heights, W, H, 3.5);
  savePng('asphalt/asphalt_albedo.png', encodePNG(W, H, albedoBuf));
  savePng('asphalt/asphalt_normal.png', encodePNG(W, H, normalBuf));
  savePng('asphalt/asphalt_orm.png', encodePNG(W, H, ormBuf));
}

// ---------------------------------------------------------------------------
// 2. CONCRETE PBR SET (1024x1024)
// ---------------------------------------------------------------------------
console.log('Generating Concrete PBR maps (1024x1024)...');
{
  const W = 1024, H = 1024;
  const albedoBuf = Buffer.alloc(W * H * 4);
  const ormBuf = Buffer.alloc(W * H * 4);
  const heights = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const hIdx = y * W + x;

      const isSeam = ((x % 256) < 3 || (y % 256) < 3) ? 0.35 : 1.0;
      const noise = (fbm(x * 0.01, y * 0.01, 4) + 1) * 0.5;
      const pore = ((x * 47 + y * 89) % 29 === 0) ? 0.4 : 1.0;
      const val = Math.min(1, Math.max(0, noise * 0.7 + 0.3)) * pore * isSeam;
      heights[hIdx] = val;

      const lum = 40 + val * 35;
      albedoBuf[idx] = Math.round(lum * 0.96);
      albedoBuf[idx + 1] = Math.round(lum * 1.0);
      albedoBuf[idx + 2] = Math.round(lum * 1.08);
      albedoBuf[idx + 3] = 255;

      const ao = Math.round(Math.min(1, isSeam * (0.8 + noise * 0.2)) * 255);
      const roughness = Math.round((0.80 + (1 - val) * 0.15) * 255);
      const metallic = 0;

      ormBuf[idx] = ao;
      ormBuf[idx + 1] = roughness;
      ormBuf[idx + 2] = metallic;
      ormBuf[idx + 3] = 255;
    }
  }

  const normalBuf = heightToNormalBuffer(heights, W, H, 2.5);
  savePng('concrete/concrete_albedo.png', encodePNG(W, H, albedoBuf));
  savePng('concrete/concrete_normal.png', encodePNG(W, H, normalBuf));
  savePng('concrete/concrete_orm.png', encodePNG(W, H, ormBuf));
}

// ---------------------------------------------------------------------------
// 3. STEEL / ANODIZED METAL PBR SET (1024x1024)
// ---------------------------------------------------------------------------
console.log('Generating Steel/Anodized Metal PBR maps (1024x1024)...');
{
  const W = 1024, H = 1024;
  const albedoBuf = Buffer.alloc(W * H * 4);
  const ormBuf = Buffer.alloc(W * H * 4);
  const heights = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const hIdx = y * W + x;

      const brush = (Math.sin(y * 1.8) * 0.5 + 0.5) * 0.15;
      const plate = (fbm(x * 0.004, y * 0.004, 3) + 1) * 0.5;
      const seam = (x % 512 < 4 || y % 512 < 4) ? 0.3 : 1.0;
      const val = (plate * 0.85 + brush) * seam;
      heights[hIdx] = val;

      const lum = 24 + val * 28;
      albedoBuf[idx] = Math.round(lum * 0.95);
      albedoBuf[idx + 1] = Math.round(lum * 1.02);
      albedoBuf[idx + 2] = Math.round(lum * 1.12);
      albedoBuf[idx + 3] = 255;

      const ao = Math.round(Math.min(1, seam * 0.95) * 255);
      const roughness = Math.round((0.26 + (1 - brush) * 0.12) * 255);
      const metallic = Math.round(235); // 0.92 metalness

      ormBuf[idx] = ao;
      ormBuf[idx + 1] = roughness;
      ormBuf[idx + 2] = metallic;
      ormBuf[idx + 3] = 255;
    }
  }

  const normalBuf = heightToNormalBuffer(heights, W, H, 2.0);
  savePng('metal/metal_steel_albedo.png', encodePNG(W, H, albedoBuf));
  savePng('metal/metal_steel_normal.png', encodePNG(W, H, normalBuf));
  savePng('metal/metal_steel_orm.png', encodePNG(W, H, ormBuf));
}

// ---------------------------------------------------------------------------
// 4. FABRIC / SIGNAL YELLOW BALLISTIC (512x512)
// ---------------------------------------------------------------------------
console.log('Generating Fabric Ballistic Yellow PBR maps (512x512)...');
{
  const W = 512, H = 512;
  const albedoBuf = Buffer.alloc(W * H * 4);
  const ormBuf = Buffer.alloc(W * H * 4);
  const heights = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const hIdx = y * W + x;

      const wx = Math.sin((x / 4) * Math.PI);
      const wy = Math.sin((y / 4) * Math.PI);
      const weave = (wx * wy * 0.5 + 0.5);
      heights[hIdx] = weave;

      // Vibrant Cyberpunk Signal Yellow: #FCEE0A (252, 238, 10)
      const shade = 0.85 + weave * 0.15;
      albedoBuf[idx] = Math.round(252 * shade);
      albedoBuf[idx + 1] = Math.round(238 * shade);
      albedoBuf[idx + 2] = Math.round(10 * shade);
      albedoBuf[idx + 3] = 255;

      const ao = Math.round((0.8 + weave * 0.2) * 255);
      const roughness = Math.round((0.74 + (1 - weave) * 0.1) * 255);
      const metallic = 0;

      ormBuf[idx] = ao;
      ormBuf[idx + 1] = roughness;
      ormBuf[idx + 2] = metallic;
      ormBuf[idx + 3] = 255;
    }
  }

  const normalBuf = heightToNormalBuffer(heights, W, H, 2.2);
  savePng('fabric/fabric_yellow_albedo.png', encodePNG(W, H, albedoBuf));
  savePng('fabric/fabric_yellow_normal.png', encodePNG(W, H, normalBuf));
  savePng('fabric/fabric_yellow_orm.png', encodePNG(W, H, ormBuf));
}

// ---------------------------------------------------------------------------
// 5. CARBON COMPOSITE (512x512)
// ---------------------------------------------------------------------------
console.log('Generating Carbon Composite PBR maps (512x512)...');
{
  const W = 512, H = 512;
  const albedoBuf = Buffer.alloc(W * H * 4);
  const ormBuf = Buffer.alloc(W * H * 4);
  const heights = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      const hIdx = y * W + x;

      const twill = (((x + y) >> 3) & 1) ^ (((x - y) >> 3) & 1);
      const lum = twill ? 36 : 14;
      heights[hIdx] = twill ? 0.7 : 0.3;

      albedoBuf[idx] = lum;
      albedoBuf[idx + 1] = lum;
      albedoBuf[idx + 2] = lum + 2;
      albedoBuf[idx + 3] = 255;

      ormBuf[idx] = 240;
      ormBuf[idx + 1] = Math.round(0.22 * 255);
      ormBuf[idx + 2] = Math.round(0.65 * 255);
      ormBuf[idx + 3] = 255;
    }
  }

  const normalBuf = heightToNormalBuffer(heights, W, H, 1.8);
  savePng('carbon/carbon_albedo.png', encodePNG(W, H, albedoBuf));
  savePng('carbon/carbon_normal.png', encodePNG(W, H, normalBuf));
  savePng('carbon/carbon_orm.png', encodePNG(W, H, ormBuf));
}

// ---------------------------------------------------------------------------
// 6. DECALS & HAZARD STRIPES
// ---------------------------------------------------------------------------
console.log('Generating Decals and Hazard Stripes...');
{
  // 6A. Hazard Stripes (512x128)
  const W = 512, H = 128;
  const hazBuf = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 4;
      // 45-degree yellow & black stripes with period 48
      const stripe = ((x + y) % 48) < 24;
      if (stripe) {
        // Yellow #FCEE0A
        hazBuf[idx] = 252;
        hazBuf[idx + 1] = 238;
        hazBuf[idx + 2] = 10;
        hazBuf[idx + 3] = 255;
      } else {
        // Black #0F1115
        hazBuf[idx] = 15;
        hazBuf[idx + 1] = 17;
        hazBuf[idx + 2] = 21;
        hazBuf[idx + 3] = 255;
      }
    }
  }
  savePng('decals/hazard_stripes.png', encodePNG(W, H, hazBuf));

  // 6B. Neural Falcon Operative Emblem (512x512)
  const FW = 512, FH = 512;
  const falBuf = Buffer.alloc(FW * FH * 4, 0); // Transparent base
  const cx = 256, cy = 256;
  for (let y = 0; y < FH; y++) {
    for (let x = 0; x < FW; x++) {
      const idx = (y * FW + x) * 4;
      const dx = Math.abs(x - cx);
      const dy = y - cy;

      // Outer falcon silhouette polygon bounds
      let inWing = false;
      if (dy >= -140 && dy <= 160) {
        const span = dy < -60 ? (dy + 140) * 2.0 :
                     dy < 40 ? 160 + (dy + 60) * 0.5 :
                     dy < 90 ? 120 - (dy - 40) * 1.0 :
                     70 - (dy - 90) * 1.0;
        if (dx <= span && dx >= span - 24) inWing = true;
      }

      // Inner neural diamond
      let inDiamond = false;
      if (Math.abs(dx) + Math.abs(dy + 10) < 55) inDiamond = true;

      if (inDiamond) {
        // Gold neural core #FCEE0A
        falBuf[idx] = 252;
        falBuf[idx + 1] = 238;
        falBuf[idx + 2] = 10;
        falBuf[idx + 3] = 255;
      } else if (inWing) {
        // Neon cyan cyber wings #00E5FF
        falBuf[idx] = 0;
        falBuf[idx + 1] = 229;
        falBuf[idx + 2] = 255;
        falBuf[idx + 3] = 255;
      }
    }
  }
  savePng('decals/falcon_emblem.png', encodePNG(FW, FH, falBuf));
}

console.log('ALL PBR TEXTURES BTH DETERMINISTICALLY GENERATED AND PERSISTED!');


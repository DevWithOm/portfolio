import fs from 'fs';
import path from 'path';

const modelsDir = path.resolve('public/models');
const files = [
  'corporate_skyscraper.glb',
  'secondary_arcology.glb',
  'cyber_operative.glb',
  'aerodyne_spinner.glb',
  'rooftop_machinery.glb'
];

console.log('--- V4 GLB ASSET AUDIT REPORT ---');

for (const file of files) {
  const filePath = path.join(modelsDir, file);
  const buf = fs.readFileSync(filePath);
  const jsonLen = buf.readUInt32LE(12);
  const jsonChunk = buf.subarray(20, 20 + jsonLen);
  const gltf = JSON.parse(jsonChunk.toString('utf8'));

  let triCount = 0;
  let meshCount = gltf.meshes ? gltf.meshes.length : 0;
  let matCount = gltf.materials ? gltf.materials.length : 0;
  let texCount = gltf.textures ? gltf.textures.length : 0;

  if (gltf.meshes) {
    for (const mesh of gltf.meshes) {
      for (const prim of mesh.primitives) {
        if (prim.indices !== undefined) {
          const acc = gltf.accessors[prim.indices];
          triCount += acc.count / 3;
        } else if (prim.attributes.POSITION !== undefined) {
          const acc = gltf.accessors[prim.attributes.POSITION];
          triCount += acc.count / 3;
        }
      }
    }
  }

  // Calculate bounding box across all position accessors
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  if (gltf.accessors) {
    for (const acc of gltf.accessors) {
      if (acc.min && acc.max && acc.type === 'VEC3') {
        min[0] = Math.min(min[0], acc.min[0]);
        min[1] = Math.min(min[1], acc.min[1]);
        min[2] = Math.min(min[2], acc.min[2]);
        max[0] = Math.max(max[0], acc.max[0]);
        max[1] = Math.max(max[1], acc.max[1]);
        max[2] = Math.max(max[2], acc.max[2]);
      }
    }
  }

  console.log(`\nAsset: ${file}`);
  console.log(`  File Size: ${(buf.length / 1024).toFixed(1)} KB`);
  console.log(`  Meshes: ${meshCount}, Materials: ${matCount}, Textures: ${texCount}`);
  console.log(`  Triangle Count: ${Math.round(triCount)}`);
  console.log(`  Bounds: X[${min[0].toFixed(2)}, ${max[0].toFixed(2)}] Y[${min[1].toFixed(2)}, ${max[1].toFixed(2)}] Z[${min[2].toFixed(2)}, ${max[2].toFixed(2)}]`);
  console.log(`  Base min.Y: ${min[1].toFixed(2)} (Ground Datum Pivot check)`);
}


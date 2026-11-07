import fs from 'fs';
import path from 'path';

const modelsDir = path.resolve('public/models');
const targetFiles = [
  'aerodyne_spinner.glb',
  'corporate_skyscraper.glb',
  'cyber_operative.glb',
  'rooftop_machinery.glb'
];

console.log('================================================================');
console.log('  NIGHT CITY V4 - PHASE 1: COMPREHENSIVE GLB ASSET INSPECTION  ');
console.log('================================================================\n');

for (const file of targetFiles) {
  const filePath = path.join(modelsDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File missing: ${filePath}`);
    continue;
  }

  const buf = fs.readFileSync(filePath);
  const magic = buf.toString('ascii', 0, 4);
  const version = buf.readUInt32LE(4);
  const length = buf.readUInt32LE(8);
  const jsonChunkLen = buf.readUInt32LE(12);
  const jsonChunkType = buf.toString('ascii', 16, 20);
  const jsonBytes = buf.subarray(20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonBytes.toString('utf8'));

  console.log(`>>> ASSET: ${file.toUpperCase()} (${file})`);
  console.log(`  File Size: ${(buf.length / 1024).toFixed(2)} KB (${buf.length} bytes)`);
  console.log(`  GLTF Magic: ${magic}, Version: ${version}, Total Chunk Length: ${length}`);

  // Nodes & Scene Hierarchy
  const scene = gltf.scenes ? gltf.scenes[gltf.scene || 0] : null;
  console.log(`  Scene Root Nodes: ${scene && scene.nodes ? JSON.stringify(scene.nodes) : 'None'}`);

  if (gltf.nodes) {
    console.log(`  Total Nodes: ${gltf.nodes.length}`);
    gltf.nodes.forEach((n, idx) => {
      const trans = n.translation ? `T[${n.translation.map(v => v.toFixed(2)).join(', ')}]` : '';
      const rot = n.rotation ? `R[${n.rotation.map(v => v.toFixed(2)).join(', ')}]` : '';
      const scl = n.scale ? `S[${n.scale.map(v => v.toFixed(2)).join(', ')}]` : '';
      const meshRef = n.mesh !== undefined ? `Mesh[#${n.mesh}]` : '';
      const name = n.name ? `"${n.name}"` : `Node_${idx}`;
      console.log(`    Node #${idx} ${name}: ${[meshRef, trans, rot, scl].filter(Boolean).join(' ')}`);
    });
  }

  // Meshes, Primitives, Vertices & Triangles
  let totalTriangles = 0;
  let totalVertices = 0;
  const meshDetails = [];

  if (gltf.meshes) {
    gltf.meshes.forEach((m, mIdx) => {
      let mTris = 0;
      let mVerts = 0;
      m.primitives.forEach((prim, pIdx) => {
        let pTris = 0;
        let pVerts = 0;
        if (prim.indices !== undefined) {
          const acc = gltf.accessors[prim.indices];
          pTris = acc.count / 3;
        }
        if (prim.attributes && prim.attributes.POSITION !== undefined) {
          const acc = gltf.accessors[prim.attributes.POSITION];
          pVerts = acc.count;
          if (prim.indices === undefined) pTris = acc.count / 3;
        }
        mTris += pTris;
        mVerts += pVerts;
      });
      totalTriangles += mTris;
      totalVertices += mVerts;
      meshDetails.push({ name: m.name || `Mesh_${mIdx}`, primitives: m.primitives.length, tris: mTris, verts: mVerts });
    });
  }

  console.log(`  Geometry Summary:`);
  console.log(`    Meshes: ${gltf.meshes ? gltf.meshes.length : 0}`);
  console.log(`    Total Vertices: ${totalVertices}`);
  console.log(`    Total Triangles: ${Math.round(totalTriangles)}`);

  // Bounding Box Analysis
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  let hasPositions = false;

  if (gltf.accessors) {
    gltf.accessors.forEach((acc) => {
      if (acc.min && acc.max && acc.type === 'VEC3') {
        min[0] = Math.min(min[0], acc.min[0]);
        min[1] = Math.min(min[1], acc.min[1]);
        min[2] = Math.min(min[2], acc.min[2]);
        max[0] = Math.max(max[0], acc.max[0]);
        max[1] = Math.max(max[1], acc.max[1]);
        max[2] = Math.max(max[2], acc.max[2]);
        hasPositions = true;
      }
    });
  }

  if (hasPositions) {
    const size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    const center = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
    console.log(`  Spatial Coordinates & Bounding Box:`);
    console.log(`    Min Bounds: X=${min[0].toFixed(3)}m, Y=${min[1].toFixed(3)}m, Z=${min[2].toFixed(3)}m`);
    console.log(`    Max Bounds: X=${max[0].toFixed(3)}m, Y=${max[1].toFixed(3)}m, Z=${max[2].toFixed(3)}m`);
    console.log(`    Dimensions: Width(X)=${size[0].toFixed(3)}m, Height(Y)=${size[1].toFixed(3)}m, Depth(Z)=${size[2].toFixed(3)}m`);
    console.log(`    Center of Bounding Box: X=${center[0].toFixed(3)}m, Y=${center[1].toFixed(3)}m, Z=${center[2].toFixed(3)}m`);
    console.log(`    Origin [0,0,0] Relative Position:`);
    console.log(`      X-Alignment: ${Math.abs(center[0]) < 0.05 ? 'Centered on X=0' : `Offset by ${center[0].toFixed(2)}m`}`);
    console.log(`      Y-Datum (Ground Datum Standard): min.Y=${min[1].toFixed(3)}m -> ${Math.abs(min[1]) < 0.001 ? 'PERFECT GROUND DATUM (Y_min = 0.000m)' : Math.abs(center[1]) < 0.1 ? 'CENTERED PIVOT' : `Y_min=${min[1].toFixed(2)}m`}`);
    console.log(`      Z-Alignment: ${Math.abs(center[2]) < 0.05 ? 'Centered on Z=0' : `Offset by ${center[2].toFixed(2)}m`}`);
  }

  // Materials & Textures
  console.log(`  Materials & Shading:`);
  console.log(`    Material Count: ${gltf.materials ? gltf.materials.length : 0}`);
  if (gltf.materials) {
    gltf.materials.forEach((mat, mIdx) => {
      console.log(`    Material #${mIdx} "${mat.name || 'unnamed'}":`);
      if (mat.pbrMetallicRoughness) {
        const pbr = mat.pbrMetallicRoughness;
        const color = pbr.baseColorFactor ? `[${pbr.baseColorFactor.map(v => v.toFixed(2)).join(', ')}]` : '[1, 1, 1, 1]';
        console.log(`      BaseColor: ${color}, Metallic: ${pbr.metallicFactor ?? 1.0}, Roughness: ${pbr.roughnessFactor ?? 1.0}`);
        if (pbr.baseColorTexture) console.log(`      BaseColorTexture: Texture #${pbr.baseColorTexture.index}`);
        if (pbr.metallicRoughnessTexture) console.log(`      MetallicRoughnessTexture: Texture #${pbr.metallicRoughnessTexture.index}`);
      }
      if (mat.normalTexture) console.log(`      NormalTexture: Texture #${mat.normalTexture.index}`);
      if (mat.occlusionTexture) console.log(`      OcclusionTexture: Texture #${mat.occlusionTexture.index}`);
      if (mat.emissiveFactor) console.log(`      EmissiveFactor: [${mat.emissiveFactor.map(v => v.toFixed(2)).join(', ')}]`);
      if (mat.emissiveTexture) console.log(`      EmissiveTexture: Texture #${mat.emissiveTexture.index}`);
      if (mat.alphaMode) console.log(`      AlphaMode: ${mat.alphaMode}`);
      if (mat.doubleSided) console.log(`      DoubleSided: ${mat.doubleSided}`);
    });
  }

  // Textures and Images
  console.log(`    Texture Count: ${gltf.textures ? gltf.textures.length : 0}`);
  console.log(`    Image Count: ${gltf.images ? gltf.images.length : 0}`);
  if (gltf.images) {
    gltf.images.forEach((img, iIdx) => {
      if (img.bufferView !== undefined) {
        const bv = gltf.bufferViews[img.bufferView];
        console.log(`      Image #${iIdx}: Embedded in BufferView #${img.bufferView} (${(bv.byteLength / 1024).toFixed(1)} KB, MIME: ${img.mimeType || 'unknown'})`);
      } else if (img.uri) {
        console.log(`      Image #${iIdx}: External URI "${img.uri}"`);
      }
    });
  }

  console.log('----------------------------------------------------------------\n');
}

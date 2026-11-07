import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const PORT = 4199;
const PUBLIC_DIR = path.resolve('public');
const THREE_DIR = path.resolve('node_modules', 'three');
const ARTIFACT_DIR = path.resolve('C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(process.env.TEMP, 'chrome_ast_profile_' + Date.now());

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png'
};

const outDir = path.resolve('public', 'v4_asset_captures');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(ARTIFACT_DIR, 'v4_asset_captures'), { recursive: true });

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath;
  if (urlPath.startsWith('/three/')) {
    filePath = path.join(THREE_DIR, urlPath.replace('/three/', ''));
  } else {
    filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'v4_model_studio.html' : urlPath.replace(/^\//, ''));
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': mime, 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

function captureScreenshot(url, targetPath, windowSize = '1440,900', virtualTime = 2500) {
  return new Promise((resolve, reject) => {
    const tempFile = path.join(process.env.TEMP, `ast_cap_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
    const userDataDir = path.join(process.env.TEMP, `chrome_ast_${Date.now()}_${Math.random().toString(36).substring(7)}`);
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-extensions',
      '--disable-default-apps',
      '--disable-component-update',
      '--disable-background-networking',
      '--disable-sync',
      `--window-size=${windowSize}`,
      `--virtual-time-budget=${virtualTime}`,
      '--run-all-compositor-stages-before-draw',
      `--user-data-dir=${userDataDir}`,
      `--screenshot=${tempFile}`,
      url
    ];

    const child = spawn(CHROME_PATH, args, { stdio: 'ignore' });

    const timeout = setTimeout(() => {
      try { child.kill(); } catch (e) {}
      try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
      reject(new Error(`Timeout capturing ${url}`));
    }, 25000);

    child.on('close', (code) => {
      clearTimeout(timeout);
      try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
      if (fs.existsSync(tempFile) && fs.statSync(tempFile).size > 0) {
        fs.copyFileSync(tempFile, targetPath);
        try { fs.unlinkSync(tempFile); } catch (e) {}
        resolve(fs.statSync(targetPath).size);
      } else {
        reject(new Error(`Failed to capture ${url} (code ${code})`));
      }
    });

    child.on('error', (err) => {
      clearTimeout(timeout);
      try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
      reject(err);
    });
  });
}

const models = [
  'corporate_skyscraper',
  'secondary_arcology',
  'cyber_operative',
  'aerodyne_spinner',
  'rooftop_machinery'
];

const views = [
  'three_quarter',
  'front',
  'side',
  'wireframe',
  'closeup'
];

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Asset capture server running on http://127.0.0.1:${PORT}`);
  try {
    for (const m of models) {
      for (const v of views) {
        const filename = `v4_${m}_${v}.png`;
        const localPath = path.join(outDir, filename);
        const artPath = path.join(ARTIFACT_DIR, 'v4_asset_captures', filename);
        const rootArtPath = path.join(ARTIFACT_DIR, filename);
        const url = `http://127.0.0.1:${PORT}/v4_model_studio.html?model=${m}&view=${v}`;

        process.stdout.write(`Capturing [${m} - ${v}] ... `);
        const size = await captureScreenshot(url, localPath, '1440,900', 3200);
        fs.copyFileSync(localPath, artPath);
        fs.copyFileSync(localPath, rootArtPath);
        console.log(`OK (${(size / 1024).toFixed(1)} KB)`);
      }
    }
    console.log('All 25 3D Asset Validation Captures Successfully Created!');
  } catch (err) {
    console.error('Asset capture error:', err);
  } finally {
    try {
      if (fs.existsSync(USER_DATA_DIR)) fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
    server.close();
    process.exit(0);
  }
});

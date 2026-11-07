import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const PORT = 4198;
const DIST_DIR = path.resolve('dist');
const THREE_DIR = path.resolve('node_modules', 'three');
const ARTIFACT_DIR = path.resolve('C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(process.env.TEMP, 'clean_env_profile_' + Date.now());

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const outEnv = path.resolve('public', 'v2_3_1_audits', 'environment');
fs.mkdirSync(outEnv, { recursive: true });

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath;
  if (urlPath.startsWith('/three/')) {
    filePath = path.join(THREE_DIR, urlPath.replace('/three/', ''));
  } else {
    filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);
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

function captureScreenshot(url, targetPath, windowSize = '1440,900', virtualTime = 3500) {
  return new Promise((resolve, reject) => {
    const tempFile = path.join(process.env.TEMP, `env_cap_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
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
      `--user-data-dir=${USER_DATA_DIR}`,
      `--screenshot=${tempFile}`,
      url
    ];

    const child = spawn(CHROME_PATH, args);

    const timeout = setTimeout(() => {
      try { child.kill(); } catch (e) {}
      reject(new Error(`Timeout capturing ${url}`));
    }, 20000);

    child.on('close', (code) => {
      clearTimeout(timeout);
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
      reject(err);
    });
  });
}

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Env capture server running on port ${PORT}`);
  try {
    const remaining = [
      { name: 'v2_3_1_character_close.png', size: '1440,900', url: `http://127.0.0.1:${PORT}/?view=character` },
      { name: 'v2_3_1_tower_close.png', size: '1440,900', url: `http://127.0.0.1:${PORT}/?view=architecture` },
      { name: 'v2_3_1_vehicle_close.png', size: '1440,900', url: `http://127.0.0.1:${PORT}/?view=vehicle` },
      { name: 'v2_3_1_rooftop_close.png', size: '1440,900', url: `http://127.0.0.1:${PORT}/?view=rooftop` },
      { name: 'v2_3_1_wet_surface_close.png', size: '1440,900', url: `http://127.0.0.1:${PORT}/?view=wet-surface` },
      { name: 'v2_3_1_mobile_390.png', size: '390,844', url: `http://127.0.0.1:${PORT}/` }
    ];

    for (const cap of remaining) {
      const localPath = path.join(outEnv, cap.name);
      const artPath = path.join(ARTIFACT_DIR, 'v2_3_1_audits', 'environment', cap.name);
      const rootArtPath = path.join(ARTIFACT_DIR, cap.name);

      process.stdout.write(`Capturing ${cap.name} ... `);
      const size = await captureScreenshot(cap.url, localPath, cap.size, 3500);
      fs.copyFileSync(localPath, artPath);
      fs.copyFileSync(localPath, rootArtPath);
      console.log(`OK (${(size / 1024).toFixed(1)} KB)`);
    }
    console.log('All remaining environment captures complete!');
  } catch (err) {
    console.error('Capture error:', err);
  } finally {
    try {
      if (fs.existsSync(USER_DATA_DIR)) fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
    server.close();
    process.exit(0);
  }
});

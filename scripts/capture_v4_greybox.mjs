import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const PORT = 4199;
const DIST_DIR = path.resolve('dist');
const THREE_DIR = path.resolve('node_modules', 'three');
const ARTIFACT_DIR = path.resolve('C:/Users/ASUS/.gemini/antigravity/brain/3e3b2abf-5008-444c-88d5-38289659cc52');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(process.env.TEMP, 'chrome_greybox_profile_' + Date.now());

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const outDir = path.resolve('public', 'v4_greybox_captures');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(ARTIFACT_DIR, 'v4_greybox_captures'), { recursive: true });

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

function captureScreenshot(url, targetPath, windowSize = '1440,900', virtualTime = 3000) {
  return new Promise((resolve, reject) => {
    const tempFile = path.join(process.env.TEMP, `gb_cap_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
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
  console.log(`Greybox capture server running on port ${PORT}`);
  try {
    const captures = [
      { name: 'v4_greybox_top_down.png', size: '1440,900', view: 'top_down' },
      { name: 'v4_greybox_side_elevation.png', size: '1440,900', view: 'side_elevation' },
      { name: 'v4_greybox_hero_1440.png', size: '1440,900', view: 'hero_1440' },
      { name: 'v4_greybox_hero_1280.png', size: '1280,800', view: 'hero_1280' },
      { name: 'v4_greybox_scene_only.png', size: '1440,900', view: 'scene_only' },
      { name: 'v4_greybox_wp1_hero.png', size: '1280,720', view: 'wp1_hero' },
      { name: 'v4_greybox_wp2_dossier.png', size: '1280,720', view: 'wp2_dossier' },
      { name: 'v4_greybox_wp3_projects.png', size: '1280,720', view: 'wp3_projects' },
      { name: 'v4_greybox_wp4_skills.png', size: '1280,720', view: 'wp4_skills' },
      { name: 'v4_greybox_wp5_research.png', size: '1280,720', view: 'wp5_research' },
      { name: 'v4_greybox_wp6_contact.png', size: '1280,720', view: 'wp6_contact' }
    ];

    for (const cap of captures) {
      const localPath = path.join(outDir, cap.name);
      const artPath = path.join(ARTIFACT_DIR, 'v4_greybox_captures', cap.name);
      const rootArtPath = path.join(ARTIFACT_DIR, cap.name);
      const url = `http://127.0.0.1:${PORT}/v4_greybox_studio.html?view=${cap.view}`;

      process.stdout.write(`Capturing [${cap.name} - ${cap.view}] ... `);
      const size = await captureScreenshot(url, localPath, cap.size, 3000);
      fs.copyFileSync(localPath, artPath);
      fs.copyFileSync(localPath, rootArtPath);
      console.log(`OK (${(size / 1024).toFixed(1)} KB)`);
    }

    console.log('All 11 Greybox Validation Captures Successfully Created!');
  } catch (err) {
    console.error('Greybox capture error:', err);
  } finally {
    try {
      if (fs.existsSync(USER_DATA_DIR)) fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch (e) {}
    server.close();
    process.exit(0);
  }
});


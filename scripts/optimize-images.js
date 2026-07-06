const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dirs = [
  'assets',
  'assets/img',
  'assets/img/team',
  'assets/img/clients',
  'assets/img/portfolio',
  'assets/img/textblock',
  '_assets/img',
];

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const webpPath = filePath.slice(0, -ext.length) + '.webp';

    if (fs.existsSync(webpPath)) return;

    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image
      .resize({ width: metadata.width > 2400 ? 2400 : null, withoutEnlargement: true })
      .webp({ quality: 80 });

    await pipeline.toFile(webpPath);
    console.log('  Optimized:', path.basename(filePath));
  } catch (err) {
    console.error('  Failed:', filePath, err.message);
  }
}

async function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (/\.(png|jpg|jpeg|gif)$/i.test(entry.name)) {
      await optimizeImage(full);
    }
  }
}

(async () => {
  console.log('Optimizing images...');
  for (const dir of dirs) {
    const abs = path.resolve(__dirname, '..', dir);
    if (fs.existsSync(abs)) {
      await walk(abs);
    }
  }
  console.log('Done.');
})();

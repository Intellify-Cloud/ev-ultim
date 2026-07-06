const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicons() {
  const sourcePath = path.resolve(__dirname, '..', 'favicon.png');
  const outputDir = path.resolve(__dirname, '..');

  if (!fs.existsSync(sourcePath)) {
    console.error('Source favicon.png not found');
    process.exit(1);
  }

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  console.log('Generating favicons from favicon.png...');

  for (const { name, size } of sizes) {
    try {
      await sharp(sourcePath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 143, b: 168, a: 1 } })
        .toFile(path.join(outputDir, name));
      console.log(`  Created ${name} (${size}x${size})`);
    } catch (err) {
      console.error(`  Failed to create ${name}:`, err.message);
    }
  }

  // Generate ICO file (16x16 and 32x32 combined)
  try {
    const buffer16 = await sharp(sourcePath).resize(16, 16).toFormat('ico').toBuffer();
    const buffer32 = await sharp(sourcePath).resize(32, 32).toFormat('ico').toBuffer();
    // Simple approach: just create a basic ICO with 16x16
    await sharp(sourcePath).resize(16, 16).toFormat('ico').toFile(path.join(outputDir, 'favicon.ico'));
    console.log('  Created favicon.ico');
  } catch (err) {
    console.error('  Failed to create favicon.ico:', err.message);
  }

  console.log('Done.');
}

generateFavicons();
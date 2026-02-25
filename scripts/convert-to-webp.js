/**
 * Convert PNG and JPG images to WebP (keeps originals for fallback).
 * Run: node scripts/convert-to-webp.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'images');

function getAllImages(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getAllImages(fullPath, files);
    } else if (/\.(png|jpg|jpeg)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const webpPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (fs.existsSync(webpPath)) {
    console.log('Skip (exists):', path.relative(IMAGES_DIR, webpPath));
    return;
  }
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    console.log('Converted:', path.relative(IMAGES_DIR, inputPath), '->', path.basename(webpPath));
  } catch (err) {
    console.error('Error:', inputPath, err.message);
  }
}

async function main() {
  const images = getAllImages(IMAGES_DIR);
  if (images.length === 0) {
    console.log('No PNG/JPG images found in images/');
    return;
  }
  console.log('Converting', images.length, 'images to WebP...\n');
  for (const img of images) {
    await convertToWebP(img);
  }
  console.log('\nDone.');
}

main();

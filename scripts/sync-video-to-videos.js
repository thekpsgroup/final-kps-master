#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'public', 'Customer-Testimonial.mp4');
const destDir = path.join(root, 'public', 'videos');
const dest = path.join(destDir, 'dfw-testimonial.mp4');
const poster = path.join(destDir, 'dfw-poster.svg');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(src)) {
  console.error('Source video not found:', src);
  process.exit(1);
}

ensureDir(destDir);

fs.copyFileSync(src, dest);
console.log('Copied', src, '->', dest);

if (!fs.existsSync(poster)) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n  <rect width="100%" height="100%" fill="#0f172a"/>\n  <text x="50%" y="50%" font-family="Inter, Arial, sans-serif" font-size="36" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">DFW Testimonial</text>\n</svg>`;
  fs.writeFileSync(poster, svg, 'utf8');
  console.log('Created poster:', poster);
} else {
  console.log('Poster already exists:', poster);
}

process.exit(0);

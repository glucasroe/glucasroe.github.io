import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURE THIS: Path to your Obsidian vault
const OBSIDIAN_VAULT = path.join(process.env.HOME, 'Documents/Obsidian/MyVault');
const GARDEN_DIR = path.join(__dirname, '../src/content/garden');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images/garden');

function copyRecursive(src, dest, imagesDest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory not found: ${src}`);
    console.log('Please update OBSIDIAN_VAULT path in scripts/sync-garden.js');
    console.log('Current path checked:', src);
    return;
  }

  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Create images destination if provided
  if (imagesDest && !fs.existsSync(imagesDest)) {
    fs.mkdirSync(imagesDest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip hidden files and certain directories
    if (entry.name.startsWith('.') ||
        entry.name === 'node_modules' ||
        entry.name === '.obsidian' ||
        entry.name === '.trash') {
      continue;
    }

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, imagesDest);
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
    } else if (entry.name.match(/\.(png|jpg|jpeg|gif|svg|pdf|webp)$/i)) {
      // Copy images to content folder
      fs.copyFileSync(srcPath, destPath);
      // Also copy to public images folder if provided
      if (imagesDest) {
        const imageDestPath = path.join(imagesDest, entry.name);
        fs.copyFileSync(srcPath, imageDestPath);
        console.log(`  Copied image: ${entry.name}`);
      }
    }
  }
}

console.log('Syncing Obsidian vault to garden...');
console.log(`Source: ${OBSIDIAN_VAULT}`);
console.log(`Destination: ${GARDEN_DIR}`);
console.log(`Images: ${PUBLIC_IMAGES_DIR}`);

copyRecursive(OBSIDIAN_VAULT, GARDEN_DIR, PUBLIC_IMAGES_DIR);

console.log('Sync complete!');
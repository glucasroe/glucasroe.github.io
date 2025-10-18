import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURE THIS: Path to your Obsidian vault
const OBSIDIAN_VAULT = path.join(process.env.HOME, 'Documents/Obsidian/MyVault');
const GARDEN_DIR = path.join(__dirname, '../src/content/garden');

function copyRecursive(src, dest) {
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
      copyRecursive(srcPath, destPath);
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
    } else if (entry.name.match(/\.(png|jpg|jpeg|gif|svg|pdf)$/i)) {
      // Copy images and PDFs
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Syncing Obsidian vault to garden...');
console.log(`Source: ${OBSIDIAN_VAULT}`);
console.log(`Destination: ${GARDEN_DIR}`);

copyRecursive(OBSIDIAN_VAULT, GARDEN_DIR);

console.log('Sync complete!');
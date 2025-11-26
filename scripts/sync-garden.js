import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURE THIS: Path to your Obsidian vault
const OBSIDIAN_VAULT = path.join(process.env.HOME, 'Documents/Obsidian/MyVault');
const GARDEN_DIR = path.join(__dirname, '../src/content/garden');
const ATTACHMENTS_DIR = path.join(GARDEN_DIR, '_meta/attachments');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images/garden');

function copyRecursive(src, dest, attachmentsDest, publicImagesDest) {
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

  // Create attachments destination if provided
  if (attachmentsDest && !fs.existsSync(attachmentsDest)) {
    fs.mkdirSync(attachmentsDest, { recursive: true });
  }

  // Create public images destination if provided
  if (publicImagesDest && !fs.existsSync(publicImagesDest)) {
    fs.mkdirSync(publicImagesDest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip hidden files and certain directories
    if (entry.name.startsWith('.') ||
        entry.name === 'node_modules' ||
        entry.name === '.obsidian' ||
        entry.name === '.trash' ||
        entry.name === '_meta') {
      continue;
    }

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, attachmentsDest, publicImagesDest);
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  Copied note: ${entry.name}`);
    } else if (entry.name.match(/\.(png|jpg|jpeg|gif|svg|pdf|webp)$/i)) {
      // Copy images to attachments folder in content (preserves original filenames)
      if (attachmentsDest) {
        const attachmentPath = path.join(attachmentsDest, entry.name);
        fs.copyFileSync(srcPath, attachmentPath);
        console.log(`  Copied image to attachments: ${entry.name}`);
      }

      // Also copy to public images folder (for serving)
      if (publicImagesDest) {
        const publicPath = path.join(publicImagesDest, entry.name);
        fs.copyFileSync(srcPath, publicPath);
        console.log(`  Copied image to public: ${entry.name}`);
      }
    }
  }
}

console.log('Syncing Obsidian vault to garden...');
console.log(`Source: ${OBSIDIAN_VAULT}`);
console.log(`Destination: ${GARDEN_DIR}`);
console.log(`Attachments: ${ATTACHMENTS_DIR}`);
console.log(`Public Images: ${PUBLIC_IMAGES_DIR}`);
console.log('');

copyRecursive(OBSIDIAN_VAULT, GARDEN_DIR, ATTACHMENTS_DIR, PUBLIC_IMAGES_DIR);

console.log('');
console.log('Sync complete!');
console.log('');
console.log('📁 Images are stored in:');
console.log(`   - Content: ${ATTACHMENTS_DIR}`);
console.log(`   - Public: ${PUBLIC_IMAGES_DIR}`);
import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Remark plugin to convert Obsidian-style image embeds ![[image.ext]] to actual images
 * Handles images in both public/images/garden/ and content/garden/_meta/attachments/
 */
export default function remarkObsidianImages() {
  const publicDir = path.join(__dirname, '../public/images/garden');
  const attachmentsDir = path.join(__dirname, '../src/content/garden/_meta/attachments');

  return (tree, file) => {
    const missingImages = [];

    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;

      // Match Obsidian image embeds: ![[filename.ext]]
      const imageEmbedRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp|pdf))\]\]/gi;

      if (!imageEmbedRegex.test(node.value)) return;

      // Reset regex for actual matching
      imageEmbedRegex.lastIndex = 0;

      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = imageEmbedRegex.exec(node.value)) !== null) {
        // Add text before the image
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index)
          });
        }

        const filename = match[1];
        let imagePath = `/images/garden/${filename}`;

        // Check if image exists in public directory
        const publicPath = path.join(publicDir, filename);
        const attachmentPath = path.join(attachmentsDir, filename);

        // Verify the image exists somewhere
        const existsInPublic = fs.existsSync(publicPath);
        const existsInAttachments = fs.existsSync(attachmentPath);

        if (!existsInPublic && !existsInAttachments) {
          // Track missing images for warning
          missingImages.push({ filename, source: file.path || 'unknown' });
        } else if (!existsInPublic && existsInAttachments) {
          // Copy from attachments to public if needed
          try {
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            fs.copyFileSync(attachmentPath, publicPath);
            console.log(`  Copied missing image to public: ${filename}`);
          } catch (err) {
            console.error(`  Failed to copy ${filename}:`, err.message);
          }
        }

        // Add the image node
        parts.push({
          type: 'image',
          url: imagePath,
          alt: filename.replace(/\.(png|jpg|jpeg|gif|svg|webp|pdf)$/i, ''),
          title: filename
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        parts.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }

      // Replace the text node with the parts
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });

    // Log missing images as warnings
    if (missingImages.length > 0) {
      console.warn('\n⚠️  Missing garden images:');
      missingImages.forEach(({ filename, source }) => {
        console.warn(`   ${filename} (referenced in ${path.basename(source)})`);
      });
      console.warn('   These images should be in public/images/garden/ or src/content/garden/_meta/attachments/\n');
    }
  };
}

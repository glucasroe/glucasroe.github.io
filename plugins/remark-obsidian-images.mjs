import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert Obsidian-style image embeds ![[image.ext]] to actual images
 */
export default function remarkObsidianImages() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;

      // Match Obsidian image embeds: ![[filename.ext]]
      const imageEmbedRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp))\]\]/gi;

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

        // Add the image
        const filename = match[1];
        parts.push({
          type: 'image',
          url: `/images/garden/${filename}`,
          alt: filename.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '')
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
  };
}

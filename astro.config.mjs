// @ts-nocheck
import { defineConfig } from 'astro/config';
import remarkWikiLink from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
  site: 'https://glucasroe.com',
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, {
        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: (permalink) => `/garden/${permalink}`,
        wikiLinkClassName: 'wikilink',
        newClassName: 'wikilink-new',
      }],
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});

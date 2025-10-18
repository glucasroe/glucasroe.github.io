# Astro Site Migration Instructions

## Project Overview

Migrate a Jekyll-based GitHub Pages site to Astro, incorporating a digital garden subsection that will house Obsidian vault content. The final structure will have:
- Main site content at `/` (migrated from Jekyll)
- Digital garden at `/garden/*` (Obsidian vault content with wikilinks)
- Single unified build process
- All managed through Astro's content collections

## Project Structure

```
astro-site/
├── src/
│   ├── content/
│   │   ├── config.ts           # Content collection definitions
│   │   ├── pages/              # Main site content (migrated from Jekyll)
│   │   ├── blog/               # Blog posts (if applicable)
│   │   └── garden/             # Obsidian vault content
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Shared base layout
│   │   ├── PageLayout.astro    # For regular pages
│   │   └── GardenLayout.astro  # For garden notes
│   ├── components/
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── Callout.astro       # For Obsidian-style callouts
│   └── pages/
│       ├── index.astro         # Homepage
│       ├── [...slug].astro     # Dynamic routes for main content
│       └── garden/
│           ├── index.astro     # Garden index/map page
│           └── [...slug].astro # Dynamic routes for garden notes
├── public/                     # Static assets
├── astro.config.mjs           # Astro configuration
├── package.json
├── tsconfig.json
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions deployment
```

## Step 1: Initialize Astro Project

```bash
# Create new Astro project
npm create astro@latest astro-site

# When prompted, select:
# - Template: Empty
# - TypeScript: Yes (Strict)
# - Install dependencies: Yes
# - Initialize git: Yes (if not already in a repo)

cd astro-site

# Install required dependencies
npm install remark-wiki-link gray-matter unist-util-visit
```

## Step 2: Configure Content Collections

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

// Regular pages/posts collection
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    draft: z.boolean().optional(),
    layout: z.string().optional(),
  }),
});

// Blog collection (if you have blog posts)
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

// Garden collection - Obsidian-style notes
const garden = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    created: z.date().optional(),
    updated: z.date().optional(),
    aliases: z.array(z.string()).optional(),
    publish: z.boolean().default(true),
  }),
});

export const collections = {
  pages,
  blog,
  garden,
};
```

## Step 3: Configure Astro for Wikilinks

Create/update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import remarkWikiLink from 'remark-wiki-link';

export default defineConfig({
  site: 'https://yourusername.github.io', // Update with your GitHub Pages URL
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
      wrap: true,
    },
  },
});
```

## Step 4: Create Base Layouts

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  {description && <meta name="description" content={description}>}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/garden">Garden</a>
      <!-- Add other navigation items -->
    </nav>
  </header>
  
  <main>
    <slot />
  </main>
  
  <footer>
    <p>&copy; {new Date().getFullYear()} Your Name</p>
  </footer>
</body>
</html>

<style>
  :global(body) {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
```

Create `src/layouts/PageLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';

const { frontmatter } = Astro.props;
const { title, description, date } = frontmatter;
---

<BaseLayout title={title} description={description}>
  <article class="page">
    <header>
      <h1>{title}</h1>
      {date && (
        <time datetime={date.toISOString()}>
          {date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
      )}
    </header>
    
    <div class="content">
      <slot />
    </div>
  </article>
</BaseLayout>

<style>
  .page {
    max-width: 70ch;
    margin: 0 auto;
  }
  
  header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 1rem;
  }
  
  h1 {
    margin-bottom: 0.5rem;
  }
  
  time {
    color: #666;
    font-size: 0.9rem;
  }
</style>
```

Create `src/layouts/GardenLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';

const { frontmatter } = Astro.props;
const { title, tags, updated, created } = frontmatter;
---

<BaseLayout title={`${title} - Garden`}>
  <article class="garden-note">
    <header>
      <div class="breadcrumb">
        <a href="/garden">🌱 Garden</a> / {title}
      </div>
      <h1>{title}</h1>
      
      <div class="metadata">
        {tags && tags.length > 0 && (
          <div class="tags">
            {tags.map(tag => (
              <span class="tag">#{tag}</span>
            ))}
          </div>
        )}
        
        <div class="dates">
          {created && (
            <time datetime={created.toISOString()}>
              Created: {created.toLocaleDateString()}
            </time>
          )}
          {updated && (
            <time datetime={updated.toISOString()}>
              Updated: {updated.toLocaleDateString()}
            </time>
          )}
        </div>
      </div>
    </header>
    
    <div class="content">
      <slot />
    </div>

    <aside class="backlinks">
      <h3>Linked References</h3>
      <p class="note">Backlinks will be implemented in a future enhancement</p>
    </aside>
  </article>
</BaseLayout>

<style>
  .garden-note {
    max-width: 65ch;
    margin: 0 auto;
  }
  
  .breadcrumb {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #666;
  }
  
  .breadcrumb a {
    text-decoration: none;
    color: inherit;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
  }
  
  .metadata {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .tag {
    background: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.85rem;
  }
  
  .dates {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #666;
  }
  
  .content {
    margin: 2rem 0;
  }
  
  /* Wikilink styling */
  :global(.wikilink) {
    color: #0066cc;
    text-decoration: none;
    border-bottom: 1px dashed #0066cc;
  }
  
  :global(.wikilink:hover) {
    background: #f0f8ff;
  }
  
  :global(.wikilink-new) {
    color: #cc0000;
    border-bottom: 1px dashed #cc0000;
  }
  
  .backlinks {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #e0e0e0;
  }
  
  .backlinks h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .backlinks .note {
    color: #666;
    font-style: italic;
  }
</style>
```

## Step 5: Create Dynamic Routes

Create `src/pages/[...slug].astro` (for main content):

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../layouts/PageLayout.astro';

export async function getStaticPaths() {
  const pages = await getCollection('pages', ({ data }) => {
    return !data.draft;
  });

  return pages.map(page => ({
    params: { slug: page.slug },
    props: { page },
  }));
}

const { page } = Astro.props;
const { Content } = await page.render();
---

<PageLayout frontmatter={page.data}>
  <Content />
</PageLayout>
```

Create `src/pages/garden/[...slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import GardenLayout from '../../layouts/GardenLayout.astro';

export async function getStaticPaths() {
  const gardenNotes = await getCollection('garden', ({ data }) => {
    return data.publish !== false;
  });

  return gardenNotes.map(note => ({
    params: { slug: note.slug },
    props: { note },
  }));
}

const { note } = Astro.props;
const { Content } = await note.render();
---

<GardenLayout frontmatter={note.data}>
  <Content />
</GardenLayout>
```

Create `src/pages/garden/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const gardenNotes = await getCollection('garden', ({ data }) => {
  return data.publish !== false;
});

// Sort by updated date, then created date
const sortedNotes = gardenNotes.sort((a, b) => {
  const dateA = a.data.updated || a.data.created || new Date(0);
  const dateB = b.data.updated || b.data.created || new Date(0);
  return dateB.getTime() - dateA.getTime();
});

// Group by tags
const notesByTag = gardenNotes.reduce((acc, note) => {
  (note.data.tags || []).forEach(tag => {
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(note);
  });
  return acc;
}, {} as Record<string, typeof gardenNotes>);

const tagsSorted = Object.entries(notesByTag).sort((a, b) => 
  b[1].length - a[1].length
);
---

<BaseLayout title="Digital Garden">
  <div class="garden-index">
    <header>
      <h1>🌱 Digital Garden</h1>
      <p class="subtitle">
        A collection of interconnected notes, thoughts, and ideas in various stages of growth.
        This is a space for thinking in public and cultivating knowledge over time.
      </p>
    </header>

    <section class="recent-updates">
      <h2>Recently Updated</h2>
      <ul class="note-list">
        {sortedNotes.slice(0, 15).map(note => (
          <li>
            <a href={`/garden/${note.slug}`}>{note.data.title}</a>
            {note.data.updated && (
              <time datetime={note.data.updated.toISOString()}>
                {note.data.updated.toLocaleDateString()}
              </time>
            )}
          </li>
        ))}
      </ul>
    </section>

    <section class="by-topic">
      <h2>Browse by Topic</h2>
      <div class="topics">
        {tagsSorted.map(([tag, notes]) => (
          <details>
            <summary>
              <strong>{tag}</strong> 
              <span class="count">({notes.length})</span>
            </summary>
            <ul class="note-list">
              {notes.map(note => (
                <li>
                  <a href={`/garden/${note.slug}`}>{note.data.title}</a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>

    <section class="all-notes">
      <h2>All Notes ({gardenNotes.length})</h2>
      <ul class="note-list">
        {sortedNotes.map(note => (
          <li>
            <a href={`/garden/${note.slug}`}>{note.data.title}</a>
            {note.data.tags && note.data.tags.length > 0 && (
              <span class="inline-tags">
                {note.data.tags.map(tag => (
                  <span class="tag">#{tag}</span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  </div>
</BaseLayout>

<style>
  .garden-index {
    max-width: 800px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 3rem;
  }

  .subtitle {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .note-list {
    list-style: none;
    padding: 0;
  }

  .note-list li {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .note-list li:last-child {
    border-bottom: none;
  }

  .note-list a {
    text-decoration: none;
    color: #0066cc;
    flex: 1;
  }

  .note-list a:hover {
    text-decoration: underline;
  }

  .note-list time {
    font-size: 0.85rem;
    color: #999;
    white-space: nowrap;
  }

  .inline-tags {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .tag {
    background: #f0f0f0;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .topics details {
    margin-bottom: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  }

  .topics summary {
    cursor: pointer;
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }

  .topics summary:hover {
    color: #0066cc;
  }

  .count {
    color: #999;
    font-size: 0.9rem;
    font-weight: normal;
  }

  .topics .note-list {
    margin-top: 0.5rem;
    padding-left: 1rem;
  }
</style>
```

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <div class="hero">
    <h1>Welcome</h1>
    <p>Your site tagline or introduction goes here.</p>
    
    <nav class="main-nav">
      <a href="/garden">🌱 Explore the Garden</a>
      <!-- Add other main navigation -->
    </nav>
  </div>
</BaseLayout>

<style>
  .hero {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .main-nav {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .main-nav a {
    padding: 0.75rem 1.5rem;
    background: #0066cc;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: background 0.2s;
  }
  
  .main-nav a:hover {
    background: #0052a3;
  }
</style>
```

## Step 6: Create Migration Script for Jekyll Content

Create `scripts/migrate-jekyll.js`:

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure these paths
const JEKYLL_POSTS_DIR = path.join(__dirname, '../../old-jekyll-site/_posts');
const JEKYLL_PAGES_DIR = path.join(__dirname, '../../old-jekyll-site');
const ASTRO_PAGES_DIR = path.join(__dirname, '../src/content/pages');
const ASTRO_BLOG_DIR = path.join(__dirname, '../src/content/blog');

// Ensure output directories exist
if (!fs.existsSync(ASTRO_PAGES_DIR)) {
  fs.mkdirSync(ASTRO_PAGES_DIR, { recursive: true });
}
if (!fs.existsSync(ASTRO_BLOG_DIR)) {
  fs.mkdirSync(ASTRO_BLOG_DIR, { recursive: true });
}

function transformContent(content) {
  let transformed = content;
  
  // Transform Jekyll includes (remove or replace with your own logic)
  transformed = transformed.replace(/{% include (.*?) %}/g, '<!-- Include: $1 -->');
  
  // Transform Jekyll code blocks to standard markdown
  transformed = transformed.replace(
    /{% highlight (.*?) %}(.*?){% endhighlight %}/gs,
    (match, lang, code) => `\`\`\`${lang}\n${code.trim()}\n\`\`\``
  );
  
  // Transform Jekyll links
  transformed = transformed.replace(
    /{% link (.*?) %}/g,
    (match, link) => `[link](${link})`
  );
  
  // Transform Jekyll post_url
  transformed = transformed.replace(
    /{% post_url (.*?) %}/g,
    (match, slug) => {
      const cleanSlug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return `/blog/${cleanSlug}`;
    }
  );
  
  return transformed;
}

function migratePosts() {
  if (!fs.existsSync(JEKYLL_POSTS_DIR)) {
    console.log('Jekyll posts directory not found. Skipping posts migration.');
    return;
  }

  const files = fs.readdirSync(JEKYLL_POSTS_DIR);
  
  files.forEach(file => {
    if (!file.endsWith('.md') && !file.endsWith('.markdown')) return;
    
    const content = fs.readFileSync(path.join(JEKYLL_POSTS_DIR, file), 'utf8');
    const { data, content: body } = matter(content);
    
    // Transform frontmatter
    const newFrontmatter = {
      title: data.title,
      description: data.description || data.excerpt || '',
      date: new Date(data.date),
      tags: data.tags || data.categories || [],
      draft: data.draft || false,
    };
    
    // Transform content
    const newBody = transformContent(body);
    
    // Create new file
    const newContent = matter.stringify(newBody, newFrontmatter);
    
    // Remove date prefix from filename
    const newFilename = file.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    
    fs.writeFileSync(
      path.join(ASTRO_BLOG_DIR, newFilename),
      newContent
    );
    
    console.log(`Migrated post: ${file} -> ${newFilename}`);
  });
}

function migratePages() {
  if (!fs.existsSync(JEKYLL_PAGES_DIR)) {
    console.log('Jekyll pages directory not found. Skipping pages migration.');
    return;
  }

  // Look for markdown files in the root of Jekyll site
  const files = fs.readdirSync(JEKYLL_PAGES_DIR);
  
  files.forEach(file => {
    if (!file.endsWith('.md') && !file.endsWith('.markdown')) return;
    if (file === 'README.md') return; // Skip README
    
    const content = fs.readFileSync(path.join(JEKYLL_PAGES_DIR, file), 'utf8');
    const { data, content: body } = matter(content);
    
    // Transform frontmatter
    const newFrontmatter = {
      title: data.title,
      description: data.description || '',
      layout: 'page',
    };
    
    // Transform content
    const newBody = transformContent(body);
    
    // Create new file
    const newContent = matter.stringify(newBody, newFrontmatter);
    
    fs.writeFileSync(
      path.join(ASTRO_PAGES_DIR, file),
      newContent
    );
    
    console.log(`Migrated page: ${file}`);
  });
}

console.log('Starting Jekyll to Astro migration...\n');

console.log('Migrating blog posts...');
migratePosts();

console.log('\nMigrating pages...');
migratePages();

console.log('\nMigration complete!');
console.log('Please review the migrated content and make any necessary adjustments.');
```

Add to `package.json`:

```json
{
  "scripts": {
    "migrate": "node scripts/migrate-jekyll.js"
  }
}
```

## Step 7: Set Up Obsidian Vault Integration

Add to `package.json`:

```json
{
  "scripts": {
    "sync-garden": "node scripts/sync-garden.js",
    "dev": "npm run sync-garden && astro dev",
    "build": "npm run sync-garden && astro build",
    "preview": "astro preview"
  }
}
```

Create `scripts/sync-garden.js`:

```javascript
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
```

**Alternative: Use a symlink instead (for development only)**

```bash
# In your project root
ln -s ~/Documents/Obsidian/MyVault ./src/content/garden
```

## Step 8: Configure GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Astro Site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

env:
  BUILD_PATH: "."

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: ${{ env.BUILD_PATH }}/package-lock.json
          
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
        
      - name: Install dependencies
        run: npm ci
        working-directory: ${{ env.BUILD_PATH }}
        
      - name: Build with Astro
        run: npm run build
        working-directory: ${{ env.BUILD_PATH }}
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ env.BUILD_PATH }}/dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 9: Additional Obsidian Feature Support

### Image Embeds

Create `scripts/remark-obsidian-images.js`:

```javascript
import { visit } from 'unist-util-visit';

export function remarkObsidianImages() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const regex = /!\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
      let match;
      const newNodes = [];
      let lastIndex = 0;

      while ((match = regex.exec(node.value)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index)
          });
        }

        // Add the image
        const imagePath = match[1];
        const altText = match[2] || imagePath;
        
        newNodes.push({
          type: 'image',
          url: `/garden/attachments/${imagePath}`,
          alt: altText,
          title: altText
        });

        lastIndex = regex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }

      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}
```

Update `astro.config.mjs` to include:

```javascript
import { remarkObs
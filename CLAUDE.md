# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is G. Lucas Roe's personal portfolio and blog site built with Astro and hosted on GitHub Pages. The site features a minimal design with custom styling, includes writing samples and resume information, and has a digital garden for interconnected notes.

## Development Commands

### Local Development
```bash
# Serve the site locally with live reload
npm run dev

# Serve with Obsidian garden sync (if you have an Obsidian vault configured)
npm run dev-with-garden

# Build the site for production
npm run build

# Build with garden sync
npm run build-with-garden

# Sync Obsidian vault to garden (configure path in scripts/sync-garden.js)
npm run sync-garden
```

### Dependencies
```bash
# Install Node.js dependencies
npm install
```

## Site Architecture

### Core Structure
- **Astro Static Site**: Uses Astro 5.14+ with content collections
- **Layouts**:
  - `BaseLayout.astro` - shared header/footer with IBM Plex Serif typography
  - `PostLayout.astro` - for blog posts
  - `GardenLayout.astro` - for digital garden notes with metadata and wikilink support
- **Content Collections**:
  - `pages/` - static pages (homepage, resume)
  - `blog/` - blog posts (maintains existing URLs like `/facilittante/`)
  - `garden/` - digital garden notes with wikilink support
- **Routing**: File-based routing with dynamic routes for collections

### Digital Garden Features
- **Wikilinks**: `[[Note Name]]` syntax supported via remark-wiki-link
- **Tags**: Organize garden content by topic
- **Timestamps**: Track created/updated dates
- **Garden Index**: `/garden/` shows recent updates, topics, and all notes
- **Obsidian Integration**: Sync script to import from Obsidian vaults

### Styling System
- **Typography**: IBM Plex Serif from Google Fonts
- **Sass Integration**: Embedded in layouts, imports from `src/styles/_sass/`
- **Components**: Scoped styles in Astro components
- **Assets**: Static files in `public/` (images, files, etc.)

### Content Management
- **Blog Posts**: Use Astro frontmatter with title, date, image, alt text
- **Garden Notes**: Support title, tags, created, updated, publish, aliases
- **URL Preservation**: All existing URLs maintained (`/facilittante/`, `/resume/`, `/writing/`)

## Key Configuration

### astro.config.mjs
- **Site Info**: `https://glucasroe.com`
- **Markdown**: Remark plugins for wikilink support
- **Content Collections**: Defined in `src/content/config.ts`

### GitHub Pages Deployment
- **Branch**: Deploy from any branch (main/master) via GitHub Actions
- **Domain**: Custom domain `glucasroe.com` via CNAME
- **Build**: GitHub Actions workflow in `.github/workflows/deploy.yml`
- **Node.js**: Uses Node 20 and npm for builds

### Obsidian Integration
- **Sync Script**: `scripts/sync-garden.js` copies vault to `src/content/garden/`
- **Configuration**: Update `OBSIDIAN_VAULT` path in sync script
- **Supported Files**: `.md` files and images (png, jpg, gif, svg, pdf)

## Content Guidelines

### Writing Style
- Personal, conversational tone for UX design content
- Focus on methodology, process, and human-centered design
- Include visual examples and case studies where relevant

### Image Assets
- **Bio illustrations**: Animated GIFs in `images/site/`
- **Post images**: Organized by year/topic in `images/posts/`
- **Format**: Support for standard web formats, animated GIFs for personality
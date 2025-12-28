# AGENTS.md - PS2 Portable Pack Project Guide

**Last Updated:** December 28, 2025

This document provides comprehensive guidance for AI agents (and developers) working on the **PS2 Portable Pack** project - a static website that documents and distributes a portable PS2 emulator package for Windows.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Architecture](#tech-stack--architecture)
3. [File Structure](#file-structure)
4. [Core Functionality](#core-functionality)
5. [Styling System](#styling-system)
6. [JavaScript Behavior](#javascript-behavior)
7. [Development Guidelines](#development-guidelines)
8. [Testing & Quality Assurance](#testing--quality-assurance)
9. [Deployment](#deployment)

---

## 1. Project Overview

### Purpose
A static website that provides documentation and download links for a portable PS2 emulator setup (PCSX2) that can run from a USB drive on Windows 10/11.

### Live Site
https://1drive1hb.github.io/PS2FREE/

### Target Audience
- PC gamers wanting to play PS2 games
- Windows 10/11 (64-bit) users
- People who want a portable, no-install emulator solution

### Key Features
- **Fully portable** - runs from USB or any folder
- **Pre-configured PCSX2** emulator
- **Download integration** - MEGA links for emulator, games, and saves
- **PS2-themed UI** - nostalgic PlayStation 2 aesthetic with animated elements
- **Comprehensive guides** - setup instructions, disc burning tutorials
- **Memory card tools** - myMC integration for save file management

---

## 2. Tech Stack & Architecture

### Technology
- **Pure HTML5/CSS3/Vanilla JavaScript** - No frameworks or build tools
- **Static site** - Deployed via GitHub Pages
- **Modular approach** - Shared navigation/components loaded dynamically

### Browser Support
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Responsive design for desktop, tablet, and mobile
- No Internet Explorer support required

### External Dependencies
- Cloudflare Turnstile (optional bot protection via `turnsitleCF.js`)
- MEGA cloud storage for file distribution

---

## 3. File Structure

```
PS2FREE/
├── index.html                      # Landing page with hero and quick info
├── README.md                       # Project documentation
├── .gitignore                      # Git ignore rules
│
├── html/                           # HTML pages and partials
│   ├── nav.html                    # Shared navigation (loaded dynamically)
│   ├── docs.html                   # Detailed setup guide
│   ├── burning.html                # PS2 disc burning guide
│   └── back-to-top.html           # Back-to-top button partial (if used)
│
├── css/                            # Stylesheets (modular)
│   ├── base.css                    # CSS variables, reset, typography, background
│   ├── layout.css                  # Grid layouts, hero sections, responsive breakpoints
│   ├── components.css              # Cards, nav, lists, accordion, game covers, footer
│   ├── ps2-button.css             # PS2-style animated download buttons
│   └── nav-animation.css          # Navigation bar with animated PS2 dots background
│
├── js/                             # JavaScript files
│   ├── main.js                     # Core logic (nav loading, MEGA buttons, smooth scroll, accordion)
│   └── turnsitleCF.js             # Cloudflare Turnstile integration
│
├── assets/                         # Images and media
│   ├── faviconPS2web.ico          # Site favicon
│   ├── ps2-background.png         # Main background image
│   ├── ps2-backgroundOLD.jpg      # Fallback background
│   ├── public.avif                # Public image asset
│   ├── Transparent_Logo_app_ps2.png  # PS2 logo for navigation
│   └── covers/                     # Game cover images
│       ├── crazy-taxi-playstation-2-front-cover.jpg
│       ├── gun.jpg
│       ├── half-life-playstation-2-front-cover.jpg
│       └── tekken-5-playstation-2-front-cover.jpg
│
├── .github/workflows/
│   └── static.yml                  # GitHub Pages deployment workflow
│
└── dev/                            # Development files (gitignored)
    ├── AI_RULES.md                 # Detailed AI assistant rules
    ├── .dev.md                     # Developer notes
    ├── .env                        # Environment variables (MEGA links)
    └── localhostWeb.ps1           # Local development server script
```

### Important Notes
- The `dev/` folder is gitignored and contains private configuration
- MEGA download links are configured in `js/main.js` (CONFIG object)
- All pages use relative paths to work on both local and GitHub Pages

---

## 4. Core Functionality

### 4.1 Navigation System

**Shared Navigation Pattern:**
- Navigation markup lives in `html/nav.html`
- All pages include `<div id="nav-placeholder"></div>`
- JavaScript loads nav.html dynamically and fixes relative paths

**Path Detection Logic:**
```javascript
const isSubDir = window.location.pathname.includes('/html/');
const base = isSubDir ? '../' : '';
```

**Navigation Links (IDs mapped in main.js):**
- `nav-home` → `index.html`
- `nav-download` → `index.html#download`
- `nav-howto` → `index.html#howto`
- `nav-docs` → `html/docs.html`
- `nav-burning` → `html/burning.html`
- `nav-resources` → `index.html#resources`
- `nav-logo` → Image src updated to `assets/Transparent_Logo_app_ps2.png`

**Why This Approach:**
- Single source of truth for navigation
- Works on GitHub Pages subdirectory structure
- Easy to update nav across all pages

### 4.2 MEGA Download Buttons

**Three Download Buttons:**

1. **PCSX2 Portable Pack** (`#megaPcsx2` in `index.html`)
   - Main emulator download
   - Hero section on landing page

2. **PS2 Games Pack** (`#megaGames` in `docs.html`)
   - Bundle of 3 PS2 game ISOs
   - Inside accordion on docs page

3. **Memory Card Saves** (`#megaSaves` in `docs.html`)
   - PS2 save files collection
   - On docs page

**Configuration in `js/main.js`:**
```javascript
const CONFIG = {
  MEGA_URLS: {
    pcsx2: 'https://mega.nz/folder/...',
    games: 'https://mega.nz/folder/...',
    saves: 'https://mega.nz/folder/...'
  }
};
```

**Behavior:**
- If URL is missing/placeholder → add `.disabled` class + tooltip
- If URL is valid → attach click handler to open in new tab
- Uses `window.open(url, '_blank', 'noopener,noreferrer')`

### 4.3 PS2-Style Buttons

**HTML Structure (MUST MAINTAIN):**
```html
<button type="button" class="btn-ps2" id="megaPcsx2">
  <strong class="btn-ps2-content">Download PS2 Portable</strong>
  
  <div id="ps2-stars-container">
    <div id="ps2-stars"></div>
  </div>
  
  <div id="ps2-glow">
    <div class="ps2-circle"></div>
    <div class="ps2-circle"></div>
    <div class="ps2-circle"></div>
  </div>
</button>
```

**Visual Features:**
- Animated gradient border (green → blue → cyan → red)
- Starfield background with moving dots
- Three glowing circles that pulse
- Hover: scale up + shadow increase
- Disabled: dimmed but still colorful (not grayscale)

### 4.4 Accordion System

**Used in `docs.html` for Featured Games section**

**How it Works:**
- Click `.accordion-toggle` → toggles `.accordion-content.active`
- Only one accordion open at a time
- Arrow icon rotates 90° when open
- Smooth height transition with max-height

**Content Inside Accordion:**
- 3-column grid of game covers with hover effects
- "Download PS2 games x3" button
- Proper spacing on mobile devices

### 4.5 Smooth Scroll

**Behavior:**
- Captures clicks on `<a href="#...">` links
- Ignores `#` and `#download` (handled separately)
- Uses native `scrollIntoView({ behavior: 'smooth' })`

---

## 5. Styling System

### 5.1 CSS Variables (base.css)

```css
:root {
  --ps2-blue: #0a2a6a;
  --ps2-blue2: #0b3aa0;
  --ps2-cyan: #2fb8ff;
  --ink: #070a12;
  --panel: rgba(8,12,24,0.68);
  --panel2: rgba(8,12,24,0.52);
  --line: rgba(47,184,255,0.22);
  --text: #f4f8ff;
  --muted: #d4dff5;
  --shadow: 0 18px 60px rgba(0,0,0,0.35);
}
```

### 5.2 Theme Design Principles

**Color Palette:**
- Dark PS2-inspired background with blue/indigo tones
- Cyan/blue accent color for links and highlights
- Neon gradients for buttons (green/blue/red)
- Semi-transparent panels with soft borders

**Typography:**
- System fonts: `system-ui, -apple-system, Segoe UI, Roboto`
- Monospace for code: `ui-monospace, SFMono-Regular, Consolas`
- Font weights: 650-750 for headings
- Letter-spacing for titles: 0.3-0.6px

**Background:**
- Multiple layers: radial gradients + linear gradient + image
- `ps2-backgroundOLD.jpg` as base texture
- Fixed attachment for parallax effect
- Dark overlay for text readability

### 5.3 Component Styles

**Cards:**
- `.card` - Standard card with panel background
- `.side-card` - Lighter panel variant
- `.hero-card` - Taller cards for hero section
- Border radius: 18px, border: 1px solid cyan line

**Buttons:**
- `.btn` - Generic button style
- `.btn-ps2` - Special PS2-style animated button (see ps2-button.css)
- `.link-btn` - Link-style button with icon

**Lists:**
- `.list` - Standard unordered list
- `.steps` - Numbered steps (ordered list)
- `.path-list` - File path list (no bullets)
- `.doc-steps` - Documentation steps with nested lists

**Documentation:**
- `.docs-content` - Main content container (max-width: 820px)
- `.doc-section` - Section spacing and typography
- `.note` - Blue highlighted tip box
- `.intro` - Introduction paragraph with bottom border
- `.inline-path` - Inline code/path highlight

### 5.4 Responsive Breakpoints

**Desktop (default):**
- Max width: 1100px (`.wrap`)
- 2-column hero layout
- 3-column game covers

**Tablet (≤900px):**
- Single column layouts
- Hero sections stack vertically
- Grids collapse to 1 column

**Mobile (≤768px):**
- Button width: 14rem with max-width: 90vw
- Reduced padding on cards
- Accordion content with smaller top margin

**Small Mobile (≤480px):**
- Further padding reduction
- Font size adjustments
- Code word-break for long paths

---

## 6. JavaScript Behavior

### 6.1 main.js Structure

**Initialization Flow:**
```javascript
1. DOMContentLoaded → init()
2. loadNavigation() → fetch nav.html → fixNavigationPaths()
3. setTimeout (200ms) for nav to load:
   - initMegaButtons()
   - initSmoothScroll()
   - initAccordions()
```

**Key Functions:**

**`loadNavigation()`**
- Detects subdirectory location
- Fetches `nav.html` from correct relative path
- Inserts into `#nav-placeholder`
- Calls `fixNavigationPaths()` after 50ms delay

**`fixNavigationPaths()`**
- Determines base path based on current location
- Updates logo src with correct relative path
- Sets all nav link hrefs programmatically
- Console logs for debugging

**`initMegaButtons()`**
- Checks each MEGA URL in CONFIG
- If missing/placeholder → add `.disabled` + tooltip
- If valid → attach click handler
- Handles all 3 buttons: pcsx2, games, saves

**`initSmoothScroll()`**
- Event delegation on document
- Filters for `a[href^="#"]`
- Ignores `#` and `#download`
- Uses `scrollIntoView` for smooth scrolling

**`initAccordions()`**
- Attaches click handlers to `.accordion-toggle`
- Closes all other accordions before opening clicked one
- Toggles `.active` class on `.accordion-content`

### 6.2 turnsitleCF.js

**Purpose:** Cloudflare Turnstile bot protection integration

**Functionality:**
- Loads Turnstile script from Cloudflare CDN
- Renders CAPTCHA widget
- Manages token lifecycle
- Enables/disables submit button based on CAPTCHA state

**Note:** This is an external integration. Treat as a separate module. Do not modify unless explicitly requested.

### 6.3 Debugging

**Console Logging:**
- Navigation loading logs current path and base
- Nav link fixing logs each ID → href mapping
- Useful for troubleshooting path issues

**Common Issues:**
- 404 on nav.html → Check `isSubDir` detection
- Broken links → Verify `fixNavigationPaths()` logic
- Button not working → Check CONFIG.MEGA_URLS values

---

## 7. Development Guidelines

### 7.1 Code Style

**HTML:**
- Use semantic HTML5 elements
- Proper indentation (2 spaces)
- Self-closing tags for void elements
- Accessible markup (aria-labels, alt text)

**CSS:**
- Use CSS variables for colors and spacing
- Mobile-first approach (max-width media queries)
- Prefer flexbox and grid over floats
- Comment complex animations

**JavaScript:**
- Vanilla JS only (no jQuery, no frameworks)
- IIFE pattern for encapsulation
- 'use strict' mode
- Descriptive variable and function names
- Console logging for debugging

### 7.2 File Organization

**When to Create New Files:**
- New CSS module for distinct feature
- New HTML page for separate guide
- New JS module for isolated functionality

**When to Modify Existing Files:**
- Styling tweaks → appropriate CSS file
- New MEGA button → update main.js CONFIG
- Navigation changes → html/nav.html
- Content updates → relevant HTML page

### 7.3 Naming Conventions

**CSS Classes:**
- Kebab-case: `.hero-card`, `.btn-ps2`, `.accordion-toggle`
- Descriptive: indicate purpose, not style
- BEM-inspired but not strict

**JavaScript:**
- camelCase for variables and functions
- UPPER_CASE for constants
- Prefix with `init` for initialization functions

**IDs:**
- Unique across entire site
- Used for JS targeting: `#nav-placeholder`, `#megaPcsx2`
- Kebab-case or camelCase consistently

### 7.4 Adding New Features

**New Download Button:**
1. Add URL to `CONFIG.MEGA_URLS` in main.js
2. Create button HTML with `.btn-ps2` class and unique ID
3. Add button logic to `initMegaButtons()`

**New Page:**
1. Create HTML file in `html/` directory
2. Include `#nav-placeholder` div
3. Link CSS files with `../css/` prefix
4. Link JS with `../js/main.js`
5. Add link to nav.html if needed

**New Component:**
1. Define styles in appropriate CSS file
2. Add HTML structure to relevant page
3. If interactive, add JS in main.js or new module

### 7.5 Common Modifications

**Change Colors:**
- Update CSS variables in `base.css` `:root`
- Maintain contrast ratios for accessibility

**Update Navigation:**
- Edit `html/nav.html` structure
- Update link IDs in `fixNavigationPaths()` if changed

**Add Game Cover:**
1. Add image to `assets/covers/`
2. Add `.game-cover` div in `docs.html` accordion
3. Grid automatically handles layout

**Modify Button Animation:**
- Edit keyframes in `ps2-button.css`
- Adjust timing, colors, or effects
- Test on multiple devices

---

## 8. Testing & Quality Assurance

### 8.1 Manual Testing Checklist

**Navigation:**
- [ ] All nav links work from index.html
- [ ] All nav links work from subdirectory pages
- [ ] Logo displays correctly on all pages
- [ ] Mobile menu works (if implemented)

**Download Buttons:**
- [ ] PCSX2 button opens correct MEGA link
- [ ] Games button opens correct MEGA link
- [ ] Saves button opens correct MEGA link
- [ ] Disabled state shows tooltip
- [ ] Buttons animate on hover

**Accordion:**
- [ ] Clicking toggle opens/closes content
- [ ] Only one accordion open at a time
- [ ] Arrow icon rotates correctly
- [ ] Smooth height transition

**Responsive Design:**
- [ ] Desktop (1920x1080) - proper layout
- [ ] Tablet (768x1024) - stacked sections
- [ ] Mobile (375x667) - readable text, centered buttons
- [ ] Landscape mode on mobile works

**Cross-Browser:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)

### 8.2 Performance Checks

- Image optimization (compressed JPGs/PNGs)
- Minimal JavaScript (no heavy libraries)
- CSS animations use transform/opacity (GPU accelerated)
- No render-blocking resources

### 8.3 Accessibility

- Semantic HTML structure
- Alt text on all images
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- ARIA labels where appropriate

---

## 9. Deployment

### 9.1 GitHub Pages Setup

**Configuration:**
- Source: GitHub Actions workflow
- Workflow: `.github/workflows/static.yml`
- Branch: `main` (automatically deploys on push)

**Workflow Details:**
```yaml
- Trigger: Push to main branch or manual dispatch
- Permissions: contents:read, pages:write, id-token:write
- Steps: Checkout → Setup Pages → Upload artifact → Deploy
```

### 9.2 Local Development

**Using PowerShell Script:**
```powershell
.\dev\localhostWeb.ps1
```

**Manual Local Server:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (npx)
npx http-server -p 8000
```

Access at: `http://localhost:8000`

### 9.3 Pre-Deployment Checklist

- [ ] All MEGA links updated in main.js
- [ ] Test navigation on all pages
- [ ] Verify responsive design
- [ ] Check console for errors
- [ ] Validate HTML (W3C validator)
- [ ] Test external links
- [ ] Review commit message

### 9.4 Post-Deployment Verification

- [ ] Visit live site URL
- [ ] Test all download buttons
- [ ] Check mobile view
- [ ] Verify images load
- [ ] Test all internal navigation

---

## 10. Troubleshooting Guide

### Issue: Navigation Not Loading

**Symptoms:** Blank header, no nav bar

**Solutions:**
1. Check browser console for fetch errors
2. Verify `nav.html` path is correct
3. Check if GitHub Pages has deployed latest changes
4. Clear browser cache

### Issue: Broken Images

**Symptoms:** Missing logos, game covers, backgrounds

**Solutions:**
1. Check relative paths (../ for subdirectories)
2. Verify files exist in assets folder
3. Check case sensitivity (important for Linux servers)
4. Inspect network tab for 404 errors

### Issue: MEGA Buttons Not Working

**Symptoms:** Click does nothing, or shows "disabled" tooltip

**Solutions:**
1. Verify CONFIG.MEGA_URLS in main.js
2. Check if URL is not a placeholder
3. Check browser console for JS errors
4. Ensure button ID matches code (megaPcsx2, megaGames, megaSaves)

### Issue: Accordion Not Opening

**Symptoms:** Click does nothing, content stays hidden

**Solutions:**
1. Check if JS is loading (console.log in initAccordions)
2. Verify .accordion-content has max-height transition
3. Check for CSS conflicts
4. Ensure JavaScript hasn't errored before accordion init

### Issue: Responsive Layout Broken

**Symptoms:** Weird spacing, overlapping elements on mobile

**Solutions:**
1. Check viewport meta tag in HTML head
2. Test breakpoints in browser dev tools
3. Verify media queries in layout.css
4. Check for hardcoded widths overriding responsive rules

---

## 11. Future Enhancements

### Potential Features (Not Yet Implemented)

- **Search Functionality:** Search games or setup steps
- **Dark/Light Mode Toggle:** User preference
- **Save Manager Web Tool:** Online save file converter
- **Game Compatibility List:** Searchable database
- **Video Tutorials:** Embedded YouTube guides
- **Download Statistics:** Track button clicks
- **User Comments:** Feedback section
- **Multi-language Support:** Translations

### Technical Debt

- Consider migrating to a static site generator (11ty, Hugo) for easier maintenance
- Implement service worker for offline functionality
- Add automated testing (Playwright, Cypress)
- Set up proper environment variables instead of hardcoded MEGA links

---

## 12. Contact & Support

### For Users
- GitHub Issues: Report bugs or request features
- Live Site: https://1drive1hb.github.io/PS2FREE/

### For Developers
- This AGENTS.md file
- dev/AI_RULES.md (detailed AI assistant instructions)
- README.md (project overview)

---

## Appendix: Quick Reference

### Key File Roles

| File | Purpose |
|------|---------|
| `index.html` | Landing page, hero section, download button |
| `html/docs.html` | Setup guide, games accordion, games/saves buttons |
| `html/burning.html` | Disc burning tutorial |
| `html/nav.html` | Shared navigation markup |
| `css/base.css` | Variables, reset, typography, background |
| `css/layout.css` | Grid, flex layouts, responsive breakpoints |
| `css/components.css` | All visual components (cards, lists, accordion, etc.) |
| `css/ps2-button.css` | Animated PS2 download buttons |
| `css/nav-animation.css` | Navigation bar with animated background |
| `js/main.js` | Navigation, MEGA buttons, smooth scroll, accordion |
| `js/turnsitleCF.js` | Cloudflare Turnstile integration |

### Important IDs

| ID | Element | Location | Purpose |
|----|---------|----------|---------|
| `nav-placeholder` | div | All pages | Container for loaded navigation |
| `nav-logo` | img | nav.html | PS2 logo image |
| `nav-home` | a | nav.html | Link to homepage |
| `nav-download` | a | nav.html | Link to download section |
| `nav-howto` | a | nav.html | Link to how-to section |
| `nav-docs` | a | nav.html | Link to docs page |
| `nav-burning` | a | nav.html | Link to burning guide |
| `nav-resources` | a | nav.html | Link to resources section |
| `megaPcsx2` | button | index.html | PCSX2 download button |
| `megaGames` | button | docs.html | Games pack download button |
| `megaSaves` | button | docs.html | Saves download button |

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.wrap` | Content width container (max 1100px) |
| `.hero` | Hero section 2-column grid |
| `.card` | Standard content card |
| `.side-card` | Lighter variant card |
| `.btn` | Generic button |
| `.btn-ps2` | Animated PS2 download button |
| `.accordion-toggle` | Clickable accordion header |
| `.accordion-content` | Collapsible accordion content |
| `.game-cover` | Game cover card with hover effect |
| `.doc-section` | Documentation section spacing |
| `.note` | Highlighted tip box |

---

**End of AGENTS.md**

*This document should be the first reference for any AI agent or developer working on this project. Keep it updated as the project evolves.*

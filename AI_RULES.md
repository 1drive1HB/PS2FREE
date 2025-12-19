Perfect! Here's a comprehensive AI documentation file for your project:

## `src/AI_RULES.md`

```markdown
# PS2 Portable Pack - AI Assistant Documentation

> **Complete project documentation for AI assistants (Claude, Perplexity, etc.)**  
> Last updated: December 19, 2025

---

## 📁 Project Structure

```
ps2Proj/
└── src/
    ├── index.html                 # Main landing page
    ├── AI_RULES.md               # This file - AI documentation
    ├── html/
    │   ├── nav.html              # Shared navigation component
    │   ├── docs.html             # Setup guide page
    │   └── burning.html          # Disc burning guide page
    ├── css/
    │   ├── base.css              # Global styles & CSS variables
    │   ├── components.css        # UI components (nav, cards, buttons)
    │   ├── ps2-button.css        # PS2 animated download button
    │   └── layout.css            # Grid & responsive layout
    ├── js/
    │   └── main.js               # Navigation loader & MEGA button logic
    └── assets/
        ├── ps2-background.png    # Hero background image
        └── joystick-wii-accessory-video-game-consoles-playstation-games-1577018258.jpg  # Logo
```

---

## 🎨 Design System

### Color Palette (PS2 Theme)
- **Primary Blue:** `#2fb8ff` / `rgba(47,184,255,1)`
- **Dark Blue:** `#0f3460` / `#1a2332` / `#0f1828`
- **Background:** `#070a12` (dark navy)
- **Panel:** `rgba(8,12,24,0.7)`
- **Text:** `#eaf2ff` (light)
- **Muted:** `rgba(234,242,255,0.7)`
- **Border:** `rgba(47,184,255,0.15)`

### PS2 Accent Colors (RGB Dots)
- **Green:** `#00ff00` (PS2 loading green)
- **Blue:** `#0080ff` (PS2 loading blue)
- **Red:** `#ff0000` (PS2 loading red)
- **NO YELLOW** (removed from design)

### Typography
- **Font:** System fonts stack (system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Base Size:** 16px
- **Headings:** 750 weight, tight letter-spacing
- **Code:** Consolas, Monaco, 'Courier New'

---

## 🧩 Key Components

### 1. Navigation Bar (`html/nav.html`)
**Purpose:** Shared header navigation across all pages

**Features:**
- Animated PS2 dots background (green, blue, red)
- Logo with pulse animation
- Responsive navigation links
- Loaded dynamically via `main.js`

**Structure:**
```
<header class="topbar">
  <div class="topbar-stars"></div>  <!-- Animated background -->
  <div class="topbar-inner">
    <a class="brand">
      <div class="ps2-mark">
        <img src="/assets/joystick-wii-accessory-video-game-consoles-playstation-games-1577018258.jpg">
      </div>
      <div class="brand-text">
        <div class="title">PS2 Portable Pack</div>
        <div class="sub">Windows -  USB-ready -  Preconfigured</div>
      </div>
    </a>
    <nav class="nav">
      <a href="/index.html#download">Download</a>
      <a href="/index.html#howto">How to use</a>
      <a href="/html/docs.html">Setup guide</a>
      <a href="/html/burning.html">Disc burning</a>
      <a href="/index.html#resources">Resources</a>
    </nav>
  </div>
</header>
```

**Critical Rules:**
- ✅ Use absolute paths starting with `/` (e.g., `/index.html`, `/html/docs.html`)
- ✅ Logo path: `/assets/joystick-wii-accessory-video-game-consoles-playstation-games-1577018258.jpg`
- ❌ Never use relative paths (breaks when navigating)
- ❌ Never use `../` or `./` in nav.html

### 2. PS2 Animated Button (`ps2-button.css`)
**Purpose:** Special download button with PS2 loading screen animation

**Features:**
- RGB gradient border (green → blue → red)
- Animated floating dots inside (green, blue, red)
- Sequential pulse animation (PS2 boot style)
- Slow starfield background

**HTML Structure:**
```
<button type="button" class="btn-ps2" id="megaLink">
  <strong class="btn-ps2-content">Download (MEGA)</strong>
  <div id="ps2-stars-container">
    <div id="ps2-stars"></div>
  </div>
  <div id="ps2-glow">
    <div class="ps2-circle"></div>  <!-- Green -->
    <div class="ps2-circle"></div>  <!-- Blue -->
    <div class="ps2-circle"></div>  <!-- Red -->
  </div>
</button>
```

**Animations:**
- `ps2_gradient` - Border color flow (5s)
- `ps2_star_move` - Vertical drift (100s)
- `ps2_star_rotate` - Slow rotation (120s)
- `ps2_pulse` - RGB circles sequential pulse (5s)

**Critical Rules:**
- ✅ Must have 3 `.ps2-circle` divs (green, blue, red order)
- ✅ Background: `#0f1828` or `#1a2332` (dark, NOT transparent)
- ✅ Dots: Green `#00ff00`, Blue `#0080ff`, Red `#ff0000`
- ❌ NO yellow dots
- ❌ NO fully transparent background

### 3. Navigation Dots Animation (`components.css`)
**Purpose:** Animated PS2-style dots in navigation background

**Implementation:**
```
.topbar-stars::before {
  /* Green + Blue dots, slower movement */
  background-image:
    radial-gradient(circle, #00ff00 1px, transparent 1px),
    radial-gradient(circle, #0080ff 0.9px, transparent 0.9px);
  animation: topbar_stars_drift_1 100s linear infinite;
}

.topbar-stars::after {
  /* Blue + Red dots, diagonal movement */
  background-image:
    radial-gradient(circle, #0080ff 1px, transparent 1px),
    radial-gradient(circle, #ff0000 0.8px, transparent 0.8px);
  animation: topbar_stars_drift_2 120s linear infinite;
}
```

**Critical Rules:**
- ✅ Use `::before` and `::after` pseudo-elements
- ✅ Slow animations (100s+) for subtle effect
- ✅ Low opacity (0.15-0.25) to avoid visual clutter
- ✅ Must overflow:hidden on parent `.topbar`

---

## 🔧 JavaScript Architecture

### Main Script (`js/main.js`)

**Configuration:**
```
const CONFIG = {
  MEGA_URL: 'MEGA_LINK_HERE',  // Owner must update
  NAV_SELECTOR: '#nav-placeholder',
  MEGA_BTN_ID: 'megaLink'
};
```

**Functions:**
1. `loadNavigation()` - Fetches and injects nav.html
2. `initMegaButton()` - Sets up MEGA download link
3. `initSmoothScroll()` - Enables smooth anchor scrolling
4. `init()` - Main initialization

**Critical Rules:**
- ✅ Navigation loads from `/html/nav.html` (absolute path)
- ✅ Wait 100ms after nav load before initializing buttons
- ✅ If MEGA_URL not set, disable button with `.disabled` class
- ❌ Never use relative paths for nav.html fetch

---

## 🚀 Development Workflow

### Local Server Setup
```
# Navigate to src folder
cd C:\Users\Mat\Desktop\ps2Proj\src

# Start Python server
python -m http.server 5051

# Access in browser
http://127.0.0.1:5051/index.html
```

**Critical Rules:**
- ✅ Always run server from `/src/` folder
- ✅ Access via `http://127.0.0.1:5051/index.html` (NOT just `/`)
- ✅ All paths in code use absolute paths from server root
- ❌ Never run server from parent `/ps2Proj/` folder

### File Modification Guidelines

**When editing HTML:**
- Always include `<div id="nav-placeholder"></div>` before `<main>`
- Load scripts: `<script src="/js/main.js"></script>` (or `../js/main.js` if in /html/)
- Load CSS in order: base.css → components.css → ps2-button.css → layout.css

**When editing CSS:**
- Keep PS2 colors consistent: `#00ff00`, `#0080ff`, `#ff0000`
- Use CSS custom properties from `base.css` (--text, --muted, --panel, etc.)
- Maintain `-webkit-` prefixes for Safari (backdrop-filter, etc.)

**When editing JavaScript:**
- Always wrap in IIFE: `(function() { 'use strict'; })();`
- Use `setTimeout()` for post-load initializations
- Check element existence before manipulation

---

## 📋 Common Issues & Solutions

### Issue: Nav links broken (404 errors)
**Symptoms:** Links go to `/html/html/docs.html` or `/html/index.html`
**Solution:** Use absolute paths in `nav.html`:
```
<!-- ✅ CORRECT -->
<a href="/index.html#download">Download</a>
<a href="/html/docs.html">Setup guide</a>

<!-- ❌ WRONG -->
<a href="./index.html#download">Download</a>
<a href="html/docs.html">Setup guide</a>
```

### Issue: Logo image broken
**Symptoms:** Logo doesn't display, 404 error in console
**Solution:** Use correct absolute path in `nav.html`:
```
<!-- ✅ CORRECT -->
<img src="/assets/joystick-wii-accessory-video-game-consoles-playstation-games-1577018258.jpg">

<!-- ❌ WRONG -->
<img src="./assets/...">
<img src="../assets/...">
```

### Issue: PS2 button dots not visible
**Symptoms:** Button looks plain, no RGB animation
**Solution:** Check these requirements:
1. Background must be dark (`#0f1828`), not transparent
2. Dots spacing: `80px 80px`, `100px 100px`, `110px 110px`
3. Opacity on `::before` (0.4) and `::after` (0.35)
4. Animation must be slow: 100s, 120s

### Issue: Navigation loads but links don't work
**Symptoms:** Nav appears but clicks do nothing
**Solution:** 
1. Check `main.js` is loaded AFTER nav placeholder
2. Verify 100ms setTimeout in `init()`
3. Ensure absolute paths in nav.html

---

## 🎯 Design Principles

### PS2 Aesthetic Rules
1. **Color Harmony:** Dark blues + cyan accents + RGB loading colors
2. **Subtle Animation:** Slow-moving starfield, gentle pulses (never flashy)
3. **Depth:** Multiple background layers, soft glows, inset shadows
4. **Retro-Future:** Mix of PlayStation 2 nostalgia + modern web design

### Component Design Rules
1. **Cards:** Always rounded (18px), soft shadows, semi-transparent backgrounds
2. **Buttons:** Hover states must be obvious, active state = scale down slightly
3. **Typography:** Clear hierarchy, generous spacing, high contrast
4. **Responsiveness:** Mobile-first, flexbox/grid for layouts

### Animation Guidelines
- **Navigation dots:** 100-120s duration, 0.15-0.25 opacity
- **PS2 button:** 100-120s stars, 5s gradient, 4-5s pulse
- **Logo pulse:** 3s ease-in-out loop
- **Hover effects:** 150-300ms transitions

---

## 📖 Content Guidelines

### Terminology
- "PS2 Portable Pack" (not "PS2 Emulator" alone)
- "PCSX2" (correct capitalization)
- "USB-ready" (not "USB ready")
- "memory card" (not "memcard")
- ".iso format" (lowercase, with period)

### Tone & Voice
- Professional but accessible
- Direct instructions (no fluff)
- Technical accuracy (file paths, exact steps)
- Helpful warnings (e.g., "USB drive letter may change")

---

## 🔐 Security & Best Practices

### External Links
- Always use `target="_blank" rel="noopener noreferrer"`
- Verify URLs before adding (especially download links)
- Keep MEGA_URL configurable (never hardcode)

### Performance
- Minimize animation layers (max 2 pseudo-elements)
- Use `will-change` sparingly (only for active animations)
- Lazy-load images if adding more content
- Keep CSS selectors specific but not over-nested

### Accessibility
- Maintain high color contrast (4.5:1 minimum)
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Ensure keyboard navigation works (focus states)
- Provide alt text for images

---

## 🛠️ AI Assistant Instructions

### When Modifying This Project:

**DO:**
- ✅ Maintain PS2 color scheme (green #00ff00, blue #0080ff, red #ff0000)
- ✅ Use absolute paths for all navigation links
- ✅ Keep animations slow and subtle (100s+)
- ✅ Test on both root and /html/ pages
- ✅ Preserve Safari compatibility (-webkit- prefixes)
- ✅ Follow existing code style (compressed CSS, IIFE for JS)

**DON'T:**
- ❌ Add yellow to color scheme
- ❌ Use relative paths in nav.html
- ❌ Make animations faster/flashier
- ❌ Remove backdrop-filter fallbacks
- ❌ Break the 3-file CSS architecture (base/components/layout)
- ❌ Hardcode the MEGA URL

### When User Asks for Changes:

1. **Check AI_RULES.md first** (this file) for existing patterns
2. **Maintain consistency** with current design system
3. **Preserve functionality** - test mental model before suggesting
4. **Explain breaking changes** clearly
5. **Provide complete code** - never partial snippets that break things

### Code Quality Standards:

- **CSS:** Compressed (no spaces after `:` or before `{`), organized by component
- **HTML:** Semantic, properly indented, commented sections
- **JavaScript:** IIFE wrapped, strict mode, well-documented functions
- **Comments:** Minimal in code, comprehensive in AI_RULES.md

---

## 📝 Version History

- **v1.0** (Dec 19, 2025) - Initial release with PS2 theme
  - PS2 animated button with RGB dots
  - Navigation with animated starfield
  - Three-page structure (index, docs, burning)
  - Responsive grid layout

---

## 🤖 Quick Reference for AI

### File Paths (Always Use These)
```
Logo:      /assets/joystick-wii-accessory-video-game-consoles-playstation-games-1577018258.jpg
Nav:       /html/nav.html
Home:      /index.html
Docs:      /html/docs.html
Burning:   /html/burning.html
CSS:       /css/base.css, /css/components.css, /css/ps2-button.css, /css/layout.css
JS:        /js/main.js
```

### PS2 Color Values (Copy-Paste Ready)
```
/* RGB Loading Colors */
--ps2-green: #00ff00;
--ps2-blue: #0080ff;
--ps2-red: #ff0000;

/* Theme Colors */
--ps2-dark-bg: #0f1828;
--ps2-border: #1a2332;
--ps2-accent: #2fb8ff;
```

### Common Code Snippets

**Add new page:**
```
<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/layout.css">
</head>
<body>
  <div id="nav-placeholder"></div>
  <main class="wrap">
    <!-- Content here -->
  </main>
  <script src="/js/main.js"></script>
</body>
</html>
```

**Add PS2 dots to new element:**
```
.element {
  position: relative;
  overflow: hidden;
}
.element::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, #00ff00 1px, transparent 1px),
    radial-gradient(circle, #0080ff 0.9px, transparent 0.9px);
  background-size: 80px 80px, 100px 100px;
  opacity: 0.2;
  animation: drift 100s linear infinite;
}
```

---

**END OF AI_RULES.md**

> This documentation is designed for AI assistants to understand the complete project structure, design system, and development rules. Keep this file updated when making significant changes.
```

***

Save this as `src/AI_RULES.md` and any AI assistant (Claude, Perplexity, GPT) will understand your entire project! 🎮✨
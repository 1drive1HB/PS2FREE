# Font System Guide - PS2 Portable Pack

## Quick Font Switching

The font system is centralized in `css/base.css` (lines ~35-58). You can easily switch fonts by commenting/uncommenting lines.

---

## How to Change Fonts

### Step 1: Open `css/base.css`

### Step 2: Find the FONT SYSTEM section (around line 35)

### Step 3: Choose ONE of the following options:

---

## Option 1: Default System Fonts (Current)
**No changes needed - already active!**

```css
font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
```

**Pros:** Fast loading, native look, no external dependencies
**Style:** Clean, modern, professional

---

## Option 2: Orbitron (Futuristic Tech Style)

### Step A: Add to HTML `<head>` (all pages: index.html, docs.html, burning.html)
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet">
```

### Step B: In `css/base.css`, comment out default and uncomment Orbitron:
```css
/* font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; */
font-family: 'Orbitron', system-ui, sans-serif;
```

**Style:** Futuristic, tech-inspired, geometric
**Best for:** Sci-fi theme, cyberpunk aesthetic

---

## Option 3: Rajdhani (Modern Gaming Style)

### Step A: Add to HTML `<head>`
```html
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Step B: In `css/base.css`:
```css
/* font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; */
font-family: 'Rajdhani', system-ui, sans-serif;
```

**Style:** Bold, modern, gaming-oriented
**Best for:** Esports vibe, energetic design

---

## Option 4: Exo 2 (Tech Sci-Fi Style)

### Step A: Add to HTML `<head>`
```html
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Step B: In `css/base.css`:
```css
/* font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; */
font-family: 'Exo 2', system-ui, sans-serif;
```

**Style:** Sleek, sci-fi, tech-forward
**Best for:** Modern tech aesthetic, PlayStation vibe

---

## Option 5: Monospace (Developer/Retro Style)

### No external font needed!

### In `css/base.css`:
```css
/* font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; */
font-family: 'Courier New', Courier, monospace;
```

**Style:** Retro, developer-style, terminal aesthetic
**Best for:** Hacker/developer vibe, old-school computing

---

## Quick Switch Example

**Current (Default):**
```css
font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
/* font-family: 'Orbitron', system-ui, sans-serif; */
```

**After switching to Orbitron:**
```css
/* font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; */
font-family: 'Orbitron', system-ui, sans-serif;
```

---

## Important Notes

1. **Only uncomment ONE font option at a time**
2. **Google Fonts require the `<link>` tag in HTML** - add it to:
   - `index.html`
   - `html/docs.html`
   - `html/burning.html`
3. **System fonts work immediately** - no HTML changes needed
4. **Clear browser cache** after switching fonts to see changes

---

## Recommended Font for PS2 Theme

**Exo 2** or **Rajdhani** - Both have modern gaming aesthetics that match the PlayStation 2 vibe!

---

## Testing Fonts Locally

After changing the font:
1. Save `css/base.css`
2. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
3. Check if the font changed
4. If not, clear cache and try again

---

**Created:** December 28, 2025  
**Last Updated:** December 28, 2025

# CLAUDE.md — AI Assistant Guide for my-resume

## Project Overview

Personal resume/portfolio website for **Enrique "Quique" Rivera** — a marketer, developer, and content creator based in Mexico City. Built on the **iPortfolio** Bootstrap template (BootstrapMade.com, Bootstrap v5.3.1). The site is deployed as a static site to **GitHub Pages** from the `main` branch.

Live site: deployed via GitHub Pages (see `.github/workflows/static.yml`).

## Repository Structure

```
/
├── index.html              # Single-page application (all sections in one file)
├── Readme.txt              # Brief project description (Spanish)
├── CLAUDE.md               # This file
├── .github/
│   └── workflows/
│       └── static.yml      # GitHub Pages deployment workflow (triggers on push to main)
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet (custom CSS on top of Bootstrap)
│   ├── js/
│   │   └── main.js         # Main JavaScript (navigation, animations, sliders, typed effect)
│   ├── img/                # Images: profile photos, portfolio, testimonials, favicons
│   │   └── portfolio/      # Portfolio project screenshots
│   │   └── testimonials/   # Testimonial author photos
│   ├── scss/
│   │   └── Readme.txt      # Note: SCSS sources only available in pro template version
│   └── vendor/             # Third-party libraries (vendored, not via npm)
│       ├── aos/            # Animate On Scroll library
│       ├── bootstrap/      # Bootstrap 5.3.1 (CSS + JS)
│       ├── bootstrap-icons/ # Bootstrap Icons
│       ├── boxicons/       # Boxicons icon set
│       ├── glightbox/      # Lightbox for portfolio images
│       ├── isotope-layout/ # Isotope grid layout/filtering for portfolio
│       ├── php-email-form/ # PHP email form handler library
│       ├── purecounter/    # Animated counter library
│       ├── swiper/         # Swiper slider (testimonials, portfolio details)
│       ├── typed.js/       # Typed.js typing animation
│       └── waypoints/      # Waypoints scroll trigger library
└── forms/
    └── contact.php         # Server-side contact form handler (PHP)
```

## Key Technical Details

### Technology Stack
- **HTML5** single-page layout (`index.html`)
- **CSS3** with Bootstrap 5.3.1 grid and utilities
- **Vanilla JavaScript** (no build tools, no npm, no bundler)
- **PHP** for the contact form backend (`forms/contact.php`)
- **No build step** — all vendor libraries are committed directly

### Page Sections (in `index.html`)
Sections appear in this order, identified by `id` attributes:
1. `#hero` — Hero banner with typed.js animation
2. `#about` — Bio and personal details
3. `#facts` — Statistics counters (PureCounter)
4. `#skills` — Skills progress bars (Waypoints-triggered)
5. `#resume` — Work experience and education timeline
6. `#portfolio` — Project gallery with Isotope filtering (currently hidden in nav)
7. `#services` — Services offered
8. `#testimonials` — Swiper slider testimonials
9. `#contact` — Contact form and info

### External Integrations
- **Google Analytics** (gtag.js) — tracking ID: `G-LFCVGG4FCP`
- **Landbot** chatbot widget — lazy-loaded on first user interaction
- **Google Fonts** — Open Sans, Raleway, Poppins

## Development Workflow

### No Build Process
This is a static site with no build tools. Edit files directly:
- **HTML**: Edit `index.html`
- **CSS**: Edit `assets/css/style.css`
- **JS**: Edit `assets/js/main.js`

### Deployment
Deployment is automated via GitHub Actions (`.github/workflows/static.yml`):
- Pushes to `main` trigger deployment to GitHub Pages
- The entire repository root is uploaded as the site artifact
- No build step in CI — just checkout and deploy

### Testing
- No automated tests exist
- Changes should be verified by opening `index.html` in a browser
- Check responsiveness — the site has mobile-specific styles and a mobile nav toggle

## Conventions and Guidelines

### Code Style
- HTML uses 2-space indentation
- CSS is organized with section comment headers (`/*--- # Section Name ---*/`)
- JavaScript uses `const`/`let`, arrow functions, and is wrapped in an IIFE for scope isolation
- The main JS uses helper functions `select()`, `on()`, and `onscroll()` for DOM operations

### Content Language
- The site content is primarily in **English**
- The `Readme.txt` is in Spanish
- CV PDFs are available in both English and Spanish (linked from nav)

### Vendor Libraries
- All third-party libraries are vendored in `assets/vendor/` — do NOT use npm or CDN links
- SCSS source files are not available (pro template only); edit `assets/css/style.css` directly
- Do not update vendor libraries without testing thoroughly, as the template depends on specific versions

### When Making Changes
- Keep changes consistent with the iPortfolio template structure
- Preserve AOS (Animate On Scroll) `data-aos` attributes on sections/elements
- Maintain Bootstrap grid classes (`col-lg-*`, `col-md-*`) for responsive layout
- The `#portfolio` section nav link is currently `hidden` — respect this unless asked to show it
- Contact form requires a PHP server; it won't work on static GitHub Pages hosting alone

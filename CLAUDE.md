# CLAUDE.md — AI Assistant Guide for my-resume

## Project Overview

Personal resume/portfolio website for **Enrique "Quique" Rivera** — Digital Marketing Manager at **Kia** (since August 2025), based in Mexico City. Previously Marketing Manager and Digital Marketing Manager at TD SYNNEX (2021–2025). The site is deployed as a static site to **GitHub Pages** from the `main` branch.

The site uses a **modern redesign** (2025) with CSS custom properties, tag-based skills, a built-in AI chat assistant, SEO-optimized meta tags, and JSON-LD structured data for recruiter discoverability.

## Repository Structure

```
/
├── index.html              # Single-page application (all sections)
├── CLAUDE.md               # This file
├── Readme.txt              # Brief project description (Spanish)
├── .github/
│   └── workflows/
│       └── static.yml      # GitHub Pages deployment (triggers on push to main)
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet — CSS custom properties, modern design
│   ├── js/
│   │   └── main.js         # Main JS — navigation, animations, AI chatbot logic
│   ├── img/                # Images: profile, portfolio, favicons
│   ├── scss/
│   │   └── Readme.txt      # SCSS only in pro template version
│   └── vendor/             # Third-party libraries (vendored, no npm)
│       ├── aos/            # Animate On Scroll
│       ├── bootstrap/      # Bootstrap 5.3.1
│       ├── bootstrap-icons/ # Bootstrap Icons
│       ├── boxicons/       # Boxicons
│       ├── glightbox/      # Lightbox
│       ├── isotope-layout/ # Isotope grid
│       ├── purecounter/    # Animated counters
│       ├── swiper/         # Swiper slider
│       ├── typed.js/       # Typed.js animation
│       └── waypoints/      # Scroll triggers
└── forms/
    └── contact.php         # PHP contact form handler
```

## Key Technical Details

### Technology Stack
- **HTML5** single-page layout with JSON-LD structured data
- **CSS3** with CSS custom properties (`--primary`, `--accent`, etc.) + Bootstrap 5.3.1
- **Vanilla JavaScript** — no build tools, no npm, no bundler
- **Built-in AI Chat Assistant** — keyword-matching chatbot in `main.js` with full CV knowledge base
- **Google Fonts** — Inter + Poppins

### Page Sections (in `index.html`)
1. `#hero` — Hero with typed.js animation
2. `#about` — Bio, contact details, languages
3. `#facts` — Key achievement counters (ROI, MQL-SQL, sales cycle)
4. `#skills` — Tag-based hard skills and soft skills (no progress bars)
5. `#resume` — Work experience timeline (Kia, TD SYNNEX) + education
6. `#services` — Service offerings with icon cards
7. `#contact` — Contact info + embedded Google Form
8. AI Chat Widget — floating bottom-right chat with CV knowledge

### External Integrations
- **Google Analytics** (gtag.js) — tracking ID: `G-LFCVGG4FCP`
- **Google Forms** — embedded contact form
- **Google Fonts** — Inter, Poppins

### AI Chat Assistant
- Located in `assets/js/main.js` (bottom IIFE)
- Keyword-matching chatbot with a knowledge base (`KB` object) containing all CV data
- Supports English and Spanish queries
- Handles: experience, skills, education, achievements, services, contact, location, languages, AI/ABM specialties
- Quick-suggestion chips for common questions
- Typing animation for natural feel

### Design System (CSS Custom Properties)
Defined in `:root` in `style.css`:
- `--primary`: `#0ea5e9` (sky blue)
- `--accent`: `#10b981` (emerald green)
- `--dark`: `#0f172a` (slate dark)
- `--radius`: `12px`, `--radius-sm`: `8px`
- Skill tags use `.skill-tag` (hard) and `.skill-tag.soft` (soft) classes

## Development Workflow

### No Build Process
Edit files directly:
- **HTML**: `index.html`
- **CSS**: `assets/css/style.css`
- **JS**: `assets/js/main.js`

### Deployment
GitHub Actions (`.github/workflows/static.yml`):
- Push to `main` triggers GitHub Pages deploy
- No build step — direct deploy of repo root

### Current CV Timeline
- **Kia** — Digital Marketing Manager: August 2025 – Present
- **TD SYNNEX** — Marketing Manager Mexico: April 2024 – July 2025
- **TD SYNNEX** — Digital Marketing Manager LAC: 2021 – 2024

## Conventions and Guidelines

### Code Style
- HTML: 2-space indentation
- CSS: organized with section comment headers, uses CSS custom properties
- JavaScript: `const`/`let`, arrow functions, IIFE scope isolation
- Helper functions: `select()`, `on()`, `onscroll()`

### When Making Changes
- Use CSS custom properties for colors/spacing — do not hardcode values
- Preserve AOS `data-aos` attributes on sections
- Maintain Bootstrap grid classes for responsive layout
- Skills use `.skill-tag` elements (not progress bars)
- Update the AI chatbot's `KB` object in `main.js` when CV info changes
- All vendor libraries are vendored — do not use npm or CDN links
- Contact form is a Google Forms embed (not PHP on GitHub Pages)

# Sayak's React Portfolio

A frontend-only React portfolio built with Vite, Lenis, Motion, and Lucide React. No backend, database, authentication, or API service is used.

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite. To create a static production build:

```sh
pnpm build
pnpm preview
```

The production files are written to `dist/` and can be served by any static web host.

## Navigation

The seven navbar links and page sections appear in this order:

1. About
2. Skill
3. Project
4. Certification
5. Hackathon
6. Internship
7. Experience

Lenis smooths mouse-wheel and anchor scrolling while native anchor links retain URL hashes and browser history. Scrolling accounts for the sticky header through CSS scroll-padding-top. Active section tracking follows manual scrolling, resizing, and the end of the page. Motion animates the active navigation pill, mobile panel, hero, and section reveals. Reduced-motion preferences disable Lenis and CSS smooth scrolling, retaining native browser scrolling. Touch scrolling remains native, and the mobile navigation can scroll independently.

The mobile disclosure closes on section selection, Escape, and switching to desktop width. The default background is nearly black (`#0c0e10`) with charcoal surfaces and muted green accents. The theme toggle persists the selected theme in local storage when storage is available.

## Customize

- `src/navigation.js`: navbar labels, order, and section IDs.
- `src/Navbar.jsx`: reusable responsive navbar.
- `src/useSmoothScroll.js`: Lenis setup, options, reduced-motion support, and cleanup.
- `src/main.jsx`: name, About section, hero illustration, and footer.
- `src/Sections.jsx`: skills and the Certification, Hackathon, Internship, and Experience sections.
- `src/Projects.jsx`: project cards, automatic leftward sliding, and manual controls.
- `src/projectData.js`: project names, descriptions, skills used, and GitHub links.
- `src/styles.css`: global theme variables and navbar/hero styles.
- `src/sections.css`: lower section layouts.
- `index.html`: page title and description.
- `public/favicon.svg`: site icon.

The skills and the Democamp, CellScope, and ChurnShield project details reflect the supplied portfolio content. Each project includes a Skills used list and a Have a look link to its GitHub repository. Certification, hackathon, internship, and experience entries remain ready for real records.

The project cards slide left in a continuous loop and pause on hover or keyboard focus. Pause/Resume and previous/next controls allow deliberate browsing. Touch or manual horizontal scrolling pauses automatic movement. Reduced-motion preferences turn automatic sliding off. Repeated cards are hidden from assistive technology and removed from keyboard tab order.

Typography uses Google Fonts when available, with local system and Georgia fallbacks. Project visuals and the hero artwork are drawn in CSS; they do not depend on image services.

## File location

The original Documents workspace blocked file creation even outside the sandbox. This complete project was saved to the other writable workspace associated with the chat. The source ZIP can be extracted into your preferred project folder.

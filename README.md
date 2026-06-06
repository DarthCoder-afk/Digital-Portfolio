# Digital Portfolio

Personal portfolio site for **Sean Michael Borje** — a cinematic, scroll-driven developer portfolio built with React, Tailwind CSS, and GSAP.

Live design direction: oversized editorial typography, blueprint/HUD accents, alternating dark/light section surfaces, and smooth scroll-triggered motion.

## Features

- **Hero** — SplitText headline, ProfileCard portrait, and primary CTAs
- **About** — Blueprint-framed photo, scroll-revealed bio, highlight strip, resume link
- **Experience** — Centered zigzag timeline (right → left → right) with role details and project highlights
- **Skills** — Category tabs with dual LogoLoop marquee tracks
- **Projects** — Numbered editorial project cards with live demo links
- **Contact** — EmailJS-powered inquiry form and social channels
- **Navigation** — Fixed nav with scroll progress, mobile full-screen menu, ScrollSmoother-aware section links
- **Motion** — GSAP ScrollTrigger reveals, ScrollSmoother, SplitText, and reduced-motion fallbacks
- **Responsive** — Mobile-optimized hero, skills, and navigation layouts

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | [React 19](https://react.dev/) |
| Build | [Vite 6](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Motion | [GSAP 3](https://gsap.com/) (ScrollTrigger, ScrollSmoother, SplitText), [Framer Motion](https://www.framer.com/motion/) |
| Email | [EmailJS](https://www.emailjs.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Space Grotesk (display), Montserrat (body) |

## Getting Started

### Prerequisites

- **Node.js 18+** (required for Vite 6)

### Installation

```bash
git clone https://github.com/DarthCoder-afk/Digital-Portfolio.git
cd Digital-Portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root for the contact form:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
├── components/       # UI sections and shared components
│   ├── HeroSection.jsx
│   ├── AboutMe.jsx
│   ├── ExperienceSection.jsx
│   ├── SkillSection.jsx
│   ├── ProjectSection.jsx
│   ├── ContactSection.jsx
│   ├── NavBar.jsx
│   ├── SmoothScroll.jsx
│   └── ...
├── hooks/            # Reveal and UI hooks
├── lib/              # GSAP setup, scroll helpers, utilities
├── pages/            # Home and NotFound routes
└── index.css         # Theme tokens, section surfaces, blueprint styles
```

## Sections

| # | Section | Surface |
| --- | --- | --- |
| — | Hero | Dark |
| 02 | About | Light |
| 03 | Experience | Dark |
| 04 | Skills | Light |
| 05 | Projects | Dark |
| 06 | Contact | Light |
| — | Footer | Dark |

## Deployment

Configured for static hosting (e.g. [Vercel](https://vercel.com/)). Set the same `VITE_EMAILJS_*` environment variables in your hosting provider for the contact form to work in production.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Sean Michael Borje**

- GitHub: [@DarthCoder-afk](https://github.com/DarthCoder-afk)
- LinkedIn: [seanmichaelarriolaborje](https://www.linkedin.com/in/seanmichaelarriolaborje)
- Facebook: [seanmichael.borje.7](https://www.facebook.com/seanmichael.borje.7/)
- Email: seanmichaelborje179@gmail.com

Project repository: [github.com/DarthCoder-afk/Digital-Portfolio](https://github.com/DarthCoder-afk/Digital-Portfolio)

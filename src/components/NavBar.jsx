import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Facebook, Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { href: "https://github.com/DarthCoder-afk", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/seanmichaelarriolaborje", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.facebook.com/seanmichael.borje.7/", icon: Facebook, label: "Facebook" },
];

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      linksRef.current.forEach((link) => {
        if (link) gsap.set(link, { clearProps: "all" });
      });
      return;
    }

    if (prefersReducedMotion()) return;

    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="nav-bar fixed inset-x-0 top-0 z-[120]">
        <div className="container flex items-center justify-between py-5 md:py-6">
          <a
            href="#hero"
            className="nav-bar__brand font-display text-sm font-medium tracking-[0.28em] transition-opacity hover:opacity-70"
          >
            SM
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-6">
              {navItems.slice(1).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-label text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const SocialIcon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SocialIcon size={16} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="nav-bar__toggle relative z-[130] flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>

        <div className="nav-bar__progress-track h-px w-full">
          <div ref={progressRef} className="scroll-progress h-full w-full" />
        </div>
      </header>

      <div
        className={cn(
          "mobile-menu fixed inset-x-0 bottom-0 top-[4.75rem] z-[110] md:hidden",
          isMenuOpen ? "mobile-menu--open pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu__backdrop" aria-hidden="true" />

        <div className="mobile-menu__panel">
          <div className="container flex h-full flex-col">
            <div className="mobile-menu__header flex items-center justify-between border-b border-[var(--nav-line)] py-5">
              <span className="text-label text-muted-foreground">Navigation</span>
              <span className="text-label text-muted-foreground/70">Menu</span>
            </div>

            <nav className="mobile-menu__links flex flex-1 flex-col justify-center gap-1 py-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  ref={(el) => {
                    linksRef.current[index] = el;
                  }}
                  onClick={closeMenu}
                  className="mobile-menu__link group"
                >
                  <span className="mobile-menu__link-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="menu-link mobile-menu__link-label">{item.name}</span>
                </a>
              ))}
            </nav>

            <div className="mobile-menu__footer border-t border-[var(--nav-line)] py-8">
              <p className="text-label mb-5 text-muted-foreground">Connect</p>
              <div className="flex gap-5">
                {socialLinks.map((link) => {
                  const SocialIcon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="mobile-menu__social"
                    >
                      <SocialIcon size={20} strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

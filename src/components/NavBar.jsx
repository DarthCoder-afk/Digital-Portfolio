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
  const overlayRef = useRef(null);
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
    if (!overlayRef.current) return;

    if (isMenuOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container flex items-center justify-between py-5 md:py-6">
          <a
            href="#hero"
            className="font-display text-sm font-medium tracking-[0.28em] text-foreground transition-opacity hover:opacity-70"
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
            className="relative z-[60] flex h-10 w-10 items-center justify-center text-foreground md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className="h-px w-full bg-border">
          <div
            ref={progressRef}
            className="scroll-progress h-full w-full bg-accent/80"
          />
        </div>
      </header>

      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-[55] flex flex-col bg-background/98 backdrop-blur-xl md:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="container flex flex-1 flex-col justify-center gap-2 py-24">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              ref={(el) => {
                linksRef.current[index] = el;
              }}
              onClick={closeMenu}
              className="menu-link text-foreground/90 transition-colors hover:text-accent"
            >
              {item.name}
            </a>
          ))}

          <div className="mt-12 flex gap-6">
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
                  <SocialIcon size={22} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

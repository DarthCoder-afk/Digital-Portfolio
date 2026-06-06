import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const bioLines = [
  "Hi :) I'm Sean, a Software Engineer passionate about building scalable and user-focused applications.",
  "I specialize in developing enterprise web systems, ERP platforms, and full-stack applications using modern technologies such as Next.js, NestJS, Node.js, PostgreSQL, and MongoDB.",
  "I enjoy transforming complex ideas into efficient and reliable software solutions while continuously improving my technical skills through real-world development experience.",
  "I'm currently open to new opportunities where I can contribute, grow, and create meaningful impact through technology.",
];

const highlights = [
  { label: "Focus", value: "Full-Stack Development" },
  { label: "Stack", value: "Next.js · NestJS · Express · PostgreSQL · MongoDB" },
  { label: "Status", value: "Open to work" },
];

function BlueprintFrame({ children, className = "" }) {
  return (
    <div className={`about-frame ${className}`.trim()}>
      <span className="about-frame__corner about-frame__corner--tl" aria-hidden="true" />
      <span className="about-frame__corner about-frame__corner--tr" aria-hidden="true" />
      <span className="about-frame__corner about-frame__corner--bl" aria-hidden="true" />
      <span className="about-frame__corner about-frame__corner--br" aria-hidden="true" />
      <span className="about-frame__guide about-frame__guide--top" aria-hidden="true" />
      <span className="about-frame__guide about-frame__guide--left" aria-hidden="true" />
      {children}
    </div>
  );
}

export const AboutMe = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lineElements = textRef.current?.querySelectorAll(".about-line");
      if (!lineElements?.length) return;

      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        mediaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      lineElements.forEach((line, index) => {
        gsap.fromTo(
          line,
          { y: 32, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              end: "top 55%",
              scrub: 0.8,
            },
            delay: index * 0.05,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-surface-light about-section relative scroll-mt-24">
      <div className="section-padding border-t border-border">
        <div className="container">
          {/* Section header bar */}
          <div className="about-section__header mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-20">
            <p className="text-label text-muted-foreground">02 — About</p>
            <p className="text-label text-muted-foreground/70">Manila, Philippines</p>
          </div>

          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 xl:gap-24">
            {/* Left — framed media, sticky on desktop */}
            <div className="lg:sticky lg:top-28">
              <div ref={mediaRef}>
                <BlueprintFrame>
                  <div className="about-frame__media">
                    <img
                      src="/stacks/formal.JPG"
                      alt="Sean Michael Borje"
                      className="h-full w-full object-cover object-top grayscale-[25%] contrast-[1.05]"
                      loading="lazy"
                    />
                    <div className="about-frame__overlay" aria-hidden="true" />
                  </div>
                  <div className="about-frame__caption">
                    <span className="text-label text-muted-foreground">Profile</span>
                    <span className="text-label text-foreground/80">Sean Michael Borje</span>
                  </div>
                </BlueprintFrame>

                <div className="about-highlights mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div key={item.label} className="about-highlight bg-background px-4 py-4">
                      <p className="text-label mb-2 text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground/90">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — editorial copy */}
            <div className="min-w-0">
              <h2
                ref={headlineRef}
                className="text-display-lg mb-10 max-w-2xl text-foreground md:mb-14"
              >
                Building systems
                <br />
                <span className="text-muted-foreground">that scale with purpose</span>
              </h2>

              <div ref={textRef} className="space-y-8 md:space-y-10">
                {bioLines.map((line, index) => (
                  <p
                    key={index}
                    className="about-line font-display text-lg leading-relaxed text-foreground/85 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-5 md:mt-16">
                {import.meta.env.VITE_RESUME_URL && (<a
                  href={import.meta.env.VITE_RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinematic-button-primary"
                >
                  View Resume
                </a>)}
                <a href="#contact" className="cinematic-button-secondary">
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

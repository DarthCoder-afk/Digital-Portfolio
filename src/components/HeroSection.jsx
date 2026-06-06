import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { scrollToSection } from "@/lib/scrollToSection";
import ProfileCard from "./ProfileCard";

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const cardRef = useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const headlineSplit = new SplitText(headlineRef.current, {
        type: "lines,words",
        linesClass: "split-line",
        wordsClass: "split-word",
      });

      headlineRef.current?.classList.add("split-parent");

      gsap.fromTo(
        headlineSplit.words,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        sublineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 }
      );

      gsap.fromTo(
        ".hero-cta",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 1 }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 40 },
        { y: 0, duration: 1.1, ease: "power3.out", delay: 0.6 }
      );

      gsap.to(scrollCueRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    scrollToSection("contact");
    window.history.pushState(null, "", "#contact");
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section-surface-dark relative flex min-h-0 flex-col justify-center overflow-x-clip py-20 pt-24 sm:py-24 sm:pt-28 md:min-h-screen md:py-32 lg:py-36"
    >
      <div className="container relative min-w-0">
        <div className="grid min-w-0 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 min-w-0 max-w-5xl lg:order-1">
            <p className="text-label mb-4 text-muted-foreground sm:mb-6">Software Engineer</p>

            <h1
              ref={headlineRef}
              className="hero-headline text-display-xl mb-6 text-foreground sm:mb-8"
            >
              Sean Michael
              <br />
              Borje
            </h1>

            <p
              ref={sublineRef}
              className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:mb-10 md:text-lg"
            >
              I&apos;m a passionate software engineer who loves turning ideas into
              interactive experiences. From front-end design to back-end logic, I
              build tools that make a difference.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#projects"
                className="hero-cta cinematic-button-primary w-full justify-center sm:w-auto"
              >
                Explore Projects
              </a>
              <a
                href="#contact"
                className="hero-cta cinematic-button-secondary w-full justify-center sm:w-auto"
              >
                Connect With Me
              </a>
            </div>
          </div>

          <div
            ref={cardRef}
            className="hero-profile-card order-1 mx-auto w-full min-w-0 max-w-[min(100%,340px)] lg:order-2 lg:mx-0 lg:justify-self-end"
          >
            <ProfileCard
              name="Sean Borje"
              title="Software Engineer"
              handle="DarthCoder-afk"
              status="Open to work"
              contactText="Contact Me"
              avatarUrl="/profile/formal.png"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={true}
              onContactClick={handleContactClick}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg, rgba(18, 18, 18, 0.95) 0%, rgba(40, 40, 40, 0.55) 100%)"
            />
          </div>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="container mt-10 flex min-w-0 items-center gap-3 text-muted-foreground sm:mt-16"
      >
        <ArrowDown size={16} strokeWidth={1.5} />
        <span className="text-label">Scroll to explore</span>
      </div>
    </section>
  );
};

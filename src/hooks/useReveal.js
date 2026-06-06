import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

export function useReveal({
  split = "lines",
  stagger = 0.08,
  delay = 0,
  y = 48,
  start = "top 85%",
  scrub = false,
  duration = 1,
  ease = "power3.out",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      element.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      const splitInstance = new SplitText(element, {
        type: split,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
      });

      element.classList.add("split-parent");

      const targets =
        split === "chars"
          ? splitInstance.chars
          : split === "words"
            ? splitInstance.words
            : splitInstance.lines;

      gsap.set(targets, { y, opacity: 0 });

      const animationConfig = {
        y: 0,
        opacity: 1,
        stagger,
        delay,
        ease,
      };

      if (scrub) {
        gsap.to(targets, {
          ...animationConfig,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start,
            end: "bottom 60%",
            scrub: true,
          },
        });
      } else {
        gsap.to(targets, {
          ...animationConfig,
          duration,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none reverse",
          },
        });
      }

      return () => splitInstance.revert();
    }, ref);

    return () => ctx.revert();
  }, [split, stagger, delay, y, start, scrub, duration, ease]);

  return ref;
}

export function useFadeReveal({ y = 40, delay = 0, start = "top 88%", duration = 1.1 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      element.style.opacity = "1";
      element.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, start, duration]);

  return ref;
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed * 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

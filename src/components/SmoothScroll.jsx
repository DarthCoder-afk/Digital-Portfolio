import { useEffect, useRef } from "react";
import { ScrollSmoother, prefersReducedMotion } from "@/lib/gsap";
import { BlueprintGrid } from "./BlueprintGrid";

const backgroundLayers = (
  <>
    <div className="cinematic-bg" aria-hidden="true" />
    <BlueprintGrid />
    <div className="cinematic-grain" aria-hidden="true" />
    <div className="cinematic-vignette" aria-hidden="true" />
  </>
);

export function SmoothScroll({ children, fixed }) {
  const smootherRef = useRef(null);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        {backgroundLayers}
        {fixed}
        {children}
      </>
    );
  }

  return (
    <div id="smooth-wrapper">
      {backgroundLayers}
      {fixed}
      <div id="smooth-content">{children}</div>
    </div>
  );
}

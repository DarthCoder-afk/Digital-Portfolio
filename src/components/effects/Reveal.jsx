import { useReveal, useFadeReveal } from "@/hooks/useReveal";

export function Reveal({ children, className, ...options }) {
  const ref = useReveal(options);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeReveal({ children, className, ...options }) {
  const ref = useFadeReveal(options);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

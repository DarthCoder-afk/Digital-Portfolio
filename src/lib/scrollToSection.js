import { ScrollSmoother, prefersReducedMotion } from "@/lib/gsap";

/** Fixed nav height + spacing so section titles aren't hidden under the bar */
export const NAV_SCROLL_OFFSET = 84;

export function scrollToSection(target) {
  if (typeof window === "undefined") return false;

  const id = (typeof target === "string" ? target : target?.id ?? "").replace(/^#/, "");
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  const reducedMotion = prefersReducedMotion();
  const smoother = ScrollSmoother.get();

  if (smoother && !reducedMotion) {
    const scrollPosition = smoother.offset(element, "top top") - NAV_SCROLL_OFFSET;
    smoother.scrollTo(scrollPosition, true);
    return true;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reducedMotion ? "auto" : "smooth",
  });

  return true;
}

export function handleSectionLinkClick(event, href, { onNavigate } = {}) {
  const hash = href?.startsWith("#") ? href : `#${href ?? ""}`;
  if (!hash || hash === "#") return;

  const id = hash.slice(1);
  if (!document.getElementById(id)) return;

  event.preventDefault();
  onNavigate?.();
  scrollToSection(id);
  window.history.pushState(null, "", hash);
}

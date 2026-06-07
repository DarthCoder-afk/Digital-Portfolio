import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoLoop from "@/components/effects/LogoLoop";
import { BlueprintFrame } from "@/components/ui/BlueprintFrame";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { skills, categories } from "@/data/skills";

const MotionDiv = motion.div;

function buildLogoData(skillList) {
  return skillList.map((skill) => ({
    node: (
      <div className="skill-marquee-chip">
        <img
          src={skill.img}
          alt={skill.name}
          className="h-[var(--logoloop-logoHeight)] w-auto object-contain"
          draggable={false}
        />
        <span>{skill.name}</span>
      </div>
    ),
    ariaLabel: skill.name,
  }));
}

export const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCompact, setIsCompact] = useState(false);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  const activeMeta = categories.find((cat) => cat.id === activeCategory) ?? categories[0];
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  const logoData = buildLogoData(filteredSkills);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateCompact = () => setIsCompact(mediaQuery.matches);

    updateCompact();
    mediaQuery.addEventListener("change", updateCompact);
    return () => mediaQuery.removeEventListener("change", updateCompact);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 36, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section section-surface-light relative scroll-mt-24 overflow-x-clip"
    >
      <div className="section-padding border-t border-border">
        <div className="container min-w-0">
          <div className="skills-section__header mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-center sm:justify-between md:mb-20">
            <p className="text-label text-muted-foreground">04 — Skills</p>
            <p className="text-label text-muted-foreground/70">{skills.length} technologies</p>
          </div>

          <div className="grid min-w-0 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            <div className="min-w-0 lg:sticky lg:top-28">
              <div ref={headlineRef} className="mb-8 max-w-xl sm:mb-10">
                <h2 className="skills-headline text-display-lg text-foreground">
                  Tools &amp; technologies
                  <br />
                  <span className="text-muted-foreground">I build with</span>
                </h2>
              </div>

              <div className="skills-tabs mb-6 flex flex-wrap gap-2 sm:mb-8">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`skills-tab ${isActive ? "skills-tab--active" : ""}`}
                      aria-pressed={isActive}
                    >
                      <span className="skills-tab__index">{cat.index}</span>
                      <span className="skills-tab__label">{cat.title}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <MotionDiv
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="text-label mb-4 text-muted-foreground">
                    {activeMeta.index} — {activeMeta.title}
                  </p>
                  <p className="font-display text-base leading-relaxed text-foreground/85 sm:text-lg md:text-xl">
                    {activeMeta.description}
                  </p>
                </MotionDiv>
              </AnimatePresence>
            </div>

            <BlueprintFrame className="skills-loop-frame min-w-0">
              <div className="skills-loop-frame__header">
                <span className="text-label text-muted-foreground">Active stack</span>
                <span className="text-label text-foreground/80">
                  {filteredSkills.length} items
                </span>
              </div>

              <AnimatePresence mode="wait">
                <MotionDiv
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="skills-loop-frame__tracks"
                >
                  <div className="skills-loop-track">
                    <LogoLoop
                      logos={logoData}
                      speed={isCompact ? 50 : 65}
                      direction="left"
                      logoHeight={isCompact ? 24 : 30}
                      gap={isCompact ? 24 : 36}
                      fadeOut
                      fadeOutColor="#f5f5f4"
                      scaleOnHover
                      ariaLabel={`${activeMeta.title} skills`}
                    />
                  </div>
                  <div className="skills-loop-track skills-loop-track--reverse">
                    <LogoLoop
                      logos={logoData}
                      speed={isCompact ? 40 : 50}
                      direction="right"
                      logoHeight={isCompact ? 22 : 26}
                      gap={isCompact ? 20 : 32}
                      fadeOut
                      fadeOutColor="#f5f5f4"
                      scaleOnHover
                      ariaLabel={`${activeMeta.title} skills reverse`}
                    />
                  </div>
                </MotionDiv>
              </AnimatePresence>
            </BlueprintFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

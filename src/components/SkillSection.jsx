import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoLoop from "./LogoLoop";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const MotionDiv = motion.div;

const skills = [
  { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", category: "web-development" },
  { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", category: "web-development" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "web-development" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "web-development" },
  { name: "React JS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "web-development" },
  { name: "Next JS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "web-development" },
  { name: "Bootstap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", category: "web-development" },
  { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "web-development" },
  { name: "Node JS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg", category: "web-development" },
  { name: "Express JS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", category: "web-development" },
  { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", category: "web-development" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "web-development" },
  { name: "PostGreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: "web-development" },
  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", category: "web-development" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", category: "web-development" },
  { name: "Vercel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", category: "web-development" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "programming languages" },
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", category: "programming languages" },
  { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", category: "programming languages" },
  { name: "C#", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", category: "programming languages" },
  { name: "Arduino", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg", category: "programming languages" },
  { name: "R", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg", category: "programming languages" },
  { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", category: "programming languages" },
  { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", category: "tools" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "tools" },
  { name: "Gitlab", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg", category: "tools" },
  { name: "Postman", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", category: "tools" },
  { name: "VS Code", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", category: "tools" },
  { name: "PyCharm", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg", category: "tools" },
  { name: "Android Studio", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg", category: "tools" },
  { name: "R Studio", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rstudio/rstudio-original.svg", category: "tools" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", category: "tools" },
  { name: "3Ds Max", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threedsmax/threedsmax-original.svg", category: "tools" },
  { name: "Blender", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg", category: "tools" },
  { name: "Unreal Engine", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg", category: "tools" },
  { name: "Adobe Premiere Pro", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg", category: "tools" },
  { name: "Adobe After Effects", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg", category: "tools" },
];

const categories = [
  {
    id: "all",
    index: "00",
    title: "All",
    description:
      "Technologies, tools, and frameworks I use to design and build applications across the full stack.",
  },
  {
    id: "web-development",
    index: "01",
    title: "Web Development",
    description:
      "I have experience developing responsive web applications using Next.js, React, Node.js, NestJS, MongoDB, and PostgreSQL, with additional experience in PHP, MySQL, Tailwind CSS, and Bootstrap for full-stack development.",
  },
  {
    id: "programming languages",
    index: "02",
    title: "Programming",
    description:
      "I have basic knowledge of programming languages such as Python, Java, C++, and C#. I also have experience using Arduino for IoT projects and basic data analysis using Python, R, and SQL.",
  },
  {
    id: "tools",
    index: "03",
    title: "Tools",
    description:
      "Proficient with Git, GitHub, Gitlab, Postman, VS Code, Rstudio, PyCharm, Figma, Blender, 3Ds Max, Unreal Engine, Microsoft Office, and Adobe Suite (Premiere Pro, After Effects).",
  },
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
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  const activeMeta = categories.find((cat) => cat.id === activeCategory) ?? categories[0];
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  const logoData = buildLogoData(filteredSkills);

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
    <section id="skills" ref={sectionRef} className="section-surface-light skills-section relative scroll-mt-24">
      <div className="section-padding border-t border-border">
        <div className="container">
          <div className="skills-section__header mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-20">
            <p className="text-label text-muted-foreground">04 — Skills</p>
            <p className="text-label text-muted-foreground/70">{skills.length} technologies</p>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            {/* Left — category context */}
            <div className="lg:sticky lg:top-28">
              <div ref={headlineRef} className="mb-10 max-w-xl">
                <h2 className="text-display-lg text-foreground">
                  Tools &amp; technologies
                  <br />
                  <span className="text-muted-foreground">I build with</span>
                </h2>
              </div>

              <div className="skills-tabs mb-8 flex flex-wrap gap-2">
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
                  <p className="font-display text-lg leading-relaxed text-foreground/85 md:text-xl">
                    {activeMeta.description}
                  </p>
                </MotionDiv>
              </AnimatePresence>
            </div>

            {/* Right — LogoLoop as the sole skill display */}
            <BlueprintFrame className="skills-loop-frame">
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
                      speed={65}
                      direction="left"
                      logoHeight={30}
                      gap={36}
                      fadeOut
                      fadeOutColor="#f5f5f4"
                      scaleOnHover
                      ariaLabel={`${activeMeta.title} skills`}
                    />
                  </div>
                  <div className="skills-loop-track skills-loop-track--reverse">
                    <LogoLoop
                      logos={logoData}
                      speed={50}
                      direction="right"
                      logoHeight={26}
                      gap={32}
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

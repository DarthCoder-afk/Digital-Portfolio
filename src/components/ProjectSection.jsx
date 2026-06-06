import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const proj = [
  {
    id: 1,
    title: "HeartLink: Dating App",
    description:
      "A Next.js-based dating app with real-time chat, secure auth, and smart matching features.",
    image: "/projects/project-4.png",
    tags: ["Next.js", "TypeScript", "Socket.io", "Node.js", "MongoDB"],
    role: "Full Stack Development & UI Design",
    year: "2025",
    demoUrl: "https://datingapp-heartlink.vercel.app/",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Note App",
    description:
      "A MERN-based note-taking app that lets users create, edit, and delete notes in real time.",
    image: "/projects/project-3.png",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    role: "Full Stack Development",
    year: "2025",
    demoUrl: "https://noteapp-yn7h.onrender.com/",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Leave Tracking System",
    description:
      "A web app for the HR Office to manage and monitor employee leave and travel requests efficiently.",
    image: "/projects/project-1.png",
    tags: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript", "MySQL"],
    role: "Full Stack Development & Design",
    year: "2025",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Document Management System",
    description:
      "A system that helps the Sangguniang Bayan Office organize and track municipal resolutions and orders.",
    image: "/projects/project-2.png",
    tags: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript", "MySQL"],
    role: "Backend Development & Database Design",
    year: "2025",
    demoUrl: "#",
    githubUrl: "#",
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

export const ProjectSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  const handleUnavailableDemo = (title) => {
    toast.error(`Demo for "${title}" is not available yet`, {
      duration: 2500,
      position: "bottom-right",
      style: {
        background: "#141416",
        color: "#f5f5f4",
        border: "1px solid #27272a",
        borderRadius: "9999px",
        padding: "12px 18px",
        fontSize: "14px",
      },
    });
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section section-surface-dark relative scroll-mt-24"
    >
      <Toaster />

      <div className="section-padding border-t border-border">
        <div className="container">
          <div className="projects-section__header mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-20">
            <p className="text-label text-muted-foreground">05 — Projects</p>
            <p className="text-label text-muted-foreground/70">{proj.length} featured builds</p>
          </div>

          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16 xl:gap-20">
            <div className="lg:sticky lg:top-28">
              <div ref={headlineRef} className="max-w-xl">
                <h2 className="text-display-lg text-foreground">
                  Selected work
                  <br />
                  <span className="text-muted-foreground">that ships</span>
                </h2>
                <p className="mt-8 max-w-md leading-relaxed text-muted-foreground md:text-lg">
                  Recent projects built with attention to detail, performance, and
                  user experience — from full-stack apps to government systems.
                </p>
              </div>

              <div className="mt-12 hidden lg:block">
                <a
                  href="https://github.com/DarthCoder-afk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinematic-button-secondary"
                >
                  View All on GitHub
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <div className="project-showcase">
              {proj.map((project, index) => {
                const isDemoAvailable = project.demoUrl && project.demoUrl !== "#";
                const indexLabel = String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={project.id}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="project-card"
                  >
                    <div className="project-card__top">
                      <span className="project-card__index">{indexLabel}</span>
                      <span className="text-label text-muted-foreground">{project.year}</span>
                    </div>

                    <BlueprintFrame className="project-card__frame">
                      {isDemoAvailable ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__media group block"
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          <div className="project-card__media-overlay" aria-hidden="true" />
                          <span className="project-card__media-cta">
                            Open demo
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUnavailableDemo(project.title)}
                          className="project-card__media group w-full text-left"
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                          <div className="project-card__media-overlay project-card__media-overlay--dim" aria-hidden="true" />
                          <span className="project-card__media-cta project-card__media-cta--muted">
                            Demo unavailable
                          </span>
                        </button>
                      )}
                    </BlueprintFrame>

                    <div className="project-card__body">
                      <p className="text-label text-muted-foreground">{project.role}</p>
                      <h3 className="project-card__title">{project.title}</h3>
                      <p className="project-card__description">{project.description}</p>

                      <div className="project-card__tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="experience-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {isDemoAvailable && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__link"
                        >
                          View live demo
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-16 lg:hidden">
            <a
              href="https://github.com/DarthCoder-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="cinematic-button-secondary"
            >
              View All on GitHub
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

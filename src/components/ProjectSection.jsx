import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ExternalLink } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

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
    accent: "from-rose-950/80 to-rose-900/40",
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
    accent: "from-emerald-950/80 to-emerald-900/40",
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
    accent: "from-teal-950/80 to-teal-900/40",
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
    accent: "from-lime-950/80 to-lime-900/40",
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const ProjectSection = () => {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

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
      panelsRef.current.forEach((panel, index) => {
        if (!panel || index === 0) return;

        gsap.set(panel, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: panel,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
          onEnter: () => {
            gsap.to(panelsRef.current[index - 1], { opacity: 0.3, scale: 0.98, duration: 0.4 });
            gsap.to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.4 });
          },
          onLeaveBack: () => {
            gsap.to(panel, { opacity: 0, y: 40, duration: 0.4 });
            gsap.to(panelsRef.current[index - 1], { opacity: 1, scale: 1, duration: 0.4 });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-surface-dark section-padding relative scroll-mt-24">
      <Toaster />

      <div className="container">
        <div className="mb-16 md:mb-24">
          <p className="text-label mb-4 text-muted-foreground">Selected Work</p>
          <h2 className="text-display-lg text-foreground">Featured Projects</h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Here are some of my recent projects. Each project was carefully crafted
            with attention to detail, client-based, performance and user-experience.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {proj.map((project, index) => {
            const isDemoAvailable = project.demoUrl && project.demoUrl !== "#";

            return (
              <article
                key={project.id}
                ref={(el) => {
                  panelsRef.current[index] = el;
                }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={`relative order-2 lg:order-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {isDemoAvailable ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <ProjectVisual project={project} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleUnavailableDemo(project.title)}
                      className="group block w-full text-left"
                    >
                      <ProjectVisual project={project} unavailable />
                    </button>
                  )}
                </div>

                <div className={`order-1 lg:order-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-label text-accent">{project.year}</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>

                  <h3 className="font-display mt-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                    {project.title}
                  </h3>

                  <p className="text-label mt-3 text-muted-foreground">{project.role}</p>

                  <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isDemoAvailable && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
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

        <div className="mt-20 md:mt-28">
          <a
            href="https://github.com/DarthCoder-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="cinematic-button-secondary"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

function ProjectVisual({ project, unavailable = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl hairline-border bg-gradient-to-br ${project.accent} p-6 md:p-8`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background/20">
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${unavailable ? "opacity-70" : ""}`}
          loading="lazy"
        />
        {unavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-foreground">
              Demo not available
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const experiences = [
  {
    id: "white-cloak",
    role: "Software Engineer",
    company: "White Cloak Technologies, Inc.",
    type: "Full-time",
    period: "Dec 2025 — Present",
    location: null,
    projects: [
      {
        title: "AI Hiring Platform",
        stack: ["Next.js", "Node.js", "MongoDB", "Strapi", "Vercel"],
        highlights: [
          "Implemented CRUD functionality for user commenting and mention systems.",
          "Developed SEO-optimized blog pages using Next.js and Strapi CMS with metadata handling, dynamic routing, and SSR/SSG features to improve search visibility and performance.",
          "Built and maintained frontend and backend functionalities for platform workflows.",
          "Collaborated with developers using Git-based version control and agile development practices.",
        ],
      },
      {
        title: "ERP Legislative Management System",
        stack: ["NestJS", "Next.js", "Prisma", "PostgreSQL", "Fly.io", "AWS"],
        highlights: [
          "Developed legislative workflow modules for a government ERP platform to streamline internal operations.",
          "Implemented real-time meeting workflows, biometric voting, and roll-call management features.",
          "Built the eBatas module integrating legislative APIs for dynamic House Bill rendering.",
          "Developed engagement features and dashboard functionalities for legislative workflows.",
          "Implemented a secure forgot password workflow with email OTP verification to improve account recovery and authentication security.",
        ],
      },
      {
        title: "ERP Document Processing Module",
        stack: ["NestJS", "Next.js", "Prisma", "PostgreSQL"],
        highlights: [
          "Developing OCR-powered document processing functionalities within an ERP platform.",
          "Implementing automated text extraction pipelines that convert uploaded files into structured JSON data.",
          "Supporting enterprise document management and workflow automation features.",
        ],
      },
    ],
  },
  {
    id: "freelance",
    role: "Freelance Developer",
    company: "Freelance",
    type: "Freelance",
    period: "Mar 2024 — Jul 2025",
    location: "Daet, Bicol Region, Philippines · Remote",
    projects: [
      {
        title: "Document Management System — LGU San Vicente",
        stack: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap", "JavaScript"],
        highlights: [
          "Built a system to help the Sangguniang Bayan Office keep track of municipal resolutions and orders.",
          "Implemented file generation features for document workflows.",
        ],
      },
      {
        title: "Crash Detection Device",
        stack: ["Arduino"],
        highlights: [
          "Developed an IoT device that detects crashes and sends the location to a recipient via SMS.",
        ],
      },
      {
        title: "DIY Wire Cutter",
        stack: ["Arduino"],
        highlights: [
          "Built an IoT wire-cutting device with button controls and an LCD display.",
          "Programmed length calculation based on user input for precise wire cutting.",
        ],
      },
    ],
  },
  {
    id: "talisay-intern",
    role: "Software Developer Intern",
    company: "Local Government Unit of Talisay",
    type: "Internship",
    period: "Feb 2025 — May 2025",
    location: "Talisay, Bicol Region, Philippines · On-site",
    projects: [
      {
        title: "Leave Tracking System",
        stack: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript", "MySQL"],
        highlights: [
          "Created a Leave Tracking System for the Human Resource Management Office of the Local Government Unit of Talisay, Camarines Norte.",
        ],
      },
    ],
  },
];

function ExperienceCard({ exp }) {
  return (
    <div className="experience-timeline__content">
      <header className="experience-timeline__header">
        <div>
          <h3 className="font-display text-2xl font-medium text-foreground md:text-[1.65rem] lg:text-2xl">
            {exp.role}
          </h3>
          <p className="mt-2 text-base text-foreground/80">
            {exp.company}
            <span className="text-muted-foreground"> · {exp.type}</span>
          </p>
          {exp.location && (
            <p className="mt-2 text-sm text-muted-foreground lg:hidden">{exp.location}</p>
          )}
        </div>
        {exp.location && (
          <p className="experience-timeline__location hidden text-sm text-muted-foreground lg:block">
            {exp.location}
          </p>
        )}
      </header>

      <div className="experience-projects">
        {exp.projects.map((project) => (
          <div key={project.title} className="experience-project">
            <div className="experience-project__header">
              <h4 className="font-display text-lg font-medium text-foreground">
                {project.title}
              </h4>
              <div className="experience-project__tags">
                {project.stack.map((tech) => (
                  <span key={tech} className="experience-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <ul className="experience-project__list">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceMeta({ exp, index }) {
  return (
    <div className="experience-timeline__meta">
      <span className="experience-timeline__step text-label">
        {String(index + 1).padStart(2, "0")}
      </span>
      <time className="experience-timeline__date text-label">{exp.period}</time>
    </div>
  );
}

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

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

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      const entries = timelineRef.current?.querySelectorAll(".experience-timeline__item");
      entries?.forEach((entry) => {
        gsap.fromTo(
          entry,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
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
    <section id="experience" ref={sectionRef} className="section-surface-dark experience-section relative scroll-mt-24">
      <div className="section-padding border-t border-border">
        <div className="container">
          <div className="experience-section__header mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-20">
            <p className="text-label text-muted-foreground">03 — Experience</p>
            <p className="text-label text-muted-foreground/70">{experiences.length} roles</p>
          </div>

          <div ref={headlineRef} className="mb-14 max-w-3xl md:mb-20">
            <h2 className="text-display-lg text-foreground">
              Professional
              <br />
              <span className="text-muted-foreground">experience</span>
            </h2>
          </div>

          <div ref={timelineRef} className="experience-timeline">
            <div className="experience-timeline__line" aria-hidden="true">
              <div ref={lineRef} className="experience-timeline__line-fill" />
            </div>

            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 1;

              return (
                <article
                  key={exp.id}
                  className={`experience-timeline__item ${isLeft ? "experience-timeline__item--left" : "experience-timeline__item--right"}`}
                >
                  <div className="experience-timeline__slot experience-timeline__slot--start">
                    {isLeft ? (
                      <ExperienceCard exp={exp} />
                    ) : (
                      <ExperienceMeta exp={exp} index={index} />
                    )}
                  </div>

                  <div className="experience-timeline__center">
                    <span className="experience-timeline__node" aria-hidden="true">
                      <span className="experience-timeline__node-inner" />
                    </span>
                  </div>

                  <div className="experience-timeline__slot experience-timeline__slot--end">
                    {isLeft ? (
                      <ExperienceMeta exp={exp} index={index} />
                    ) : (
                      <ExperienceCard exp={exp} />
                    )}
                  </div>

                  {/* Mobile-only stacked layout */}
                  <div className="experience-timeline__mobile">
                    <ExperienceMeta exp={exp} index={index} />
                    <ExperienceCard exp={exp} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

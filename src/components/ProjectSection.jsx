import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import toast, { Toaster } from "react-hot-toast"; // ✅ import toast

const proj = [
  {
    id: 1,
    title: "Leave Tracking System",
    description:
      "A web app for the HR Office to manage and monitor employee leave and travel requests efficiently.",
    image: "/projects/project-1.png",
    tags: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript", "MySQL"],
    role: "Full Stack Development & Design",
    year: "2025",
    bg: "bg-[#52b788]",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Document Management System",
    description:
      "A system that helps the Sangguniang Bayan Office organize and track municipal resolutions and orders.",
    image: "/projects/project-2.png",
    tags: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript", "MySQL"],
    role: "Backend Development & Database Design",
    year: "2025",
    bg: "bg-[#80ed99]",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Note App",
    description:
      "A MERN-based note-taking app that lets users create, edit, and delete notes in real time.",
    image: "/projects/project-3.png",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    role: "Full Stack Development",
    year: "2025",
    bg: "bg-[#3b734a]",
    demoUrl: "https://noteapp-yn7h.onrender.com/",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "HeartLink: Dating App",
    description:
      "A Next.js-based dating app with real-time chat, secure auth, and smart matching features.",
    image: "/projects/project-4.png",
    tags: ["Next.js", "TypeScript", "Socket.io", "Node.js", "MongoDB"],
    role: "Full Stack Development & UI Design",
    year: "2025",
    bg: "bg-[#e39695]",
    demoUrl: "https://datingapp-heartlink.vercel.app/",
    githubUrl: "#",
  },
];

export const ProjectSection = () => {
  const handleUnavailableDemo = (title) => {
    toast.error(`Demo for "${title}" is not available yet 😅`, {
      duration: 2500,
      position: "bottom-center",
      style: {
        background: "#1a1a1a",
        color: "#fff",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
      },
    });
  };

  return (
    <section id="projects" className="py-24 px-4 relative scroll-mt-24">
      <Toaster /> {/* ✅ Toast container */}

      <div className="container mx-auto max-w-5xl">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          Featured Projects
        </motion.h2>

        <motion.p
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, client-based, performance and
          user-experience
        </motion.p>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 group">
          {proj.map((project) => {
            const isDemoAvailable = project.demoUrl && project.demoUrl !== "#";

            return (
              <motion.div
                key={project.id}
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col transition-all duration-300 group-hover:grayscale-100 hover:filter-none"
              >
                {isDemoAvailable ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className={`w-full h-[300px] rounded-xl ${project.bg} flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-xl shadow-lg w-[90%] sm:w-[80%] md:w-[90%] transition duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                  </a>
                ) : (
                  <button
                    onClick={() => handleUnavailableDemo(project.title)}
                    className={`relative w-full h-[300px] rounded-xl ${project.bg} flex items-center justify-center overflow-hidden group`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="rounded-xl shadow-lg w-[90%] sm:w-[80%] md:w-[90%] opacity-80 transition duration-300 ease-in-out group-hover:opacity-60"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center 
                      bg-black/60 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 rounded-xl"
                    >
                      <span className="text-white text-sm bg-black/70 px-4 py-2 rounded-full">
                        Demo not available
                      </span>
                    </div>
                  </button>
                )}

                {/* Text Section */}
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p>{project.year}</p>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Button */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12"
        >
          <a
            href="https://github.com/DarthCoder-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-[#f8f9fa] inline-block px-6 py-3 text-sm md:text-base rounded-full border border-[#212529] font-semibold overflow-hidden group"
          >
            <span className="relative z-10 text-primary transition-colors duration-500 group-hover:text-[#f8f9fa]">
              View All Projects
            </span>
            <span className="absolute inset-0 bg-[#212529] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

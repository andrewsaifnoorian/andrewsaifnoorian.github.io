import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectData {
  id: number;
  image: string;
  title: string;
  github: string;
  demo: string;
  description: string;
  techStack: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal_backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="project-modal_content"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="project-modal_close" onClick={onClose} aria-label="Close modal">
              &times;
            </button>

            <div className="project-modal_image">
              <img src={project.image} alt={project.title} />
            </div>

            <h3 className="project-modal_title">{project.title}</h3>

            <p className="project-modal_description">{project.description}</p>

            <div className="project-modal_badges">
              {project.techStack.map((tech) => (
                <span key={tech} className="project-modal_badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-modal_links">
              {project.github && (
                <a href={project.github} className="btn" target="_blank" rel="noreferrer">
                  Github
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="btn btn-primary" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export type { ProjectData };
export default ProjectModal;

import { useRef, useState, useEffect, useCallback } from "react";
import "./project.css";
import IMG1 from "../../assets/primedtNJ.webp";
import IMG2 from "../../assets/NN-Final-Project.webp";
import IMG3 from "../../assets/devopsCourseProject.webp";
import IMG4 from "../../assets/heroesLLCpic.webp";
import IMG5 from "../../assets/cluegame.webp";
import IMG6 from "../../assets/poker5hand.webp";
import IMG7 from "../../assets/underMSRP.webp";
import IMG8 from "../../assets/CarM.webp";
import IMG9 from "../../assets/tasksapp.webp";
import AnimatedSection from "../animated-section/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";
import ProjectModal, { type ProjectData } from "./ProjectModal";

const projects: ProjectData[] = [
  {
    id: 1,
    image: IMG2,
    title: "Targeted Advertising ROI Classification Using Neural Networks",
    github: "",
    demo: "/nn-final-project.pdf",
    description:
      "Research project applying feedforward neural networks to classify advertising ROI across digital channels. Includes data preprocessing, model training, and evaluation with confusion matrices and accuracy metrics.",
    techStack: ["Python", "TensorFlow", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    id: 2,
    image: IMG8,
    title: "Car Maintenance App",
    github: "https://github.com/SKhan2001/CarTracker",
    demo: "",
    description:
      "Full-stack application for tracking vehicle maintenance schedules, service history, and upcoming reminders. Features user authentication and a dashboard for managing multiple vehicles.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 3,
    image: IMG3,
    title: "DevOps & Secure Software Development Project",
    github: "",
    demo: "https://drive.google.com/file/d/1qtxVQO15Utn3ut901Ol_eHmz8_zGC-K_/view?usp=drivesdk",
    description:
      "End-to-end CI/CD pipeline implementation with security best practices including static analysis, dependency scanning, containerization, and automated deployments.",
    techStack: ["Docker", "Jenkins", "AWS", "SonarQube", "Terraform"],
  },
  {
    id: 4,
    image: IMG4,
    title: "Heroes Movement LLC",
    github: "",
    demo: "",
    description:
      "Professional business website for a community organization. Designed and built a responsive landing page with modern UI/UX, contact forms, and mobile-first layout.",
    techStack: ["React", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    id: 5,
    image: IMG1,
    title: "Prime Detailing NJ",
    github: "",
    demo: "",
    description:
      "Business website for a New Jersey auto detailing company. Features service listings, booking information, image gallery, and SEO-optimized pages.",
    techStack: ["React", "CSS3", "JavaScript", "SEO"],
  },
  {
    id: 6,
    image: IMG5,
    title: "Clue Game",
    github: "https://github.com/andrewsaifnoorian/clue-game",
    demo: "https://67565c59e06325000836e7ec--clue-game.netlify.app/",
    description:
      "Interactive web-based version of the classic Clue board game. Players can make accusations, track clues, and solve the mystery through a clean, intuitive UI.",
    techStack: ["React", "TypeScript", "CSS3", "Netlify"],
  },
  {
    id: 7,
    image: IMG6,
    title: "5 Hand Poker",
    github: "https://github.com/andrewsaifnoorian/project2_asaifnoorian",
    demo: "",
    description:
      "Poker hand evaluator that analyzes five-card hands, determines hand rankings, and compares multiple hands to find the winner using classic poker rules.",
    techStack: ["Java", "OOP", "JUnit"],
  },
  {
    id: 8,
    image: IMG7,
    title: "Under MSRP App",
    github: "https://github.com/andrewsaifnoorian/BulkEmails",
    demo: "https://undermsrp.netlify.app/",
    description:
      "Automated bulk email tool for vehicle dealerships, helping them reach potential customers with under-MSRP offers. Includes template management and email tracking.",
    techStack: ["React", "Node.js", "SendGrid", "Netlify"],
  },
  {
    id: 9,
    image: IMG9,
    title: "Tasks Web App",
    github: "https://github.com/andrewsaifnoorian/tasks-app",
    demo: "",
    description:
      "A clean, minimalist task management application with CRUD operations, task categorization, and persistent storage for organizing daily workflows.",
    techStack: ["React", "TypeScript", "CSS3"],
  },
];

const ProjectCard = ({
  image,
  title,
  github,
  demo,
  onClick,
}: {
  image: string;
  title: string;
  github: string;
  demo: string;
  onClick: () => void;
}) => (
  <article className="project_item" onClick={onClick}>
    <div className="project_item-image">
      <img src={image} alt={title} loading="lazy" />
      <div className="project_item-overlay">
        <h3>{title}</h3>
        <div className="project_item-overlay-cta">
          {github && (
            <a
              href={github}
              className="btn"
              onClick={(e) => e.stopPropagation()}
            >
              Github
            </a>
          )}
          {demo && (
            <a
              href={demo}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
    <h3>{title}</h3>
  </article>
);

const HorizontalScroll = ({ onSelectProject }: { onSelectProject: (p: ProjectData) => void }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(trackWidth - window.innerWidth + 40)]
  );

  return (
    <div className="horizontal-scroll_outer" ref={outerRef}>
      <div className="horizontal-scroll_sticky">
        <motion.div
          className="horizontal-scroll_track"
          ref={trackRef}
          style={{ x }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              github={project.github}
              demo={project.demo}
              onClick={() => onSelectProject(project)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  const isMobile = useIsMobile(1024);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="project">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      {isMobile ? (
        <AnimatedSection>
          <div className="container project_container">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                github={project.github}
                demo={project.demo}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </AnimatedSection>
      ) : (
        <HorizontalScroll onSelectProject={setSelectedProject} />
      )}
      <ProjectModal project={selectedProject} onClose={handleClose} />
    </section>
  );
};

export default Projects;

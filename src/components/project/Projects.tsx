import { useRef, useState, useEffect } from "react";
import "./project.css";
import IMG1 from "../../assets/primedtNJ.png";
import IMG2 from "../../assets/NN-Final-Project.png";
import IMG3 from "../../assets/devopsCourseProject.png";
import IMG4 from "../../assets/heroesLLCpic.png";
import IMG5 from "../../assets/cluegame.png";
import IMG6 from "../../assets/poker5hand.png";
import IMG7 from "../../assets/underMSRP.png";
import IMG8 from "../../assets/CarM.png";
import IMG9 from "../../assets/tasksapp.png";
import AnimatedSection from "../animated-section/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";

const projects = [
  {
    id: 1,
    image: IMG2,
    title: "Targeted Advertising ROI Classification Using Neural Networks",
    github: "",
    demo: "/nn-final-project.pdf",
  },
  {
    id: 2,
    image: IMG8,
    title: "Car Maintenance App",
    github: "https://github.com/SKhan2001/CarTracker",
    demo: "",
  },
  {
    id: 3,
    image: IMG3,
    title: "DevOps & Secure Software Development Project",
    github: "",
    demo: "https://drive.google.com/file/d/1qtxVQO15Utn3ut901Ol_eHmz8_zGC-K_/view?usp=drivesdk",
  },
  {
    id: 4,
    image: IMG4,
    title: "Heroes Movement LLC",
    github: "",
    demo: "",
  },
  {
    id: 5,
    image: IMG1,
    title: "Prime Detailing NJ",
    github: "",
    demo: "",
  },
  {
    id: 6,
    image: IMG5,
    title: "Clue Game",
    github: "https://github.com/andrewsafe/clue-game",
    demo: "https://67565c59e06325000836e7ec--clue-game.netlify.app/",
  },
  {
    id: 7,
    image: IMG6,
    title: "5 Hand Poker",
    github: "https://github.com/andrewsafe/project2_asaifnoorian",
    demo: "",
  },
  {
    id: 8,
    image: IMG7,
    title: "Under MSRP App",
    github: "https://github.com/andrewsafe/BulkEmails",
    demo: "https://undermsrp.netlify.app/",
  },
  {
    id: 9,
    image: IMG9,
    title: "Tasks Web App",
    github: "https://github.com/andrewsafe/tasks-app",
    demo: "",
  },
];

const ProjectCard = ({
  image,
  title,
  github,
  demo,
}: {
  image: string;
  title: string;
  github: string;
  demo: string;
}) => (
  <article className="project_item">
    <div className="project_item-image">
      <img src={image} alt={title} loading="lazy" />
      <div className="project_item-overlay">
        <h3>{title}</h3>
        <div className="project_item-overlay-cta">
          {github && (
            <a href={github} className="btn">
              Github
            </a>
          )}
          {demo && (
            <a
              href={demo}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
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

const HorizontalScroll = () => {
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
          {projects.map(({ id, image, title, github, demo }) => (
            <ProjectCard
              key={id}
              image={image}
              title={title}
              github={github}
              demo={demo}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Projects = () => {
  const isMobile = useIsMobile(1024);

  return (
    <section id="project">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      {isMobile ? (
        <AnimatedSection>
          <div className="container project_container">
            {projects.map(({ id, image, title, github, demo }) => (
              <ProjectCard
                key={id}
                image={image}
                title={title}
                github={github}
                demo={demo}
              />
            ))}
          </div>
        </AnimatedSection>
      ) : (
        <HorizontalScroll />
      )}
    </section>
  );
};

export default Projects;

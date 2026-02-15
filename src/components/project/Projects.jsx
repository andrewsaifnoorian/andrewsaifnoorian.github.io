import React from "react";
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

const projects = [
  {
    id: 1,
    image: IMG1,
    title: "Prime Detailing NJ",
    github: "",
    demo: "https://primedetailing.biz/",
  },
  {
    id: 2,
    image: IMG2,
    title: "Targeted Advertising ROI Classification Using Neural Networks",
    github: "",
    demo: "https://www.linkedin.com/in/andrewsaifnoorian/overlay/1765563886158/single-media-viewer?type=DOCUMENT&profileId=ACoAACgPUV8BK03EPpwlXxmLS4F0QPrg6X4E83w&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bnc6uSRWKRRW5rZp8o2R%2F%2Fg%3D%3D",
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
    image: IMG5,
    title: "Clue Game",
    github: "https://github.com/andrewsafe/clue-game",
    demo: "https://67565c59e06325000836e7ec--clue-game.netlify.app/",
  },
  {
    id: 6,
    image: IMG6,
    title: "5 Hand Poker",
    github: "https://github.com/andrewsafe/project2_asaifnoorian",
    demo: "",
  },
  {
    id: 7,
    image: IMG7,
    title: "Under MSRP App",
    github: "https://github.com/andrewsafe/BulkEmails",
    demo: "https://undermsrp.netlify.app/",
  },
  {
    id: 8,
    image: IMG8,
    title: "Car Maintenance App",
    github: "https://github.com/SKhan2001/CarTracker",
    demo: "",
  },
  {
    id: 9,
    image: IMG9,
    title: "Tasks Web App",
    github: "https://github.com/andrewsafe/tasks-app",
    demo: "",
  },
];
const Projects = () => {
  return (
    <section id="project">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container project_container">
        {projects.map(({ id, image, title, github, demo }) => {
          return (
            <article key={id} className="project_item">
              <div className="project_item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className="project-item-cta">
                <a href={github} className="btn">
                  Github
                </a>
                <a
                  href={demo}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;

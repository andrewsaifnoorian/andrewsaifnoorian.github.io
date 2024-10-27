import React from "react";
import "./project.css";
import IMG1 from "../../assets/heroesLLCpic.png";
import IMG2 from "../../assets/CarM.png";
import IMG3 from "../../assets/tasksapp.png";
// import IMG4 from "../../assets/qa.png";

const projects = [
  {
    id: 1,
    image: IMG1,
    title: "Heroes Movement LLC",
    github: "",
    demo: "https://theheromovement.org/",
  },
  {
    id: 2,
    image: IMG2,
    title: "Car Maintenance App",
    github: "https://github.com/SKhan2001/CarTracker",
    demo: "",
  },
  {
    id: 3,
    image: IMG3,
    title: "Tasks Web App",
    github: "https://github.com/andrewsafe/tasks-app",
    demo: "",
  },
  // {
  //   id: 4,
  //   image: IMG4,
  //   title: "Quasar App",
  //   demo: "",
  // },
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

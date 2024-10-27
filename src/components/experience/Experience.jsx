import React from "react";
import "./experience.css";
import css3 from "../../assets/css3.png";
import html from "../../assets/html-5.png";
import js from "../../assets/javascript.png";
import react from "../../assets/react.png";
import sn from "../../assets/sn.png";
import node from "../../assets/node.jpg";
import sql from "../../assets/sql.png";
import python from "../../assets/python.png";
import maven from "../../assets/maven.png";
import java from "../../assets/java.png";
import postgreSQL from "../../assets/postgresql.png";
import ng from "../../assets/ng.png";

const Experience = () => {
  return (
    <section id="experience">
      <h5>What I use</h5>
      <h2>My Skills</h2>
      <div className="container experience_container">
        <div className="experience_frontend">
          <h3>Frontend Development</h3>
          <div className="experience_content">
            <article className="experience_details">
              <img
                src={react}
                className="experience_details-icon"
                alt="react"
              />
              <div>
                <h4>React</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={ng} className="experience_details-icon" alt="ng" />
              <div>
                <h4>Angular</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={sn} className="experience_details-icon" alt="sn" />
              <div>
                <h4>ServiceNow</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={html} className="experience_details-icon" alt="html" />
              <div>
                <h4>HTML</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={css3} className="experience_details-icon" alt="css" />
              <div>
                <h4>CSS</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={js} className="experience_details-icon" alt="js" />
              <div>
                <h4>JavaScript</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
          </div>
        </div>
        <div className="experience_backend">
          <h3>Backend Development</h3>
          <div className="experience_content">
            <article className="experience_details">
              <img src={java} className="experience_details-icon" alt="java" />
              <div>
                <h4>Java</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img
                src={maven}
                className="experience_details-icon"
                alt="maven"
              />
              <div>
                <h4>Maven</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img
                src={python}
                className="experience_details-icon"
                alt="python"
              />
              <div>
                <h4>Python</h4>
                <small className="text-light">Proficient</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={node} className="experience_details-icon" alt="node" />
              <div>
                <h4>Node.js</h4>
                <small className="text-light">Proficient</small>
              </div>
            </article>
            <article className="experience_details">
              <img src={sql} className="experience_details-icon" alt="sql" />
              <div>
                <h4>SQL</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
            <article className="experience_details">
              <img
                src={postgreSQL}
                className="experience_details-icon"
                alt="postgreSQL"
              />
              <div>
                <h4>postgreSQL</h4>
                <small className="text-light">Experienced</small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

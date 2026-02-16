import type { ComponentType } from "react";
import "./experience.css";
import { motion } from "framer-motion";
import AnimatedSection from "../animated-section/AnimatedSection";
import {
  SiAnthropic,
  SiOpenai,
  SiGooglegemini,
  SiAmazonwebservices,
  SiGooglecloud,
  SiOracle,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";

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

const aiCloudSkills = [
  { Icon: SiAnthropic, name: "Claude", level: "Experienced" },
  { Icon: SiOpenai, name: "ChatGPT", level: "Experienced" },
  { Icon: SiGooglegemini, name: "Gemini", level: "Proficient" },
  { Icon: SiAmazonwebservices, name: "AWS", level: "Experienced" },
  { Icon: FaMicrosoft, name: "Azure", level: "Proficient" },
  { Icon: SiGooglecloud, name: "GCP", level: "Proficient" },
  { Icon: SiOracle, name: "Oracle", level: "Proficient" },
];

const frontendSkills = [
  { icon: react, name: "React", level: "Experienced" },
  { icon: ng, name: "Angular", level: "Experienced" },
  { icon: sn, name: "ServiceNow", level: "Experienced" },
  { icon: html, name: "HTML", level: "Experienced" },
  { icon: css3, name: "CSS", level: "Experienced" },
  { icon: js, name: "JavaScript", level: "Experienced" },
];

const backendSkills = [
  { icon: java, name: "Java", level: "Experienced" },
  { icon: maven, name: "Maven", level: "Experienced" },
  { icon: python, name: "Python", level: "Proficient" },
  { icon: node, name: "Node.js", level: "Proficient" },
  { icon: sql, name: "SQL", level: "Experienced" },
  { icon: postgreSQL, name: "postgreSQL", level: "Experienced" },
];

const SkillCard = ({
  icon,
  name,
  level,
  index,
}: {
  icon: string;
  name: string;
  level: string;
  index: number;
}) => (
  <motion.article
    className="experience_details"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <img
      src={icon}
      className="experience_details-icon"
      alt={name}
      loading="lazy"
    />
    <div>
      <h4>{name}</h4>
      <small className="text-light">{level}</small>
    </div>
  </motion.article>
);

const IconSkillCard = ({
  Icon,
  name,
  level,
  index,
}: {
  Icon: ComponentType<{ className?: string }>;
  name: string;
  level: string;
  index: number;
}) => (
  <motion.article
    className="experience_details"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Icon className="experience_details-svg-icon" />
    <div>
      <h4>{name}</h4>
      <small className="text-light">{level}</small>
    </div>
  </motion.article>
);

const Experience = () => {
  return (
    <section id="experience">
      <h5>What I use</h5>
      <h2>My Skills</h2>
      <AnimatedSection>
        <div className="container experience_container">
          <div className="experience_ai-cloud experience_full-width">
            <h3>Artificial Intelligence & Cloud</h3>
            <div className="experience_content">
              {aiCloudSkills.map((skill, i) => (
                <IconSkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
          <div className="experience_frontend">
            <h3>Frontend Development</h3>
            <div className="experience_content">
              {frontendSkills.map((skill, i) => (
                <SkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
          <div className="experience_backend">
            <h3>Backend Development</h3>
            <div className="experience_content">
              {backendSkills.map((skill, i) => (
                <SkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Experience;

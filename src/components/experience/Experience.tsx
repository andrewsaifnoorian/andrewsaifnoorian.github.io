import type { ComponentType } from "react";
import "./experience.css";
import { motion } from "framer-motion";
import AnimatedSection from "../animated-section/AnimatedSection";
import ScrambleText from "../scramble-text/ScrambleText";
import {
  SiAnthropic,
  SiOpenai,
  SiGooglegemini,
  SiAmazonwebservices,
  SiGooglecloud,
  SiOracle,
  SiDatabricks,
  SiReact,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiPostgresql,
  SiApachemaven,
} from "react-icons/si";
import { FaMicrosoft, FaJava, FaDatabase, FaCog } from "react-icons/fa";

const aiCloudSkills = [
  { Icon: SiAnthropic, name: "Claude", level: "Experienced" },
  { Icon: SiOpenai, name: "ChatGPT", level: "Experienced" },
  { Icon: SiGooglegemini, name: "Gemini", level: "Proficient" },
  { Icon: SiAmazonwebservices, name: "AWS", level: "Experienced" },
  { Icon: FaMicrosoft, name: "Azure", level: "Proficient" },
  { Icon: SiGooglecloud, name: "GCP", level: "Proficient" },
  { Icon: SiOracle, name: "Oracle", level: "Proficient" },
  { Icon: SiDatabricks, name: "Databricks", level: "Proficient" },
];

const frontendSkills = [
  { Icon: SiReact, name: "React", level: "Experienced" },
  { Icon: SiAngular, name: "Angular", level: "Experienced" },
  { Icon: FaCog, name: "ServiceNow", level: "Experienced" },
  { Icon: SiHtml5, name: "HTML", level: "Experienced" },
  { Icon: SiCss3, name: "CSS", level: "Experienced" },
  { Icon: SiJavascript, name: "JavaScript", level: "Experienced" },
];

const backendSkills = [
  { Icon: FaJava, name: "Java", level: "Experienced" },
  { Icon: SiApachemaven, name: "Maven", level: "Experienced" },
  { Icon: SiPython, name: "Python", level: "Proficient" },
  { Icon: SiNodedotjs, name: "Node.js", level: "Proficient" },
  { Icon: FaDatabase, name: "SQL", level: "Experienced" },
  { Icon: SiPostgresql, name: "PostgreSQL", level: "Experienced" },
];

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
      <ScrambleText text="My Skills" />
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
                <IconSkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
          <div className="experience_backend">
            <h3>Backend Development</h3>
            <div className="experience_content">
              {backendSkills.map((skill, i) => (
                <IconSkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Experience;

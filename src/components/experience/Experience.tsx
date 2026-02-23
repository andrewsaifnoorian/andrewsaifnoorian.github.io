import type { ComponentType } from "react";
import "./experience.css";
import { motion } from "framer-motion";
import AnimatedSection from "../animated-section/AnimatedSection";
import ScrambleText from "../scramble-text/ScrambleText";
import { useIsLowPerformance } from "../../hooks/usePerformanceTier";
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

type Level = "Experienced" | "Proficient";

const LEVEL_DOTS: Record<Level, number> = {
  Proficient: 3,
  Experienced: 4,
};

const aiCloudSkills = [
  { Icon: SiAnthropic, name: "Claude", level: "Experienced" as Level },
  { Icon: SiOpenai, name: "ChatGPT", level: "Experienced" as Level },
  { Icon: SiGooglegemini, name: "Gemini", level: "Proficient" as Level },
  { Icon: SiAmazonwebservices, name: "AWS", level: "Experienced" as Level },
  { Icon: FaMicrosoft, name: "Azure", level: "Proficient" as Level },
  { Icon: SiGooglecloud, name: "GCP", level: "Proficient" as Level },
  { Icon: SiOracle, name: "Oracle", level: "Proficient" as Level },
  { Icon: SiDatabricks, name: "Databricks", level: "Proficient" as Level },
];

const frontendSkills = [
  { Icon: SiReact, name: "React", level: "Experienced" as Level },
  { Icon: SiAngular, name: "Angular", level: "Experienced" as Level },
  { Icon: FaCog, name: "ServiceNow", level: "Experienced" as Level },
  { Icon: SiHtml5, name: "HTML", level: "Experienced" as Level },
  { Icon: SiCss3, name: "CSS", level: "Experienced" as Level },
  { Icon: SiJavascript, name: "JavaScript", level: "Experienced" as Level },
];

const backendSkills = [
  { Icon: FaJava, name: "Java", level: "Experienced" as Level },
  { Icon: SiApachemaven, name: "Maven", level: "Experienced" as Level },
  { Icon: SiPython, name: "Python", level: "Proficient" as Level },
  { Icon: SiNodedotjs, name: "Node.js", level: "Proficient" as Level },
  { Icon: FaDatabase, name: "SQL", level: "Experienced" as Level },
  { Icon: SiPostgresql, name: "PostgreSQL", level: "Experienced" as Level },
];

const LevelDots = ({ level }: { level: Level }) => {
  const filled = LEVEL_DOTS[level];
  return (
    <div className="experience_level" aria-label={level}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`experience_level-dot${i < filled ? " experience_level-dot--filled" : ""}`}
        />
      ))}
    </div>
  );
};

const IconSkillCard = ({
  Icon,
  name,
  level,
  index,
}: {
  Icon: ComponentType<{ className?: string }>;
  name: string;
  level: Level;
  index: number;
}) => {
  const lowPerf = useIsLowPerformance();
  const Tag = lowPerf ? "article" : motion.article;
  const motionProps = lowPerf
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.35, delay: index * 0.06 },
      };

  return (
    <Tag className="experience_details" {...motionProps}>
      <Icon className="experience_details-svg-icon" />
      <div>
        <h4>{name}</h4>
        <LevelDots level={level} />
      </div>
    </Tag>
  );
};

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

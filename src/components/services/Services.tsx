import { useState } from "react";
import "./services.css";
import { AnimatePresence } from "framer-motion";
import { tabs } from "./servicesData";
import AnimatedSection from "../animated-section/AnimatedSection";
import ScrambleText from "../scramble-text/ScrambleText";
import TabSelector from "./TabSelector";
import TabContent from "./TabContent";
import StatBar from "./StatBar";

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services">
      <h5>What I Bring</h5>
      <ScrambleText text="Expertise" />

      <AnimatedSection>
        <div className="container expertise_container">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="expertise_content">
            <AnimatePresence mode="wait">
              <TabContent key={tabs[activeTab].id} tab={tabs[activeTab]} />
            </AnimatePresence>
          </div>

          <StatBar />
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Services;

import { motion } from "framer-motion";
import { tabs } from "./servicesData";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface TabSelectorProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="expertise-tabs">
      {tabs.map((tab, i) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`expertise-tab ${activeTab === i ? "expertise-tab--active" : ""}`}
            onClick={() => onTabChange(i)}
            aria-selected={activeTab === i}
            role="tab"
          >
            {activeTab === i && (
              <motion.div
                className="expertise-tab__indicator"
                layoutId={reducedMotion ? undefined : "expertise-indicator"}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="expertise-tab__icon" />
            <span className="expertise-tab__label">{tab.label}</span>
            <span className="expertise-tab__label--short">{tab.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabSelector;

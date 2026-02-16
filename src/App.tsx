import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Services from "./components/services/Services";
import Projects from "./components/project/Projects";
import Testimonials from "./components/testimonials/Testimonials";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Resume from "./components/resume/Resume";
import ThemeToggle from "./components/theme-toggle/ThemeToggle";
import CursorGlow from "./components/cursor-glow/CursorGlow";
import BackToTop from "./components/back-to-top/BackToTop";
import NotFound from "./components/not-found/NotFound";
import CommandPalette from "./components/command-palette/CommandPalette";
import EasterEgg from "./components/easter-egg/EasterEgg";
import NoiseOverlay from "./components/noise-overlay/NoiseOverlay";
import useDynamicFavicon from "./hooks/useDynamicFavicon";

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
};

const pageTransition = {
  initial: { opacity: 0, y: 30, scale: 0.98, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, scale: 0.98, filter: "blur(4px)" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const Home = () => (
  <>
    <ScrollProgress />
    <About />
    <Projects />
    <Nav />
    <Experience />
    <Services />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/resume"
          element={
            <motion.div {...pageTransition}>
              <Resume />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div {...pageTransition}>
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  useDynamicFavicon();

  return (
    <BrowserRouter>
      <ThemeToggle />
      <CursorGlow />
      <BackToTop />
      <CommandPalette />
      <EasterEgg />
      <NoiseOverlay />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;

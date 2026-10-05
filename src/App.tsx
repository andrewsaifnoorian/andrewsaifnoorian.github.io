import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CommandPalette from "./components/ui/CommandPalette";
import Konami from "./components/ui/Konami";
import { Toaster } from "./components/ui/toast";
import Home from "./pages/Home";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Scrolls to the hash target after navigation, or to the top on a new page. */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: tries === 0 ? "smooth" : "instant", block: "start" });
      } else if (tries++ < 20) {
        timer = setTimeout(attempt, 50);
      }
    };
    attempt();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <a href="#main" className="skip-link">
      Skip to content
    </a>
    <ScrollManager />
    <Header />
    <main id="main" tabIndex={-1}>
      <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
    <CommandPalette />
    <Toaster />
    <Konami />
  </BrowserRouter>
);

export default App;

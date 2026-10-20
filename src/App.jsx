import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PortraitJourney from "./components/PortraitJourney";
import Journey from "./components/Journey";
import Services from "./components/Services";
import Process from "./components/Process";
import GitHubActivity from "./components/GitHubActivity";
import { lenisRef } from "./lib/lenis";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Page renders underneath the loader so images download while it plays;
  // scrolling stays locked until the curtain opens.
  useEffect(() => {
    const root = document.documentElement;
    if (loading) {
      root.classList.add("is-loading");
      lenisRef.current?.stop();
      return;
    }
    root.classList.remove("is-loading");
    window.scrollTo(0, 0);
    lenisRef.current?.start();
    ScrollTrigger.refresh();
  }, [loading]);

  // Late-loading images change section heights; re-measure so pinned and
  // scroll-triggered sections don't fire at the wrong place (mostly on mobile).
  useEffect(() => {
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("load", refresh);
    document.addEventListener("load", refresh, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      document.removeEventListener("load", refresh, true);
    };
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && <Navbar />}
      <main>
        <PortraitJourney>
          <Hero />
          <Intro />
        </PortraitJourney>
        <Journey />
        <Services />
        <Projects />
        <Process />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisRef } from "../lib/lenis";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers resize the viewport when the address bar shows/hides;
// don't recalculate every pinned section when that happens.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    // Child effects run before this one, so honour a loader that is already showing
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const update = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return children;
}

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PortraitJourney.css";

gsap.registerPlugin(ScrollTrigger);

export default function PortraitJourney({ children }) {
  const storyRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const story = storyRef.current;
      const heroImage = story.querySelector(".hero-portrait");

      if (!heroImage) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(heroImage, { clearProps: "all" });
        return;
      }

      gsap.to(heroImage, {
        scale: 0.94,
        y: -24,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: story.querySelector(".hero-section"),
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: storyRef },
  );

  return (
    <div ref={storyRef} className="portrait-journey">
      {children}
    </div>
  );
}
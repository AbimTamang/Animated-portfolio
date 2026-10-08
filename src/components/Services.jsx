import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import animateHeading from "../lib/animateHeading";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Frontend Development",
    desc: "Responsive, accessible interfaces in React and Next.js: clean layouts that load fast and feel good on every screen.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind"],
    icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  },
  {
    title: "Full-stack & APIs",
    desc: "Node.js, Express and NestJS backends on PostgreSQL or MongoDB: auth, data models and the APIs that tie it all together.",
    tools: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB"],
    icon: <path d="M2 4h20v6H2zM2 14h20v6H2zM6 7h.01M6 17h.01" />,
  },
  {
    title: "UI/UX Design",
    desc: "Turning ideas into clear user flows and thoughtful interfaces before a single line of code is written.",
    tools: ["User flows", "Wireframes", "Responsive UI"],
    icon: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  },
  {
    title: "Motion & Interaction",
    desc: "Scroll storytelling, page transitions and micro-interactions with GSAP, like the ones you're scrolling through right now.",
    tools: ["GSAP", "ScrollTrigger", "Lenis", "Three.js"],
    icon: <path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 3.5-4 5-2" />,
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(sectionRef);

      animateHeading(sectionRef.current);

      gsap.from(q(".svc-card"), {
        y: 120,
        autoAlpha: 0,
        rotationX: -25,
        transformOrigin: "50% 100%",
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".svc-list")[0], start: "top 80%" },
      });

      // Giant background word slides against scroll direction
      gsap.fromTo(
        q(".svc-backdrop"),
        { xPercent: 10 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="services" className="svc">
      <div className="svc-backdrop" aria-hidden="true">
        SERVICES
      </div>
      <div className="svc-inner">
        <SectionHeading kicker="04 — What I do" title="Things I can" accent="build for you.">
          From the first sketch to a deployed product, these are the parts of the stack I enjoy working on most.
        </SectionHeading>

        <ul className="svc-list">
          {services.map((service, i) => (
            <li
              key={service.title}
              className={`svc-card${active === i ? " is-active" : ""}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <div className="svc-card-top">
                <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {service.icon}
                  </svg>
                </span>
              </div>

              <h3 className="svc-title">{service.title}</h3>

              <div className="svc-body">
                <p>{service.desc}</p>
                <ul className="svc-tools">
                  {service.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>

              <span className="svc-glow" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

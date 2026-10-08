import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discover",
    desc: "Understand the goal, the people who'll use it and what success looks like, before touching any code.",
    points: ["Goals & audience", "Scope & features", "Tech choices"],
  },
  {
    title: "Design",
    desc: "Sketch the flows and layouts, then shape the look and feel until it's clear, consistent and on-brand.",
    points: ["User flows", "Wireframes", "Visual direction"],
  },
  {
    title: "Build",
    desc: "Develop clean, reusable components and solid APIs, adding motion where it helps tell the story.",
    points: ["Components", "APIs & data", "Animation"],
  },
  {
    title: "Ship & Iterate",
    desc: "Deploy, test on real devices, gather feedback and keep polishing. Launch is the start, not the end.",
    points: ["Deployment", "Testing", "Feedback loops"],
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(sectionRef);
      const track = trackRef.current;

      // Pin the section and slide the track sideways as you scroll down
      const distance = () => track.scrollWidth - window.innerWidth;
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(q(".proc-progress span"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Intro panel words
      gsap.from(q(".proc-intro .proc-reveal"), {
        yPercent: 140,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Each step animates as it slides into view (driven by the horizontal tween)
      q(".proc-step").forEach((step) => {
        const st = { trigger: step, containerAnimation: slide, start: "left 90%", end: "left 50%", scrub: true };
        gsap.from(step.querySelector(".proc-num"), { xPercent: 60, autoAlpha: 0, ease: "none", scrollTrigger: st });
        gsap.from(step.querySelector(".proc-step-body"), {
          y: 80,
          autoAlpha: 0,
          rotate: 3,
          ease: "none",
          scrollTrigger: { ...st, start: "left 85%", end: "left 55%" },
        });
        gsap.from(step.querySelectorAll(".proc-points li"), {
          x: 40,
          autoAlpha: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { ...st, start: "left 80%", end: "left 50%" },
        });
        gsap.from(step.querySelector(".proc-dot"), {
          scale: 0,
          ease: "back.out(3)",
          scrollTrigger: { ...st, start: "left 80%", end: "left 65%" },
        });
      });

      // Outro: heading and button rise in as the last panel arrives
      gsap.from(q(".proc-outro > *"), {
        y: 60,
        autoAlpha: 0,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: q(".proc-outro")[0],
          containerAnimation: slide,
          start: "left 95%",
          end: "left 60%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="process" className="proc">
      <div ref={trackRef} className="proc-track">
        <div className="proc-panel proc-intro">
          <span className="proc-kicker">
            <span className="proc-mask">
              <span className="proc-reveal">05 — How I work</span>
            </span>
          </span>
          <h2>
            <span className="proc-mask">
              <span className="proc-reveal">From idea</span>
            </span>
            <span className="proc-mask">
              <span className="proc-reveal">
                to <em>launch.</em>
              </span>
            </span>
          </h2>
          <p className="proc-mask">
            <span className="proc-reveal">Keep scrolling →</span>
          </p>
        </div>

        <div className="proc-line" aria-hidden="true" />

        {steps.map((step, i) => (
          <article className="proc-panel proc-step" key={step.title}>
            <span className="proc-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="proc-dot" aria-hidden="true" />
            <div className="proc-step-body">
              <span className="proc-step-label">Step {i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <ul className="proc-points">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <div className="proc-panel proc-outro">
          <p className="proc-outro-kicker">Your project</p>
          <h3>
            Let's start at <em>step one.</em>
          </h3>
          <a href="#contact" className="proc-outro-cta">
            Start a project <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="proc-progress" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

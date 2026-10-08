import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import animateHeading from "../lib/animateHeading";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

// Newest first. `org: null` hides the organisation line.
const journey = [
  {
    type: "Work",
    when: "Present",
    current: true,
    role: "Full-stack Developer",
    org: "Next Minds Infosys",
    desc: "Building nextmindsinfosys.com end to end: a Next.js frontend, a NestJS API and a PostgreSQL database, shipped to production.",
    tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    type: "Internship",
    when: "2 months · Completed",
    role: "Frontend Developer Intern",
    org: null,
    desc: "Completed a two-month frontend internship, building responsive interfaces and getting hands-on with real-world team workflows.",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    type: "Education",
    when: "Completed",
    role: "BSc (Hons)",
    org: "Herald College Kathmandu",
    note: "Affiliated with the University of Wolverhampton, UK",
    desc: "Bachelor's degree with a full-stack final year project.",
    tags: [],
    project: {
      title: "Final Year Project",
      desc: "Full-stack web app with Google sign-in, OCR document scanning, PDF/CSV reports, charts and email notifications.",
      stack: ["React", "Express", "PostgreSQL", "Tesseract.js"],
      links: [
        { label: "Frontend", href: "https://github.com/AbimTamang/Fyp-frontend" },
        { label: "Backend", href: "https://github.com/AbimTamang/fyp-backend" },
      ],
    },
  },
];

const typeIcons = {
  Work: <path d="M3 7h18v13H3zM8 7V4h8v3M3 12h18" />,
  Internship: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  Education: <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5" />,
};

export default function Journey() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(sectionRef);

      animateHeading(sectionRef.current);

      // The line draws itself as you scroll, with a glowing head riding the tip
      const lineTrigger = {
        trigger: q(".jr-track")[0],
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.6,
      };
      gsap.fromTo(q(".jr-line-fill"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: lineTrigger });
      gsap.fromTo(q(".jr-head"), { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: lineTrigger });

      q(".jr-item").forEach((item, i) => {
        const fromLeft = i % 2 === 1;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 75%" },
        });
        tl.from(item.querySelector(".jr-node"), { scale: 0, rotate: -90, duration: 0.6, ease: "back.out(2.5)" })
          .from(
            item.querySelector(".jr-card"),
            {
              x: fromLeft ? -80 : 80,
              autoAlpha: 0,
              rotationY: fromLeft ? 12 : -12,
              filter: "blur(8px)",
              duration: 1,
              ease: "expo.out",
              clearProps: "filter",
            },
            "<0.1",
          )
          .from(item.querySelector(".jr-when"), { autoAlpha: 0, y: 20, duration: 0.6, ease: "power3.out" }, "<0.15")
          .from(item.querySelectorAll(".jr-tags li"), { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.05 }, "<0.3");

        const project = item.querySelector(".jr-project");
        if (project) {
          tl.from(project, { autoAlpha: 0, y: 30, scale: 0.96, duration: 0.8, ease: "power3.out" }, "<0.2");
        }
      });

      // Pointer-only: cards tilt toward the cursor
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const cleanups = [];
      q(".jr-card").forEach((card) => {
        gsap.set(card, { transformPerspective: 1000 });
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
          ry((px - 0.5) * 8);
          rx(-(py - 0.5) * 8);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="journey" className="jr">
      <div className="jr-inner">
        <SectionHeading kicker="03 — Journey" title="Where I've" accent="been.">
          Experience and education so far, newest first.
        </SectionHeading>

        <div className="jr-track">
          <div className="jr-line" aria-hidden="true">
            <span className="jr-line-fill" />
            <span className="jr-head" />
          </div>

          <ol className="jr-list">
          {journey.map((step) => (
            <li className={`jr-item${step.current ? " is-current" : ""}`} key={step.role}>
              <span className="jr-node" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {typeIcons[step.type]}
                </svg>
              </span>

              <div className="jr-when">
                {step.current && <span className="jr-live" />}
                <span>{step.when}</span>
                <small>{step.type}</small>
              </div>

              <article className="jr-card">
                <span className="jr-card-spot" aria-hidden="true" />
                <h3>{step.role}</h3>
                {step.org && <p className="jr-org">{step.org}</p>}
                {step.note && <p className="jr-note">{step.note}</p>}
                <p className="jr-desc">{step.desc}</p>
                {step.tags.length > 0 && (
                  <ul className="jr-tags">
                    {step.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}

                {step.project && (
                  <div className="jr-project">
                    <span className="jr-project-label">{step.project.title}</span>
                    <p>{step.project.desc}</p>
                    <div className="jr-project-foot">
                      <ul className="jr-tags jr-tags--small">
                        {step.project.stack.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <div className="jr-project-links">
                        {step.project.links.map((link) => (
                          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

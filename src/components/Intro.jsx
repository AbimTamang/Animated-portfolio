import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Intro.css";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "I'm Abim Tamang, a full-stack developer with 6 months of experience working on real projects for real companies.",
  "I enjoy turning ideas into thoughtful interfaces. I work with React, Node.js, Express, and PostgreSQL, and use AI tools like Claude and ChatGPT to build faster and smarter.",
];
const accentWords = new Set(["full-stack", "real", "thoughtful", "AI"]);

const stats = [
  { value: 6, suffix: "+", label: "Months in real projects & companies" },
  { value: 5, suffix: "+", label: "Projects built" },
  { value: null, suffix: "∞", label: "Ideas to build" },
];

const skills = [
  ["UI/UX Design", "Design"],
  ["HTML, CSS & Tailwind", "Interface"],
  ["GSAP Animation", "Motion"],
  ["JavaScript & React", "Frontend"],
  ["Node.js, Express & APIs", "Backend"],
  ["PostgreSQL & MongoDB", "Database"],
  ["Deployment & DevOps basics", "DevOps"],
  ["Claude & ChatGPT", "AI workflow"],
];

// Simple line icons (24x24, stroke-based) keyed by skill area
const areaIcons = {
  Design: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  Interface: <path d="M3 3h18v18H3zM3 9h18M9 21V9" />,
  Motion: <path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 3.5-4 5-2" />,
  Frontend: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  Backend: <path d="M2 4h20v6H2zM2 14h20v6H2zM6 7h.01M6 17h.01" />,
  Database: <path d="M12 2c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3zM21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />,
  DevOps: <path d="M18.18 8.18a5.5 5.5 0 1 1 0 7.64L12 12 5.82 8.18a5.5 5.5 0 1 0 0 7.64L12 12" />,
  "AI workflow": <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />,
};

const focusItems =["React hooks", "API integration", "Backend fundamentals"];

const tickerTop = ["React", "Node.js", "Express", "PostgreSQL", "MongoDB", "DevOps"];
const tickerBottom = ["Claude", "ChatGPT", "Tailwind", "GSAP", "UI/UX"];

// Types and deletes each focus item in turn
function TypedFocus() {
  const [reduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [text, setText] = useState(reduceMotion ? focusItems[0] : "");

  useEffect(() => {
    if (reduceMotion) return;
    let item = 0;
    let length = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = focusItems[item];
      length += deleting ? -1 : 1;
      setText(word.slice(0, length));
      let delay = deleting ? 40 : 85;
      if (!deleting && length === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && length === 0) {
        deleting = false;
        item = (item + 1) % focusItems.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <span className="about-typed">
      {text}
      <span className="about-caret" aria-hidden="true" />
    </span>
  );
}

function TickerRow({ items, className }) {
  return (
    <div className={`about-ticker-row ${className}`}>
      {[0, 1].map((copy) => (
        <div className="about-ticker-group" key={copy}>
          {[...items, ...items].map((item, i) => (
            <span key={i}>
              {item}
              <i />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Intro() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const words = q(".intro-word");
      const counters = q(".about-stat-value[data-value]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { opacity: 1 });
        counters.forEach((el) => (el.textContent = el.dataset.value));
        return;
      }

      // Floating blobs drift at different speeds with scroll
      q(".about-blob").forEach((blob, i) => {
        gsap.to(blob, {
          yPercent: i % 2 ? -60 : 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Heading: letters flip up from below, then the dot pops
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        })
        .from(q(".about-status"), { y: 20, autoAlpha: 0, duration: 0.6 })
        .from(
          q(".about-char"),
          { yPercent: 140, rotationX: -90, duration: 1.1, stagger: 0.05 },
          "<0.1",
        )
        .from(q(".about-heading-dot"), { scale: 0, duration: 0.6, ease: "back.out(3)" }, "-=0.6")
        .from(q(".about-subhead"), { y: 20, autoAlpha: 0, duration: 0.8 }, "-=0.5");

      // Bento cards rise, unblur and unclip in batches as they enter
      gsap.set(q(".bento-card"), { autoAlpha: 0, y: 70, scale: 0.94, filter: "blur(10px)" });
      ScrollTrigger.batch(q(".bento-card"), {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.1,
            ease: "expo.out",
            clearProps: "filter",
          }),
      });

      // Portrait: curtain reveal then slow parallax zoom
      gsap.from(q(".about-photo-img"), {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.3,
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: q(".bento-photo")[0], start: "top 80%" },
      });
      gsap.to(q(".about-photo-img"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: q(".bento-photo")[0],
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Scroll-scrubbed word highlight
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.035,
        scrollTrigger: {
          trigger: q(".about-copy")[0],
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.7,
        },
      });

      // Stats count up
      counters.forEach((el) => {
        const counter = { n: 0 };
        gsap.to(counter, {
          n: Number(el.dataset.value),
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(counter.n)),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
      gsap.from(q(".about-stat-bar span"), {
        scaleX: 0,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: q(".about-stat-bar")[0], start: "top 92%" },
      });

      // Skill chips pop in
      gsap.from(q(".about-chip"), {
        y: 30,
        scale: 0.6,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "back.out(2)",
        scrollTrigger: { trigger: q(".bento-stack")[0], start: "top 80%" },
      });

      // Ticker rows: infinite loops that speed up and skew with scroll velocity
      const loops = [
        gsap.to(q(".about-ticker-row--left"), { xPercent: -50, duration: 30, ease: "none", repeat: -1 }),
        gsap.fromTo(
          q(".about-ticker-row--right"),
          { xPercent: -50 },
          { xPercent: 0, duration: 30, ease: "none", repeat: -1 },
        ),
      ];
      const skewTo = gsap.quickTo(q(".about-ticker-row"), "skewX", { duration: 0.5, ease: "power3" });
      ScrollTrigger.create({
        trigger: q(".about-ticker")[0],
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = 1 + Math.min(Math.abs(v) / 250, 6);
          loops.forEach((loop) =>
            gsap.fromTo(loop, { timeScale: boost }, { timeScale: 1, duration: 1, ease: "power2.out", overwrite: true }),
          );
          skewTo(gsap.utils.clamp(-12, 12, v / -150));
          gsap.delayedCall(0.12, () => skewTo(0));
        },
      });

      // Pointer-only polish: spotlight borders, card tilt, magnetic button
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const cleanups = [];
      const listen = (el, type, fn) => {
        el.addEventListener(type, fn);
        cleanups.push(() => el.removeEventListener(type, fn));
      };

      // Spotlight follows the cursor across the whole grid
      const grid = q(".about-bento")[0];
      listen(grid, "pointermove", (e) => {
        q(".bento-card").forEach((card) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
          card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
        });
      });

      q(".bento-tilt").forEach((card) => {
        gsap.set(card, { transformPerspective: 1000 });
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        listen(card, "pointermove", (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        });
        listen(card, "pointerleave", () => {
          rx(0);
          ry(0);
        });
      });

      // Skill tiles: stronger 3D tilt with a glare that follows the cursor
      q(".about-chip").forEach((chip) => {
        gsap.set(chip, { transformPerspective: 600 });
        const rx = gsap.quickTo(chip, "rotationX", { duration: 0.4, ease: "power3" });
        const ry = gsap.quickTo(chip, "rotationY", { duration: 0.4, ease: "power3" });
        const shine = chip.querySelector(".about-chip-shine");
        const icon = chip.querySelector(".about-chip-icon");
        listen(chip, "pointerenter", () => {
          gsap.to(chip, { scale: 1.06, z: 30, duration: 0.4, ease: "power3.out" });
          gsap.fromTo(shine, { xPercent: -120 }, { xPercent: 220, duration: 0.8, ease: "power2.out" });
          gsap.to(icon, { rotate: -10, scale: 1.12, duration: 0.5, ease: "back.out(3)" });
        });
        listen(chip, "pointerleave", () => gsap.to(icon, { rotate: 0, scale: 1, duration: 0.5, ease: "power3.out" }));
        listen(chip, "pointermove", (e) => {
          const r = chip.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          chip.style.setProperty("--gx", `${px * 100}%`);
          chip.style.setProperty("--gy", `${py * 100}%`);
          ry((px - 0.5) * 24);
          rx(-(py - 0.5) * 24);
        });
        listen(chip, "pointerleave", () => {
          rx(0);
          ry(0);
          gsap.to(chip, { scale: 1, z: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
      });

      const button = q(".about-cta-primary")[0];
      const icon = q(".about-cta-icon")[0];
      const bx = gsap.quickTo(button, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const by = gsap.quickTo(button, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      listen(button, "pointermove", (e) => {
        const r = button.getBoundingClientRect();
        bx((e.clientX - r.left - r.width / 2) * 0.3);
        by((e.clientY - r.top - r.height / 2) * 0.4);
      });
      listen(button, "pointerenter", () => gsap.to(icon, { rotate: -45, duration: 0.4, ease: "back.out(2)" }));
      listen(button, "pointerleave", () => {
        bx(0);
        by(0);
        gsap.to(icon, { rotate: 0, duration: 0.4, ease: "power3.out" });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="intro-section" aria-label="About me">
      <div className="about-blobs" aria-hidden="true">
        <span className="about-blob about-blob--1" />
        <span className="about-blob about-blob--2" />
        <span className="about-blob about-blob--3" />
      </div>

      <div className="intro-inner">
        <header className="about-header">
          <span className="about-status">
            <span className="about-live-dot" />
            Available for work
          </span>

          <h2 className="about-heading" aria-label="About me.">
            {"About".split("").map((char, i) => (
              <span className="about-char-mask" key={`a${i}`} aria-hidden="true">
                <span className="about-char">{char}</span>
              </span>
            ))}
            <span className="about-heading-gap" aria-hidden="true" />
            {"me".split("").map((char, i) => (
              <span className="about-char-mask" key={`m${i}`} aria-hidden="true">
                <span className="about-char about-char--accent">{char}</span>
              </span>
            ))}
            <span className="about-heading-dot" aria-hidden="true" />
          </h2>

          <p className="about-subhead">Developer · Designer · Lifelong learner</p>
        </header>

        <div className="about-bento">
          <article className="bento-card bento-bio">
            <span className="bento-kicker">01 — The story</span>
            <div className="about-copy">
              {paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {paragraph.split(" ").map((word, wordIndex, words) => {
                    const bare = word.replace(/[.,]/g, "");
                    return (
                      <span
                        className={`intro-word${accentWords.has(bare) ? " intro-word--accent" : ""}`}
                        key={`${paragraphIndex}-${wordIndex}`}
                      >
                        {word}
                        {wordIndex < words.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>
          </article>

          <figure className="bento-card bento-photo bento-tilt">
            <div className="about-photo-glow" aria-hidden="true" />
            <img src="/myself/Abim.png" alt="Abim Tamang" className="about-photo-img" />
            <figcaption className="about-photo-tag">
              <strong>Abim Tamang</strong>
              <span>Full-stack developer</span>
            </figcaption>
          </figure>

          {stats.map((stat, i) => (
            <div className={`bento-card bento-stat bento-tilt bento-stat--${i + 1}`} key={stat.label}>
              <div className="about-stat-number">
                {stat.value !== null ? (
                  <>
                    <span className="about-stat-value" data-value={stat.value}>
                      0
                    </span>
                    <span className="about-stat-suffix">{stat.suffix}</span>
                  </>
                ) : (
                  <span className="about-stat-value about-stat-infinity">{stat.suffix}</span>
                )}
              </div>
              <p className="about-stat-label">{stat.label}</p>
              <div className="about-stat-bar" aria-hidden="true">
                <span />
              </div>
            </div>
          ))}

          <div className="bento-card bento-focus">
            <span className="bento-kicker">
              <span className="about-live-dot" />
              Current focus
            </span>
            <p className="about-focus-text">
              Deep diving into
              <br />
              <TypedFocus />
            </p>
          </div>

          <div className="bento-card bento-stack">
            <div className="about-stack-head">
              <span className="bento-kicker">02 — Tools I work with</span>
              <span className="about-stack-count">
                <b>{String(skills.length).padStart(2, "0")}</b> skills
              </span>
            </div>
            <ul className="about-chips">
              {skills.map(([skill, area], i) => (
                <li className="about-chip" key={skill}>
                  <span className="about-chip-bgnum" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="about-chip-top">
                    <span className="about-chip-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {areaIcons[area]}
                      </svg>
                    </span>
                    <span className="about-chip-area">{area}</span>
                  </span>
                  <span className="about-chip-skill">{skill}</span>
                  <span className="about-chip-glare" aria-hidden="true" />
                  <span className="about-chip-shine" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          <div className="bento-card bento-cta">
            <p className="about-cta-title">Have an idea? Let's build it together.</p>
            <div className="about-cta">
              <a href="#contact" className="about-cta-primary">
                <span className="about-cta-label">Let's work together</span>
                <span className="about-cta-icon" aria-hidden="true">
                  →
                </span>
              </a>
              <a href="#projects" className="about-cta-secondary">
                See my work
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="about-ticker" aria-hidden="true">
        <TickerRow items={tickerTop} className="about-ticker-row--left" />
        <TickerRow items={tickerBottom} className="about-ticker-row--right about-ticker-row--outline" />
      </div>
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

// Full scenes — each gets its own camera move and caption
const projects = [
  {
    title: "Next Minds Infosys",
    desc: "Website for Next Minds Infosys, an IT training institute in Nepal: course catalog, enrollments and content management. A Next.js + NestJS monorepo on PostgreSQL.",
    image: "/projects/nextminds.png",
    tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Docker"],
    github: null,
    live: "https://nextmindsinfosys.com",
    featured: true,
  },
  {
    title: "Modern Portfolio",
    desc: "My first professional portfolio project built with HTML, CSS, and Vite.",
    image: "/project2.png",
    tags: ["React", "tailwindCSS", "JavaScript", "Gsap"],
    github: "https://github.com/AbimTamang",
    live: "#",
  },
  {
    title: "Expense Tracker",
    desc: "A full-stack application to track daily expenses and view spending patterns.",
    image: "/project3.png",
    tags: ["React", "Express", "Node.js"],
    github: "https://github.com/AbimTamang/ExpenseTracker",
    live: "#",
  },
  {
    title: "Notification Todo App",
    desc: "A smart MERN-stack task manager that sends real-time alerts when tasks are due.",
    image: "/project1.png",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/AbimTamang/Todo",
    live: "#",
  },
];

// Clones — shown as a fast-cut montage
const clones = [
  {
    title: "Arola",
    desc: "Immersive drinks-brand site with 3D and scroll storytelling.",
    image: "/projects/arola.png",
    tags: ["Next.js", "Three.js", "GSAP"],
    github: "https://github.com/AbimTamang/Arola",
    live: "https://arola-rho.vercel.app",
  },
  {
    title: "Supaste",
    desc: "Landing page for a macOS clipboard app.",
    image: "/projects/supaste.png",
    tags: ["Next.js", "Framer Motion", "GSAP"],
    github: "https://github.com/AbimTamang/Supaste",
    live: "https://supaste-lyart.vercel.app",
  },
  {
    title: "Valora",
    desc: "Multi-page restaurant site: menu, story, chefs and contact.",
    image: null,
    tags: ["Next.js", "TypeScript", "GSAP", "Lenis"],
    github: "https://github.com/AbimTamang/Valora",
    live: "#",
  },
  {
    title: "Hayler",
    desc: "Creative studio site with work, case studies and an archive.",
    image: null,
    tags: ["Next.js", "GSAP"],
    github: "https://github.com/AbimTamang/Hayler",
    live: "#",
  },
];

const totalScenes = projects.length + clones.length;
const pad = (n) => String(n).padStart(2, "0");

// Scroll progress -> fake film timecode (HH:MM:SS:FF at 24fps)
const toTimecode = (progress) => {
  const frames = Math.floor(progress * 24 * 150);
  const ff = frames % 24;
  const totalSeconds = Math.floor(frames / 24);
  return `00:${pad(Math.floor(totalSeconds / 60))}:${pad(totalSeconds % 60)}:${pad(ff)}`;
};

function Links({ item }) {
  return (
    <div className="cine-links">
      {item.live !== "#" && (
        <a href={item.live} target="_blank" rel="noreferrer" className="cine-btn cine-btn--solid">
          Live site ↗
        </a>
      )}
      {item.github && (
        <a href={item.github} target="_blank" rel="noreferrer" className="cine-btn">
          View code ↗
        </a>
      )}
    </div>
  );
}

// Blurred ambient backdrop + the sharp screenshot inside a browser window
function Shot({ item }) {
  const address = item.live !== "#" ? new URL(item.live).host : "localhost:3000";
  return (
    <>
      {item.image ? (
        <img className="cine-bg" src={item.image} alt="" aria-hidden="true" />
      ) : (
        <div className="cine-bg cine-bg--blank" aria-hidden="true" />
      )}
      <div className="cine-shade" />
      <div className="cine-screen-wrap">
        <div className="cine-screen">
          <div className="cine-screen-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{address}</span>
          </div>
          {item.image ? (
            <img src={item.image} alt={`${item.title} screenshot`} />
          ) : (
            <div className="cine-screen-placeholder" aria-hidden="true">
              {item.title}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const timecodeRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(sectionRef);
      const shots = q(".cine-shot");
      const screens = q(".cine-shot .cine-screen");
      const bgs = q(".cine-shot .cine-bg");
      const shades = q(".cine-shot .cine-shade");
      const captions = q(".cine-caption");
      const cuts = q(".cine-cut");

      // Small framed "screen" in the middle of the viewport to start
      const frameStart = () =>
        window.innerWidth < 700 ? "inset(28% 6% 28% 6% round 1.25rem)" : "inset(24% 27% 24% 27% round 1.5rem)";

      gsap.set(shots.slice(1), { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(captions, { autoAlpha: 0 });
      gsap.set(cuts, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (projects.length * 1.6 + clones.length * 0.8 + 2)}`,
          pin: q(".cine-stage")[0],
          scrub: 1,
          invalidateOnRefresh: true,
          // Navbar steps aside while the film plays
          onToggle: (self) => document.documentElement.classList.toggle("cine-playing", self.isActive),
          onUpdate: (self) => {
            if (timecodeRef.current) timecodeRef.current.textContent = toTimecode(self.progress);
          },
        },
      });

      const setScene = (i, at) =>
        tl
          .to(q(".cine-scene-num"), { yPercent: -100 * i, duration: 0.4, ease: "power3.inOut" }, at)
          .to(q(".cine-progress span"), { scaleX: (i + 1) / totalScenes, duration: 0.5 }, at);

      const captionIn = (el, at) =>
        tl
          .fromTo(el, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, at)
          .from(
            el.querySelectorAll(".cine-word"),
            { yPercent: 140, duration: 0.6, stagger: 0.08, ease: "power3.out" },
            "<0.05",
          );

      // Screen swings in from the right like a camera dolly
      const screenIn = (screen, at) =>
        tl.fromTo(
          screen,
          { xPercent: 45, rotationY: -35, scale: 1.25, autoAlpha: 0 },
          { xPercent: 0, rotationY: -8, scale: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" },
          at,
        );

      // Slow drift while a scene holds
      const hold = (screen, bg) =>
        tl
          .addLabel("hold")
          .to(screen, { rotationY: -2, yPercent: -3, duration: 1, ease: "none" }, "hold")
          .to(bg, { scale: 1.25, duration: 1, ease: "none" }, "hold");

      // ACT 1 — camera push-in: frame opens to full screen, title flies past the lens
      tl.fromTo(
        q(".cine-frame"),
        { clipPath: frameStart },
        { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1.4 },
      )
        .fromTo(bgs[0], { scale: 1.5 }, { scale: 1.15, duration: 1.4 }, 0)
        .fromTo(
          screens[0],
          { scale: 1.35, rotationY: 0, yPercent: 10 },
          { scale: 1, rotationY: -8, yPercent: 0, duration: 1.4 },
          0,
        )
        .to(q(".cine-title"), { scale: 4, autoAlpha: 0, duration: 1.1, ease: "power2.in" }, 0)
        .to(q(".cine-intro-meta"), { autoAlpha: 0, y: -30, duration: 0.5 }, 0)
        .fromTo(q(".cine-bar"), { height: "0vh" }, { height: "9vh", duration: 0.8 }, 0.5)
        .fromTo(q(".cine-hud"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.9);
      captionIn(captions[0], 1.1);
      hold(screens[0], bgs[0]);

      // ACT 2 — each project is a new scene: iris wipe in, previous shot swings away into darkness
      projects.slice(1).forEach((_, idx) => {
        const i = idx + 1;
        const label = `scene${i}`;
        tl.addLabel(label)
          .to(captions[i - 1], { autoAlpha: 0, y: -50, duration: 0.45, ease: "power2.in" }, label)
          .to(
            screens[i - 1],
            { xPercent: -50, rotationY: 30, scale: 0.75, autoAlpha: 0, duration: 1.1 },
            label,
          )
          .to(shades[i - 1], { opacity: 0.85, duration: 1.2 }, label)
          .to(shots[i], { clipPath: "circle(75% at 50% 50%)", duration: 1.2, ease: "power3.inOut" }, label)
          .fromTo(bgs[i], { scale: 1.6 }, { scale: 1.15, duration: 1.3, ease: "power3.out" }, label);
        screenIn(screens[i], `${label}+=0.2`);
        setScene(i, `${label}+=0.3`);
        captionIn(captions[i], `${label}+=0.7`);
        hold(screens[i], bgs[i]);
      });

      // ACT 3 — montage: hard, fast cuts through the clones like a trailer
      const lastProject = projects.length - 1;
      tl.addLabel("montage")
        .to(captions[lastProject], { autoAlpha: 0, y: -50, duration: 0.35, ease: "power2.in" }, "montage")
        .to(screens[lastProject], { scale: 0.8, autoAlpha: 0, duration: 0.6 }, "montage")
        .to(shades[lastProject], { opacity: 0.85, duration: 0.6 }, "montage")
        .fromTo(
          q(".cine-montage-title"),
          { autoAlpha: 0, scale: 1.4, letterSpacing: "0.6em" },
          { autoAlpha: 1, scale: 1, letterSpacing: "0.2em", duration: 0.5, ease: "power3.out" },
          "montage+=0.2",
        )
        .to(q(".cine-montage-title"), { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: "power2.in" }, "+=0.3");

      cuts.forEach((cut, c) => {
        const at = `cut${c}`;
        const screen = cut.querySelector(".cine-screen");
        tl.addLabel(at)
          .set(cut, { autoAlpha: 1, zIndex: 10 + c }, at)
          .fromTo(
            cut,
            { clipPath: c % 2 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power4.out" },
            at,
          )
          .fromTo(cut.querySelector(".cine-bg"), { scale: 1.5 }, { scale: 1.15, duration: 0.9, ease: "power3.out" }, at)
          .fromTo(
            screen,
            { scale: 1.3, rotationY: c % 2 ? 20 : -30, autoAlpha: 0 },
            { scale: 1, rotationY: -8, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            at,
          )
          .fromTo(
            cut.querySelector(".cine-flash"),
            { opacity: 0.55 },
            { opacity: 0, duration: 0.3, ease: "power2.out", immediateRender: false },
            at,
          );
        captionIn(cut.querySelector(".cine-cut-body"), `${at}+=0.1`);
        setScene(projects.length + c, at);
        // hold on the cut, then hide the one underneath so it can't be clicked
        tl.to(screen, { rotationY: -3, duration: 0.5, ease: "none" });
        if (c > 0) tl.set(cuts[c - 1], { autoAlpha: 0 });
      });

      // ACT 4 — cut to black: letterbox bars close over the last shot
      const lastCut = cuts[cuts.length - 1];
      tl.addLabel("end")
        .to(lastCut.querySelector(".cine-cut-body"), { autoAlpha: 0, y: -40, duration: 0.4 }, "end")
        .to(lastCut.querySelector(".cine-screen"), { scale: 1.2, autoAlpha: 0, duration: 1 }, "end")
        .to(q(".cine-hud"), { autoAlpha: 0, duration: 0.4 }, "end")
        .to(q(".cine-bar"), { height: "50.5vh", duration: 1, ease: "power3.in" }, "end+=0.1")
        .fromTo(q(".cine-fin"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4 }, "end+=0.9")
        .to({}, { duration: 0.3 });

      return () => document.documentElement.classList.remove("cine-playing");
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="projects" className="cine">
      <div className="cine-stage">
        <div className="cine-intro-meta" aria-hidden="true">
          <span>Portfolio</span>
          <span>Scroll to roll film ↓</span>
        </div>

        <h2 className="cine-title">
          Selected <em>Works</em>
        </h2>

        <div className="cine-frame">
          {projects.map((project, i) => (
            <div className="cine-shot" key={project.title} style={{ zIndex: i + 1 }}>
              <Shot item={project} />
            </div>
          ))}
        </div>

        <div className="cine-captions">
          {projects.map((project, i) => (
            <article className="cine-caption" key={project.title}>
              {project.featured && (
                <span className="cine-badge">
                  <span className="cine-badge-dot" /> Now filming · In production
                </span>
              )}
              <span className="cine-kicker">
                Scene {pad(i + 1)} — {project.tags.slice(0, 2).join(" · ")}
              </span>
              <h3>
                {project.title.split(" ").map((word, w) => (
                  <span className="cine-word-mask" key={w}>
                    <span className="cine-word">{word}</span>
                  </span>
                ))}
              </h3>
              <p>{project.desc}</p>
              <ul className="cine-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Links item={project} />
            </article>
          ))}
        </div>

        <div className="cine-montage">
          <h3 className="cine-montage-title">The Clones</h3>
          {clones.map((clone, c) => (
            <article className="cine-cut" key={clone.title}>
              <Shot item={clone} />
              <div className="cine-cut-body">
                <span className="cine-kicker">
                  Montage · Cut {pad(c + 1)} / {pad(clones.length)}
                </span>
                <h3>
                  <span className="cine-word-mask">
                    <span className="cine-word">{clone.title}</span>
                  </span>
                </h3>
                <p>{clone.desc}</p>
                <ul className="cine-tags">
                  {clone.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Links item={clone} />
              </div>
              <div className="cine-flash" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="cine-vignette" aria-hidden="true" />
        <div className="cine-grain" aria-hidden="true" />

        <div className="cine-bar cine-bar--top" aria-hidden="true" />
        <div className="cine-bar cine-bar--bottom" aria-hidden="true" />

        <div className="cine-hud" aria-hidden="true">
          <div className="cine-hud-tl">
            <span className="cine-rec" /> REC
          </div>
          <div className="cine-hud-tr" ref={timecodeRef}>
            00:00:00:00
          </div>
          <div className="cine-hud-bl">
            <span>Scene</span>
            <span className="cine-scene-mask">
              {Array.from({ length: totalScenes }, (_, i) => (
                <span className="cine-scene-num" key={i}>
                  {pad(i + 1)}
                </span>
              ))}
            </span>
            <span className="cine-hud-total">/ {pad(totalScenes)}</span>
          </div>
          <div className="cine-progress">
            <span style={{ transform: `scaleX(${1 / totalScenes})` }} />
          </div>
        </div>

        <div className="cine-fin" aria-hidden="true">
          More scenes in production<span>.</span>
        </div>
      </div>
    </section>
  );
}

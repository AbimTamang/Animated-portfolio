import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "abimtamang19@gmail.com";

const socials = [
  {
    name: "GitHub",
    handle: "@AbimTamang",
    href: "https://github.com/AbimTamang",
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  {
    name: "LinkedIn",
    handle: "Abim Tamang",
    href: "https://www.linkedin.com/in/abim-tamang-92b157310/",
    icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />,
  },
  {
    name: "Instagram",
    handle: "@abim.techjsx",
    href: "https://www.instagram.com/abim.techjsx/",
    icon: (
      <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
    ),
  },
];

const projectTypes = ["Website", "Web app", "Landing page", "Something else"];

const kathmanduTime = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

function LocalClock() {
  const [time, setTime] = useState(kathmanduTime);
  useEffect(() => {
    const id = setInterval(() => setTime(kathmanduTime()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="ct-clock">{time}</span>;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [type, setType] = useState(projectTypes[0]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  // No backend: compose the message in the visitor's email app
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `${type} enquiry from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(sectionRef);

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        })
        .from(q(".ct-kicker, .ct-status"), { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.1 })
        .from(q(".ct-char"), { yPercent: 140, rotate: 6, duration: 1, stagger: 0.025 }, "<0.1")
        .from(q(".ct-email-row"), { autoAlpha: 0, y: 40, duration: 0.9 }, "-=0.6");

      gsap.from(q(".ct-panel"), {
        y: 80,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".ct-grid")[0], start: "top 80%" },
      });

      gsap.from(q(".ct-social"), {
        x: 60,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".ct-socials")[0], start: "top 85%" },
      });

      // Big outlined marquee drifts with scroll on top of its own loop
      gsap.fromTo(
        q(".ct-marquee-drift"),
        { xPercent: 5 },
        {
          xPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      if (!window.matchMedia("(pointer: fine)").matches) return;

      // Email letters do a wave on hover; whole link is magnetic
      const email = q(".ct-email")[0];
      const chars = q(".ct-email-char");
      const ex = gsap.quickTo(email, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const ey = gsap.quickTo(email, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const enter = () =>
        gsap.fromTo(
          chars,
          { yPercent: 0 },
          { yPercent: -18, duration: 0.25, stagger: 0.015, yoyo: true, repeat: 1, ease: "power2.out" },
        );
      const move = (e) => {
        const r = email.getBoundingClientRect();
        ex((e.clientX - r.left - r.width / 2) * 0.08);
        ey((e.clientY - r.top - r.height / 2) * 0.25);
      };
      const leave = () => {
        ex(0);
        ey(0);
      };
      email.addEventListener("pointerenter", enter);
      email.addEventListener("pointermove", move);
      email.addEventListener("pointerleave", leave);
      return () => {
        email.removeEventListener("pointerenter", enter);
        email.removeEventListener("pointermove", move);
        email.removeEventListener("pointerleave", leave);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="contact" className="ct">
      <div className="ct-marquee" aria-hidden="true">
        {/* drift (GSAP, scroll) wraps track (CSS loop) so the two transforms don't fight */}
        <div className="ct-marquee-drift">
          <div className="ct-marquee-track">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i}>
                Say hello <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="ct-inner">
        <div className="ct-top">
          <span className="ct-kicker">07 — Contact</span>
          <span className="ct-status">
            <span className="ct-dot" />
            Available for work · Kathmandu, Nepal · <LocalClock /> local time
          </span>
        </div>

        <h2 className="ct-heading" aria-label="Got a project idea? Let's build it.">
          {["Got a project", "idea? Let's build it."].map((line, l) => (
            <span className="ct-line" key={l} aria-hidden="true">
              {line.split(" ").map((word, w) => (
                <span className="ct-word" key={w}>
                  {word.split("").map((char, c) => (
                    <span className="ct-char-mask" key={c}>
                      <span className={`ct-char${l === 1 && w >= 1 ? " ct-char--accent" : ""}`}>{char}</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="ct-email-row">
          <a className="ct-email" href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`}>
            {EMAIL.split("").map((char, i) => (
              <span className="ct-email-char" key={i} aria-hidden="true">
                {char}
              </span>
            ))}
          </a>
          <button type="button" className={`ct-copy${copied ? " is-copied" : ""}`} onClick={copyEmail}>
            <span className="ct-copy-label">{copied ? "Copied!" : "Copy email"}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {copied ? (
                <path d="M20 6L9 17l-5-5" />
              ) : (
                <path d="M9 9h11v11H9zM5 15H4V4h11v1" />
              )}
            </svg>
          </button>
        </div>

        <div className="ct-grid">
          <form className="ct-panel ct-form" onSubmit={handleSubmit}>
            <h3>Send a message</h3>

            <fieldset className="ct-types">
              <legend>What are you looking for?</legend>
              {projectTypes.map((t) => (
                <label key={t} className={`ct-type${type === t ? " is-active" : ""}`}>
                  <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
                  {t}
                </label>
              ))}
            </fieldset>

            <div className="ct-fields">
              <label className="ct-field">
                <input required placeholder=" " value={form.name} onChange={update("name")} autoComplete="name" />
                <span>Your name</span>
              </label>
              <label className="ct-field">
                <input
                  required
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={update("email")}
                  autoComplete="email"
                />
                <span>Your email</span>
              </label>
            </div>
            <label className="ct-field">
              <textarea required rows={4} placeholder=" " value={form.message} onChange={update("message")} />
              <span>Tell me about your project</span>
            </label>

            <div className="ct-submit-row">
              <button type="submit" className="ct-submit">
                <span>Send message</span>
                <span className="ct-submit-icon" aria-hidden="true">
                  →
                </span>
              </button>
              <small>Opens your email app with everything filled in.</small>
            </div>
          </form>

          <div className="ct-panel ct-side">
            <h3>Or find me here</h3>
            <ul className="ct-socials">
              {socials.map((s) => (
                <li key={s.name}>
                  <a className="ct-social" href={s.href} target="_blank" rel="noreferrer">
                    <span className="ct-social-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {s.icon}
                      </svg>
                    </span>
                    <span className="ct-social-text">
                      <strong>{s.name}</strong>
                      <small>{s.handle}</small>
                    </span>
                    <span className="ct-social-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="ct-location">
              <span className="ct-location-label">Based in</span>
              <strong>Kathmandu, Nepal</strong>
              <span className="ct-location-meta">
                <LocalClock /> · NPT (UTC+5:45)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

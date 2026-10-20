import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
      clearProps: "transform",
    });
  });

  // Close the mobile menu on Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 bg-black/80 backdrop-blur-sm"
    >
      <a href="#home" className="text-white text-lg sm:text-xl font-bold whitespace-nowrap" onClick={close}>
        Abim <span className="text-purple-500">Tamang.</span>
      </a>

      <div className="hidden md:flex gap-8">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition">
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="#contact"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm transition whitespace-nowrap"
          onClick={close}
        >
          Hire Me
        </a>

        <button
          type="button"
          className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-white/15 text-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full flex flex-col px-4 pb-4 bg-black/80 backdrop-blur-sm border-b border-white/10"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 text-lg text-gray-200 hover:text-white border-t border-white/10 transition"
              onClick={close}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

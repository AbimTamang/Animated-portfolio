import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "https://github.com/AbimTamang", label: "Github" },
  { href: "https://www.linkedin.com/in/abim-tamang-92b157310/", label: "Linkedin" },
  { href: "https://www.instagram.com/abim.techjsx/", label: "Instagram" },
];

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(footerRef.current.querySelectorAll("[data-reveal]"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="border-t border-white/10 bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <p data-reveal className="text-gray-500 text-sm">
          © {new Date().getFullYear()} <span className="text-purple-500 font-bold">Abim Tamang</span>. Crafted with
          passion
        </p>

        <div data-reveal className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-purple-500 transition text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

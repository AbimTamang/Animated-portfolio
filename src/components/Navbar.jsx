import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  });
  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-40 px-8 py-5 flex items-center justify-between bg-black/80 backdrop-blur-sm"
    >
      <a href="#" className="text-white text-xl font-bold">
        Abim <span className="text-purple-500">Tamang.</span>
      </a>

      <div className="hidden md:flex gap-8">
        <a href="#home" className="text-gray-300 hover:text-white transition">
          Home
        </a>
        <a href="#about" className="text-gray-300 hover:text-white transition">
          About
        </a>
        <a
          href="#projects"
          className="text-gray-300 hover:text-white transition"
        >
          Work
        </a>
        <a
          href="#contact"
          className="text-gray-300 hover:text-white transition"
        >
          Contact
        </a>
      </div>

      <a
        href="#contact"
        className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full text-sm transition"
      >
        Hire Me
      </a>
    </nav>
  );
}

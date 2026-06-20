import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "Power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 100%",
        toggleAction: "play none none reverse",
      },
    });
    gsap.from(linksRef.current, {
      y: 30,
      duration: 0.8,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 100%",
        toogleAction: "play none none reveser",
      },
    });
  });
  return (
    <footer
      ref={footerRef}
      className=" border-t  border-white/10 bg-black py-8"
    >
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p ref={textRef} className=" text-gray-500 text-sm">
          © 2026 <span className="text-purple-500 font-bold">Abim Tamang </span>
          .Crafter with passion
        </p>
        {/* links */}

        <div ref={linksRef} className="flex gap-6">
          <a
            href="https://github.com/AbimTamang"
            target="blank"
            className="text-gray-500 hover:text-purple-500 transition text-sm"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/abim-tamang-92b157310/"
            target="blank"
            className="text-gray-500 hover:text-purple-500 transition text-sm"
          >
            Linkedin
          </a>
          <a
            href="https://www.instagram.com/abim.techjsx/"
            target="black"
            className="text-gray-500 hover:text-purple-500 transition text-sm"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const subRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(subRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        descRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        buttonRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        imageRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      );
  });
  return (
    <section
      id="home"
      className="min-h-screen bg-black flex items-center px-8 pt-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <p
            ref={subRef}
            className="text-purple-500 text-sm font-medium tracking-widest uppercase mb-4"
          >
            Open to learning & collaboration
          </p>
          <h1
            ref={headingRef}
            className="text-white text-5xl md:text-6xl font-bold leading-tight mb-6"
          >
            Building <span className="text-purple-500">Skills</span>,<br />
            One Line at a Time.
          </h1>
          <p
            ref={descRef}
            className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
          >
            Beginner Frontend developer passoinate about html , css , taildwincc
            , javascript , react.js , next.js,gsap . I am on a journey to
            grow,build, and create what i imagine.
          </p>
          <div ref={buttonRef} className="flex gap-4">
            <a
              href="#projects"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full transition"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {}
        <div ref={imageRef} className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            <img
              src="/photo.jpeg"
              alt="Abim Tamang"
              className="relative z-10 w-80 h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

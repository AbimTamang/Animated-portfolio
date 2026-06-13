import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const socialRef = useRef(null);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      froce3D: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      froce3D: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(socialRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      froce3D: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
  });
  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-purple-500 text-sm tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-white text-4xl font-bold mt-2">
            Got a project idea?
          </h2>
        </div>

        {/* Contact Card */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Info */}
          <div ref={cardRef} className="bg-white/5 rounded-2xl p-8">
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I'm always looking for opportunities to collaborate, contribute,
              and keep improving. Whether it's a small project or feedback on my
              work — I'd love to hear from you!
            </p>
            <ul className="space-y-4">
              <li className="text-gray-300 flex items-center gap-3">
                <span className="text-purple-500">✉</span>
                abimtamang19@gmail.com
              </li>
              <li className="text-gray-300 flex items-center gap-3">
                <span className="text-purple-500">📍</span>
                Kathmandu, Nepal
              </li>
            </ul>
          </div>

          {/* Right - Socials */}
          <div ref={socialRef} className="flex flex-col gap-4 justify-center">
            <a
              href="https://github.com/AbimTamang"
              target="_blank"
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-4 rounded-2xl transition flex items-center gap-3 text-lg"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abim-tamang-92b157310/"
              target="_blank"
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-4 rounded-2xl transition flex items-center gap-3 text-lg"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/abim.techjsx/"
              target="_blank"
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-4 rounded-2xl transition flex items-center gap-3 text-lg"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const SkillsRef = useRef(null);

  useGSAP(() => {
    gsap.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
      },
    });
    gsap.from(textRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
      },
    });

    gsap.from(statsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
      },
    });

    gsap.from(SkillsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
      },
    });
  });
  return (
    <section ref={sectionRef} id="about" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-purple-500 text-sm tracking-widest uppercase">
            The Story
          </span>
          <h2 className="text-white text-4xl font-bold mt-2">
            Learning by building.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Image */}
          <div ref={imageRef} className="md:col-span-1">
            <img
              src="/my-photo.jpg"
              alt="Abim Tamang"
              className="w-full rounded-2xl object-cover"
            />
          </div>

          {/* Text */}
          <div ref={textRef} className="md:col-span-1">
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I'm Abim Tamang — a self-taught beginner web developer who fell in
              love with coding and never looked back. I'm currently building my
              skills in HTML, CSS, JavaScript, React, Node.js and Express.
            </p>
            {/* Stats */}
            <div ref={statsRef} className="flex gap-8">
              <div>
                <span className="text-white text-3xl font-bold">1+</span>
                <p className="text-gray-500 text-sm">Year Learning</p>
              </div>
              <div>
                <span className="text-white text-3xl font-bold">3+</span>
                <p className="text-gray-500 text-sm">Projects Built</p>
              </div>
              <div>
                <span className="text-white text-3xl font-bold">∞</span>
                <p className="text-gray-500 text-sm">Things to Learn</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div
            ref={SkillsRef}
            className="md:col-span-1 bg-white/5 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold mb-4">Core Stack</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "HTML",
                "CSS",
                "React",
                "Node.js",
                "Express",
                "JavaScript",
                "MongoDB",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            <h4 className="text-white font-bold mb-2">Current Focus</h4>
            <p className="text-gray-400 text-sm">
              Deep diving into React Hooks and API Integration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Modern Portfolio",
    desc: "My first professional portfolio project built with HTML, CSS, and Vite.",
    image: "/project1.png",
    tags: ["React", "tailwindCSS", "JavaScript", "Gsap"],
    github: "https://github.com/AbimTamang",
    live: "#",
  },
  {
    title: "Expense Tracker",
    desc: "A full-stack application to track daily expenses and view spending patterns.",
    image: "/project2.png",
    tags: ["React", "Express", "Node.js"],
    github: "https://github.com/AbimTamang",
    live: "#",
  },
  {
    title: "Notification Todo App",
    desc: "A smart MERN-stack task manager that sends real-time alerts when tasks are due.",
    image: "/project3.png",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/AbimTamang/Todo",
    live: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cardsRef.current[0], {
        x: -200,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1.5, // ✅ tied to scroll
        },
      });

      gsap.from(cardsRef.current[1], {
        y: 200,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1.5, // ✅
        },
      });

      gsap.from(cardsRef.current[2], {
        x: 200,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1.5, // ✅
        },
      });
    },
    { scope: sectionRef, dependencies: [] },
  );
  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-purple-500 text-sm tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-white text-4xl font-bold mt-2">Selected Works</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 "
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100  items-center justify-center gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    className="text-white border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black"
                  >
                    Live
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    className="text-white border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black "
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

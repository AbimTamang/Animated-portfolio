import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Loader({ onComplete }) {
  const letterRef = useRef([]);
  const subtitleRef = useRef(null);
  const barRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(letterRef.current, {
      y: 80,
      opacity: 0,
      scale: 0.3,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: 0.12,
    })
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .to(
        barRef.current,
        {
          width: "100%",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.3",
      )
      .to(topRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      })
      .to(
        bottomRef.current,
        {
          yPercent: 100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        },
        "<",
      );
  });

  return (
    <>
      <div
        ref={topRef}
        className="fixed top-0 left-0 w-full h-1/2 bg-black"
        style={{ zIndex: 9999 }}
      />
      <div
        ref={bottomRef}
        className="fixed bottom-0 left-0 w-full h-1/2 bg-black"
        style={{ zIndex: 9999 }}
      />

      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 99999 }}
      >
        <div className="flex gap-4 mb-4">
          {["A", "B", "I", "M"].map((letter, i) => (
            <span
              key={i}
              ref={(el) => (letterRef.current[i] = el)}
              className="text-8xl font-black text-white"
            >
              {letter}
            </span>
          ))}
        </div>

        <p
          ref={subtitleRef}
          className="text-purple-400 text-xs tracking-widest uppercase mb-8"
        >
          Tamang — Creative Developer
        </p>

        <div className="w-48 h-0.5 bg-gray-800 rounded-full">
          <div ref={barRef} className="h-full bg-purple-500 rounded-full w-0" />
        </div>
      </div>
    </>
  );
}

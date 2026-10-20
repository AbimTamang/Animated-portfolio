import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const HERO_IMAGE = "/myself/Abim.webp";

// Resolves once the hero portrait is decoded (or after a timeout on slow networks)
const heroReady = () => {
  const img = new Image();
  img.src = HERO_IMAGE;
  const decoded = img.decode ? img.decode().catch(() => {}) : new Promise((r) => (img.onload = img.onerror = r));
  return Promise.race([decoded, new Promise((r) => setTimeout(r, 4000))]);
};

export default function Loader({ onComplete }) {
  const letterRef = useRef([]);
  const subtitleRef = useRef(null);
  const barRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    let cancelled = false;
    let introDone = false;
    let imageReady = false;

    // Curtain only opens once the intro has played AND the portrait is ready,
    // so it never reveals a half-drawn image
    const outro = gsap
      .timeline({ paused: true })
      .to(contentRef.current, { autoAlpha: 0, duration: 0.3, delay: 0.2 })
      .to(topRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
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
    const maybeFinish = () => !cancelled && introDone && imageReady && outro.play();

    const tl = gsap.timeline({
      onComplete: () => {
        introDone = true;
        maybeFinish();
      },
    });

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
      );

    heroReady().then(() => {
      imageReady = true;
      maybeFinish();
    });

    return () => {
      cancelled = true;
    };
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
        ref={contentRef}
        className="fixed inset-0 flex flex-col items-center justify-center px-4"
        style={{ zIndex: 99999 }}
      >
        <div className="flex gap-2 sm:gap-4 mb-4">
          {["A", "B", "I", "M"].map((letter, i) => (
            <span
              key={i}
              ref={(el) => (letterRef.current[i] = el)}
              className="text-6xl sm:text-8xl font-black text-white"
            >
              {letter}
            </span>
          ))}
        </div>

        <p
          ref={subtitleRef}
          className="text-purple-400 text-xs tracking-widest uppercase mb-8 text-center"
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

import gsap from "gsap";

// Reveal for <SectionHeading>: line draws, kicker fades, words rise out of their masks
export default function animateHeading(root) {
  const q = gsap.utils.selector(root);
  return gsap
    .timeline({
      defaults: { ease: "power4.out" },
      scrollTrigger: { trigger: q(".sh")[0], start: "top 80%" },
    })
    .from(q(".sh-line"), { scaleX: 0, duration: 0.8 })
    .from(q(".sh-kicker"), { autoAlpha: 0, x: -20, duration: 0.6 }, "<0.1")
    .from(q(".sh-word"), { yPercent: 140, rotate: 4, duration: 1, stagger: 0.07 }, "<0.1")
    .from(q(".sh-sub"), { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.6");
}

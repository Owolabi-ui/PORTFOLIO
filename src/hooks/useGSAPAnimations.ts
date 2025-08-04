// hooks/useGSAPAnimations.ts
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';

export const useGSAPAnimations = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const splitHeadingsRef = useRef<any[]>([]);
  const animatingRef = useRef(false);
  const currentIndexRef = useRef(-1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(Observer, SplitText);

    // Initialize DOM elements
    sectionsRef.current = Array.from(document.querySelectorAll("section"));
    imagesRef.current = Array.from(document.querySelectorAll(".bg"));
    headingsRef.current = Array.from(document.querySelectorAll(".section-heading"));
    outerWrappersRef.current = Array.from(document.querySelectorAll(".outer"));
    innerWrappersRef.current = Array.from(document.querySelectorAll(".inner"));

    // Create split text animations
    splitHeadingsRef.current = headingsRef.current.map(
      (heading) => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })
    );

    const wrap = gsap.utils.wrap(0, sectionsRef.current.length);

    // Set initial states
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    // Section transition function
    function gotoSection(index: number, direction: number) {
      index = wrap(index);
      animatingRef.current = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], { yPercent: -15 * dFactor })
          .set(sectionsRef.current[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(imagesRef.current[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadingsRef.current[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );

      currentIndexRef.current = index;
    }

    // Create scroll observer
    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => {
        if (!animatingRef.current) {
          gotoSection(currentIndexRef.current - 1, -1);
        }
      },
      onUp: () => {
        if (!animatingRef.current) {
          gotoSection(currentIndexRef.current + 1, 1);
        }
      },
      tolerance: 10,
      preventDefault: true,
    });

    // Initialize first section
    gotoSection(0, 1);

    // Cleanup function
    return () => {
      Observer.getAll().forEach(o => o.kill());
    };
  }, []);

  return { carouselRef };
};

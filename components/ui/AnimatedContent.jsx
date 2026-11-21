'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const WIPES = {
  up: 'linear-gradient(to top, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  down: 'linear-gradient(to bottom, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  left: 'linear-gradient(to left, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  right: 'linear-gradient(to right, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  center: 'radial-gradient(farthest-corner at 50% 50%, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))'
};

const AnimatedContent = ({
  as: Element = 'div',
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  blur = 0,
  rotate = 0,
  tilt = 0,
  wipe = 'none',
  threshold = 0.1,
  delay = 0,
  stagger = 0,
  staggerFrom = 'start',
  trigger = 'scroll',
  once = true,
  scrub = false,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onStart,
  onComplete,
  onDisappearanceComplete,
  ...props
}) => {
  const ref = useRef(null);
  const callbacks = useRef({ onStart, onComplete, onDisappearanceComplete });
  callbacks.current = { onStart, onComplete, onDisappearanceComplete };

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scroller = typeof container === 'string' ? document.querySelector(container) : container;
    const media = gsap.matchMedia();

    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)'
    }, ({ conditions }) => {
      if (conditions.reduced) {
        callbacks.current.onComplete?.();
        return;
      }

      const targets = stagger > 0 && el.children.length ? Array.from(el.children) : [el];
      const horizontal = direction === 'horizontal';
      const axis = horizontal ? 'x' : 'y';
      const sign = reverse ? -1 : 1;
      const mask = WIPES[wipe];
      const from = { [axis]: distance * sign, scale, opacity: animateOpacity ? initialOpacity : 1 };
      const to = { [axis]: 0, scale: 1, opacity: 1, duration, ease };
      let exitTween;

      if (blur > 0) {
        from.filter = `blur(${blur}px)`;
        to.filter = 'blur(0px)';
      }
      if (rotate) {
        from.rotation = rotate * sign;
        to.rotation = 0;
      }
      if (tilt) {
        const tiltAxis = horizontal ? 'rotationY' : 'rotationX';
        from[tiltAxis] = horizontal ? -tilt * sign : tilt * sign;
        to[tiltAxis] = 0;
        from.transformPerspective = to.transformPerspective = 900;
      }
      if (mask) {
        from.maskImage = from.webkitMaskImage = mask;
        from['--ac-wipe'] = 0;
        to['--ac-wipe'] = 1;
      }
      if (stagger > 0) to.stagger = { each: stagger, from: staggerFrom };

      const onReveal = () => {
        callbacks.current.onComplete?.();
        if (!scrub && once && disappearAfter > 0) {
          exitTween = gsap.to(targets, {
            [axis]: -distance * sign,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
            stagger: to.stagger,
            onComplete: () => callbacks.current.onDisappearanceComplete?.()
          });
        }
      };

      const timeline = gsap.timeline({
        paused: true,
        onStart: () => callbacks.current.onStart?.(),
        onComplete: onReveal
      });
      timeline.fromTo(targets, from, to, scrub ? 0 : Math.max(delay, 0));
      if (!scrub && once) {
        const clear = ['transform', 'opacity'];
        if (blur > 0) clear.push('filter');
        if (mask) clear.push('maskImage', 'webkitMaskImage', '--ac-wipe');
        timeline.set(targets, { clearProps: clear.join(',') });
      }

      const revealOnFocus = () => {
        if (!scrub && timeline.progress() < 1) timeline.progress(1).pause();
      };
      el.addEventListener('focusin', revealOnFocus);

      if (trigger === 'mount') {
        timeline.play();
      } else {
        const start = (1 - gsap.utils.clamp(0, 1, threshold)) * 100;
        ScrollTrigger.create(scrub ? {
          trigger: el,
          scroller,
          start: `clamp(top ${start}%)`,
          end: `clamp(top ${Math.max(start - 45, 5)}%)`,
          scrub: scrub === true ? true : Math.max(Number(scrub) || 0, 0.01),
          animation: timeline
        } : {
          trigger: el,
          scroller,
          start: `clamp(top ${start}%)`,
          once,
          onEnter: () => timeline.play(),
          onLeaveBack: once ? undefined : () => timeline.reverse()
        });
      }

      return () => {
        el.removeEventListener('focusin', revealOnFocus);
        exitTween?.revert();
      };
    }, el);

    return () => media.revert();
  }, [
    Element, container, distance, direction, reverse, duration, ease, initialOpacity,
    animateOpacity, scale, blur, rotate, tilt, wipe, threshold, delay, stagger,
    staggerFrom, trigger, once, scrub, disappearAfter, disappearDuration, disappearEase
  ]);

  return <Element ref={ref} {...props}>{children}</Element>;
};

export default AnimatedContent;

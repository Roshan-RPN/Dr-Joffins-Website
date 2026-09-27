'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, type MotionStyle, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

// One easing curve for the whole site: fast start, long soft landing.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

type MotionDivProps = React.ComponentProps<typeof motion.div>;

// Motion's own useReducedMotion mismatches during hydration, so read the media query directly.
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

// filter is dropped to `none` once settled so it never breaks the backdrop-blur on .glass children.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_OUT },
    transitionEnd: { filter: 'none' },
  },
};

const slide = (x: number): Variants => ({
  hidden: { opacity: 0, x, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE_OUT },
    transitionEnd: { filter: 'none' },
  },
});

/** Enters from the left edge. */
export const slideFromLeft = slide(-80);
/** Enters from the right edge. */
export const slideFromRight = slide(80);

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE_OUT },
    transitionEnd: { filter: 'none' },
  },
};

type RevealSide = 'bottom' | 'top' | 'left' | 'right';

// Inset that hides the frame completely, keyed by the edge the image grows out of.
const HIDDEN_INSET: Record<RevealSide, string> = {
  bottom: '100% 0% 0% 0%',
  top: '0% 0% 100% 0%',
  left: '0% 100% 0% 0%',
  right: '0% 0% 0% 100%',
};

type ImageRevealProps = {
  src: string;
  alt: string;
  /** Edge the photo grows out of. */
  from?: RevealSide;
  delay?: number;
  /** Corner radius in px, so the moving edge stays rounded while it sweeps. */
  radius?: number;
  /** Play on page load instead of when scrolled into view (for the hero). */
  onLoad?: boolean;
  /** Sizing/positioning for the outer wrapper. */
  wrapperClassName?: string;
  /** Frame styling: size, border, rounding. */
  className?: string;
  /** Shadow classes, drawn on a layer that fades in once the photo has landed. */
  shadowClassName?: string;
  imgClassName?: string;
  imgStyle?: MotionStyle;
  children?: React.ReactNode;
};

/**
 * Photo reveal used across the site: the whole frame (border included) is uncovered by a
 * rounded clip-path sweep while the photo settles from a slight zoom, so an empty frame is
 * never on screen. The shadow sits on its own layer because clip-path would cut it off.
 */
export function ImageReveal({
  src,
  alt,
  from = 'bottom',
  delay = 0,
  radius = 32,
  onLoad = false,
  wrapperClassName,
  className,
  shadowClassName,
  imgClassName,
  imgStyle,
  children,
}: ImageRevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const instant = { duration: 0 };
  // The trigger sits on the unclipped wrapper: a fully clipped element never registers as in view.
  const trigger = onLoad
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.25 } };

  return (
    <motion.div initial="hidden" {...trigger} className={cn('relative', wrapperClassName)}>
      {shadowClassName && (
        <motion.div
          aria-hidden
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: reduceMotion ? instant : { duration: 1, ease: EASE_OUT, delay: delay + 0.9 } },
          }}
          className={cn('absolute inset-0 pointer-events-none', shadowClassName)}
        />
      )}
      <motion.div
        variants={{
          hidden: { clipPath: `inset(${HIDDEN_INSET[from]} round ${radius}px)` },
          show: {
            clipPath: `inset(0% 0% 0% 0% round ${radius}px)`,
            transition: reduceMotion ? instant : { duration: 1.5, ease: EASE_IN_OUT, delay },
            transitionEnd: { clipPath: 'none' },
          },
        }}
        className={cn('relative overflow-hidden', className)}
      >
        <motion.img
          src={src}
          alt={alt}
          style={imgStyle}
          variants={{
            hidden: { scale: 1.3 },
            show: { scale: 1, transition: reduceMotion ? instant : { duration: 2.2, ease: EASE_OUT, delay } },
          }}
          className={imgClassName}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}

type RevealProps = MotionDivProps & {
  delay?: number;
  x?: number;
  y?: number;
  rotate?: number;
  duration?: number;
  amount?: number;
};

/** Fades, moves and un-blurs its content the first time it scrolls into view (up by default; pass x to slide sideways). */
export function Reveal({ delay = 0, x = 0, y = 28, rotate = 0, duration = 0.9, amount = 0.2, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y, rotate, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    />
  );
}

type StaggerProps = MotionDivProps & {
  stagger?: number;
  delay?: number;
  amount?: number;
};

/** Reveals its StaggerItem children one after another. */
export function Stagger({ stagger = 0.1, delay = 0, amount = 0.2, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    />
  );
}

export function StaggerItem(props: MotionDivProps) {
  return <motion.div variants={fadeUp} {...props} />;
}

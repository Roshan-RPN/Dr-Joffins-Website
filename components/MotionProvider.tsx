'use client';

import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/components/Reveal';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  // Inertia scrolling on wheel/trackpad; touch devices keep their native scroll.
  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, [reduceMotion]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

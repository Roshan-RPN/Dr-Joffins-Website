'use client';

import React, { useEffect, useRef } from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  Reveal,
  Stagger,
  StaggerItem,
  EASE_OUT,
  slideFromLeft,
  usePrefersReducedMotion,
} from '@/components/Reveal';
import { Star, Quote } from 'lucide-react';

type Review = {
  name: string;
  role: string;
  content: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: 'Sandeep Nair',
    role: 'Local Business Owner',
    content: "Dr. Joffin identifies the bottom of the problem. His diagnosis isn't rushed. He takes his time to explain every detail, which is rare in today's medical world.",
    rating: 5,
  },
  {
    name: 'Anjali Sharma',
    role: 'Mother of Two',
    content: "The clinic is incredibly clean and hygienic. My kids were nervous, but Dr. Joffin's gentle approach made them feel at ease instantly. Zero wait time was a blessing!",
    rating: 5,
  },
  {
    name: 'Rahul Varma',
    role: 'IT Professional',
    content: "Specializes in nervous patients like me. I've always dreaded dentists, but the painless root canal was a revelation. Transparent pricing and top-tier talent.",
    rating: 5,
  },
  {
    name: 'Priya Iyer',
    role: 'Teacher',
    content: "Meticulous attention to detail. The braces treatment plan was so well-explained. Friendly staff and an environment that feels more like a spa than a clinic.",
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Consultant',
    content: "Professional, talented, and most importantly, humble. He listens to his patients. The aesthetic work done on my front teeth is perfection.",
    rating: 5,
  },
  {
    name: 'Meera Deshmukh',
    role: 'Retiree',
    content: "I had a complex surgery done here. The post-op care was exemplary. Dr. Joffin is truly a master of his craft. Highly recommended for complex cases.",
    rating: 5,
  },
];

// Second row runs the reviews in reverse so neighbouring cards never match the row above.
const rowA = reviews;
const rowB = [...reviews].reverse();

function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  return (
    <figure
      className={`group/card relative flex flex-col justify-between bg-white p-8 md:p-10 rounded-[2rem] border border-clinical-blue/5 shadow-sm shadow-clinical-blue/5 hover:-translate-y-2 hover:border-mint-teal/40 hover:shadow-xl hover:shadow-clinical-blue/10 transition-[translate,border-color,box-shadow] duration-500 ease-smooth text-left ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <Quote
            className="text-mint-teal/25 group-hover/card:text-mint-teal/60 group-hover/card:-rotate-6 transition-[color,rotate] duration-500 ease-smooth"
            size={36}
          />
          <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            ))}
          </div>
        </div>
        <blockquote className="text-clinical-blue/80 text-base md:text-lg leading-relaxed mb-8 font-sans">
          &quot;{review.content}&quot;
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-mint-teal to-clinical-blue text-white font-serif font-bold flex items-center justify-center">
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-clinical-blue font-serif font-bold text-lg truncate">{review.name}</p>
          <p className="text-clinical-blue/50 text-sm truncate">{review.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * One endlessly scrolling row of reviews. The row slides in from its side, then the
 * track drifts with page scroll on top of the CSS marquee; hovering pauses it.
 */
function MarqueeRow({
  items,
  reverse = false,
  scrollShift,
}: {
  items: Review[];
  reverse?: boolean;
  scrollShift: MotionValue<number>;
}) {
  // Two identical halves translated by -50% loop with no seam. Each half holds the list twice
  // so it is always wider than the widest screen.
  const half = (copy: number) => (
    <div aria-hidden={copy > 0} className="flex shrink-0 gap-6 pr-6">
      {[...items, ...items].map((review, i) => (
        <ReviewCard
          key={`${review.name}-${i}`}
          review={review}
          className="w-[270px] sm:w-[360px] md:w-[420px] shrink-0"
        />
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 160 : -160 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, ease: EASE_OUT, delay: reverse ? 0.15 : 0 }}
      className="group overflow-hidden py-6 [contain:inline-size] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <motion.div style={{ x: scrollShift }}>
        <div
          className={`flex w-max items-stretch animate-marquee-slow group-hover:[animation-play-state:paused] ${
            reverse ? '[animation-direction:reverse]' : ''
          }`}
        >
          {half(0)}
          {half(1)}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Counts the average rating up from zero the first time the badge is on screen. */
function RatingCount({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduceMotion = usePrefersReducedMotion();
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => v.toFixed(1));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.8, ease: EASE_OUT, delay: 0.4 });
    return () => controls.stop();
  }, [inView, reduceMotion, count, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden className="tabular-nums">
        {text}
      </motion.span>
    </span>
  );
}

export default function PatientDiaries() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  // Rows drift in opposite directions as the page scrolls. Both ranges stay at or below 0,
  // so the track never uncovers empty space at its left edge.
  const shiftA = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -240]);
  const shiftB = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-240, 0]);

  return (
    <section ref={sectionRef} id="diaries" className="py-32 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-clinical-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <Stagger className="max-w-2xl">
            <StaggerItem variants={slideFromLeft}>
              <span className="text-mint-teal font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Patient Diaries
              </span>
            </StaggerItem>
            <StaggerItem variants={slideFromLeft}>
              <h2 className="text-4xl md:text-6xl font-serif text-clinical-blue">
                Voices of <span className="italic">Trust & Comfort.</span>
              </h2>
            </StaggerItem>
          </Stagger>
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}
            className="bg-white shadow-lg shadow-clinical-blue/5 border border-clinical-blue/5 p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="flex -space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.5 + i * 0.1 }}
                >
                  <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                </motion.span>
              ))}
            </div>
            <div className="h-10 w-[1px] bg-clinical-blue/10" />
            <span className="text-clinical-blue font-bold text-lg">
              <RatingCount value={4.9} />/5 Average
            </span>
          </motion.div>
        </div>
      </div>

      {reduceMotion ? (
        // Still layout for Reduce Motion: every review visible, nothing moving.
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Reveal key={review.name}>
              <ReviewCard review={review} className="h-full" />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="relative z-10 flex flex-col">
          <MarqueeRow items={rowA} scrollShift={shiftA} />
          <MarqueeRow items={rowB} scrollShift={shiftB} reverse />
        </div>
      )}
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Star, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EASE_OUT, ImageReveal, usePrefersReducedMotion } from '@/components/Reveal';

const headline = [
  { words: ['Precision', 'Dental', 'Care'], className: '' },
  { words: ['Meets', 'Comfort.'], className: 'text-mint-teal italic' },
];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } },
  transition: { duration: 1, ease: EASE_OUT, delay },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -50]);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center pt-32 lg:pt-36 pb-32 overflow-hidden">
      {/* Visual Background */}
      <div className="absolute inset-0 z-0">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/09/16/50011-456079979_large.mp4"
            type="video/mp4"
          />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/80 lg:to-transparent bg-white/90" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
          <motion.div
            style={{ y: copyY }}
            className="max-w-3xl flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div
              {...fadeIn(0.1)}
              className="inline-flex items-center gap-2 px-3 py-1 bg-mint-teal/10 border border-mint-teal/20 rounded-full mb-6 mx-auto lg:mx-0"
            >
              <Star className="text-mint-teal fill-mint-teal" size={14} />
              <span className="text-clinical-blue text-xs font-bold uppercase tracking-widest">
                Trusted by 500+ Local Families
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-clinical-blue leading-[1.1] mb-6">
              {headline.map((line, lineIndex) => {
                const offset = headline.slice(0, lineIndex).reduce((n, l) => n + l.words.length, 0);
                return (
                  <span key={lineIndex} className={cn('block', line.className)}>
                    {line.words.map((word, wordIndex) => (
                      <React.Fragment key={word}>
                        {/* Mask: each word rises out of its own clipped box */}
                        <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] px-[0.06em] -mx-[0.06em]">
                          <motion.span
                            className="inline-block"
                            initial={{ y: '115%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.25 + (offset + wordIndex) * 0.09 }}
                          >
                            {word}
                          </motion.span>
                        </span>
                        {wordIndex < line.words.length - 1 && ' '}
                      </React.Fragment>
                    ))}
                  </span>
                );
              })}
            </h1>

            <motion.p
              {...fadeIn(0.75)}
              className="text-xl md:text-2xl text-clinical-blue/70 font-sans max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0"
            >
              Experience high-end multi-speciality dentistry where meticulous hygiene
              and a gentle touch redefine your smile.
            </motion.p>

            <motion.div {...fadeIn(0.9)} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#booking"
                className="liquid-fill group px-8 py-4 bg-clinical-blue text-white rounded-full font-sans font-bold text-lg flex items-center justify-center gap-2 transition-all duration-500 ease-smooth hover:-translate-y-0.5 shadow-xl shadow-clinical-blue/20"
              >
                Book Your Consultation
                <ChevronRight className="group-hover:translate-x-1 transition-transform duration-500 ease-smooth" />
              </Link>
              <Link
                href="https://maps.app.goo.gl/53FjtSB5NZE8PAus6"
                target="_blank"
                className="px-8 py-4 border-2 border-clinical-blue text-clinical-blue rounded-full font-sans font-bold text-lg flex items-center justify-center gap-2 hover:bg-clinical-blue/5 hover:-translate-y-0.5 transition-all duration-500 ease-smooth"
              >
                Get Directions
              </Link>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: imageY }} className="flex-1 w-full max-w-2xl">
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.35 }}
              className="relative group w-full lg:h-[600px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6, delay: 1.2 }}
                className="absolute -inset-4 bg-mint-teal/20 rounded-[3rem] blur-3xl group-hover:bg-mint-teal/30 transition-colors duration-700"
              />
              {/* The framed photo rises out of its own bottom edge */}
              <ImageReveal
                onLoad
                from="bottom"
                delay={0.35}
                radius={40}
                src="/images/hero-dentist-patient.webp"
                alt="Dr. Joffin examining a smiling patient in the dental chair"
                wrapperClassName="h-full lg:skew-x-[-2deg]"
                shadowClassName="rounded-[2.5rem] shadow-2xl shadow-clinical-blue/20"
                className="h-full rounded-[2.5rem] border-8 border-white/50"
                imgClassName="w-full aspect-[4/5] lg:aspect-auto lg:h-full object-cover object-[center_35%] group-hover:scale-105 transition-[scale] duration-1000 ease-smooth"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-clinical-blue/30"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown />
        </motion.div>
      </motion.div>
    </section>
  );
}

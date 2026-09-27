'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageReveal, Reveal, Stagger, StaggerItem, slideFromRight, usePrefersReducedMotion } from '@/components/Reveal';
import { Target, ShieldCheck, Heart, Zap } from 'lucide-react';

export default function WhyDrJoffin() {
  const usps = [
    {
      icon: <Target className="text-mint-teal" />,
      title: 'The Bottom of the Problem',
      description: 'We don\'t just treat symptoms. Dr. Joffin identifies the root cause with patient, meticulous diagnosis.',
    },
    {
      icon: <ShieldCheck className="text-mint-teal" />,
      title: 'Higher Sterility Standards',
      description: 'Our 7-step sterilization protocol exceeds international safety benchmarks.',
    },
    {
      icon: <Heart className="text-mint-teal" />,
      title: 'Gentle, Humble Approach',
      description: 'Acclaimed for a gentle touch that turns nervous patients into confident smiles.',
    },
    {
      icon: <Zap className="text-mint-teal" />,
      title: 'Precision Technology',
      description: 'State-of-the-art diagnostic tools for faster recovery and accurate results.',
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section ref={sectionRef} id="clinic" className="relative py-32 bg-white overflow-x-clip">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center text-center md:text-left">
          <div className="relative flex justify-center md:block">
            {/* Sweeps open from the left, then drifts slowly with the scroll */}
            <ImageReveal
              from="left"
              radius={32}
              src="/images/xray-consultation.webp"
              alt="Dr. Joffin walking a patient through her dental X-ray"
              imgStyle={{ y: imageY }}
              wrapperClassName="z-10 w-full max-w-sm md:max-w-none"
              shadowClassName="rounded-[2rem] shadow-2xl"
              className="rounded-[2rem]"
              imgClassName="w-full aspect-[4/5] object-cover scale-[1.14]"
            >
              <div className="absolute inset-0 bg-clinical-blue/10 mix-blend-overlay" />
            </ImageReveal>
            {/* Decoration */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-mint-teal/10 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-clinical-blue/5 rounded-full blur-3xl z-0" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 1.1 }}
              className="absolute -bottom-8 -right-4 md:-right-8 glass p-6 md:p-8 rounded-2xl max-w-[200px] md:max-w-[240px] z-20 text-left"
            >
              <h3 className="font-serif text-xl md:text-2xl text-clinical-blue mb-2 leading-tight">&quot;Meticulous & Humble&quot;</h3>
              <p className="text-clinical-blue/60 text-[10px] md:text-sm font-sans italic">
                — As highlighted in over 200+ verified patient reviews.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <Stagger className="flex flex-col items-center md:items-start">
              <StaggerItem variants={slideFromRight}>
                <span className="text-mint-teal font-bold uppercase tracking-widest text-sm mb-4 block">
                  The Meticulous Edge
                </span>
              </StaggerItem>
              <StaggerItem variants={slideFromRight}>
                <h2 className="text-4xl md:text-5xl font-serif text-clinical-blue leading-tight mb-8">
                  Why Patients Choose <br />
                  <span className="text-mint-teal italic">Dr. Joffin&apos;s Excellence.</span>
                </h2>
              </StaggerItem>
            </Stagger>
            
            <div className="grid gap-8 w-full">
              {usps.map((usp, index) => (
                <Reveal
                  key={usp.title}
                  x={80}
                  y={0}
                  delay={index * 0.1}
                  amount={0.5}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group text-center sm:text-left"
                >
                  <div className="w-14 h-14 shrink-0 glass rounded-xl flex items-center justify-center group-hover:bg-mint-teal group-hover:text-white transition-all transform group-hover:scale-110 duration-500 ease-smooth">
                    {usp.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-serif text-clinical-blue mb-2">{usp.title}</h4>
                    <p className="text-clinical-blue/70 leading-relaxed max-w-md mx-auto sm:mx-0">
                      {usp.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

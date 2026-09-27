'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ImageReveal, Reveal, Stagger, StaggerItem, EASE_OUT, slideFromLeft } from '@/components/Reveal';
import { Award, BookOpen, GraduationCap, Star } from 'lucide-react';

export default function AboutDoctor() {
const highlights = [
    {
      icon: GraduationCap,
      title: 'Expert Education',
      desc: 'Specialized in multi-speciality dentistry with advanced certifications in precision dental care.',
    },
    {
      icon: Award,
      title: 'Clinical Excellence',
      desc: 'Recognized for meticulous surgical precision and restorative dental masterpieces.',
    },
    {
      icon: Star,
      title: 'Patient Choice',
      desc: 'Voted as the most compassionate dental care provider in Kochi for 5 consecutive years.',
    },
    {
      icon: BookOpen,
      title: 'Continuous Innovation',
      desc: 'Implementing the latest global trends and technologies in modern dentistry.',
    },
  ];

  return (
    <section id="doctor" className="py-32 bg-clinical-blue text-white overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mint-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center text-center lg:text-left">
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start">
            <Stagger className="flex flex-col items-center lg:items-start">
              <StaggerItem variants={slideFromLeft}>
                <span className="text-mint-teal font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
                  Meet the Doctor
                </span>
              </StaggerItem>
              <StaggerItem variants={slideFromLeft}>
                <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                  Dr. Joffin. <br />
                  <span className="text-mint-teal italic">The Visionary Behind the Smile.</span>
                </h2>
              </StaggerItem>
              <StaggerItem variants={slideFromLeft}>
                <p className="text-xl text-white/70 font-sans max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0">
                  With over a decade of clinical excellence, Dr. Joffin combines surgical precision with a compassionate touch, ensuring every patient feels seen, heard, and cared for.
                </p>
              </StaggerItem>
            </Stagger>

            <div className="grid sm:grid-cols-2 gap-8 w-full">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    key={item.title}
                    x={index % 2 === 0 ? -60 : 60}
                    y={0}
                    delay={Math.floor(index / 2) * 0.12}
                    amount={0.5}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
                  >
                    <div className="w-12 h-12 shrink-0 glass !bg-white/10 rounded-xl flex items-center justify-center text-mint-teal">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="order-1 lg:order-2 flex justify-center w-full"
          >
            <div className="relative group w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-4 bg-mint-teal/20 rounded-[3rem] blur-2xl group-hover:bg-mint-teal/30 transition-colors duration-700" />
              <div className="relative glass !bg-white/5 p-4 rounded-[3.5rem] border-white/10">
                {/* Sweeps open from the right edge inside its glass frame */}
                <ImageReveal
                  from="right"
                  delay={0.2}
                  radius={40}
                  src="https://www.vpslakeshorehospital.com/uploads/doctor//dr.jacobchacko-eotnrpsektmyooe-iVJxYAISytKXtxb.jpg"
                  alt="Dr. Joffin"
                  className="rounded-[2.5rem] w-full aspect-[4/5] lg:aspect-auto lg:h-[600px]"
                  imgClassName="w-full h-full object-cover object-top group-hover:scale-105 transition-[scale] duration-1000 ease-smooth"
                >
                  <div className="absolute inset-0 bg-clinical-blue/10 mix-blend-multiply" />
                </ImageReveal>

                <motion.div
                  initial={{ opacity: 0, x: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 1 }}
                  className="absolute bottom-10 -right-5 md:-right-10 glass p-6 md:p-8 rounded-2xl max-w-[160px] md:max-w-[200px] border-mint-teal/20 text-left">
                  <p className="text-clinical-blue font-serif text-lg md:text-xl font-bold leading-tight mb-2">Meticulous Diagnosis</p>
                  <div className="w-10 h-1 bg-mint-teal" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

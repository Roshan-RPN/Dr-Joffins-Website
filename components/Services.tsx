'use client';

import React from 'react';
import { Reveal, Stagger, StaggerItem, zoomIn } from '@/components/Reveal';
import { Ruler, Activity, Sparkles, Scissors, Info } from 'lucide-react';

const specialties = [
  {
    icon: Ruler,
    title: 'Braces & Alignment',
    summary: 'Custom orthodontics using the latest transparent aligners and precision brackets.',
    detail: 'Transform your smile with meticulous planning and invisible solutions tailored to your jaw structure.',
  },
  {
    icon: Activity,
    title: 'Dental Fillings',
    summary: 'Biocompatible, high-density fillings that mimic the natural structure of your teeth.',
    detail: 'Zero-mercury approach ensuring long-term health and aesthetic perfection for every cavity.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Implants',
    summary: 'Titanium precision implants that feel and function like natural teeth roots.',
    detail: 'A permanent solution for missing teeth with a 99% success rate and natural-looking crowns.',
  },
  {
    icon: Scissors,
    title: 'Root Canal',
    summary: 'Expert management of root canals, ensuring zero-pain and long-lasting tooth preservation.',
    detail: 'Specialized root canal procedures performed with absolute precision and post-operative care.',
  },
];

export default function Services() {
  return (
    <section id="specialities" className="py-32 bg-clinical-blue/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <Stagger className="text-center max-w-2xl mx-auto mb-20">
          <StaggerItem variants={zoomIn}>
            <span className="text-mint-teal font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Specialized Care
            </span>
          </StaggerItem>
          <StaggerItem variants={zoomIn}>
            <h2 className="text-4xl md:text-6xl font-serif text-clinical-blue mb-6 leading-tight">
              Crafting Smiles with <br /><span className="italic">Clinical Perfection.</span>
            </h2>
          </StaggerItem>
        </Stagger>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal
                key={service.title}
                x={index % 2 === 0 ? -80 : 80}
                y={32}
                rotate={index % 2 === 0 ? -4 : 4}
                duration={1.1}
                delay={(index % 4) * 0.12}
                amount={0.3}
                className="group relative h-[400px]"
              >
                <div className="glass h-full p-10 rounded-[2.5rem] flex flex-col justify-between transition-all duration-700 ease-smooth group-hover:bg-clinical-blue group-hover:border-clinical-blue group-hover:-translate-y-4 text-center sm:text-left items-center sm:items-start">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-clinical-blue/10 flex items-center justify-center mb-8 group-hover:bg-white/10 group-hover:text-white transition-colors">
                      <Icon className="w-8 h-8 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-serif text-clinical-blue mb-4 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="text-clinical-blue/60 group-hover:text-white/70 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                  
                  <div className="relative overflow-hidden h-10 w-full flex justify-center sm:justify-start">
                    <div className="flex items-center gap-2 text-clinical-blue/40 font-bold text-xs uppercase tracking-widest group-hover:text-white/50 transition-all duration-500 ease-smooth transform group-hover:translate-y-[-40px]">
                      <Info size={14} />
                      Hover for Details
                    </div>
                    <div className="absolute top-10 flex items-center gap-2 text-mint-teal font-bold text-xs uppercase tracking-widest transition-all duration-500 ease-smooth transform group-hover:translate-y-[-40px]">
                      Learn More
                    </div>
                  </div>
                </div>

                {/* Expansion/Detail on Hover (Simulated via overlay for clean design) */}
                <div className="absolute inset-0 p-10 bg-clinical-blue rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-smooth flex flex-col justify-center pointer-events-none text-center sm:text-left items-center sm:items-start">
                  <h3 className="text-2xl font-serif text-white mb-6">
                    {service.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-8">
                    {service.detail}
                  </p>
                  <div className="w-10 h-1 bg-mint-teal" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

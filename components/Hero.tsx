'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Star, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
      {/* Visual Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/09/16/50011-456079979_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/80 lg:to-transparent bg-white/90" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
          <div className="max-w-3xl flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint-teal/10 border border-mint-teal/20 rounded-full mb-6 mx-auto lg:mx-0">
                <Star className="text-mint-teal fill-mint-teal" size={14} />
                <span className="text-clinical-blue text-xs font-bold uppercase tracking-widest">
                  Trusted by 500+ Local Families
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-clinical-blue leading-[1.1] mb-6">
                Precision Dental Care <br />
                <span className="text-mint-teal italic">Meets Comfort.</span>
              </h1>

              <p className="text-xl md:text-2xl text-clinical-blue/70 font-sans max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                Experience high-end multi-speciality dentistry where meticulous hygiene 
                and a gentle touch redefine your smile.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#booking"
                  className="liquid-fill group px-8 py-4 bg-clinical-blue text-white rounded-full font-sans font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-clinical-blue/20"
                >
                  Book Your Consultation
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="https://maps.app.goo.gl/53FjtSB5NZE8PAus6"
                  target="_blank"
                  className="px-8 py-4 border-2 border-clinical-blue text-clinical-blue rounded-full font-sans font-bold text-lg flex items-center justify-center gap-2 hover:bg-clinical-blue/5 transition-all"
                >
                  Get Directions
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full max-w-2xl"
          >
            <div className="relative group w-full lg:h-[600px]">
              <div className="absolute -inset-4 bg-mint-teal/20 rounded-[3rem] blur-3xl group-hover:bg-mint-teal/30 transition-all duration-500" />
              <div className="relative h-full rounded-[2.5rem] overflow-hidden border-8 border-white/50 shadow-2xl lg:skew-x-[-2deg]">
                <img 
                  src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAHnPuOmTZbSdvXRuI1nLPSc5HFoZUVYc9Rg9X-ttJIGU3VVA87lyjacrHq00g8sCON99alJmFjnYuBUN5aPBeOFPTZPhRgdUA5ShqS6-n2xbLCkvOezBcEU2bB3S65M4bVAQRBV=w1280-h720-k-no" 
                  alt="Dr. Joffin's Clinic" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-clinical-blue/30"
      >
        <ArrowDown />
      </motion.div>
    </section>
  );
}

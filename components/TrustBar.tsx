'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function TrustBar() {
  const messages = [
    'Zero Wait Time',
    'Gentle Cleaning',
    'Sterilized Environment',
    'Transparent Pricing',
    'Anxiety-Free Procedures',
    'Meticulous Diagnosis',
  ];

  return (
    <div className="bg-clinical-blue py-4 overflow-hidden relative border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          className="flex gap-16 items-center px-8"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
              {messages.map((message) => (
                <div
                  key={message}
                  className="flex items-center gap-3 text-white/90 font-sans font-bold text-sm tracking-widest uppercase"
                >
                  <div className="w-2 h-2 rounded-full bg-mint-teal" />
                  {message}
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

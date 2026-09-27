'use client';

import React from 'react';

export default function TrustBar() {
  const messages = [
    'Zero Wait Time',
    'Gentle Cleaning',
    'Sterilized Environment',
    'Transparent Pricing',
    'Anxiety-Free Procedures',
    'Meticulous Diagnosis',
  ];

  // Two identical halves scrolled by -50% loop with no visible seam.
  const half = (copy: number) => (
    <div aria-hidden={copy > 0} className="flex shrink-0 gap-16 items-center pr-16">
      {[...messages, ...messages].map((message, i) => (
        <div
          key={`${message}-${i}`}
          className="flex items-center gap-3 text-white/90 font-sans font-bold text-sm tracking-widest uppercase whitespace-nowrap"
        >
          <div className="w-2 h-2 rounded-full bg-mint-teal" />
          {message}
        </div>
      ))}
    </div>
  );

  return (
    <div className="group bg-clinical-blue py-4 overflow-hidden relative border-y border-white/10 [contain:inline-size] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {half(0)}
        {half(1)}
      </div>
    </div>
  );
}

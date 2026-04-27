'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="tel:09496857648"
        className="w-14 h-14 bg-clinical-blue text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20"
      >
        <Phone size={24} />
      </motion.a>
      
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/919496857648"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20"
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}

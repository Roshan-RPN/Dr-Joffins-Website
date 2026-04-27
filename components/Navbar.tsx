'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Clinic', href: '#clinic' },
    { name: 'Specialities', href: '#specialities' },
    { name: 'Patient Diaries', href: '#diaries' },
    { name: 'About Doctor', href: '#doctor' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-clinical-blue rounded-full flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xl">J</span>
          </div>
          <div className="flex flex-col">
            <span className="text-clinical-blue font-serif font-bold text-lg leading-tight uppercase tracking-widest">
              Dr. JOFFIN&apos;S
            </span>
            <span className="text-clinical-blue/70 text-[10px] font-sans uppercase tracking-[0.2em] leading-none">
              MULTI-SPECIALITY DENTAL CLINIC
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-clinical-blue font-sans font-medium text-sm hover:text-mint-teal transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#booking"
            className="liquid-fill px-6 py-2.5 bg-clinical-blue text-white rounded-full font-sans font-bold text-sm transition-all"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-clinical-blue"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-clinical-blue font-serif text-xl border-b border-clinical-blue/10 pb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                <Link
                  href="#booking"
                  className="w-full py-4 bg-clinical-blue text-white rounded-xl font-sans font-bold text-center flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar size={18} />
                  Book Appointment
                </Link>
                <a
                  href="tel:09496857648"
                  className="w-full py-4 border border-clinical-blue text-clinical-blue rounded-xl font-sans font-bold text-center flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={18} />
                  Call Clinic
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

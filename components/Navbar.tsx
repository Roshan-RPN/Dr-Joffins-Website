'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/components/Reveal';

const menuItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const navLinks = [
  { name: 'Clinic', href: '#clinic' },
  { name: 'Specialities', href: '#specialities' },
  { name: 'Patient Diaries', href: '#diaries' },
  { name: 'About Doctor', href: '#doctor' },
];

/** Tracks which section sits in the middle band of the viewport, so its link can be highlighted. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActive(href);
          else setActive((current) => (current === href ? null : current));
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const link of navLinks) {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-smooth px-4 sm:px-6 py-4 lg:py-5',
        isScrolled ? 'glass py-3 lg:py-3 shadow-lg' : 'bg-transparent'
      )}
    >
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-mint-teal to-clinical-blue"
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 bg-clinical-blue rounded-full flex items-center justify-center shadow-md shadow-clinical-blue/20">
            <span className="text-white font-serif font-bold text-xl sm:text-2xl">J</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-clinical-blue font-serif font-bold text-lg sm:text-xl xl:text-2xl leading-tight uppercase tracking-widest">
              Dr. JOFFIN&apos;S
            </span>
            <span className="text-clinical-blue/70 text-[9px] sm:text-[11px] lg:text-[10px] xl:text-[11px] font-sans font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em] lg:tracking-[0.12em] xl:tracking-[0.18em] leading-tight">
              Multi-Speciality Dental Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Nav: links grouped in one pill; the highlight slides to the section in view */}
        <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-clinical-blue/10 shadow-sm">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'relative px-3.5 xl:px-5 py-2.5 rounded-full font-sans font-semibold text-[15px] xl:text-[17px] whitespace-nowrap transition-colors duration-300',
                  isActive ? 'text-white' : 'text-clinical-blue/80 hover:text-clinical-blue hover:bg-clinical-blue/5'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-clinical-blue"
                  />
                )}
                <span className="relative">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <Link
          href="#booking"
          className="liquid-fill hidden lg:flex shrink-0 items-center gap-2 px-6 xl:px-7 py-3.5 bg-clinical-blue text-white rounded-full font-sans font-bold text-[15px] xl:text-base shadow-lg shadow-clinical-blue/20 transition-all"
        >
          <Calendar size={18} className="hidden xl:block" />
          Book Consultation
        </Link>

        {/* Mobile Toggle */}
        <button
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden shrink-0 w-11 h-11 rounded-full border border-clinical-blue/15 bg-white/70 flex items-center justify-center text-clinical-blue"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="absolute top-full left-0 right-0 glass !bg-white/95 shadow-2xl lg:hidden overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
              className="flex flex-col px-6 py-8 gap-2 max-w-2xl mx-auto"
            >
              {navLinks.map((link, index) => (
                <motion.div key={link.name} variants={menuItem}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-baseline gap-4 font-serif text-2xl sm:text-3xl border-b border-clinical-blue/10 py-4 transition-colors',
                      active === link.href ? 'text-mint-teal' : 'text-clinical-blue'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-sans text-xs font-bold text-clinical-blue/40 tabular-nums">0{index + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItem} className="grid sm:grid-cols-2 gap-3 pt-6">
                <Link
                  href="#booking"
                  className="w-full py-4 bg-clinical-blue text-white rounded-xl font-sans font-bold text-lg text-center flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar size={20} />
                  Book Appointment
                </Link>
                <a
                  href="tel:09496857648"
                  className="w-full py-4 border border-clinical-blue text-clinical-blue rounded-xl font-sans font-bold text-lg text-center flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={20} />
                  Call Clinic
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

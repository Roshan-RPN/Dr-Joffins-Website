'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-clinical-blue text-white pt-32 pb-16 overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-mint-teal/5 rounded-[100%] blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 mb-10">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <span className="text-clinical-blue font-serif font-bold text-2xl">J</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-serif font-bold text-xl leading-tight uppercase tracking-widest">
                  Dr. JOFFIN&apos;S
                </span>
                <span className="text-white/50 text-[10px] font-sans uppercase tracking-[0.2em] leading-none">
                  MULTI-SPECIALITY DENTAL CLINIC
                </span>
              </div>
            </Link>
            <p className="text-white/60 font-sans text-lg leading-relaxed mb-10">
              Experience the future of dentistry. Meticulous care, advanced technology, and a touch of compassion in every procedure.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-mint-teal transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-mint-teal font-bold uppercase tracking-widest text-xs mb-10">Navigation</h4>
            <ul className="flex flex-col gap-6 text-xl font-serif">
              <li><Link href="#clinic" className="hover:text-mint-teal transition-colors">The Clinic</Link></li>
              <li><Link href="#specialities" className="hover:text-mint-teal transition-colors">Specialities</Link></li>
              <li><Link href="#diaries" className="hover:text-mint-teal transition-colors">Patient Stories</Link></li>
              <li><Link href="#doctor" className="hover:text-mint-teal transition-colors">About Doctor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-mint-teal font-bold uppercase tracking-widest text-xs mb-10">Opening Hours</h4>
            <ul className="flex flex-col gap-3 text-sm font-sans text-white/70">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Monday</span> <span>9:30 AM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Tuesday</span> <span>9:30 AM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Wednesday</span> <span>9:30 AM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Thursday</span> <span>9:30 AM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Friday</span> <span>9:30 AM – 8:00 PM</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Saturday</span> <span>9:30 AM – 8:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>9:30 AM – 1:00 PM</span></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-mint-teal font-bold uppercase tracking-widest text-xs mb-10">Contact</h4>
            <ul className="flex flex-col gap-8">
              <li className="flex gap-4 group justify-center md:justify-start">
                <MapPin className="text-mint-teal shrink-0 group-hover:scale-110 transition-transform" size={24} />
                <a 
                  href="https://maps.app.goo.gl/okYbCncqoCXKqw9WA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 font-sans leading-relaxed hover:text-white transition-colors"
                >
                  1st floor, Erics Enclave, Civil Line Rd, <br />
                  above Best Bakers, Padamughal, Kochi, <br />
                  Kakkanad, Kerala 682030
                </a>
              </li>
              <li className="flex gap-4 justify-center md:justify-start">
                <Phone className="text-mint-teal shrink-0" size={24} />
                <a href="tel:09496857648" className="text-white/80 font-sans text-base hover:text-mint-teal transition-colors tracking-tight">09496857648</a>
              </li>
              <li className="flex gap-4 justify-center md:justify-start">
                <Mail className="text-mint-teal shrink-0" size={24} />
                <span className="text-white/70 font-sans">hello@drjoffin.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-white/30 text-sm font-sans italic">
              © 2026 Dr. JOFFIN&apos;S MULTI-SPECIALITY DENTAL CLINIC.
            </p>
          </div>
          <div className="flex gap-10 text-white/30 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-mint-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-mint-teal transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

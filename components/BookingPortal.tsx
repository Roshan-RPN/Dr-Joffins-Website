'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, CheckCircle2, MessageCircle } from 'lucide-react';

export default function BookingPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Consultation',
    date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-16 rounded-[3rem] border-mint-teal/20"
          >
            <div className="w-24 h-24 bg-mint-teal/10 rounded-full flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 className="text-mint-teal" size={48} />
            </div>
            <h2 className="text-4xl font-serif text-clinical-blue mb-6">Appointment Requested!</h2>
            <p className="text-clinical-blue/60 text-lg mb-10">
              Thank you, {formData.name}. Dr. Joffin&apos;s coordinator will call you within 15 minutes to confirm your slot.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-mint-teal font-sans font-bold border-b-2 border-mint-teal hover:text-clinical-blue hover:border-clinical-blue transition-all"
            >
              Book another appointment
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-32 bg-clinical-blue/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center lg:items-start text-center lg:text-left">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
            <span className="text-mint-teal font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Booking Portal
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-clinical-blue mb-8 leading-tight">
              Start Your Journey to <br /><span className="italic">Clinical Excellence.</span>
            </h2>
            <p className="text-xl text-clinical-blue/60 mb-12 max-w-lg leading-relaxed">
              Fill out the form below or reach out directly on WhatsApp for an immediate consultation.
            </p>

            <div className="flex flex-col gap-6 w-full max-w-md lg:max-w-none">
              <a 
                href="https://wa.me/919496857648"
                className="flex items-center gap-6 p-6 glass rounded-[2rem] border-white/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 bg-mint-teal/10 rounded-2xl flex items-center justify-center text-mint-teal group-hover:bg-[#25D366] group-hover:text-white transition-all">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-serif text-xl text-clinical-blue">Book via WhatsApp</h4>
                  <p className="text-clinical-blue/50 text-sm">Instant confirmation in minutes.</p>
                </div>
              </a>

              <div className="flex items-center gap-6 p-6 glass rounded-[2rem] border-white/50">
                <div className="w-14 h-14 bg-clinical-blue/5 rounded-2xl flex items-center justify-center text-clinical-blue">
                  <Phone size={24} />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-serif text-xl text-clinical-blue">Direct Support</h4>
                  <p className="text-clinical-blue/50 text-sm">09496857648</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-clinical-blue/50 mb-3 block">Full Name</label>
                  <div className="flex items-center gap-4 p-4 bg-clinical-blue/5 rounded-2xl border border-transparent group-focus-within:border-mint-teal group-focus-within:bg-white transition-all">
                    <User className="text-clinical-blue/30" size={20} />
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe" 
                      className="bg-transparent border-none outline-none w-full text-clinical-blue font-sans"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="relative group text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-clinical-blue/50 mb-3 block">Contact Number</label>
                  <div className="flex items-center gap-4 p-4 bg-clinical-blue/5 rounded-2xl border border-transparent group-focus-within:border-mint-teal group-focus-within:bg-white transition-all">
                    <Phone className="text-clinical-blue/30" size={20} />
                    <input 
                      required
                      type="tel" 
                      placeholder="09496857648" 
                      className="bg-transparent border-none outline-none w-full text-clinical-blue font-sans"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="relative group">
                    <label className="text-xs font-bold uppercase tracking-widest text-clinical-blue/50 mb-3 block">Service</label>
                    <div className="flex items-center gap-4 p-4 bg-clinical-blue/5 rounded-2xl border border-transparent focus-within:border-mint-teal focus-within:bg-white transition-all">
                      <select 
                        className="bg-transparent border-none outline-none w-full text-clinical-blue font-sans appearance-none"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                        <option>Consultation</option>
                        <option>Braces</option>
                        <option>Implants</option>
                        <option>Root Canal</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-xs font-bold uppercase tracking-widest text-clinical-blue/50 mb-3 block">Date</label>
                    <div className="flex items-center gap-4 p-4 bg-clinical-blue/5 rounded-2xl border border-transparent focus-within:border-mint-teal focus-within:bg-white transition-all">
                      <Calendar className="text-clinical-blue/30" size={20} />
                      <input 
                        required
                        type="date" 
                        className="bg-transparent border-none outline-none w-full text-clinical-blue font-sans"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="liquid-fill w-full py-6 bg-clinical-blue text-white rounded-3xl font-sans font-bold text-xl transition-all shadow-xl shadow-clinical-blue/20"
                >
                  Schedule Visit
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

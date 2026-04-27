'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sandeep Nair',
    role: 'Local Business Owner',
    content: "Dr. Joffin identifies the bottom of the problem. His diagnosis isn't rushed. He takes his time to explain every detail, which is rare in today's medical world.",
    rating: 5,
  },
  {
    name: 'Anjali Sharma',
    role: 'Mother of Two',
    content: "The clinic is incredibly clean and hygienic. My kids were nervous, but Dr. Joffin's gentle approach made them feel at ease instantly. Zero wait time was a blessing!",
    rating: 5,
  },
  {
    name: 'Rahul Varma',
    role: 'IT Professional',
    content: "Specializes in nervous patients like me. I've always dreaded dentists, but the painless root canal was a revelation. Transparent pricing and top-tier talent.",
    rating: 5,
  },
  {
    name: 'Priya Iyer',
    role: 'Teacher',
    content: "Meticulous attention to detail. The braces treatment plan was so well-explained. Friendly staff and an environment that feels more like a spa than a clinic.",
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Consultant',
    content: "Professional, talented, and most importantly, humble. He listens to his patients. The aesthetic work done on my front teeth is perfection.",
    rating: 5,
  },
  {
    name: 'Meera Deshmukh',
    role: 'Retiree',
    content: "I had a complex surgery done here. The post-op care was exemplary. Dr. Joffin is truly a master of his craft. Highly recommended for complex cases.",
    rating: 5,
  },
];

export default function PatientDiaries() {
  return (
    <section id="diaries" className="py-32 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-clinical-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-mint-teal font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              Patient Diaries
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-clinical-blue">
              Voices of <span className="italic">Trust & Comfort.</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-2xl flex items-center gap-4"
          >
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
              ))}
            </div>
            <div className="h-10 w-[1px] bg-clinical-blue/10" />
            <span className="text-clinical-blue font-bold text-lg">4.9/5 Average</span>
          </motion.div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid glass p-10 rounded-[2rem] border-clinical-blue/5 hover:border-mint-teal/30 transition-all group text-left"
            >
              <Quote className="text-mint-teal/20 mb-6 group-hover:text-mint-teal/40 transition-colors" size={40} />
              <p className="text-clinical-blue/80 text-lg leading-relaxed mb-8 font-sans">
                &quot;{review.content}&quot;
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-clinical-blue font-serif font-bold text-xl truncate">{review.name}</h4>
                  <p className="text-clinical-blue/50 text-sm truncate">{review.role}</p>
                </div>
                <div className="w-12 h-12 shrink-0 bg-clinical-blue/5 rounded-full flex items-center justify-center text-mint-teal font-bold border border-mint-teal/10">
                  {review.rating}.0
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

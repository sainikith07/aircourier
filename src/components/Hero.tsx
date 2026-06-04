/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, ChevronRight, Scale, ShieldCheck, HelpCircle, 
  Star, Quote, Plus, Minus, ChevronLeft, Phone
} from 'lucide-react';
import { COURIER_PARTNERS, FAQS, TESTIMONIALS } from '../data/pricing';

export default function Hero({ setPage }: { isDarkMode?: boolean, setPage: (pg: any) => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-advance testimonials carousel slowly
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="font-sans antialiased bg-[#FAF9F5]">
      
      {/* 1. HERO MAIN SECTION */}
      <section className="relative pt-36 pb-24 overflow-hidden border-b border-slate-200/60 bg-white">
        
        {/* Cargo Flight Background Image Backdrop with very subtle Light Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-multiply">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1920" 
            alt="International Air Flight Grid" 
            className="w-full h-full object-cover scale-105 select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Global Logistics network radial light background */}
        <div className="absolute inset-0 bg-radial-at-t from-[#FFFFFF]/90 to-[#FAF9F5] opacity-95 z-0" />

        {/* Floating Courier Aircraft vector drift */}
        <div className="absolute top-24 right-10 md:right-32 w-52 h-52 opacity-15 aircraft-drift pointer-events-none z-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-dhl-yellow">
            <path d="M10 50 L40 45 L65 20 L75 25 L58 46 L90 50 L95 48 L93 52 L90 54 L58 58 L75 79 L65 84 L40 59 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Ambient background blur blobs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-dhl-yellow/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/10 w-[400px] h-[400px] bg-dhl-red/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Copy details */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Highlight experience badge with Ping indicator */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-dhl-yellow/15 border border-dhl-yellow/40 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dhl-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-dhl-red"></span>
                </span>
                <span className="text-[10px] font-black tracking-wider text-dhl-dark uppercase font-mono">13+ Years of Sovereign Trust</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight text-dhl-dark leading-none">
                  FASTEST AIR <span className="text-dhl-red tracking-tight font-black block sm:inline">COURIER</span>
                </h1>
                
                <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#D40511] font-sans">
                  "Get India Next To Your Door"
                </p>
              </div>

              {/* Core descriptive pitch statement */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl font-sans leading-relaxed">
                Connect your household items directly to relatives abroad. We specialize in express, custom-cleared deliveries of spices, unsealed homemade <strong className="text-dhl-dark font-extrabold">Avakaya pickles</strong>, NRI packing, prescription medicines, and college marksheets with professional triple-layer vacuum seals.
              </p>

              {/* Core horizontal highlight badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-dhl-yellow/15 text-dhl-red flex items-center justify-center font-bold text-sm shrink-0">
                    ★
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-dhl-dark tracking-wide font-display">FREE HOME PICKUP</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">We scale and pick up packages from your home directly</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-dhl-red/10 text-dhl-red flex items-center justify-center font-bold text-sm shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-dhl-dark tracking-wide font-display">NRI VACUUM PACKING</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Heavy-duty leakage-proof defense for liquids & pickles</p>
                  </div>
                </div>
              </div>

              {/* Action buttons CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => setPage('price-enquiry')}
                  className="px-8 py-4.5 bg-dhl-yellow hover:bg-[#e6b800] text-dhl-dark font-semibold text-xs uppercase tracking-widest font-display rounded-xl shadow transition duration-200 flex items-center justify-center gap-2"
                >
                  Get Shipment Rates
                  <ChevronRight className="w-4 h-4 text-dhl-dark" />
                </button>
                
                <button
                  onClick={() => setPage('track-shipment')}
                  className="px-8 py-4.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-xs uppercase tracking-widest font-display rounded-xl transition duration-200"
                >
                  Track Shipment
                </button>
              </div>

              {/* Large Trust Statement */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-dhl-red shrink-0" />
                <span className="text-[11px] font-medium italic text-slate-500 font-sans tracking-wide">
                  "More Than Parcels, We Deliver Trust"
                </span>
              </div>

            </div>

            {/* Right Column: Dynamic Profile Card */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-dhl-yellow/10 to-dhl-red/5 rounded-3xl filter blur-xl" />
              
              <div className="relative p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between min-h-[380px] shadow-lg">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-dhl-yellow/5 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Fastest Air Courier HQ</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-100 uppercase tracking-wider">
                      Active Dispatch
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-dhl-dark">Kaleru Veena</h3>
                  <p className="text-xs text-dhl-red mt-1 font-mono font-bold uppercase tracking-wider">Proprietor / Managing Leader</p>
                  <p className="text-xs text-slate-500 mt-3 font-sans leading-relaxed">
                    Directly manages airport clearances, weight approvals, and priority scheduling outbound from Hyderabad for NRIs worldwide.
                  </p>

                  <div className="space-y-3.5 mt-6">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-dhl-yellow transition duration-150">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">MAIN DIRECT NUMBER</div>
                      <a href="tel:+919573105953" className="text-lg font-mono font-bold text-dhl-dark hover:text-dhl-red transition flex items-center gap-2 mt-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        +91 95731 05953
                      </a>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-dhl-yellow transition duration-150">
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">ALTERNATIVE LINE</div>
                      <a href="tel:+919000527923" className="text-lg font-mono font-bold text-dhl-dark hover:text-dhl-red transition flex items-center gap-2 mt-1">
                        <Phone className="w-3.5 h-3.5 text-dhl-red shrink-0" />
                        +91 90005 27923
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-slate-400 text-center pt-5 border-t border-slate-100 mt-6 font-bold uppercase tracking-widest">
                  🛡️ 13+ years continuous industry leadership
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. COURIER PARTNER SECTION */}
      <section className="relative py-16 bg-[#FAF9F5] border-b border-slate-200/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-[#D40511] uppercase tracking-widest bg-dhl-red/10 px-2.5 py-1 rounded-full border border-dhl-red/15 font-bold">Network Integrations</span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-dhl-dark mt-3.5 tracking-tight">Our Premium Cargo Carrier Partners</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
            {COURIER_PARTNERS.map((partner) => {
              return (
                <div
                  key={partner.id}
                  onClick={() => setPage('track-shipment')}
                  className="p-5 rounded-2xl bg-white border border-slate-200/60 flex flex-col items-center justify-center text-center cursor-pointer transition duration-200 hover:-translate-y-1 hover:border-dhl-red hover:shadow-md group relative"
                >
                  <div className={`p-1.5 rounded bg-gradient-to-r ${partner.color} text-white font-mono text-[9px] uppercase font-bold tracking-widest leading-none mb-3`}>
                    {partner.logoText}
                  </div>
                  <h4 className="text-xs font-sans font-bold text-slate-700 group-hover:text-dhl-dark transition-colors">
                    {partner.name}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-400 mt-1 block group-hover:text-[#D40511] font-bold">
                    Track Cargo →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE STATS MILESTONES */}
      <section className="relative py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-dhl-yellow transition duration-200 group">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-dhl-red font-mono tracking-tighter">13+ Years</span>
                <h4 className="font-display font-extrabold text-dhl-dark text-base mt-3">Direct Customs Expertise</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans mt-3">
                Over a decade ensuring friction-free border clearances for delicate spices, homemade foods, and college marksheets.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-dhl-yellow transition duration-200 group">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-dhl-dark font-mono tracking-tighter">1,000+</span>
                <h4 className="font-display font-extrabold text-dhl-dark text-base mt-3">Verified Happy NRI Families</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans mt-3">
                Serving happy families across USA, UK, Europe, New Zealand, and Australia with absolute care.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:border-dhl-yellow transition duration-200 group">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-emerald-600 font-mono tracking-tighter">100% Secure</span>
                <h4 className="font-display font-extrabold text-dhl-dark text-base mt-3">Leakage Protection</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans mt-3">
                Professional triple laminated heat sealing for pickle boxes guarantees uncompromised custom clearance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PREMIUM TESTIMONIALS CAROUSEL */}
      <section className="relative py-20 bg-[#FAF9F5] overflow-hidden">
        
        <div className="absolute -left-36 top-1/2 -translate-y-1/2 w-96 h-96 bg-dhl-yellow/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -right-36 top-1/2 -translate-y-1/2 w-96 h-96 bg-dhl-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full font-bold">Client Reviews</span>
            <h3 className="font-display text-3xl font-extrabold text-dhl-dark mt-3 tracking-tight">Voices of Satisfied Families</h3>
          </div>

          <div className="relative p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute left-6 top-6 opacity-5 pointer-events-none">
              <Quote className="w-20 h-20 text-dhl-red" />
            </div>

            <div className="min-h-[140px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Rating Stars indicators */}
                  <div className="flex gap-1">
                    {[...Array(TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFCC00] text-[#FFCC00]" />
                    ))}
                  </div>

                  {/* Main Quote Text */}
                  <p className="text-sm sm:text-base text-slate-600 italic font-sans leading-relaxed text-center sm:text-left">
                    "{TESTIMONIALS[currentTestimonialIndex].text}"
                  </p>

                  {/* Reviewer Meta details */}
                  <div className="border-t border-slate-100 pt-4 mt-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div>
                      <h5 className="font-bold text-dhl-dark font-sans text-sm">
                        {TESTIMONIALS[currentTestimonialIndex].name}
                      </h5>
                      <span className="text-xs text-slate-400 mt-0.5 block">{TESTIMONIALS[currentTestimonialIndex].location}</span>
                    </div>
                    
                    <span className="text-[9px] px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full font-mono font-bold uppercase tracking-wider">
                      {TESTIMONIALS[currentTestimonialIndex].serviceUsed}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Slider arrows controls */}
            <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 pt-4">
              <button
                onClick={handlePrevTestimonial}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleNextTestimonial}
                className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQS ACCORDION */}
      <section className="relative py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-[#FAF9F5] border border-slate-200 px-2.5 py-1 rounded-full font-bold">Support Center</span>
            <h3 className="font-display text-3xl font-extrabold text-dhl-dark mt-3.5 tracking-tight">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200/60 bg-[#FAF9F5]/40 hover:bg-[#FAF9F5] p-5 cursor-pointer select-none transition duration-150"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div className="flex justify-between items-center gap-3.5">
                    <span className="text-[10px] font-mono text-slate-505 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200 font-bold shrink-0">
                      {faq.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-sans font-bold text-dhl-dark flex-1 text-left">
                      {faq.question}
                    </h4>
                    {isOpen ? <Minus className="w-4 h-4 text-slate-400 shrink-0" /> : <Plus className="w-4 h-4 text-slate-400 shrink-0" />}
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans pt-3.5 mt-3.5 border-t border-slate-100"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

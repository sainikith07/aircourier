/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Plane, Sparkles } from 'lucide-react';

export function FloatingWidgets() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-45 flex flex-col gap-3.5 no-print transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      {/* 1. Click-to-dial Floating Button */}
      <a
        href="tel:+919573105953"
        className="w-13 h-13 bg-[#D40511] hover:bg-[#b9040e] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all outline-none border border-dhl-yellow/50 relative group"
        aria-label="Call Kaleru Veena directly"
      >
        <Phone className="w-5.5 h-5.5 animate-pulse" />
        <span className="absolute right-15 bg-slate-900 border border-slate-700 text-[10px] text-white font-sans font-bold px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
          Call Proprietor Office
        </span>
        {/* Soft glowing beacon ring */}
        <span className="absolute -inset-1 rounded-full border border-dhl-yellow/40 animate-ping opacity-30 pointer-events-none" />
      </a>

      {/* 2. WhatsApp floating Button */}
      <a
        href="https://wa.me/919573105953?text=Hi%20Fastest%20Air%20Courier!%20I%20would%20like%20to%20enquire%20about%20sending%2520a%2520parcel%2520internationally."
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all outline-none border border-white relative group"
        aria-label="Direct WhatsApp message"
      >
        <MessageCircle className="w-5.5 h-5.5" />
        <span className="absolute right-15 bg-slate-900 border border-slate-700 text-[10px] text-white font-sans font-bold px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

export function PremiumLoadingScreen() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setComplete(true);
    }, 1200); // Elegant short delay establishes high-end premium feel
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 bg-[#FAF9F5] text-dhl-dark flex flex-col items-center justify-center font-sans no-print"
        >
          {/* Central spinner and logo */}
          <div className="relative text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              {/* Outer DHL Yellow & Red rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dhl-yellow/20 border-t-[#D40511] animate-spin duration-700" />
              
              {/* Airplane takeoff path overlay */}
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center border border-slate-205 shadow-md">
                <Plane className="w-8 h-8 text-dhl-red transform -rotate-45" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-display font-black text-2xl tracking-tight text-dhl-dark">
                FASTEST AIR <span className="text-dhl-red font-black">COURIER</span>
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-[#D40511] uppercase font-black">
                "Get India Next To Your Door"
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-mono font-bold">
              <Sparkles className="w-4 h-4 text-dhl-yellow animate-pulse" />
              <span>ROUTING LOGISTICS PIPELINE...</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plane, Mail, MapPin, Phone, ShieldCheck, HeartPulse, Sparkles, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  setActivePage: (p: any) => void;
  isDarkMode?: boolean;
}

export default function Footer({ setActivePage }: FooterProps) {
  const currentYear = 2026;

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'price-enquiry', label: 'Price Enquiry' },
    { id: 'track-shipment', label: 'Track Shipment' },
    { id: 'prohibited-items', label: 'Prohibited Items' },
    { id: 'terms', label: 'Terms & Conditions' }
  ];

  return (
    <footer className="border-t border-slate-250 bg-slate-100 text-slate-650 pt-16 pb-12 font-sans relative z-10 no-print">
      
      {/* Footer Top Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Box 1: Brand details (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="p-2.5 bg-dhl-yellow rounded-xl text-dhl-dark shadow">
                <Plane className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="font-display font-black text-lg text-dhl-dark tracking-tight">
                FASTEST AIR <span className="text-dhl-red">COURIER</span>
              </h3>
            </div>

            <p className="text-xs text-slate-550 leading-relaxed font-sans">
              Founded over 13+ years ago, Fastest Air Courier delivers elite international logistics cargo services from Hyderabad and Bangalore to major worldwide destinations with dedicated airport schedules.
            </p>

            {/* Certifications highlights */}
            <div className="space-y-2 bg-white border border-slate-200/80 p-4 rounded-xl text-xs font-sans">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SSL Secure Encryption Active</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <HeartPulse className="w-4 h-4 text-dhl-red font-bold" />
                <span>24×7 Executive Helpline Support</span>
              </div>

              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Sparkles className="w-4 h-4 text-dhl-red" />
                <span>Custom Transit Cargo Insurance</span>
              </div>
            </div>
          </div>

          {/* Box 2: Location and Coordinates (4 columns) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-display text-xs font-black tracking-widest text-[#1A1A1A] uppercase">
              Physical Location & HQ
            </h4>

            <div className="space-y-3.5 text-xs">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-dhl-red shrink-0 mt-0.5" />
                <p className="leading-relaxed font-sans text-slate-600">
                  Beside Mega Driving School,
                  <br/>
                  Near Red Water Tank,
                  <br/>
                  Vanasthalipuram,
                  <br/>
                  Hyderabad - 500070
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                <a 
                  href="mailto:sainikith04@gmail.com"
                  className="hover:text-dhl-red transition font-mono hover:underline font-bold"
                >
                  sainikith04@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-3.5 border-t border-slate-200">
                <Phone className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="font-sans text-xs">
                  <div>Kaleru Veena (Proprietor): <a href="tel:+919573105953" className="text-dhl-dark hover:underline font-bold">+91 95731 05953</a></div>
                  <div className="mt-1">Desk Representative: <a href="tel:+919000527923" className="text-dhl-dark hover:underline font-bold">+91 90005 27923</a></div>
                </div>
              </div>

            </div>
          </div>

          {/* Box 3: Quick Navigation links (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-black tracking-widest text-[#1A1A1A] uppercase">
              Directory Grid
            </h4>
            
            <ul className="space-y-2.5 text-xs font-sans font-bold">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setActivePage(link.id as PageId)}
                    className="text-slate-600 hover:text-dhl-red transition cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setActivePage('admin')}
                  className="text-emerald-700 hover:text-emerald-900 font-mono font-bold"
                >
                  🔐 System Admin config
                </button>
              </li>
            </ul>
          </div>

          {/* Box 4: Trust metrics (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-black tracking-widest text-[#1A1A1A] uppercase">
              Key Metrics
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-black text-dhl-dark font-mono leading-none">1,000+</div>
                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-1.5 font-bold">Happy Families</div>
              </div>

              <div>
                <div className="text-3xl font-black text-dhl-red font-mono leading-none">13+</div>
                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-1.5 font-bold">Years Experience</div>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center gap-2 pt-2">
                <a 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white border border-slate-200 rounded hover:bg-[#D40511] hover:text-white text-slate-400 transition"
                  aria-label="Facebook link"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>

                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white border border-slate-200 rounded hover:bg-[#D40511] hover:text-white text-slate-400 transition"
                  aria-label="Instagram link"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>

                <a 
                  href="https://wa.me/919573105953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white border border-slate-200 rounded hover:bg-emerald-600 hover:text-white text-slate-400 transition"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>

                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white border border-slate-200 rounded hover:bg-blue-700 hover:text-white text-slate-400 transition"
                  aria-label="LinkedIn link"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer legal statement bottom row */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4 font-bold">
          <div>
            © {currentYear} Fastest Air Courier. All Rights Reserved. Proprietor: Kaleru Veena.
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-400">
            <span>Verified SSL Secure</span>
            <span>|</span>
            <span>IATA Compliant Facility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

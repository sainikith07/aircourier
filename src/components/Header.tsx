/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Plane, Menu, X, Phone } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  activePage: PageId | 'admin';
  setActivePage: (p: any) => void;
  isDarkMode: boolean;
  setIsDarkMode: (m: boolean) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'price-enquiry', label: 'Price Enquiry' },
    { id: 'track-shipment', label: 'Track Shipment' },
    { id: 'prohibited-items', label: 'Prohibited Items' },
    { id: 'terms', label: 'Terms & Conditions' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 font-sans ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-2 shadow-sm' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Animated Icon */}
          <div 
            onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="p-2 bg-dhl-yellow rounded-2xl text-dhl-dark shadow group-hover:rotate-12 transition-transform duration-300">
              <Plane className="w-5 h-5 transform group-hover:translate-x-0.5" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg sm:text-xl tracking-tight text-dhl-dark flex items-center gap-1 leading-none">
                FASTEST AIR <span className="text-dhl-red">COURIER</span>
              </h1>
              <span className="text-[9px] font-mono tracking-widest text-[#D40511] font-extrabold uppercase leading-none mt-1 block">
                GLOBAL GLASS LOGISTICS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 border border-slate-200/50 p-1 rounded-xl">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id as PageId)}
                  className={`px-4.5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider font-display transition duration-200 ${
                    isActive
                      ? 'bg-dhl-yellow text-dhl-dark shadow-sm'
                      : 'text-slate-600 hover:text-dhl-dark hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => setActivePage('admin')}
              className={`ml-1 px-3.5 py-2 rounded-lg border text-[10px] font-mono font-bold uppercase transition duration-200 ${
                activePage === 'admin'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-transparent border-slate-200/80 text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              🔐 Admin Panel
            </button>
          </nav>

          {/* Direct Actions: Contact Details / Call (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Slogan highlight label */}
            <span className="text-[11px] font-sans font-medium italic text-slate-500 tracking-wider hidden xl:inline">
              "Get India Next To Your Door"
            </span>

            {/* Quick call dial badge (clickable) */}
            <a 
              href="tel:+919573105953"
              className="px-5 py-2.5 bg-dhl-red hover:bg-[#b9040e] text-white font-bold text-[11px] uppercase tracking-wider font-display rounded-xl transition duration-200 flex items-center gap-2 shadow"
            >
              <Phone className="w-3.5 h-3.5 text-white animate-bounce" />
              <span>+91 95731 05953</span>
            </a>
          </div>

          {/* Mobile Right Controls: Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-dhl-dark"
              aria-label="Toggle mobile menu drawer"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 space-y-4 shadow-xl font-display">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id as PageId);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  activePage === link.id
                    ? 'bg-dhl-yellow/30 border border-dhl-yellow text-dhl-dark'
                    : 'text-slate-600 hover:text-dhl-dark hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                setActivePage('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                activePage === 'admin'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-805'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🔐 Authenticate Admin
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            <a 
              href="tel:+919573105953"
              className="w-full py-3.5 bg-dhl-red hover:bg-[#b9040e] text-white font-bold text-xs text-center uppercase tracking-wider rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Proprietor Veena
            </a>
            
            <div className="text-center mt-1">
              <span className="text-[10px] text-slate-400 font-mono tracking-widest font-bold">FASTEST AIR COURIER • INT'L DEPT</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

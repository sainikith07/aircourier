/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Info, Flame, Eye, Lock, Search, AlertCircle, Sparkles, Scale } from 'lucide-react';

interface ProhibitedCargo {
  name: string;
  category: "Extreme Hazard" | "Explosion/Fire" | "Strict Regulation" | "Customs Ban";
  severity: "CRITICAL BANNED" | "STRICT CONST" | "HIGH RISK";
  explanation: string;
  imageUrl: string;
  icon: any;
}

const ITEMS_LIST: ProhibitedCargo[] = [
  {
    name: "Perfumes",
    category: "Explosion/Fire",
    severity: "CRITICAL BANNED",
    explanation: "Alcohol-based perfumes or pressurized colognes pose explosion and combustion risks in low-pressure cargo compartments.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    icon: Flame
  },
  {
    name: "Explosives",
    category: "Extreme Hazard",
    severity: "CRITICAL BANNED",
    explanation: "All dynamite, ammunition multipliers, blasting caps, or military-grade detonation materials are completely illegal.",
    imageUrl: "https://images.unsplash.com/photo-1544411047-c491e34a24e0?auto=format&fit=crop&q=80&w=600",
    icon: ShieldAlert
  },
  {
    name: "Firearms",
    category: "Strict Regulation",
    severity: "CRITICAL BANNED",
    explanation: "Assault rifles, handguns, replicas, components, and barrel mechanisms are strictly banned from commercial air cargo transport.",
    imageUrl: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=600",
    icon: Lock
  },
  {
    name: "Ammunition",
    category: "Extreme Hazard",
    severity: "CRITICAL BANNED",
    explanation: "Live cartridges, bullet casings, shotgun shells, and loaded weapon magazines are immediate air-passenger hazards.",
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=600",
    icon: Lock
  },
  {
    name: "Illegal Drugs",
    category: "Customs Ban",
    severity: "CRITICAL BANNED",
    explanation: "All narcotics, marijuana products, and unapproved chemical stimulants are reported to international customs and federal police immediately.",
    imageUrl: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=600",
    icon: ShieldAlert
  },
  {
    name: "Hazardous Chemicals",
    category: "Extreme Hazard",
    severity: "CRITICAL BANNED",
    explanation: "Corrosive acids, battery electrolytes, bleaching solutions, or caustic industrial reagents cause fatal fuselage deterioration.",
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=600",
    icon: AlertCircle
  },
  {
    name: "Flammable Liquids",
    category: "Explosion/Fire",
    severity: "CRITICAL BANNED",
    explanation: "Gasoline, alcohol reagents, lighter fluid, petroleum solvents, and thinners easily ignite under continuous transit friction.",
    imageUrl: "https://images.unsplash.com/photo-1538338621430-d441f3d4548c?auto=format&fit=crop&q=80&w=600",
    icon: Flame
  },
  {
    name: "Toxic Materials",
    category: "Extreme Hazard",
    severity: "CRITICAL BANNED",
    explanation: "Biohazard compounds, poisons, pest poisons, insecticides, and toxic industrial dusts pose chemical ingestion risks to ground handlers.",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351166?auto=format&fit=crop&q=80&w=600",
    icon: AlertCircle
  },
  {
    name: "Currency Notes",
    category: "Customs Ban",
    severity: "CRITICAL BANNED",
    explanation: "Hard paper cash, bullion coins, gold biscuits, bearer checks, and active lottery coupons are restricted from standard legal baggage lanes.",
    imageUrl: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&q=80&w=600",
    icon: Lock
  },
  {
    name: "Perishable Goods",
    category: "Customs Ban",
    severity: "HIGH RISK",
    explanation: "Unsealed fresh meat, fish, wet dairy products, and loose non-vacuumed perishables rot rapidly and are rejected by destination custom ports.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    icon: Info
  },
  {
    name: "Live Animals",
    category: "Customs Ban",
    severity: "CRITICAL BANNED",
    explanation: "Live animals, insects, fishes, or flora specimens cannot be booked under standard air luggage parcel parameters.",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600",
    icon: Info
  },
  {
    name: "Lithium Batteries",
    category: "Explosion/Fire",
    severity: "STRICT CONST",
    explanation: "Stand-alone lithium batteries or backup chargers are banned. Batteries integrated inside registered electronic gadgets are conditionally permitted.",
    imageUrl: "https://images.unsplash.com/photo-1620286337471-9ba30c009068?auto=format&fit=crop&q=80&w=600",
    icon: Flame
  },
  {
    name: "Fireworks",
    category: "Explosion/Fire",
    severity: "CRITICAL BANNED",
    explanation: "Sparklers, festive firecrackers, gunpowder formulas, and phosphorus flares hold immediate flight combustion categorization.",
    imageUrl: "https://images.unsplash.com/photo-1533230393054-041a50ee56d1?auto=format&fit=crop&q=80&w=600",
    icon: Flame
  },
  {
    name: "Gas Cylinders",
    category: "Extreme Hazard",
    severity: "CRITICAL BANNED",
    explanation: "Pressurized camping canisters, propane cylinders, non-approved oxygen cylinders, and aerosol paint boxes are susceptible to air detonation.",
    imageUrl: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600",
    icon: AlertCircle
  },
  {
    name: "Sharp Weapons",
    category: "Strict Regulation",
    severity: "CRITICAL BANNED",
    explanation: "Tactical knives, heavy axes, swords, throwing blades, and mechanical weaponry components are illegal for cargo safety dispatch.",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=600",
    icon: ShieldAlert
  },
  {
    name: "Counterfeit Products",
    category: "Customs Ban",
    severity: "CRITICAL BANNED",
    explanation: "Forged designer clothing, duplicate consumer goods, and fake brand electronics are subject to immediate custom confiscation and copyright litigation.",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    icon: ShieldAlert
  },
  {
    name: "Radioactive Materials",
    category: "Extreme Hazard",
    severity: "CRITICAL BANNED",
    explanation: "Any industrial diagnostic equipment, isotopes, or glowing compounds containing critical uranium, radium, or thorium fractions are banned.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600",
    icon: AlertCircle
  }
];

export default function ProhibitedItems({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredItems = ITEMS_LIST.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.explanation.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "ALL" || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ["ALL", "Extreme Hazard", "Explosion/Fire", "Strict Regulation", "Customs Ban"];

  return (
    <section id="prohibited" className="relative py-20 bg-[#FAF9F5] min-h-screen text-[#1A1A1A]">
      {/* Visual background lights */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-dhl-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
            <ShieldAlert className="w-4 h-4 text-dhl-red" />
            <span className="text-[11px] font-extrabold tracking-wider text-dhl-red uppercase font-display">Carriage Safety Regulations</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
            Items That Cannot Be Shipped
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            To comply with standard IATA aviation laws, global customs safety policies and shipping protocols, the following items are strictly banned.
          </p>
        </div>

        {/* Live Filter Dashboard */}
        <div className="space-y-6 max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search restricted chemical, battery, aerosol item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 focus:border-dhl-red font-sans text-sm shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-xl border transition font-sans font-bold shadow-sm ${
                  activeCategory === cat
                    ? "bg-[#FFCC00] border-dhl-red text-[#1A1A1A]"
                    : "bg-white border-slate-200 text-slate-600 hover:text-[#1A1A1A] hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prohibited Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                id={`prohibited-item-${index}`}
                className="group relative rounded-3xl overflow-hidden bg-[#1A1A1A] border border-slate-200 hover:border-dhl-red/60 transition-all duration-300 flex flex-col h-[390px] shadow-md hover:shadow-xl hover:-translate-y-1.5"
              >
                {/* Background image covering the entire card */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {/* ~65% image overlay to guarantee flawless text contrast */}
                  <div className="absolute inset-0 bg-black/65 transition-colors group-hover:bg-black/75 duration-300" />
                </div>

                {/* Content layers entirely in white text */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Category and Severity indicators */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2.5 py-1 rounded bg-white/15 backdrop-blur-md text-white font-bold tracking-wider font-sans uppercase">
                      {item.category}
                    </span>
                    <span className={`text-[10px] px-2.5 py-1 rounded font-black font-mono tracking-widest ${
                      item.severity === "CRITICAL BANNED"
                        ? "bg-red-600 text-white shadow shadow-red-600/30"
                        : "bg-[#FFCC00] text-[#1A1A1A] font-black shadow shadow-[#FFCC00]/30"
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  {/* Icon and text details */}
                  <div className="space-y-3.5">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-600/20">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <h3 className="font-display text-2xl font-extrabold text-white tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-slate-200 font-sans leading-relaxed font-medium">
                      {item.explanation}
                    </p>

                    <div className="border-t border-white/20 pt-3.5 mt-2 flex items-center justify-between text-[11px] text-red-400 font-mono">
                      <span className="flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        FLIGHT COMPLIANCE VOID
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-300 bg-white/10 px-1.5 py-0.5 rounded">IATA BAN</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-red-200 rounded-3xl bg-red-500/5">
              <ShieldAlert className="w-12 h-12 text-dhl-red mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-1">Checking Specialized Cargo?</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto font-sans font-medium">
                No items match your specific query. If you're wondering about a complex chemical composite or medical device, chat with our team right away.
              </p>
            </div>
          )}
        </div>

        {/* Footnote banner */}
        <div className="mt-16 bg-white border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans font-semibold text-slate-500 shadow-sm">
          <span>⚠️ Attempting to ship prohibited items using fake labeling constitutes a federal offense under civil aviation penalties.</span>
          <span className="text-red-600 font-bold shrink-0 font-mono">REGULATION ACT 2026</span>
        </div>

      </div>
    </section>
  );
}

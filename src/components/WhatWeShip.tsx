/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Apple, FileText, BookOpen, Soup, Pill, Shirt, 
  Tv, Gift, Briefcase, Home, Sparkles, Scale, Search, ShieldAlert, ArrowRight,
  PackageCheck
} from 'lucide-react';

interface ShipCategory {
  name: string;
  icon: any;
  description: string;
  nriLevel: "Standard Safe" | "Triple Lamination Required" | "Vacuum Sealing Required" | "Document Shield Case";
  transitNotes: string;
  color: string;
  tags: string[];
}

const SHIP_CATEGORIES: ShipCategory[] = [
  {
    name: "Groceries",
    icon: Apple,
    description: "Daily spices, pulses, rice, traditional powders, and masala mixtures packed for immediate export.",
    nriLevel: "Vacuum Sealing Required",
    transitNotes: "Must be sealed in commercial-grade polythene bags to prevent custom quarantine friction.",
    color: "from-emerald-500/15 to-teal-500/5",
    tags: ["exotic spices", "dal", "powders", "lentils"]
  },
  {
    name: "Documents",
    icon: FileText,
    description: "Urgent university certificates, transcripts, marksheets, visa files, birth certificates, and contracts.",
    nriLevel: "Document Shield Case",
    transitNotes: "Dispatched in reinforced water-resistant document envelopes via priority next-day flights.",
    color: "from-sky-500/15 to-blue-500/5",
    tags: ["visas", "transcripts", "deeds", "certificates"]
  },
  {
    name: "Books",
    icon: BookOpen,
    description: "Academic textbooks, regional publications, engineering volumes, and family literature journals.",
    nriLevel: "Standard Safe",
    transitNotes: "Shrink-wrapped to protect paper materials against high altitude moisture variations.",
    color: "from-amber-500/15 to-orange-500/5",
    tags: ["textbooks", "novels", "notebooks", "manuals"]
  },
  {
    name: "Dry Fruits",
    icon: Sparkles,
    description: "Premium almonds, cashew nuts, pistachios, dry dates, walnuts, and customized festive nutrient mixes.",
    nriLevel: "Standard Safe",
    transitNotes: "Airtight vacuum packs avoid altitude rancidity and structural deterioration.",
    color: "from-yellow-500/15 to-amber-600/5",
    tags: ["kaju", "badam", "pista", "dates", "walnuts"]
  },
  {
    name: "Medicines",
    icon: Pill,
    description: "Prescription healthcare tablets, homeopathic treatments, Ayurvedic roots, and urgent physical remedies.",
    nriLevel: "Standard Safe",
    transitNotes: "Requires physical doctor prescription copy and official pharmacy invoice for clearance.",
    color: "from-rose-500/15 to-pink-500/5",
    tags: ["ayurveda", "tablets", "prescriptions", "homeopathy"]
  },
  {
    name: "Clothing",
    icon: Shirt,
    description: "Traditional designer sarees, wedding sherwanis, cotton daily wear, and customized ethnic apparel.",
    nriLevel: "Standard Safe",
    transitNotes: "Sealed inside heavy moisture-barrier outer polymers. Free weight compression available to reduce size.",
    color: "from-purple-500/15 to-indigo-500/5",
    tags: ["saree", "kurta", "garments", "sherwani", "suits"]
  },
  {
    name: "Food Items",
    icon: Soup,
    description: "Delicious homeland snacks, appalams, dry papads, organic cold-pressed oils, and spices.",
    nriLevel: "Vacuum Sealing Required",
    transitNotes: "Hermetically sealed via NRI guidelines; passes international FDA border hygiene effortlessly.",
    color: "from-violet-500/15 to-fuchsia-500/5",
    tags: ["papads", "snacks", "muruku", "namkeen"]
  },
  {
    name: "Pickles (Pachadi)",
    icon: Soup,
    description: "Avakaya mango pickle, gongura pachadi, garlic tomato pickle, and all non-vegetarian homemade delicacies.",
    nriLevel: "Vacuum Sealing Required",
    transitNotes: "We specialize in leakage-proof, 3-layer bubble packaging + heat-induction vacuum sealing.",
    color: "from-dhl-yellow/20 to-dhl-red/5",
    tags: ["mango pickle", "gongura", "avakaya", "chutney", "non-veg pickles"]
  },
  {
    name: "Sweets",
    icon: Sparkles,
    description: "Traditional sweets, laddu, kaju katli, son papdi, and customized bakery treats from prestigious sweetshops.",
    nriLevel: "Vacuum Sealing Required",
    transitNotes: "Triple-layer nitrogen-flushed cardboard packages available to prevent damage/crushing.",
    color: "from-yellow-400/15 to-red-500/5",
    tags: ["laddu", "kaju katli", "halwa", "sweets"]
  },
  {
    name: "Electronics",
    icon: Tv,
    description: "Smartphones, smartwatch screens, processing units, headphones, routers, and micro hardware.",
    nriLevel: "Triple Lamination Required",
    transitNotes: "Packed in specialized electrostatic-shield foam cartons. Lithium batteries must correspond inside.",
    color: "from-cyan-500/15 to-blue-600/5",
    tags: ["smartphones", "laptops", "watches", "hardware"]
  },
  {
    name: "Gifts",
    icon: Gift,
    description: "Surprise birthday souvenirs, custom portraits, metallic silver gift-plates, and customized memory boxes.",
    nriLevel: "Triple Lamination Required",
    transitNotes: "Genuinely padded with extra soft air cushion wrap to avoid transit shock impact.",
    color: "from-rose-400/15 to-pink-600/5",
    tags: ["souvenirs", "portraits", "presents", "clocks"]
  },
  {
    name: "Personal Belongings",
    icon: Briefcase,
    description: "Checked relocation suitcases, sports fitness gear, vanity sets, memories, and personal items.",
    nriLevel: "Triple Lamination Required",
    transitNotes: "Double heavy duty shrink wraps. We scale and secure handles for seamless airport sorting.",
    color: "from-slate-500/15 to-slate-700/5",
    tags: ["suitcases", "luggage", "shoes", "diaries"]
  },
  {
    name: "Household Items",
    icon: Home,
    description: "Custom steel utensils, heavy brass pooja plates, non-stick cooking pots, and hand-woven artifacts.",
    nriLevel: "Triple Lamination Required",
    transitNotes: "Heavy gauge wooden crating available for fragile brass or glassware structures.",
    color: "from-blue-700/15 to-indigo-900/5",
    tags: ["utensils", "pots", "brass", "pooja thali"]
  },
  {
    name: "Festival Items",
    icon: Sparkles,
    description: "Diwali clays, beautiful handmade clay diyas, Ganesh clay idols, decorative lights, and puja accessories.",
    nriLevel: "Triple Lamination Required",
    transitNotes: "Dispatched under high-fragility cargo regulations. Packed with specialized custom partition foam.",
    color: "from-amber-400/20 to-red-500/5",
    tags: ["diyas", "clays", "ganesha", "rakhi", "puja box"]
  }
];

export default function WhatWeShip({ setPage }: { isDarkMode?: boolean, setPage: (pg: any) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ShipCategory | null>(null);

  // Search filter
  const filteredCategories = SHIP_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="what-we-ship" className="relative py-24 overflow-hidden bg-[#FAF9F5]">
      
      {/* High-quality Logistics Warehouse Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-multiply">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1800" 
          alt="International Cargo Depot" 
          className="w-full h-full object-cover filter brightness-70"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Visual Design Elements */}
      <div className="absolute top-10 left-12 w-80 h-80 bg-dhl-yellow/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-12 w-80 h-80 bg-dhl-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-dhl-yellow/15 border border-dhl-yellow/30 rounded-full mb-4">
            <PackageCheck className="w-4 h-4 text-dhl-red" />
            <span className="text-[10px] font-black tracking-wider text-dhl-dark uppercase font-mono">Expert Packing Capabilities</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-dhl-dark mb-4">
            What We Can Ship
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            From traditional Avakaya homemade pickles with zero leakages to critical medical tablets, discover our custom-tailored protective packing formats.
          </p>
        </div>

        {/* Live Search Interactive Console */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search items... (e.g., marksheet, pickle, medicines, sweets, saree)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dhl-red/25 focus:border-dhl-red transition-all font-mono text-sm shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-center text-xs text-slate-500 mt-2.5 font-mono">
            Can't find your item? Click <button onClick={() => setPage('price-enquiry')} className="text-dhl-red underline font-bold focus:outline-none cursor-pointer">Price Enquiry</button> to request a live lookup.
          </p>
        </div>

        {/* Grid display with scroll transition patterns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {filteredCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isMatchSelected = selectedCategory?.name === category.name;
            
            return (
              <div 
                key={category.name}
                id={`shipping-category-${index}`}
                onClick={() => setSelectedCategory(isMatchSelected ? null : category)}
                className={`group rounded-2xl bg-white border p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 shadow-sm ${
                  isMatchSelected 
                    ? 'border-dhl-red ring-1 ring-dhl-red/35 bg-dhl-yellow/5' 
                    : 'hover:border-dhl-yellow border-slate-200 hover:-translate-y-1 hover:shadow'
                }`}
              >
                {/* Background decorative path color glowing */}
                <div className={`absolute -right-16 -bottom-16 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full blur-2xl group-hover:scale-125 transition duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-dhl-red">
                      <IconComponent className="w-5.5 h-5.5 shrink-0 group-hover:scale-110 transition-transform duration-250" />
                    </div>
                    
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold font-mono tracking-wider ${
                      category.nriLevel === "Vacuum Sealing Required" 
                        ? 'bg-amber-55 bg-dhl-yellow/30 text-slate-800'
                        : category.nriLevel === "Document Shield Case"
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : category.nriLevel === "Triple Lamination Required"
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {category.nriLevel}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight text-dhl-dark mb-1.5">
                    {category.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-4">
                    {category.description}
                  </p>
                </div>

                {/* Expanded Packing Instructions */}
                <div className="space-y-3 mt-4 border-t border-slate-100 pt-4 relative z-10 w-full">
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-600">
                    <Scale className="w-3.5 h-3.5 text-dhl-red mt-0.5 shrink-0" />
                    <span><strong className="text-slate-800">Pack Format:</strong> {category.transitNotes}</span>
                  </div>
                  
                  {isMatchSelected && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[10px] text-emerald-600 font-mono mt-2"
                    >
                      ✓ 3-Layer Heavy Poly Seal packing
                      <br/>
                      ✓ Home Pickup verification
                      <br/>
                      ✓ Customs physical declarations compiled
                    </motion.div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-dhl-red font-mono mt-2 pt-2">
                    <span>Click to toggle detail</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="col-span-full py-12 text-center rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
              <ShieldAlert className="w-12 h-12 text-dhl-red mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-dhl-dark mb-2">Requires Custom Physical Inspection</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                No standard category matches your text search. Some heavy volume appliances or wet commercial contents require custom cargo inspection. We can still ship them!
              </p>
              <button 
                onClick={() => setPage('price-enquiry')}
                className="mt-6 px-5 py-2.5 bg-dhl-yellow hover:bg-[#e6b800] text-dhl-dark font-bold text-xs rounded-xl uppercase font-mono tracking-wider transition shadow-sm"
              >
                Inquire With Our Support Team
              </button>
            </div>
          )}
        </div>

        {/* Free Home Pickup banner */}
        <div className="mt-16 bg-gradient-to-r from-white to-[#FAF9F5] border border-slate-200/80 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-dhl-yellow/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-2xl text-center md:text-left relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest bg-dhl-yellow/30 text-dhl-dark px-3 py-1 rounded-full font-bold">
              Premium Value Add
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-dhl-dark mt-4 tracking-tight leading-none">
              Book Home Doorstep Pickup & Lamination Wrapping
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-sans mt-3">
              We bring mobile physical scales and heavy durable bubble guards straight to your home in Hyderabad/Bangalore. Let us secure your home-baked treats, documents, or books cleanly.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            <button 
              onClick={() => setPage('price-enquiry')}
              className="w-full sm:w-auto px-7 py-4 bg-dhl-yellow hover:bg-[#e6b800] text-dhl-dark font-bold text-xs uppercase tracking-wider font-display rounded-xl transition shadow"
            >
              Get Charges Estimate
            </button>
            <a 
              href="https://wa.me/919573105953?text=Hi%20Fastest%20Air%20Courier!%20I%20would%20like%2520to%2520schedule%2520a%252520free%252520home%252520pickup%252520for%252520my%252520international%252520parcel."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider font-display rounded-xl shadow transition duration-200 flex items-center justify-center gap-2"
            >
              Book Pickup (WhatsApp)
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

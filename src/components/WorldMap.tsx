/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Plane, ShieldCheck, Globe, Clock, Container } from 'lucide-react';

interface MapCountry {
  name: string;
  x: number; // percentage width
  y: number; // percentage height
  transitTime: string;
  majorHub: string;
  couriers: string[];
  zone: string;
}

const SHIPPED_COUNTRIES: MapCountry[] = [
  { name: "USA", x: 22, y: 36, transitTime: "3-4 Days", majorHub: "New York (JFK) / Los Angeles (LAX)", couriers: ["DHL", "FedEx", "UPS"], zone: "North America" },
  { name: "Canada", x: 20, y: 25, transitTime: "3-4 Days", majorHub: "Toronto (YYZ) / Vancouver (YVR)", couriers: ["DHL", "UPS"], zone: "North America" },
  { name: "United Kingdom", x: 45, y: 26, transitTime: "5 Days", majorHub: "London Heathrow (LHR)", couriers: ["DHL", "FedEx", "Atlantic"], zone: "Europe" },
  { name: "Germany", x: 49, y: 29, transitTime: "1 Week to 10 Days", majorHub: "Frankfurt (FRA)", couriers: ["DHL", "FedEx", "Aramex"], zone: "Europe" },
  { name: "Australia", x: 84, y: 74, transitTime: "1 Week", majorHub: "Sydney (SYD) / Melbourne (MEL)", couriers: ["UPS", "DHL", "Shipwala"], zone: "Oceania" },
  { name: "France", x: 46, y: 32, transitTime: "1 Week to 10 Days", majorHub: "Paris CDG", couriers: ["DHL", "UPS", "Atlantic"], zone: "Europe" },
  { name: "Italy", x: 50, y: 35, transitTime: "1 Week to 10 Days", majorHub: "Milan Malpensa (MXP)", couriers: ["DHL", "FedEx"], zone: "Europe" },
  { name: "Spain", x: 44, y: 37, transitTime: "1 Week to 10 Days", majorHub: "Madrid Barajas (MAD)", couriers: ["DHL", "Aramex"], zone: "Europe" },
  { name: "Netherlands", x: 48, y: 28, transitTime: "1 Week to 10 Days", majorHub: "Amsterdam Schiphol (AMS)", couriers: ["FedEx", "UPS"], zone: "Europe" },
  { name: "Sweden", x: 51, y: 19, transitTime: "1 Week to 10 Days", majorHub: "Stockholm Arlanda (ARN)", couriers: ["DHL", "Atlantic"], zone: "Europe" },
  { name: "Norway", x: 49, y: 17, transitTime: "1 Week to 10 Days", majorHub: "Oslo Gardermoen (OSL)", couriers: ["FedEx", "UPS"], zone: "Europe" },
  { name: "Denmark", x: 49, y: 23, transitTime: "1 Week to 10 Days", majorHub: "Copenhagen (CPH)", couriers: ["DHL", "DTDC"], zone: "Europe" },
  { name: "Belgium", x: 47, y: 30, transitTime: "1 Week to 10 Days", majorHub: "Brussels Cargo (BRU)", couriers: ["FedEx", "UPS"], zone: "Europe" },
  { name: "Switzerland", x: 49, y: 32, transitTime: "1 Week to 10 Days", majorHub: "Zurich (ZRH)", couriers: ["DHL", "Aramex"], zone: "Europe" },
  { name: "Ireland", x: 41, y: 26, transitTime: "1 Week to 10 Days", majorHub: "Dublin Airport (DUB)", couriers: ["DHL", "Atlantic"], zone: "Europe" },
  { name: "Austria", x: 51, y: 31, transitTime: "1 Week to 10 Days", majorHub: "Vienna Schwechat (VIE)", couriers: ["FedEx", "DTDC"], zone: "Europe" },
  { name: "Portugal", x: 41, y: 39, transitTime: "1 Week to 10 Days", majorHub: "Lisbon Portela (LIS)", couriers: ["DHL", "UPS"], zone: "Europe" },
  { name: "Finland", x: 54, y: 17, transitTime: "1 Week to 10 Days", majorHub: "Helsinki Vantaa (HEL)", couriers: ["DHL", "Shipwala"], zone: "Europe" },
  { name: "Poland", x: 52, y: 28, transitTime: "1 Week to 10 Days", majorHub: "Warsaw Chopin (WAW)", couriers: ["FedEx", "Atlantic"], zone: "Europe" }
];

// Origin point: Hyderabad, India
const ORIGIN_INDIA = { x: 67, y: 49, name: "Hyderabad, IN (HQ)" };

export default function WorldMap() {
  const [activeCountry, setActiveCountry] = useState<MapCountry>(SHIPPED_COUNTRIES[0]);
  const [hoveredCountry, setHoveredCountry] = useState<MapCountry | null>(null);

  return (
    <section id="countries" className="relative py-24 bg-white border-b border-slate-200/50">
      {/* Background radial soft light blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-dhl-yellow/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-dhl-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-dhl-yellow/15 border border-dhl-yellow/30 rounded-full mb-4">
            <Container className="w-4 h-4 text-dhl-red" />
            <span className="text-[10px] font-black tracking-wider text-dhl-dark uppercase font-mono">Global Cargo Footprint</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-dhl-dark mb-4">
            Countries We Ship To
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            Fastest Air Courier spans across major continents with direct flight scheduling, automated custom clearance routines, and premier partner handovers.
          </p>
        </div>

        {/* Dynamic Display Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Quick Info Card */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="p-8 rounded-2xl bg-[#FAF9F5] border border-slate-200 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between transform transition duration-300">
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-dhl-yellow/5 rounded-full blur-2xl" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-dhl-red">Target Destination</span>
                  <div className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[9px] uppercase font-bold text-slate-600">
                    {activeCountry.zone}
                  </div>
                </div>

                <h3 className="font-display text-3xl font-extrabold tracking-tight text-dhl-dark mb-2 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-dhl-red shrink-0" />
                  {activeCountry.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-500 font-sans mb-6">
                  Direct commercial air gateway schedules dispatching daily parcel collections straight from Hyderabad.
                </p>

                {/* Logistics breakdown details */}
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/50 shadow-sm col-span-full">
                    <Clock className="w-5 h-5 text-dhl-red shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Transit Duration</h4>
                      <p className="text-sm font-bold text-dhl-dark font-sans mt-0.5">{activeCountry.transitTime}</p>
                      <p className="text-[10.5px] text-slate-600 font-sans mt-1.5 leading-relaxed font-semibold">
                        💡 Duration is estimated. Please <a href="tel:+919573105953" className="text-dhl-red hover:underline font-bold">contact owner Kaleru Veena</a> (+91 9573105953) for the most accurate transit schedules.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/50 shadow-sm">
                    <Globe className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Customs Airport Hub</h4>
                      <p className="text-sm font-semibold text-slate-700 mt-0.5">{activeCountry.majorHub}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/50 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Active Carriers</h4>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {activeCountry.couriers.map((courier, index) => (
                          <span key={index} className="text-[9px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-bold font-mono">
                            {courier}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-8 pt-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Experience</div>
                  <div className="text-lg font-black text-dhl-dark">13+ Years</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Dispatch Origin</div>
                  <div className="text-sm font-bold text-dhl-red uppercase tracking-wider font-mono">HYD Airport</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Vectorized Map Canvas */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF9F5] border border-slate-200 shadow-sm relative min-h-[420px] sm:min-h-[500px] flex flex-col justify-between overflow-hidden select-none">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-[10px] text-slate-500 bg-white shadow px-3 py-1.5 rounded-full border border-slate-200 font-mono">
                <Plane className="w-3.5 h-3.5 text-dhl-red animate-pulse" />
                <span>Interactively click target pins to draw cargo flight route lines</span>
              </div>

              {/* Responsive SVG Map Backdrop */}
              <div id="interactive-map-container" className="relative w-full aspect-[2/1] my-auto">
                <svg viewBox="0 0 1000 500" className="w-full h-full opacity-70 text-slate-300">
                  <g fill="currentColor" opacity="0.45">
                    {/* Simplified schematic world map background */}
                    <path d="M 60 120 C 120 100, 180 110, 240 120 C 260 150, 310 180, 290 240 C 260 260, 240 320, 260 380 C 280 410, 260 450, 220 460 C 190 410, 150 380, 140 330 C 120 300, 80 280, 70 220 Z" fill="rgba(30,41,59,0.04)" stroke="rgba(30,41,59,0.08)" strokeWidth="1" />
                    <path d="M 390 120 C 450 100, 520 80, 600 90 C 700 80, 800 110, 850 130 C 890 160, 850 200, 810 240 C 800 270, 750 320, 770 380 C 800 420, 740 450, 680 430 C 650 380, 570 360, 520 350 C 480 380, 420 390, 410 320 C 390 280, 360 240, 370 180 Z" fill="rgba(30,41,59,0.04)" stroke="rgba(30,41,59,0.08)" strokeWidth="1" />
                    <path d="M 780 340 C 820 330, 880 350, 890 380 C 880 420, 810 430, 790 400 Z" fill="rgba(30,41,59,0.04)" stroke="rgba(30,41,59,0.08)" strokeWidth="1" />
                  </g>

                  {/* Grid Lines */}
                  <g stroke="rgba(15,23,42,0.03)" strokeWidth="0.5" strokeDasharray="3,3">
                    <line x1="0" y1="125" x2="1000" y2="125" />
                    <line x1="0" y1="250" x2="1000" y2="250" />
                    <line x1="0" y1="375" x2="1000" y2="375" />
                    <line x1="200" y1="0" x2="200" y2="500" />
                    <line x1="400" y1="0" x2="400" y2="500" />
                    <line x1="600" y1="0" x2="600" y2="500" />
                    <line x1="800" y1="0" x2="800" y2="500" />
                  </g>

                  {/* Flight Route Line Arc from Origin Hyderabad */}
                  {activeCountry && (
                    <g>
                      <path
                        d={`M ${ORIGIN_INDIA.x * 10} ${ORIGIN_INDIA.y * 5} Q ${(ORIGIN_INDIA.x * 10 + activeCountry.x * 10) / 2} ${Math.min(ORIGIN_INDIA.y * 5, activeCountry.y * 5) - 80} ${activeCountry.x * 10} ${activeCountry.y * 5}`}
                        fill="none"
                        stroke="#D40511"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-60"
                      />
                      
                      {/* Animated path flow */}
                      <motion.path
                        d={`M ${ORIGIN_INDIA.x * 10} ${ORIGIN_INDIA.y * 5} Q ${(ORIGIN_INDIA.x * 10 + activeCountry.x * 10) / 2} ${Math.min(ORIGIN_INDIA.y * 5, activeCountry.y * 5) - 80} ${activeCountry.x * 10} ${activeCountry.y * 5}`}
                        fill="none"
                        stroke="url(#route-gradient-light)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 1000", strokeDashoffset: 0 }}
                        animate={{ strokeDasharray: "80 1000", strokeDashoffset: [-1000, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      />

                      {/* Real-time flying carrier cargo point following trail */}
                      <g>
                        <circle r="4" fill="#D40511">
                          <animateMotion 
                            path={`M ${ORIGIN_INDIA.x * 10} ${ORIGIN_INDIA.y * 5} Q ${(ORIGIN_INDIA.x * 10 + activeCountry.x * 10) / 2} ${Math.min(ORIGIN_INDIA.y * 5, activeCountry.y * 5) - 80} ${activeCountry.x * 10} ${activeCountry.y * 5}`} 
                            dur="3s" 
                            repeatCount="indefinite" 
                          />
                        </circle>
                        {/* Mini planes rotation */}
                        <g style={{ transformOrigin: 'center', transformBox: 'fill-box' }}>
                          <path 
                            d="M12 2L2 22l10-6 10 6L12 2z" 
                            fill="#D40511" 
                            stroke="#FFCC00" 
                            strokeWidth="1.5"
                            className="scale-[0.5]"
                          >
                            <animateMotion 
                              path={`M ${ORIGIN_INDIA.x * 10} ${ORIGIN_INDIA.y * 5} Q ${(ORIGIN_INDIA.x * 10 + activeCountry.x * 10) / 2} ${Math.min(ORIGIN_INDIA.y * 5, activeCountry.y * 5) - 80} ${activeCountry.x * 10} ${activeCountry.y * 5}`} 
                              dur="3s" 
                              rotate="auto" 
                              repeatCount="indefinite" 
                            />
                          </path>
                        </g>
                      </g>
                    </g>
                  )}

                  {/* Gradient Light Theme Definitions */}
                  <defs>
                    <linearGradient id="route-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D40511" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#FFCC00" stopOpacity="1" />
                      <stop offset="100%" stopColor="#D40511" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* HQ Origin Marker (Hyderabad) */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-default"
                  style={{ left: `${ORIGIN_INDIA.x}%`, top: `${ORIGIN_INDIA.y}%` }}
                >
                  <div className="absolute w-8 h-8 bg-dhl-red/20 rounded-full scale-125 blur-xs animate-ping pointer-events-none" />
                  <div className="relative w-4 h-4 bg-dhl-red border-2 border-white rounded-full flex items-center justify-center shadow">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  {/* Label for HQ */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-dhl-dark text-[9px] font-bold text-white px-2 py-0.5 rounded shadow whitespace-nowrap font-mono">
                    HQ (HYDERABAD)
                  </div>
                </div>

                {/* Country Destination Pin Overlay Points */}
                {SHIPPED_COUNTRIES.map((country) => {
                  const isActive = activeCountry.name === country.name;
                  const isHovered = hoveredCountry?.name === country.name;
                  
                  return (
                    <button
                      key={country.name}
                      onClick={() => setActiveCountry(country)}
                      onMouseEnter={() => setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition duration-200 focus:outline-none z-20 group cursor-pointer"
                      style={{ left: `${country.x}%`, top: `${country.y}%` }}
                      aria-label={`Ship to ${country.name}`}
                    >
                      {/* Pulse scale rings */}
                      {isActive && (
                        <div className="absolute -inset-3 bg-dhl-yellow/45 rounded-full animate-ping pointer-events-none" />
                      )}
                      
                      {/* Active point hover ring */}
                      <div className={`relative transition-all duration-150 rounded-full flex items-center justify-center ${
                        isActive 
                          ? "w-6.5 h-6.5 bg-dhl-yellow border border-slate-350 shadow text-dhl-dark scale-105" 
                          : isHovered
                            ? "w-6 h-6 bg-dhl-red text-white"
                            : "w-4.5 h-4.5 bg-white hover:bg-slate-50 text-slate-500 border border-slate-300 shadow-xs"
                      }`}>
                        {isActive ? (
                          <MapPin className="w-3.5 h-3.5 text-dhl-red" />
                        ) : (
                          <div className={`rounded-full ${isHovered ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-slate-400"}`} />
                        )}
                      </div>

                      {/* Floating hover flag */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-dhl-dark text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-50 pointer-events-none font-mono"
                          >
                            <span className="text-dhl-yellow">✈ {country.name}</span>
                            <span className="mx-1 text-slate-400">|</span>
                            <span className="text-slate-300">{country.transitTime}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick-Access Selection Badges */}
              <div className="mt-6 flex flex-wrap gap-1.5 justify-center max-h-32 sm:max-h-24 overflow-y-auto custom-scrollbar p-2 bg-white rounded-xl border border-slate-200">
                {SHIPPED_COUNTRIES.map((cty) => (
                  <button
                    key={cty.name}
                    onClick={() => setActiveCountry(cty)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg transition border font-sans cursor-pointer ${
                      activeCountry.name === cty.name
                        ? "bg-dhl-yellow/30 border-dhl-yellow text-dhl-dark font-bold"
                        : "bg-[#FAF9F5] border-slate-200 text-slate-500 hover:text-slate-850 hover:border-slate-350"
                    }`}
                  >
                    {cty.name}
                  </button>
                ))}
                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 font-bold uppercase font-mono tracking-wider">
                  + All Europe Covered
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

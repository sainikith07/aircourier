/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, Plane, Globe, ShieldAlert,
  Scale, MessageSquare, Phone
} from 'lucide-react';
import { PriceRecord } from '../types';
import { COUNTRIES, SERVICES, PRODUCT_TYPES, DEFAULT_COUNTRY_SERVICES, calculateEstimatedPrice } from '../data/pricing';

export default function PriceEnquiry({ isDarkMode = false }: { isDarkMode?: boolean }) {
  // Input states
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedService, setSelectedService] = useState("DHL");
  const [selectedProduct, setSelectedProduct] = useState("Groceries");
  const [weight, setWeight] = useState<number>(5); // default 5 KG
  
  // Custom records & country services mapping
  const [customRecords, setCustomRecords] = useState<PriceRecord[]>([]);
  const [countryServices, setCountryServices] = useState<Record<string, string[]>>(DEFAULT_COUNTRY_SERVICES);
  const [calculatedQuote, setCalculatedQuote] = useState<{
    pricePerKg: number;
    total: number;
    isCustom: boolean;
  } | null>(null);

  const [hasCalculated, setHasCalculated] = useState(false);

  // Load custom configurations on mount
  useEffect(() => {
    const saved = localStorage.getItem('fastest_air_prices');
    if (saved) {
      try {
        setCustomRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local pricing database:", e);
      }
    }

    const savedServices = localStorage.getItem('fastest_country_services');
    if (savedServices) {
      try {
        setCountryServices(JSON.parse(savedServices));
      } catch (e) {
        console.error("Failed to parse country services database:", e);
      }
    }
  }, []);

  // Sync available services when selectedCountry changes
  useEffect(() => {
    const available = countryServices[selectedCountry] || [];
    if (available.length > 0) {
      if (!available.includes(selectedService)) {
        setSelectedService(available[0]);
      }
    } else {
      setSelectedService("");
    }
    setHasCalculated(false);
  }, [selectedCountry, countryServices]);

  // Recalculate price
  const handleCheckPrice = (e: FormEvent) => {
    e.preventDefault();
    if (!weight || weight <= 0) return;
    
    const result = calculateEstimatedPrice(
      selectedCountry,
      selectedService,
      selectedProduct,
      weight,
      customRecords
    );
    setCalculatedQuote(result);
    setHasCalculated(true);
  };

  // Generate WhatsApp details text
  const getWhatsAppLink = () => {
    if (!calculatedQuote) return "";
    const text = `Hi Fastest Air Courier! I checked the Courier Charges on your website and would like to confirm my booking with you:
    
📍 Country: ${selectedCountry}
🚚 Carrier Partner: ${selectedService}
📦 Cargo Type: ${selectedProduct}
⚖️ Weight Slab: ${weight} KG
💰 Courier Charges: ₹${calculatedQuote.pricePerKg}/KG (Total: ₹${calculatedQuote.total})
🏠 Request: Free Home Doorstep Pickup

Please confirm availability and booking schedules. Thanks!`;
    return `https://wa.me/919573105953?text=${encodeURIComponent(text)}`;
  };

  const availableServices = countryServices[selectedCountry] || [];

  return (
    <section id="price-enquiry" className="relative py-20 min-h-screen bg-[#FAF9F5]">
      {/* Background visual accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-dhl-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-dhl-red/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-dhl-yellow/10 border border-dhl-yellow/30 rounded-full mb-4">
            <Calculator className="w-4 h-4 text-dhl-red" />
            <span className="text-[11px] font-extrabold tracking-wider text-dhl-dark uppercase font-display">Courier Charges Calculator</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-dhl-dark mb-4">
            Check Courier Charges
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            Get instant, accurate courier charges estimates under active carrier tables for your international shipment from India.
          </p>
        </div>

        {/* Dynamic selection view */}
        <AnimatePresence mode="wait">
          {selectedCountry === "Others" ? (
            /* Special Contact Gating for 'Others' Country */
            <motion.div
              key="others-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-slate-200/60 shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-dhl-yellow/10 blur-xl"></div>
              <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-dhl-red/5 blur-xl"></div>
              
              <div className="w-16 h-16 bg-dhl-yellow/20 rounded-2xl flex items-center justify-center border border-dhl-yellow/40 mx-auto mb-6 text-dhl-red">
                <Plane className="w-8 h-8" />
              </div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-dhl-dark mb-4">Check Courier Charges</h3>
              
              <p className="text-base text-slate-600 font-sans mb-8 max-w-lg mx-auto leading-relaxed">
                Please contact our team for courier charges to this destination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <a 
                  href="tel:+919573105953" 
                  className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-sm transition hover:-translate-y-0.5 flex flex-col items-center gap-2 group duration-200"
                >
                  <Phone className="w-5 h-5 text-dhl-red group-hover:scale-110 transition" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Veena (Proprietor)</span>
                  <span className="text-sm font-bold text-dhl-dark font-mono">+91 9573105953</span>
                </a>
                
                <a 
                  href="tel:+919000527923" 
                  className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-sm transition hover:-translate-y-0.5 flex flex-col items-center gap-2 group duration-200"
                >
                  <Phone className="w-5 h-5 text-dhl-red group-hover:scale-110 transition" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Alternative Support</span>
                  <span className="text-sm font-bold text-dhl-dark font-mono">+91 9000527923</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center gap-4 text-xs font-mono text-slate-500">
                <button 
                  onClick={() => setSelectedCountry("USA")}
                  className="text-dhl-red hover:underline font-bold"
                >
                  ← Go back to select other countries
                </button>
              </div>
            </motion.div>
          ) : (
            /* Regular Grid Pricing calculator */
            <motion.div 
              key="calculator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Left panel: Form input fields */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-dhl-dark mb-6 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-dhl-red" />
                      Configure Shipment Parameters
                    </h3>

                    <form onSubmit={handleCheckPrice} className="space-y-6">
                      
                      {/* Row 1: Country and Service */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                            Destination Country
                          </label>
                          <select
                            value={selectedCountry}
                            onChange={(e) => {
                              setSelectedCountry(e.target.value);
                              setHasCalculated(false);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 transition font-sans hover:border-slate-300"
                          >
                            {COUNTRIES.map((cty) => (
                              <option key={cty} value={cty} className="bg-white text-slate-800">
                                ✈ {cty}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                            Courier Service Option
                          </label>
                          {availableServices.length > 0 ? (
                            <select
                              value={selectedService}
                              onChange={(e) => {
                                setSelectedService(e.target.value);
                                setHasCalculated(false);
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 transition font-sans hover:border-slate-300"
                            >
                              {availableServices.map((srv) => (
                                <option key={srv} value={srv} className="bg-white text-slate-800">
                                  ⚡ {srv}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="w-full bg-red-50 border border-red-200/50 rounded-xl px-4 py-3 text-xs text-red-600 font-mono mt-0.5 font-bold">
                              ⚠️ Please contact our team for available courier options.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Product Type & Custom Weight */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                            Product Category/Type
                          </label>
                          <select
                            value={selectedProduct}
                            onChange={(e) => {
                              setSelectedProduct(e.target.value);
                              setHasCalculated(false);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 transition font-sans hover:border-slate-300"
                          >
                            {PRODUCT_TYPES.map((prod) => (
                              <option key={prod} value={prod} className="bg-white text-slate-800">
                                📦 {prod}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                            Weight (KG)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              max="2000"
                              value={weight || ""}
                              onChange={(e) => {
                                setWeight(parseFloat(e.target.value) || 0);
                                setHasCalculated(false);
                              }}
                              placeholder="e.g. 10"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 transition font-mono font-bold hover:border-slate-300"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                              KG
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Weight helper quick selection badges */}
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">
                          Quick Select Slabs:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 5, 10, 20, 50].map((w) => (
                            <button
                              key={w}
                              type="button"
                              onClick={() => {
                                setWeight(w);
                                setHasCalculated(false);
                              }}
                              className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition duration-150 ${
                                weight === w
                                  ? 'bg-dhl-yellow text-dhl-dark border-dhl-yellow shadow'
                                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300'
                              }`}
                            >
                              {w} KG
                            </button>
                          ))}
                        </div>
                      </div>

                    </form>
                  </div>

                  {/* Check Price Button */}
                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <button
                      type="button"
                      disabled={availableServices.length === 0}
                      onClick={handleCheckPrice}
                      className="w-full py-4 bg-dhl-red hover:bg-[#b9040e] text-white disabled:bg-slate-200 disabled:text-slate-400 font-extrabold text-xs uppercase tracking-widest font-display rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow"
                    >
                      <Calculator className="w-4 h-4 text-white" />
                      Calculate Live Charges Rate
                    </button>
                  </div>

                </div>
              </div>

              {/* Right panel: Digital Invoice Certificate Quote display */}
              <div className="lg:col-span-5">
                <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-lg h-full flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Background airplane decoration */}
                  <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
                    <Plane className="w-72 h-72 text-dhl-red" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div>
                        <h4 className="font-display text-base font-extrabold tracking-tight text-dhl-dark">Fastest Air Courier</h4>
                        <span className="text-[10px] text-dhl-red font-mono tracking-widest uppercase font-bold">Verified Quotation</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-400">STATUS</span>
                        <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1 mt-0.5 justify-end">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          ACTIVE COURIER CHARGES
                        </div>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {!hasCalculated ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-12 text-center text-slate-500 flex flex-col items-center justify-center"
                        >
                          <Globe className="w-12 h-12 text-dhl-yellow/80 animate-spin duration-[20s] mb-4" />
                          <p className="text-xs font-sans px-4 leading-relaxed">
                            Configure shipment parameters on the left and click calculate to display your digital instant quotation ticket.
                          </p>
                        </motion.div>
                      ) : (
                        calculatedQuote && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                          >
                            {/* Summary breakdown row */}
                            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/40">
                              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                                <span>Destination Hub:</span>
                                <span className="text-slate-800 font-bold">{selectedCountry}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                                <span>Selected Carrier:</span>
                                <span className="text-slate-800 font-bold">{selectedService} Priority Air</span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                                <span>Cargo Type:</span>
                                <span className="text-slate-800 font-bold">{selectedProduct}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                                <span>Cargo Weight Range:</span>
                                <span className="text-dhl-red font-bold font-mono">{weight} KG</span>
                              </div>
                            </div>

                            {/* Large pricing spotlight */}
                            <div className="text-center py-6 bg-dhl-yellow/10 rounded-xl border border-dhl-yellow/30">
                              <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase">Estimated Carriage Value</span>
                              <div className="text-4xl font-black text-dhl-dark tracking-tight mt-1 mb-1 font-mono">
                                ₹{calculatedQuote.total.toLocaleString('en-IN')}
                              </div>
                              <p className="text-xs text-slate-600 font-mono font-semibold">
                                Rate: ₹{calculatedQuote.pricePerKg}/KG
                              </p>
                              {calculatedQuote.isCustom && (
                                <span className="inline-block bg-emerald-500/10 text-emerald-700 text-[9px] font-bold font-mono px-2 py-0.5 rounded border border-emerald-500/20 mt-2">
                                  ✓ Custom rate active
                                </span>
                              )}
                            </div>

                            {/* Small mandatory regulatory notices */}
                            <div className="bg-slate-50 rounded-lg p-3.5 flex items-start gap-2 border border-slate-200/50">
                              <ShieldAlert className="w-4 h-4 text-dhl-red shrink-0 mt-0.5" />
                              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                                Prices vary slightly based on final package volume, physical dimension factors, and real-time fuel surcharges. Please contact Kaleru Veena to schedule your dispatch.
                              </p>
                            </div>

                            {/* CTA: WhatsApp Booking Generator */}
                            <div className="pt-2">
                              <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider font-mono rounded-xl shadow transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <MessageSquare className="w-4 h-4 text-white" />
                                Start Booking via WhatsApp
                              </a>
                              <p className="text-center text-[10px] text-slate-400 mt-3 font-mono">
                                Doorstep pickup is completely free.
                                <br />
                                Call Veena: <strong className="text-slate-600">+91 9573105953</strong>
                              </p>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Safety elements in footer of receipt */}
                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>Authentic Price Ledger</span>
                    <span>ID: CR-CHARGES-01</span>
                  </div>

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

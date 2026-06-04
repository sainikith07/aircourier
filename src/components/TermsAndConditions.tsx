/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FileText, Printer, Search, ShieldAlert, BookOpen, AlertCircle, Bookmark } from 'lucide-react';

interface LegalSection {
  num: string;
  title: string;
  clauses: string[];
}

const TERMS_SECTIONS: LegalSection[] = [
  {
    num: "1.0",
    title: "Definitions and Scope of Agreement",
    clauses: [
      "1.1 'Carriage' means and includes the whole of the operations and services undertaken by Fastest Air Courier in connection with the pick-up, sorting, transit, customs clearance, air transport, and delivery of shipments.",
      "1.2 'Proprietor' refers strictly to Kaleru Veena, managing principal and legal owner of Fastest Air Courier with physical address registered beside Mega Driving School, Vanasthalipuram, Hyderabad.",
      "1.3 'Sender' or 'Customer' describes the natural person or organization commissioning this consignment and signing this air bill.",
      "1.4 These terms constitute the entire contract and cannot be edited by any driver, home pickup specialist, or airport agent of the company."
    ]
  },
  {
    num: "2.0",
    title: "Inspection of Goods and Safety Compliance",
    clauses: [
      "2.1 Fastest Air Courier and all airport security checkpoints maintain the legal right to open and inspect any physical consignment at any stage without prior explanation or sender consensus.",
      "2.2 Inspection ensures no prohibited items such as loose batteries, weapons, counterfeit materials, or illegal items exist within the parcel.",
      "2.3 If any hazardous substance is discovered, Fastest Air Courier is legally authorized to immediately hand over the package to corresponding custom police departments."
    ]
  },
  {
    num: "3.0",
    title: "Calculation of Volumetric Weight",
    clauses: [
      "3.1 Pricing is determined by comparing physical gross weight measured on electronic scales against the total space displacement (Volumetric Weight).",
      "3.2 Volumetric (Dimensional) weight is calculated internationally of air transportation as: (Length in cm x Width in cm x Height in cm) divided by 5000.",
      "3.3 The Customer agrees to pay the final courier charges reflecting the greater of these two parameters post physical scanning at the departure warehouse hub."
    ]
  },
  {
    num: "4.0",
    title: "Customs Clearance and Delays",
    clauses: [
      "4.1 Fastest Air Courier coordinates standard document filing and basic custom transit representations, but the Sender remains singularly responsible for complete import paperwork validity.",
      "4.2 Medical packages must carry specialized prescriptions matching recipient identity, signed by certified medical practitioners.",
      "4.3 Fastest Air Courier does not accept liability for custom delays, confiscations, secondary tax duties, or storage charges levied at destination airports."
    ]
  },
  {
    num: "5.0",
    title: "Limitation of Liability and Cargo Insurance",
    clauses: [
      "5.1 Unless a specific higher valuation cargo insurance premium is declared and paid beforehand, Fastest Air Courier's total financial coverage is capped strictly under Warsaw/Montreal regulations.",
      "5.2 The maximum liability for lost or damaged parcels is the lower of: $100 USD (or equivalent INR) or the actual cost of replacing the physical shipment.",
      "5.3 Fastest Air Courier is not liable for indirect, incidental, or remote damages, including loss of university admissions, business revenue, contracts, or emotional distress from flight delay."
    ]
  },
  {
    num: "6.0",
    title: "Undeliverable Shipments and Packaging",
    clauses: [
      "6.1 Standard vacuum-sealing and NRI custom bubble-wrapping are provided to ensure maximum safety. However, poor recipient address labels or invalid contact numbers will result in delayed delivery.",
      "6.2 If a parcel is rejected by customs or marked undeliverable due to bad recipient contact, additional return freight charges will be billed directly to the original Sender.",
      "6.3 Sweets and homemade pickles must undergo standardized lamination packing to guarantee complete freshness and zero leak during extreme cargo depressurization."
    ]
  }
];

export default function TermsAndConditions({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("1.0");

  const handlePrint = () => {
    window.print();
  };

  // Check if a line matches search query
  const matchesSearch = (text: string) => {
    if (!search) return true;
    return text.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <section id="terms" className="relative py-20 bg-[#FAF9F5] print-area min-h-screen text-[#1A1A1A]">
      {/* Background decorations - invisible in print mode */}
      <div className="absolute top-10 left-1/2 w-96 h-96 bg-dhl-yellow/5 rounded-full blur-[120px] pointer-events-none no-print" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - invisible in print */}
        <div className="text-center max-w-3xl mx-auto mb-12 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-dhl-yellow/10 border border-dhl-yellow/30 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-dhl-red" />
            <span className="text-[11px] font-extrabold tracking-widest text-[#1A1A1A] uppercase font-display">Consignment Contract</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1A1A1A] mb-4">
            Terms & Conditions
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            Official legal parameters and carriage acts governing all bookings under Fastest Air Courier. Managed by Principal Proprietor Kaleru Veena.
          </p>
        </div>

        {/* Quick action bar - printing & searching (invisible in print mode) */}
        <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 no-print max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search legal keywords (e.g. liability, vacuum, scale, Kaleru)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-dhl-red font-sans"
            />
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#FFCC00] hover:bg-[#e6b800] text-[#1A1A1A] font-extrabold font-display text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-dhl-red" />
            Print Terms Booklet
          </button>
        </div>

        {/* Structured Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Sticky jump anchors table of contents (sticky navigation - invisible in print) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 no-print">
            <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3.5 animate-in fade-in duration-300">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5 font-sans">
                <Bookmark className="w-3.5 h-3.5 text-dhl-red" />
                Table of Contents
              </h3>
              
              {TERMS_SECTIONS.map((sec) => (
                <button
                  key={sec.num}
                  onClick={() => {
                    setActiveTab(sec.num);
                    const el = document.getElementById(`terms-sec-${sec.num}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans font-bold transition flex items-center justify-between ${
                    activeTab === sec.num
                      ? "bg-[#FFCC00]/15 border-dhl-red text-[#1A1A1A]"
                      : "bg-transparent border-slate-100 text-slate-600 hover:text-[#1A1A1A] hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{sec.num} {sec.title}</span>
                  <span className="text-[10px] text-dhl-red shrink-0 ml-2">Read →</span>
                </button>
              ))}

              <div className="border-t border-slate-100 pt-4 mt-4 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                <div className="flex gap-2.5 items-start text-xs text-amber-900 font-sans leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-dhl-red shrink-0 mt-0.5" />
                  <span className="font-medium">By submitting a package booking to our doorstep driver, you accept all rules described in this Carriage Agreement.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Legal outline text */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-md print-area space-y-8 animate-in fade-in duration-300">
              
              {/* Cover note inside document */}
              <div className="border-b border-slate-200 pb-6 mb-6">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-dhl-red">OFFICIAL LEGAL CARRIAGE MANUAL</h4>
                <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-display mt-1">Carriage Act of Fastest Air Courier</div>
                <p className="text-xs text-slate-500 mt-2 font-sans font-medium">Effective date: June 2026. This manual constitutes a legally binding document between Fastest Air Courier and all active booking customers.</p>
              </div>

              {TERMS_SECTIONS.map((sec) => {
                // Check if any clause matches search query
                const filteredClauses = sec.clauses.filter(clause => matchesSearch(clause));
                const matchesTitle = matchesSearch(sec.title);
                
                if (filteredClauses.length === 0 && !matchesTitle) return null;

                return (
                  <div 
                    key={sec.num} 
                    id={`terms-sec-${sec.num}`}
                    className="space-y-4 scroll-mt-24 transition duration-300"
                  >
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-dhl-red bg-dhl-yellow/10 px-2.5 py-1 rounded-md border border-dhl-yellow/30 shrink-0">
                        Section {sec.num}
                      </span>
                      <h3 className="font-display text-lg font-extrabold text-[#1A1A1A] tracking-tight">
                        {sec.title}
                      </h3>
                    </div>

                    <div className="space-y-4 pl-4 border-l-2 border-slate-100">
                      {filteredClauses.map((clause, idx) => (
                        <p key={idx} className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed font-sans font-medium">
                          {clause}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Legal validation stamp footer */}
              <div className="border-t border-slate-200 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-slate-500 font-sans">
                <div>
                  <div className="text-[10px] font-bold text-slate-400">REPRESENTATIVE OWNER PRINCIPAL</div>
                  <div className="font-extrabold text-[#1A1A1A] text-sm mt-1">Kaleru Veena, Proprietor</div>
                  <div className="text-[10px]">Fastest Air Courier</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[10px] font-bold text-slate-400">ELECTRONIC VERIFICATION TIMETRAIN</div>
                  <div className="text-dhl-red font-extrabold mt-1">FAC-VERIFIED-SSL-2026</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

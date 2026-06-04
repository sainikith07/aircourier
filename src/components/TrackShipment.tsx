/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Search, ExternalLink, Container, ShieldAlert } from 'lucide-react';
import { COURIER_PARTNERS } from '../data/pricing';

export default function TrackShipment() {
  const [selectedCourier, setSelectedCourier] = useState(COURIER_PARTNERS[0]);
  const [trackingId, setTrackingId] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleTrackRedirect = (e: FormEvent) => {
    e.preventDefault();
    if (!trackingId) {
      window.open(selectedCourier.trackingUrl, "_blank", "noopener,noreferrer");
      return;
    }

    let url = selectedCourier.trackingUrl;
    if (selectedCourier.id === 'dhl') {
      url = `https://www.dhl.com/in-en/home/tracking/tracking-express.html?submit=1&tracking-id=${trackingId}`;
    } else if (selectedCourier.id === 'fedex') {
      url = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${trackingId}`;
    } else if (selectedCourier.id === 'ups') {
      url = `https://www.ups.com/track?tracknum=${trackingId}`;
    } else if (selectedCourier.id === 'atlantic') {
      url = `https://atlanticcourier.net/track/?tracking_id=${trackingId}`;
    } else if (selectedCourier.id === 'dtdc') {
      url = `https://www.dtdc.com/track-your-shipment-detail?awbNo=${trackingId}`;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    setToastMessage(`Redirecting to ${selectedCourier.name} hub to lookup: ${trackingId}`);
    setTimeout(() => setToastMessage(""), 400);
  };

  return (
    <section id="tracking" className="relative py-24 min-h-[70vh] flex items-center justify-center bg-[#FAF9F5]">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-dhl-yellow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-dhl-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-dhl-yellow/15 border border-dhl-yellow/30 rounded-full mb-4">
            <Container className="w-4 h-4 text-dhl-red" />
            <span className="text-[10px] font-black tracking-wider text-dhl-dark uppercase font-mono">Real-Time Transit Check</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-dhl-dark mb-4">
            Track Your Shipment
          </h2>
          <p className="text-sm text-slate-600 font-sans max-w-2xl mx-auto">
            Select your assigned tracking carrier partner below, enter your physical AWB (Airway Bill) tracking code, and instantly trace your consignment journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Selector list */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 pl-1 font-bold">
              Select Carrier Agent:
            </span>
            {COURIER_PARTNERS.map((partner) => {
              const isSelected = selectedCourier.id === partner.id;
              return (
                <button
                  key={partner.id}
                  onClick={() => {
                    setSelectedCourier(partner);
                    setTrackingId("");
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition duration-150 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-white border-dhl-red ring-1 ring-dhl-red/20 shadow-sm"
                      : "bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-dhl-red" : "border-slate-400"
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-dhl-red rounded-full" />}
                    </div>
                    
                    <span className={`text-sm font-sans font-bold ${
                      isSelected ? "text-dhl-dark" : "text-slate-600 group-hover:text-slate-900"
                    }`}>
                      {partner.name}
                    </span>
                  </div>

                  <span className={`text-[10px] px-2.5 py-1 rounded font-mono font-bold ${partner.color} text-white uppercase tracking-wider`}>
                    {partner.logoText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Tracking entry form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden h-full flex flex-col justify-between">
              
              <form onSubmit={handleTrackRedirect} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-display">
                      Airway AWB Code / Reference Bill
                    </label>
                    <span className="text-[10px] text-dhl-red font-mono font-bold uppercase tracking-wider">
                      {selectedCourier.name} Standard
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder={selectedCourier.trackingPlaceholder}
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-dhl-red/25 font-mono text-sm focus:border-dhl-red transition-all font-bold placeholder-slate-400"
                    />
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-2 font-sans leading-relaxed">
                    If you don't have an AWB code yet, click "Lookup Central Records" to access general flight routing rules directly.
                  </p>
                </div>

                {toastMessage && (
                  <div className="text-xs text-dhl-dark font-mono p-3 bg-dhl-yellow/20 border border-dhl-yellow/30 rounded-lg">
                    🚀 {toastMessage}
                  </div>
                )}

                <div className="space-y-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <span className="block text-[9.5px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Route Anchor:
                  </span>
                  <div className="flex justify-between items-center text-xs text-slate-600 font-sans">
                    <span>Departure Hub</span>
                    <span className="text-slate-800 font-mono font-bold">Hyderabad (HYD), India</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 font-sans">
                    <span>Target Route</span>
                    <span className="text-dhl-red font-mono font-bold">Global International Cargo Network</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-dhl-yellow hover:bg-[#e6b800] text-dhl-dark font-extrabold text-xs uppercase tracking-wider font-display rounded-xl transition duration-150 shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Lookup Central Records</span>
                  <ExternalLink className="w-4 h-4 text-dhl-dark" />
                </button>
              </form>

              {/* Warning statement */}
              <div className="border-t border-slate-100 pt-6 mt-6">
                <div className="flex gap-2.5 items-start text-[11px] text-slate-500 font-sans leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-dhl-red shrink-0 mt-0.5" />
                  <span>
                    Official airway reference codes are issued during physically scheduling unsealed pickle or medicine verification runs. Status sync cycles update after 2-4 hours from actual flight departures.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, ArrowRight, ShieldCheck, Plus, Trash2, Edit2, RotateCcw, 
  Search, X, KeyRound, Save, CheckCircle
} from 'lucide-react';
import { PriceRecord } from '../types';
import { COUNTRIES, SERVICES, PRODUCT_TYPES, INITIAL_PRICE_RECORDS, DEFAULT_COUNTRY_SERVICES } from '../data/pricing';

export default function AdminPanel({ isDarkMode = false }: { isDarkMode?: boolean }) {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Database pricing state
  const [records, setRecords] = useState<PriceRecord[]>([]);
  const [countryServices, setCountryServices] = useState<Record<string, string[]>>(DEFAULT_COUNTRY_SERVICES);
  const [selectedCountryConfig, setSelectedCountryConfig] = useState("USA");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PriceRecord | null>(null);

  // Form states for Create/Edit
  const [formCountry, setFormCountry] = useState("USA");
  const [formService, setFormService] = useState("DHL");
  const [formProduct, setFormProduct] = useState("Food & Grocery Items");
  const [formWeightMin, setFormWeightMin] = useState(0);
  const [formWeightMax, setFormWeightMax] = useState(100);
  const [formPrice, setFormPrice] = useState(990);
  
  // Custom toast notification states
  const [notification, setNotification] = useState("");

  // Check existing credentials in session on load
  useEffect(() => {
    const isSavedAuth = sessionStorage.getItem("fastest_admin_session");
    if (isSavedAuth === "true") {
      setIsAuthenticated(true);
    }

    const savedPrices = localStorage.getItem("fastest_air_prices");
    if (savedPrices) {
      try {
        setRecords(JSON.parse(savedPrices));
      } catch (e) {
        setRecords(INITIAL_PRICE_RECORDS);
      }
    } else {
      localStorage.setItem("fastest_air_prices", JSON.stringify(INITIAL_PRICE_RECORDS));
      setRecords(INITIAL_PRICE_RECORDS);
    }

    const savedServices = localStorage.getItem("fastest_country_services");
    if (savedServices) {
      try {
        setCountryServices(JSON.parse(savedServices));
      } catch (e) {
        setCountryServices(DEFAULT_COUNTRY_SERVICES);
      }
    } else {
      localStorage.setItem("fastest_country_services", JSON.stringify(DEFAULT_COUNTRY_SERVICES));
    }
  }, []);

  // Show a momentary floating alert
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // Authenticate Admin Credentials
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === "FastestAirCourier" && password === "Veena@2205") {
        setIsAuthenticated(true);
        sessionStorage.setItem("fastest_admin_session", "true");
        triggerNotification("Authenticated securely! Admin session initialized.");
      } else {
        setAuthError("Invalid username or password. Please verify credentials.");
      }
      setIsLoading(false);
    }, 700);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("fastest_admin_session");
  };

  // CRUD Actions
  const handleAddOrEditRecord = (e: FormEvent) => {
    e.preventDefault();
    
    if (editingRecord) {
      // Edit mode
      const updated = records.map(rec => {
        if (rec.id === editingRecord.id) {
          return {
            ...rec,
            country: formCountry,
            service: formService,
            productType: formProduct,
            weightMin: Number(formWeightMin),
            weightMax: Number(formWeightMax),
            pricePerKg: Number(formPrice)
          };
        }
        return rec;
      });
      localStorage.setItem("fastest_air_prices", JSON.stringify(updated));
      setRecords(updated);
      setEditingRecord(null);
      triggerNotification("Courier charges record modified and saved.");
    } else {
      // Create mode
      const newRec: PriceRecord = {
        id: `rec-${Date.now()}`,
        country: formCountry,
        service: formService,
        productType: formProduct,
        weightMin: Number(formWeightMin),
        weightMax: Number(formWeightMax),
        pricePerKg: Number(formPrice)
      };
      const updated = [newRec, ...records];
      localStorage.setItem("fastest_air_prices", JSON.stringify(updated));
      setRecords(updated);
      triggerNotification("New courier charges record added safely.");
    }

    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm("Are you sure you want to delete this shipping price record?")) {
      const updated = records.filter(rec => rec.id !== id);
      localStorage.setItem("fastest_air_prices", JSON.stringify(updated));
      setRecords(updated);
      triggerNotification("Courier charges record deleted successfully.");
    }
  };

  const handleResetToSeeds = () => {
    if (confirm("This will overwrite all customized price variations and restore initial baseline levels. Proceed?")) {
      localStorage.setItem("fastest_air_prices", JSON.stringify(INITIAL_PRICE_RECORDS));
      localStorage.setItem("fastest_country_services", JSON.stringify(DEFAULT_COUNTRY_SERVICES));
      setRecords(INITIAL_PRICE_RECORDS);
      setCountryServices(DEFAULT_COUNTRY_SERVICES);
      triggerNotification("Database restored to initial baseline tables.");
    }
  };

  const startEdit = (rec: PriceRecord) => {
    setEditingRecord(rec);
    setFormCountry(rec.country);
    setFormService(rec.service);
    setFormProduct(rec.productType);
    setFormWeightMin(rec.weightMin);
    setFormWeightMax(rec.weightMax);
    setFormPrice(rec.pricePerKg);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormCountry("USA");
    setFormService("DHL");
    setFormProduct("Food & Grocery Items");
    setFormWeightMin(0);
    setFormWeightMax(100);
    setFormPrice(990);
    setEditingRecord(null);
  };

  // Toggle active service option for a country config
  const handleToggleService = (srv: string) => {
    const current = countryServices[selectedCountryConfig] || [];
    let updated: string[];
    if (current.includes(srv)) {
      updated = current.filter(s => s !== srv);
    } else {
      updated = [...current, srv];
    }
    const updatedMatrix = {
      ...countryServices,
      [selectedCountryConfig]: updated
    };
    localStorage.setItem("fastest_country_services", JSON.stringify(updatedMatrix));
    setCountryServices(updatedMatrix);
    triggerNotification(`Active carrier partners updated for ${selectedCountryConfig}!`);
  };

  // Filter prices list
  const filteredRecords = records.filter(rec => 
    rec.country.toLowerCase().includes(search.toLowerCase()) ||
    rec.service.toLowerCase().includes(search.toLowerCase()) ||
    rec.productType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="admin-panel" className="relative py-20 min-h-screen bg-[#FAF9F5] flex items-center justify-center text-[#1A1A1A]">
      
      {/* Toast Alert floating */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 z-50 bg-[#FFCC00] border border-dhl-red text-[#1A1A1A] font-sans font-bold text-xs px-4.5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5"
          >
            <CheckCircle className="w-5 h-5 text-dhl-red shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {!isAuthenticated ? (
          /* Login Authentication Gate */
          <div className="max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 pb-10 bg-white border border-slate-200 rounded-3xl shadow-xl relative overflow-hidden"
            >
              {/* Abs locks pattern */}
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <KeyRound className="w-24 h-24 text-slate-900" />
              </div>

              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-[#FFCC00]/15 rounded-2xl flex items-center justify-center border border-[#FFCC00]/40 mx-auto mb-4 text-dhl-red">
                  <Lock className="w-6 h-6 text-dhl-red" />
                </div>
                <h2 className="font-display text-2xl font-black tracking-tight text-[#1A1A1A] mb-2">Secure Admin Gateway</h2>
                <p className="text-xs text-slate-500 font-sans font-medium">Access active price modifiers and routing nodes.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
                    System Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. FastestAirCourier"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 focus:border-dhl-red text-sm font-sans font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-sans">
                    System Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[#1A1A1A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-dhl-red/20 focus:border-dhl-red text-sm font-sans font-semibold"
                  />
                </div>

                {authError && (
                  <div className="text-xs text-red-700 font-sans font-bold p-3 bg-red-50 border border-red-200 rounded-xl">
                    ⚠️ {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#FFCC00] hover:bg-[#e6b800] text-[#1A1A1A] font-extrabold text-xs uppercase tracking-widest font-display rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow"
                >
                  {isLoading ? "Validating Credentials..." : "Access Control Node"}
                  <ArrowRight className="w-4 h-4 text-dhl-red" />
                </button>
              </form>

              <div className="border-t border-slate-100 mt-6 pt-5 text-center">
                <p className="text-[11px] text-slate-400 font-sans font-semibold">Proprietor: Kaleru Veena. System Version 4.1.2026</p>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Authenticated Dashboard Panel */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xl relative"
          >
            {/* Header row */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-slate-100 pb-6 mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md border border-emerald-200 inline-flex items-center gap-1.5 font-sans mb-1.5 animate-pulse">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Secure Admin Session Active
                </span>
                <h2 className="font-display text-3xl font-black tracking-tight text-[#1A1A1A]">Manage Courier Charges Database</h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleResetToSeeds}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:text-slate-900 rounded-xl text-xs font-sans font-bold tracking-wide transition flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-dhl-red" />
                  Restore Initial Rates
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                  className="px-4 py-2 bg-[#FFCC00] hover:bg-[#e6b800] text-[#1A1A1A] rounded-xl text-xs font-sans font-extrabold tracking-wide transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-dhl-red" />
                  Add Pricing Slab
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xl text-xs font-sans font-bold transition cursor-pointer"
                >
                  Exit Control Center
                </button>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Booking Slabs</span>
                <div className="text-3xl font-black text-[#1A1A1A] mt-1 font-sans">{records.length}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Configured Countries</span>
                <div className="text-3xl font-black text-dhl-red mt-1 font-sans">{COUNTRIES.filter(c => c !== "Others").length}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Air Carriers</span>
                <div className="text-3xl font-black text-[#1A1A1A] mt-1 font-sans">{SERVICES.length}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Product Categories</span>
                <div className="text-3xl font-black text-indigo-700 mt-1 font-sans">{PRODUCT_TYPES.length}</div>
              </div>
            </div>

            {/* Service Availability Matrix Config Panel */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
              <h4 className="font-display text-lg font-black text-[#1A1A1A] mb-2 flex items-center gap-2">
                ⚙️ Router Mapping: Carrier Options Per Country
              </h4>
              <p className="text-xs text-slate-600 font-sans mb-5 font-semibold">
                Configure which specific courier carrier options are active and display in the dropdown selectors for each country.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Select country to edit */}
                <div className="md:col-span-5">
                  <label className="block text-[11px] font-sans font-bold uppercase text-slate-500 mb-1.5">
                    Select Target Country
                  </label>
                  <select
                    value={selectedCountryConfig}
                    onChange={(e) => setSelectedCountryConfig(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-dhl-red/20 text-sm font-sans font-semibold cursor-pointer shadow-sm hover:border-slate-300"
                  >
                    {COUNTRIES.filter(c => c !== "Others").map((cty) => (
                      <option key={cty} value={cty}>
                        ✈ {cty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Carrier toggles */}
                <div className="md:col-span-7">
                  <label className="block text-[11px] font-sans font-bold uppercase text-slate-500 mb-2.5">
                    Supported Carriers for {selectedCountryConfig}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((srv) => {
                      const isActive = (countryServices[selectedCountryConfig] || []).includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => handleToggleService(srv)}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-sans font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                            isActive
                              ? "bg-[#FFCC00] text-[#1A1A1A] border-dhl-red"
                              : "bg-white text-slate-600 border-slate-200 hover:text-[#1A1A1A] hover:bg-slate-50"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-600' : 'bg-slate-400'}`}></span>
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Search Table utility */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 max-w-md mb-6 shadow-sm hover:border-slate-300 transition-colors">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text"
                placeholder="Search pricing lanes by Country, etc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none w-full text-sm text-[#1A1A1A] placeholder-slate-400 font-sans font-semibold"
              />
            </div>

            {/* Table layout container */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse font-sans text-sm">
                <thead>
                  <tr className="bg-slate-50 font-sans font-bold border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
                    <th className="p-4.5">Destination Country</th>
                    <th className="p-4.5">Air Carrier Option</th>
                    <th className="p-4.5">Product Category</th>
                    <th className="p-4.5">Weight range</th>
                    <th className="p-4.5">Price Per KG</th>
                    <th className="p-4.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition duration-150 font-medium">
                      <td className="p-4.5 font-bold text-slate-900">
                        ✈ {rec.country}
                      </td>
                      <td className="p-4.5">
                        <span className="px-2.5 py-1 rounded bg-[#FFCC00]/10 text-[#1A1A1A] font-extrabold text-xs border border-[#FFCC00]/20">
                          {rec.service}
                        </span>
                      </td>
                      <td className="p-4.5 font-sans text-xs font-semibold text-slate-600">{rec.productType}</td>
                      <td className="p-4.5 font-sans font-bold text-xs text-slate-500">
                        {rec.weightMin} - {rec.weightMax} KG
                      </td>
                      <td className="p-4.5 text-dhl-red font-extrabold text-base font-sans">
                        ₹{rec.pricePerKg}/KG
                      </td>
                      <td className="p-4.5 text-right">
                        <div className="inline-flex gap-2.5 justify-end">
                          <button
                            onClick={() => startEdit(rec)}
                            className="p-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 transition text-xs font-sans font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(rec.id)}
                            className="p-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 transition text-xs font-sans font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-slate-500 font-sans font-bold">
                        No active rates found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Create/Edit Modal popup overlay */}
            <AnimatePresence>
              {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6.5 relative shadow-2xl text-[#1A1A1A]"
                  >
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="absolute top-4.5 right-4.5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-[#1A1A1A] cursor-pointer transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="font-display text-2xl font-black tracking-tight text-[#1A1A1A] mb-5">
                      {editingRecord ? "Modify Courier Charge Rate" : "Add Courier Charge Rate"}
                    </h3>

                    <form onSubmit={handleAddOrEditRecord} className="space-y-4">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                            Target Country
                          </label>
                          <select
                            value={formCountry}
                            onChange={(e) => setFormCountry(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#1A1A1A] font-sans text-sm font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-dhl-red/20 focus:border-dhl-red"
                          >
                            {COUNTRIES.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 font-sans">
                            Preferred Courier
                          </label>
                          <select
                            value={formService}
                            onChange={(e) => setFormService(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#1A1A1A] font-sans text-sm font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-dhl-red/20 focus:border-dhl-red"
                          >
                            {SERVICES.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 font-sans">
                          Product Class
                        </label>
                        <select
                          value={formProduct}
                          onChange={(e) => setFormProduct(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#1A1A1A] font-sans text-sm font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-dhl-red/20 focus:border-dhl-red"
                        >
                          {PRODUCT_TYPES.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 font-sans">
                            Weight Min (KG)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            required
                            value={formWeightMin}
                            onChange={(e) => setFormWeightMin(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#1A1A1A] font-sans text-sm font-bold focus:outline-none focus:ring-1 focus:ring-dhl-red/20 focus:border-dhl-red"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 font-sans">
                            Weight Max (KG)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            required
                            value={formWeightMax}
                            onChange={(e) => setFormWeightMax(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#1A1A1A] font-sans text-sm font-bold focus:outline-none focus:ring-1 focus:ring-dhl-red/20 focus:border-dhl-red"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 font-sans">
                          Rate per KG (INR ₹)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            required
                            value={formPrice}
                            onChange={(e) => setFormPrice(Number(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-dhl-red font-sans text-sm font-bold focus:outline-none focus:ring-1 focus:ring-dhl-red/20 focus:border-dhl-red"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-sans text-sm font-bold">
                            ₹
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddModal(false);
                            resetForm();
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-sans font-bold text-slate-600 hover:text-slate-800 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#FFCC00] hover:bg-[#e6b800] text-[#1A1A1A] font-extrabold font-sans text-xs uppercase tracking-wide rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5 text-dhl-red" />
                          Save Price Rule
                        </button>
                      </div>

                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

      </div>
    </section>
  );
}

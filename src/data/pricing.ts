/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PriceRecord, ProhibitedItem, PartnerCourier, FAQItem, TestimonialItem } from '../types';

export const COUNTRIES = [
  "USA",
  "UK",
  "Canada",
  "Australia Metro",
  "Australia Rural",
  "Dubai",
  "Germany",
  "New Zealand",
  "Sweden",
  "Ireland",
  "South Africa",
  "Singapore",
  "Others"
];

export const DEFAULT_COUNTRY_SERVICES: Record<string, string[]> = {
  "USA": ["DHL", "FedEx", "UPS"],
  "UK": ["DHL", "FedEx"],
  "Canada": ["DHL", "FedEx", "UPS"],
  "Australia Metro": ["DHL", "FedEx"],
  "Australia Rural": ["DHL"],
  "Dubai": ["DHL", "Aramex"],
  "Germany": ["DHL", "FedEx", "UPS"],
  "New Zealand": ["DHL", "FedEx", "UPS"],
  "Sweden": ["DHL", "FedEx"],
  "Ireland": ["DHL", "FedEx", "Atlantic"],
  "South Africa": ["DHL", "FedEx"],
  "Singapore": ["DHL", "FedEx", "Aramex"],
  "Others": []
};

export const SERVICES = [
  "DHL", "FedEx", "UPS", "Aramex", "Atlantic", "DTDC", "Shipwala"
];

export const PRODUCT_TYPES = [
  "Documents",
  "Medicine",
  "Food & Grocery Items"
];

// Seed price data
export const INITIAL_PRICE_RECORDS: PriceRecord[] = [
  // USA
  { id: 'rec-1', country: 'USA', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 990 },
  { id: 'rec-2', country: 'USA', service: 'FedEx', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 940 },
  { id: 'rec-3', country: 'USA', service: 'DHL', productType: 'Documents', weightMin: 0, weightMax: 100, pricePerKg: 1250 },
  { id: 'rec-4', country: 'USA', service: 'UPS', productType: 'Medicine', weightMin: 0, weightMax: 100, pricePerKg: 1450 },
  
  // UK
  { id: 'rec-5', country: 'UK', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 850 },
  { id: 'rec-6', country: 'UK', service: 'FedEx', productType: 'Documents', weightMin: 0, weightMax: 100, pricePerKg: 1100 },
  { id: 'rec-7', country: 'UK', service: 'DHL', productType: 'Medicine', weightMin: 0, weightMax: 100, pricePerKg: 1350 },
  
  // Canada
  { id: 'rec-8', country: 'Canada', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 1020 },
  { id: 'rec-9', country: 'Canada', service: 'FedEx', productType: 'Medicine', weightMin: 0, weightMax: 100, pricePerKg: 1620 },

  // Australia Metro
  { id: 'rec-10', country: 'Australia Metro', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 850 },
  { id: 'rec-11', country: 'Australia Metro', service: 'DHL', productType: 'Medicine', weightMin: 0, weightMax: 100, pricePerKg: 1450 },
  { id: 'rec-12', country: 'Australia Metro', service: 'FedEx', productType: 'Documents', weightMin: 0, weightMax: 100, pricePerKg: 1200 },

  // Australia Rural
  { id: 'rec-13', country: 'Australia Rural', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 1050 },
  { id: 'rec-14', country: 'Australia Rural', service: 'DHL', productType: 'Medicine', weightMin: 0, weightMax: 100, pricePerKg: 1650 },
  { id: 'rec-15', country: 'Australia Rural', service: 'DHL', productType: 'Documents', weightMin: 0, weightMax: 100, pricePerKg: 1350 },

  // Dubai
  { id: 'rec-16', country: 'Dubai', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 650 },
  { id: 'rec-17', country: 'Dubai', service: 'Aramex', productType: 'Medicine', weightMin: 0, weightMax: 100, pricePerKg: 950 },

  // Singapore
  { id: 'rec-18', country: 'Singapore', service: 'DHL', productType: 'Food & Grocery Items', weightMin: 0, weightMax: 100, pricePerKg: 700 }
];

// Helper to estimate pricing intelligently if records are modified or unconfigured
export function calculateEstimatedPrice(
  country: string,
  service: string,
  productType: string,
  weight: number,
  customRecords: PriceRecord[]
): { pricePerKg: number; total: number; isCustom: boolean } {
  // First, find exact match in stored list
  const match = customRecords.find(rec => 
    rec.country.toLowerCase() === country.toLowerCase() &&
    rec.service.toLowerCase() === service.toLowerCase() &&
    rec.productType.toLowerCase() === productType.toLowerCase() &&
    weight >= rec.weightMin &&
    weight <= rec.weightMax
  );

  if (match) {
    return {
      pricePerKg: match.pricePerKg,
      total: Math.round(match.pricePerKg * weight),
      isCustom: true
    };
  }

  // Base fallback formula for realistic, premium price estimation 
  // and multi-factor logistics approximation
  let baseRate = 650; // starts at ₹650/KG

  // Country multiplier
  const distanceMap: Record<string, number> = {
    'USA': 1.4, 'Canada': 1.5, 'Australia Metro': 1.6, 'Australia Rural': 1.8, 'Germany': 1.25, 'UK': 1.2,
    'Dubai': 0.9, 'New Zealand': 1.7, 'Sweden': 1.35, 'Ireland': 1.3, 'South Africa': 1.5, 'Singapore': 1.0, 'Others': 1.0
  };
  const countryMultiplier = distanceMap[country] || 1.3;

  // Courier multiplier
  const premiumCouriers: Record<string, number> = {
    'DHL': 1.25, 'FedEx': 1.2, 'UPS': 1.18, 'Aramex': 1.05, 
    'Atlantic': 1.0, 'DTDC': 0.95, 'Shipwala': 0.88
  };
  const courierMultiplier = premiumCouriers[service] || 1.0;

  // Product difficulty/restrictions multiplier
  const categoryMap: Record<string, number> = {
    'Documents': 1.4,
    'Medicine': 1.5,
    'Food & Grocery Items': 1.15
  };
  const productMultiplier = (categoryMap[productType] as number) || 1.0;

  // Weight discount curves (higher weights decrease price per kg slightly)
  let weightDiscount = 1.0;
  if (weight > 50) weightDiscount = 0.75;
  else if (weight > 20) weightDiscount = 0.82;
  else if (weight > 10) weightDiscount = 0.88;
  else if (weight > 5) weightDiscount = 0.93;
  else if (weight > 2) weightDiscount = 0.97;

  const pricePerKg = Math.round(baseRate * countryMultiplier * courierMultiplier * productMultiplier * weightDiscount);
  
  return {
    pricePerKg: pricePerKg,
    total: Math.round(pricePerKg * weight),
    isCustom: false
  };
}

export const PROHIBITED_ITEMS: ProhibitedItem[] = [
  {
    name: "Perfumes & Colognes",
    category: "Dangerous/Flammable",
    explanation: "Alcohol-based sprays and pressurized aerosol containers are prohibited on commercial aircraft due to explosion and fire hazards under high pressure.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    severity: "Strict"
  },
  {
    name: "Explosives & Fireworks",
    category: "Dangerous Goods",
    explanation: "Any chemical compound designed or capable of producing explosion, heat, or pyrotechnics is strictly illegal and banned for all air carriage.",
    imageUrl: "https://images.unsplash.com/photo-1533230393054-041a50ee56d1?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Firearms & Ammunition",
    category: "Illegal/Restricted",
    explanation: "Weapons of any type, ammunition, gun components, or replica firearms are strictly regulated and legally forbidden from standard delivery channels.",
    imageUrl: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Illegal Drugs & Narcotics",
    category: "Illegal/Restricted",
    explanation: "Controlled narcotic compounds, recreational substances, and unapproved medicines are strictly illegal and subject to immediate customs seizure and prosecution.",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Hazardous Chemicals",
    category: "Dangerous Goods",
    explanation: "Corrosive chemicals, liquid acids, mercury-containing devices, and industrial chemical components present a direct hazard to airplane safety.",
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Flammable Liquids & Fuels",
    category: "Dangerous/Flammable",
    explanation: "Gasoline, alcohol, kerosene, lighter fluid, petroleum and chemical solvents can quickly ignite under transit friction, thus forbidden from flights.",
    imageUrl: "https://images.unsplash.com/photo-1538338621430-d441f3d4548c?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Toxic & Infectious Materials",
    category: "Dangerous Goods",
    explanation: "Poisons, toxic waste, laboratory biological cultures, medical pathogens, or environmental hazards cannot be carried without extreme medical permits.",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351166?auto=format&fit=crop&q=80&w=400",
    severity: "Strict"
  },
  {
    name: "Currency Notes & Coins",
    category: "Illegal/Restricted",
    explanation: "Active currency notes, blank checks, travelers checks, gold bars, precious diamonds, and anonymous cash instruments are high-theft risks and prohibited globally.",
    imageUrl: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&q=80&w=400",
    severity: "Strict"
  },
  {
    name: "Unsealed Perishable Goods",
    category: "Perishable/Live",
    explanation: "Fresh fruits, raw meats, unsterilized dairy and open food decompose rapidly during flight times, leading to custom hygiene rejections and contamination.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
    severity: "Conditional"
  },
  {
    name: "Live Animals & Pets",
    category: "Perishable/Live",
    explanation: "Live animals, insects, fishes, or botanical plants require custom biological compartments and special pet transport logistics; standard couriers cannot ship live beings.",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Lithium-Ion Batteries",
    category: "Dangerous/Flammable",
    explanation: "Loose powerbanks, detached lithium-metal cells or unshielded batteries can short circuit and catch fire. Must be built inside the host electronic device.",
    imageUrl: "https://images.unsplash.com/photo-1620286337471-9ba30c009068?auto=format&fit=crop&q=80&w=400",
    severity: "Strict"
  },
  {
    name: "Pressurized Gas Cylinders",
    category: "Dangerous Goods",
    explanation: "Butane canister, propane, fire extinguisher, scuba cylinders, aerosol paint container store enormous inner pressure and can detonate during depressurization.",
    imageUrl: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  },
  {
    name: "Sharp Tactical Weapons",
    category: "Illegal/Restricted",
    explanation: "Combat knives, swords, tactical daggers, concealed blades present high security risks and must only be carried after intense military authorization.",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=400",
    severity: "Strict"
  },
  {
    name: "Radioactive Materials",
    category: "Dangerous Goods",
    explanation: "Any apparatus containing thorium, uranium, radioactive isotopes for industrial or medical devices must go through specialty radioactive transport corridors.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=400",
    severity: "Critical"
  }
];

export const COURIER_PARTNERS: PartnerCourier[] = [
  {
    id: "dhl",
    name: "DHL Express",
    logoText: "DHL",
    trackingPlaceholder: "e.g., 1234567890",
    trackingUrl: "https://www.dhl.com/in-en/home/tracking.html",
    color: "from-yellow-400 to-amber-500",
    accentColor: "#FFCC00"
  },
  {
    id: "fedex",
    name: "FedEx International",
    logoText: "FedEx",
    trackingPlaceholder: "e.g., 771234567890",
    trackingUrl: "https://www.fedex.com/en-in/tracking.html",
    color: "from-purple-600 to-indigo-700",
    accentColor: "#4D148C"
  },
  {
    id: "ups",
    name: "UPS Logistics",
    logoText: "UPS",
    trackingPlaceholder: "e.g., 1Z999XX10123456784",
    trackingUrl: "https://www.ups.com/track?loc=en_IN&requester=ST/",
    color: "from-amber-800 to-amber-950",
    accentColor: "#351C15"
  },
  {
    id: "aramex",
    name: "Aramex Global",
    logoText: "aramex",
    trackingPlaceholder: "e.g., 32847192",
    trackingUrl: "https://www.aramex.com/express/track.aspx",
    color: "from-red-600 to-rose-700",
    accentColor: "#E02020"
  },
  {
    id: "atlantic",
    name: "Atlantic Courier",
    logoText: "Atlantic",
    trackingPlaceholder: "e.g., AT987654321",
    trackingUrl: "https://atlanticcourier.net/track/",
    color: "from-blue-600 to-indigo-800",
    accentColor: "#0055A5"
  },
  {
    id: "dtdc",
    name: "DTDC Global",
    logoText: "DTDC",
    trackingPlaceholder: "e.g., D12345678",
    trackingUrl: "https://www.dtdc.com/track-your-shipment/",
    color: "from-blue-500 to-sky-600",
    accentColor: "#2D51A3"
  },
  {
    id: "shipwala",
    name: "Shipwala Cargo",
    logoText: "Shipwala",
    trackingPlaceholder: "e.g., SW-1049281",
    trackingUrl: "https://www.shipwala.com",
    color: "from-emerald-500 to-teal-600",
    accentColor: "#059669"
  }
];

export const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "Do you offer door-to-door home pickup service?",
    answer: "Yes, we offer 100% Free Home Pickup throughout Hyderabad and neighboring areas. Our courier specialists will visit your convenience step to pack, scale, book, and collect your packages."
  },
  {
    category: "Packaging",
    question: "What is NRI Packing and is it available?",
    answer: "NRI Packing is a luxury triple-layer secure bubble-wrapping and waterproof vacuum-sealing grade designed specifically for long-distance oceanic or high-altitude international air freight. This keeps dry food, sweets, and medicines sealed, perfectly fresh, leak-proof, and fully compliant with international quarantine rules."
  },
  {
    category: "Pricing & Weight",
    question: "How is international volumetric weight calculated?",
    answer: "International air cargo pricing is calculated mathematically based on the higher of the Actual Gross Weight vs the Volumetric (Dimensional) weight. Volumetric weight is computed as: (Length x Width x Height in cm) / 5000."
  },
  {
    category: "Customs",
    question: "Do you assist with international customs clearance?",
    answer: "Absolutely. With 13+ years of experience, we prepare all standard custom invoices, non-dangerous declarations, and packing lists to ensure highly efficient, clearance without unexpected delays in destinations like the USA, Europe, or Australia."
  },
  {
    category: "Insurance",
    question: "Is package weight insurance coverage available?",
    answer: "Yes, we offer premium high-value carriage insurance for expensive document files, electronics, designer garments, and precious cargo. Ask our booking specialist during doorstep pickup."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Dr. Srinivas Rao",
    location: "USA (Silicon Valley)",
    rating: 5,
    serviceUsed: "Sweets & Homemade Pickles (DHL Service)",
    text: "Excellent service! Fastest Air Courier picked up my homemade ghee pickles and sweets directly from my home in Hyderabad. The NRI vacuum packaging made sure it reached my daughter in California in exactly 4 days with zero leakage and complete freshness preserved!"
  },
  {
    id: "t-2",
    name: "Komal Sharma",
    location: "London, United Kingdom",
    rating: 5,
    serviceUsed: "Urgent University Visa Documents (FedEx)",
    text: "My university documents and mark sheets were delivered next day to the UK admissions desk. Highly professional team, exceptionally supportive tracking updates. Truly lived up to their name of Fastest Air Courier!"
  },
  {
    id: "t-3",
    name: "Anil Kaleru",
    location: "Sydney, Australia",
    rating: 5,
    serviceUsed: "Emergency Ayurvedic Medicines & Apparel",
    text: "Very reliable. I needed specialized Ayurvedic medicines shipped from India on an urgent basis. They handled all customs medical paperwork perfectly, cleared it in Australia within 5 hours of flight landing, and delivered right to my apartment doorstep. Highly recommended."
  },
  {
    id: "t-4",
    name: "Madhurima Sen",
    location: "Munich, Germany",
    rating: 5,
    serviceUsed: "Festival Puja Items & Clothing (UPS)",
    text: "Outstanding Diwali festive materials shipment. Beautifully packed without any damage. 13+ years of experience really shows. Kaleru Veena and her crew are extremely courteous and prompt."
  }
];

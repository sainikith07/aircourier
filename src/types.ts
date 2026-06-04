/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 
  | 'home' 
  | 'price-enquiry' 
  | 'track-shipment' 
  | 'prohibited-items' 
  | 'terms' 
  | 'contact';

export interface PriceRecord {
  id: string;
  country: string;
  service: string;
  productType: string;
  weightMin: number; // in KG
  weightMax: number; // in KG
  pricePerKg: number; // in INR ₹
}

export interface ProhibitedItem {
  name: string;
  category: 'Dangerous Goods' | 'Illegal/Restricted' | 'Dangerous/Flammable' | 'Perishable/Live';
  explanation: string;
  imageUrl: string;
  severity: 'Critical' | 'Strict' | 'Conditional';
}

export interface PartnerCourier {
  id: string;
  name: string;
  logoText: string;
  trackingPlaceholder: string;
  trackingUrl: string;
  color: string;
  accentColor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  serviceUsed: string;
}

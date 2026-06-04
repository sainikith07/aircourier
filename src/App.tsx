/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import WorldMap from './components/WorldMap';
import WhatWeShip from './components/WhatWeShip';
import PriceEnquiry from './components/PriceEnquiry';
import ProhibitedItems from './components/ProhibitedItems';
import AdminPanel from './components/AdminPanel';
import TermsAndConditions from './components/TermsAndConditions';
import TrackShipment from './components/TrackShipment';
import { FloatingWidgets, PremiumLoadingScreen } from './components/CustomWidgets';
import { PageId } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<PageId | 'admin'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  // Synchronize dark/light layout colors on direct viewport document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.style.backgroundColor = '#FAF9F5'; // DHL premium light background
  }, []);

  // Helper to render current screen page views
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <Hero isDarkMode={isDarkMode} setPage={setActivePage} />
            <WorldMap isDarkMode={isDarkMode} />
            <WhatWeShip isDarkMode={isDarkMode} setPage={setActivePage} />
          </>
        );
      case 'price-enquiry':
        return <PriceEnquiry isDarkMode={isDarkMode} />;
      case 'track-shipment':
        return <TrackShipment isDarkMode={isDarkMode} />;
      case 'prohibited-items':
        return <ProhibitedItems isDarkMode={isDarkMode} />;
      case 'terms':
        return <TermsAndConditions isDarkMode={isDarkMode} />;
      case 'admin':
        return <AdminPanel isDarkMode={isDarkMode} />;
      default:
        return (
          <>
            <Hero isDarkMode={isDarkMode} setPage={setActivePage} />
            <WorldMap isDarkMode={isDarkMode} />
            <WhatWeShip isDarkMode={isDarkMode} setPage={setActivePage} />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-450 ${
      isDarkMode ? 'bg-navy-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* 1. Premium startup flight loader animation screen */}
      <PremiumLoadingScreen />

      {/* 2. Floating quick-contacts (WhatsApp/Call Now shortcuts) */}
      <FloatingWidgets />

      {/* 3. Navigation Header bar floating */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
      />

      {/* 4. Active dynamic sub-screen section anchor */}
      <main className="flex-grow pt-10">
        {renderPage()}
      </main>

      {/* 5. Informational contact copyright footer */}
      <Footer setActivePage={setActivePage} isDarkMode={isDarkMode} />
    </div>
  );
}

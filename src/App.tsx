import React from 'react';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

export const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-[#100C22] text-white selection:bg-white/20 selection:text-white">
      {/* 1. Award-Winning Cinematic Hero Section */}
      <Hero />

      {/* 2. Featured Engineering & AI Projects */}
      <WorkSection />

      {/* 3. About & Systems Architecture Expertise */}
      <AboutSection />

      {/* 4. Contact & Interaction Section */}
      <ContactSection />
    </main>
  );
};

export default App;

import { Hero } from './Hero';
import { Features } from './Features';
import { CTA } from './CTA';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { OceanicWorkflow } from './OceanicWorkflow';
import { Pricing } from './Pricing';
import { Demo } from './Demo';
import { Auth } from './Auth';
import { useState } from 'react';

export function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1E33] to-[#0A1628] overflow-hidden noise-texture">
      <Navbar onSignUpClick={() => setIsAuthOpen(true)} />
      <Hero onSignUpClick={() => setIsAuthOpen(true)} />
      <Features />
      <OceanicWorkflow />
      <Pricing />
      <Demo />
      <CTA onSignUpClick={() => setIsAuthOpen(true)} />
      <Footer />
      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

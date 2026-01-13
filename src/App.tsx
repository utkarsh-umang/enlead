import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { OceanicWorkflow } from './components/OceanicWorkflow';
import { Pricing } from './components/Pricing';
import { Demo } from './components/Demo';
import { Auth } from './components/Auth';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { MyLeadsPage } from './components/MyLeadsPage';
import { CampaignDetailsPage } from './components/CampaignDetailsPage';
import { SummaryPage } from './components/SummaryPage';
import { SidebarProvider } from './context/SidebarContext';

export default function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-leads" element={<MyLeadsPage />} />
          <Route path="/campaign/:campaignId" element={<CampaignDetailsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}
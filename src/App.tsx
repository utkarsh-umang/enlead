import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { MyLeadsPage } from './components/MyLeadsPage';
import { CampaignDetailsPage } from './components/CampaignDetailsPage';
import { SummaryPage } from './components/SummaryPage';
import { SidebarProvider } from './context/SidebarContext';

// Auth deferred — running locally only for now, root goes straight to the
// dashboard instead of the landing page's login gate. LandingPage is still
// reachable at /landing if needed.
export default function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-leads" element={<MyLeadsPage />} />
          <Route path="/campaign/:campaignId" element={<CampaignDetailsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { MyLeadsPage } from './components/MyLeadsPage';
import { SidebarProvider } from './context/SidebarContext';

// Auth deferred — running locally only for now, root goes straight to the
// dashboard instead of the landing page's login gate. LandingPage is still
// reachable at /landing if needed.
//
// /campaign/:id and /summary (CampaignDetailsPage, SummaryPage) are
// intentionally not routed — they model campaign/email-analytics features
// that don't exist in this product yet. The components are still on disk
// for when campaign-tagging/export actually gets built, but nothing in the
// app should link to fabricated data in the meantime.
export default function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-leads" element={<MyLeadsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { MyLeadsPage } from './components/MyLeadsPage';
import { CampaignDetailsPage } from './components/CampaignDetailsPage';
import { SummaryPage } from './components/SummaryPage';
import { SidebarProvider } from './context/SidebarContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function RootRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
}

export default function App() {
  return (
    <AuthProvider>
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-leads" element={<MyLeadsPage />} />
          <Route path="/campaign/:campaignId" element={<CampaignDetailsPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
    </AuthProvider>
  );
}
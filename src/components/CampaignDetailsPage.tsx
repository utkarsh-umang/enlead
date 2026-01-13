import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Filter, ChevronLeft, ChevronRight, Menu, Bell, Home } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AnimatedCounter } from './AnimatedCounter';
import { MiniGraph } from './MiniGraph';
import { NotificationsOverlay } from './NotificationsOverlay';
import { LeadDiscoveryModal } from './LeadDiscoveryModal';
import { useSidebar } from '../context/SidebarContext';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Interactive Loading Animation Component
function LoadingBar({ percentage }: { percentage: number }) {
  return (
    <div className="relative w-full h-12 bg-[#0A1628]/60 rounded-lg border border-[#00D9FF]/30 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] relative overflow-hidden"
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${i * 20}%`,
                top: '50%',
              }}
              animate={{
                x: [0, 100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-lg bioluminescent-text z-10">{percentage}%</span>
      </div>
    </div>
  );
}

// Campaign data by ID
const campaignData: Record<string, any> = {
  '1': {
    name: 'SaaS Founders Q4',
    status: 'scraping',
    totalLeads: 4000,
    scrapingProgress: 60,
    leadsGraphData: [500, 1200, 1800, 2500, 3200, 3600, 4000],
    leads: [
      { id: 1, name: 'John Doe', company: 'Acme Corp', email: 'john@acme.com', website: 'https://www.acmecorp.com' },
      { id: 2, name: 'Jane Smith', company: 'Beta Industries', email: 'jane@beta.com', website: 'https://www.betaindustries.com' },
      { id: 3, name: 'Bob Johnson', company: 'Gamma Tech', email: 'bob@gamma.com', website: 'https://www.gammatech.com' },
      { id: 4, name: 'Sam Watson', company: 'Robotics Corp', email: 'sam.watson@roboticscorp.com', website: 'https://www.roboticscorp.com' },
      { id: 5, name: 'Rose Murphy', company: 'Software Development', email: 'rose.murphy@softwaredevelopment.com', website: 'https://www.softwaredevelopment.com' },
      { id: 6, name: 'Frank Watson', company: 'Network Solutions', email: 'frank.watson@networksolutions.com', website: 'https://www.networksolutions.com' },
      { id: 7, name: 'Cara Jones', company: 'Solution Architecture', email: 'cara.jones@solutionarchitecture.com', website: 'https://www.solutionarchitecture.com' },
      { id: 8, name: 'Charlie Roberts', company: 'Innovation Labs', email: 'charlie.roberts@innovationlabs.com', website: 'https://www.innovationlabs.com' },
      { id: 9, name: 'Jake Mitchell', company: 'Software Engineering', email: 'jake.mitchell@softwareengineering.com', website: 'https://www.softwareengineering.com' },
    ],
  },
  '2': {
    name: 'Local Agencies',
    status: 'generating',
    totalLeads: 3800,
    scrapingProgress: 100,
    leadsGraphData: [400, 1000, 1600, 2200, 2800, 3300, 3800],
    leads: [
      { id: 1, name: 'Michael Chen', company: 'Creative Agency Co', email: 'michael@creativeagency.com', website: 'https://www.creativeagency.com' },
      { id: 2, name: 'Sarah Williams', company: 'Design Studio Plus', email: 'sarah@designstudio.com', website: 'https://www.designstudio.com' },
      { id: 3, name: 'David Brown', company: 'Marketing Masters', email: 'david@marketingmasters.com', website: 'https://www.marketingmasters.com' },
      { id: 4, name: 'Emma Davis', company: 'Brand Builders Inc', email: 'emma@brandbuilders.com', website: 'https://www.brandbuilders.com' },
      { id: 5, name: 'James Miller', company: 'Digital Forge', email: 'james@digitalforge.com', website: 'https://www.digitalforge.com' },
      { id: 6, name: 'Olivia Taylor', company: 'Creative Minds', email: 'olivia@creativeminds.com', website: 'https://www.creativeminds.com' },
      { id: 7, name: 'William Anderson', company: 'Agency Advantage', email: 'william@agencyadvantage.com', website: 'https://www.agencyadvantage.com' },
      { id: 8, name: 'Sophia Martinez', company: 'Vision Agency', email: 'sophia@visionagency.com', website: 'https://www.visionagency.com' },
      { id: 9, name: 'Benjamin Thomas', company: 'Strategy Studio', email: 'benjamin@strategystudio.com', website: 'https://www.strategystudio.com' },
    ],
  },
  '3': {
    name: 'E-commerce Leads Nov',
    status: 'completed',
    totalLeads: 2100,
    scrapingProgress: 100,
    leadsGraphData: [200, 600, 1000, 1400, 1700, 1900, 2100],
    leads: [
      { id: 1, name: 'Alex Johnson', company: 'Online Store Pro', email: 'alex@onlinestore.com', website: 'https://www.onlinestore.com' },
      { id: 2, name: 'Jessica Lee', company: 'E-Shop Hub', email: 'jessica@eshophub.com', website: 'https://www.eshophub.com' },
      { id: 3, name: 'Ryan Garcia', company: 'Commerce Central', email: 'ryan@commercecentral.com', website: 'https://www.commercecentral.com' },
      { id: 4, name: 'Amanda White', company: 'Digital Marketplace', email: 'amanda@digitalmarketplace.com', website: 'https://www.digitalmarketplace.com' },
      { id: 5, name: 'Kevin Harris', company: 'Shop Solutions', email: 'kevin@shopsolutions.com', website: 'https://www.shopsolutions.com' },
      { id: 6, name: 'Rachel Clark', company: 'E-Commerce Plus', email: 'rachel@ecommerceplus.com', website: 'https://www.ecommerceplus.com' },
      { id: 7, name: 'Daniel Lewis', company: 'Online Retail Co', email: 'daniel@onlineretail.com', website: 'https://www.onlineretail.com' },
      { id: 8, name: 'Megan Robinson', company: 'Store Systems', email: 'megan@storesystems.com', website: 'https://www.storesystems.com' },
      { id: 9, name: 'Christopher Hall', company: 'Digital Commerce', email: 'christopher@digitalcommerce.com', website: 'https://www.digitalcommerce.com' },
    ],
  },
};

export function CampaignDetailsPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLeadDiscoveryOpen, setIsLeadDiscoveryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingEmails, setIsGeneratingEmails] = useState(false);
  const [emailProgress, setEmailProgress] = useState(0);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(120); // in seconds
  const navigate = useNavigate();

  const campaign = campaignData[campaignId || '1'];

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'scraping':
        return 'Scraping...';
      case 'generating':
        return 'Generating...';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scraping':
        return 'text-[#FF8C42]';
      case 'generating':
        return 'text-[#4FC3F7]';
      case 'completed':
        return 'text-green-400';
      default:
        return 'text-white/60';
    }
  };

  return (
    <div className="flex h-screen bg-[#0A1628] noise-texture">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50"
            >
              <Sidebar isCollapsed={false} onToggleCollapse={() => setIsMobileMenuOpen(false)} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-[#0A1628]/60 border-b border-[#00D9FF]/20 px-4 sm:px-8 py-4 sm:py-6 sticky top-0 z-30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
              >
                <Menu className="size-5 text-[#00D9FF]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-[#00D9FF] text-sm sm:text-base"
              >
                <ArrowLeft className="size-4 sm:size-5" />
                <span>Back to Dashboard</span>
              </motion.button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Home Button - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/')}
                className="hidden lg:flex p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
              >
                <Home className="size-4 sm:size-5 text-[#00D9FF]" />
              </motion.button>

              {/* Notifications Button - Hidden on mobile */}
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="hidden lg:flex p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
              >
                <Bell className="size-4 sm:size-5 text-[#00D9FF]" />
              </motion.button>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-xl sm:text-2xl text-white">
              Campaign: <span className="text-[#00D9FF]">{campaign.name}</span>
            </h1>
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`text-sm sm:text-base ${getStatusColor(campaign.status)}`}
            >
              {getStatusDisplay(campaign.status)}
            </motion.span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Total Leads Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#00D9FF]/10"
            >
              <div className="mb-2">
                <div className="text-xs sm:text-sm text-white/60 mb-1">Total Leads</div>
                <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">
                  <AnimatedCounter value={campaign.totalLeads} delay={0.2} />
                </div>
              </div>
              <MiniGraph data={campaign.leadsGraphData} color="#00D9FF" delay={0.3} label="Leads" />
            </motion.div>

            {/* Scraping Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#00D9FF]/10"
            >
              <div className="text-xs sm:text-sm text-white/60 mb-3">Scraping Progress</div>
              <LoadingBar percentage={campaign.scrapingProgress} />
            </motion.div>

            {/* Email Generation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
                borderColor: 'rgba(0, 217, 255, 0.6)',
              }}
              className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#00D9FF]/10 flex flex-col items-center justify-center"
            >
              <div className="text-xs sm:text-sm text-white/60 mb-3 text-center">
                Email Generation Progress
              </div>
              
              {!isGeneratingEmails ? (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLeadDiscoveryOpen(true)}
                  className="relative flex items-center gap-2 px-3 sm:px-5 py-2 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-lg shadow-lg shadow-[#00D9FF]/40 overflow-hidden group text-sm"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <span className="relative text-center">Start Email Generation</span>
                </motion.button>
              ) : (
                <div className="w-full space-y-3">
                  <div className="text-center mb-2">
                    <div className="text-sm text-white/80 mb-1">Estimated Time Left</div>
                    <div className="text-xl text-[#00D9FF] bioluminescent-text">
                      {Math.floor(estimatedTimeLeft / 60)}:{(estimatedTimeLeft % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  <LoadingBar percentage={emailProgress} />
                  <div className="text-xs text-white/60 text-center">
                    Generating personalized emails...
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Search and Filter */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-[#00D9FF]/60 group-hover:text-[#00D9FF] transition-colors" />
              <motion.input
                whileFocus={{
                  borderColor: 'rgba(0, 217, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                }}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white placeholder-white/40 transition-all"
              />
            </div>
            <motion.button
              whileHover={{
                scale: 1.02,
                borderColor: 'rgba(0, 217, 255, 0.6)',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white"
            >
              <Filter className="size-5 text-[#00D9FF]" />
              <span className="hidden sm:inline">Filter</span>
            </motion.button>
          </div>

          {/* Leads Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#00D9FF]/20">
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Lead Name
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Company
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Email
                    </th>
                    <th className="text-left p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Business Website
                    </th>
                    <th className="text-center p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Scraping Information
                    </th>
                    <th className="text-center p-3 sm:p-4 text-xs uppercase tracking-wider text-white/60">
                      Generated Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.leads.map((lead: any, index: number) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.05)' }}
                      className="border-b border-[#00D9FF]/10 transition-colors"
                    >
                      <td className="p-3 sm:p-4 text-white text-sm">{lead.name}</td>
                      <td className="p-3 sm:p-4 text-white/70 text-sm">{lead.company}</td>
                      <td className="p-3 sm:p-4 text-white/60 text-sm">{lead.email}</td>
                      <td className="p-3 sm:p-4 text-[#00D9FF] text-sm hover:underline">
                        <a href={lead.website} target="_blank" rel="noopener noreferrer">
                          {lead.website}
                        </a>
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        <motion.button
                          whileHover={{
                            scale: 1.08,
                            boxShadow: '0 0 25px rgba(0, 217, 255, 0.8)',
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-gradient-to-r from-[#00D9FF]/20 to-[#00B8D4]/20 border border-[#00D9FF]/60 text-[#00D9FF] rounded-lg hover:from-[#00D9FF]/30 hover:to-[#00B8D4]/30 transition-all text-xs"
                        >
                          View
                        </motion.button>
                      </td>
                      <td className="p-3 sm:p-4 text-center text-white/40 text-sm">-</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#00D9FF]/10">
              {campaign.leads.map((lead: any, index: number) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 hover:bg-[#00D9FF]/5 transition-colors"
                >
                  <div className="mb-2">
                    <div className="text-white mb-1">{lead.name}</div>
                    <div className="text-sm text-white/70 mb-1">{lead.company}</div>
                    <div className="text-sm text-white/60 mb-1">{lead.email}</div>
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#00D9FF] hover:underline break-all"
                    >
                      {lead.website}
                    </a>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-3 py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg text-xs"
                    >
                      View Scraping Info
                    </motion.button>
                    <div className="flex-1 px-3 py-2 bg-gray-500/10 border border-gray-500/30 text-gray-400 rounded-lg text-xs text-center">
                      -
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer/Pagination */}
            <div className="p-4 border-t border-[#00D9FF]/20 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl bg-[#0A1628]/20">
              <div className="text-sm text-white/60">Showing 1-9 of {campaign.leads.length}</div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    borderColor: 'rgba(0, 217, 255, 0.6)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white"
                >
                  <ChevronLeft className="size-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-4 py-2 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-lg shadow-lg shadow-[#00D9FF]/40"
                >
                  1
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    borderColor: 'rgba(0, 217, 255, 0.6)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white"
                >
                  <ChevronRight className="size-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlays */}
      <NotificationsOverlay
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <LeadDiscoveryModal
        isOpen={isLeadDiscoveryOpen}
        onClose={() => setIsLeadDiscoveryOpen(false)}
        onEmailGenerationComplete={() => {
          setIsGeneratingEmails(true);
          setEmailProgress(0);
          setEstimatedTimeLeft(120);
          
          // Simulate email generation progress
          const totalDuration = 120; // 120 seconds = 2 minutes
          const interval = setInterval(() => {
            setEmailProgress((prev) => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + (100 / totalDuration);
            });
            
            setEstimatedTimeLeft((prev) => {
              if (prev <= 0) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }}
      />

      {/* Bioluminescent Text Effect */}
      <style>{`
        .bioluminescent-text {
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
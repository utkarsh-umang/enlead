import { motion, AnimatePresence } from 'motion/react';
import { Bell, Plus, Search, Filter, ChevronLeft, ChevronRight, Download, Menu, X, Mail, Building2, User, Home, Copy, Database } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { NotificationsOverlay } from './NotificationsOverlay';
import { ImportLeadsModal } from './ImportLeadsModal';
import { useSidebar } from '../context/SidebarContext';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from 'figma:asset/3a29a51f6305397b330790f22be462da5a70d304.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MyLeadsPage() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const leads = [
    {
      id: 1,
      name: 'Sarah Jones',
      company: 'TechFlow Inc',
      email: 'sarah.jones@techflow.com',
      sourceList: 'SaaS Founders Q4',
      status: 'ready',
    },
    {
      id: 2,
      name: 'David Lee',
      company: 'River Valley Agency',
      email: 'david@rivervalley.com',
      sourceList: 'Local Agencies',
      status: 'scraped',
    },
    {
      id: 3,
      name: 'Mike Brown',
      company: 'Commerce Hub',
      email: 'mike.b@commercehub.io',
      sourceList: 'E-commerce List',
      status: 'pending',
    },
    {
      id: 4,
      name: 'Emily Chen',
      company: 'Digital Dynamics',
      email: 'emily@digitaldynamics.com',
      sourceList: 'SaaS Founders Q4',
      status: 'ready',
    },
    {
      id: 5,
      name: 'James Wilson',
      company: 'Marketing Pro',
      email: 'j.wilson@marketingpro.com',
      sourceList: 'Local Agencies',
      status: 'scraped',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      company: 'CloudTech Solutions',
      email: 'lisa@cloudtech.com',
      sourceList: 'SaaS Founders Q4',
      status: 'ready',
    },
    {
      id: 7,
      name: 'Robert Taylor',
      company: 'Growth Agency',
      email: 'robert@growthagency.co',
      sourceList: 'Local Agencies',
      status: 'pending',
    },
    {
      id: 8,
      name: 'Jennifer Martinez',
      company: 'E-Shop Global',
      email: 'jen@eshopglobal.com',
      sourceList: 'E-commerce List',
      status: 'ready',
    },
  ];

  const toggleLead = (id: number) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map((lead) => lead.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return {
          bg: 'bg-orange-500/20',
          text: 'text-orange-400',
          border: 'border-orange-500/40',
          glow: 'shadow-[0_0_15px_rgba(251,146,60,0.3)]',
        };
      case 'scraped':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          border: 'border-green-500/40',
          glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
        };
      case 'pending':
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          glow: 'shadow-[0_0_15px_rgba(107,114,128,0.3)]',
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          glow: '',
        };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'scraped':
        return 'Scraped';
      case 'pending':
        return 'Pending';
      default:
        return status;
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
        <div className="backdrop-blur-xl bg-[#0A1628]/60 border-b border-[#00D9FF]/20 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Menu className="size-5 text-[#00D9FF]" />
            </motion.button>
            <h1 className="text-xl sm:text-2xl text-white">My Leads</h1>
            {selectedLeads.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full text-sm text-[#00D9FF]"
              >
                {selectedLeads.length} selected
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Home Button */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Home className="size-4 sm:size-5 text-[#00D9FF]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
            >
              <Bell className="size-4 sm:size-5 text-[#00D9FF]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsImportModalOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white rounded-lg shadow-lg shadow-[#00D9FF]/40 overflow-hidden group text-sm sm:text-base"
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
              <Plus className="size-4 sm:size-5 relative" />
              <span className="relative hidden sm:inline">New List Import</span>
              <span className="relative sm:hidden">New List</span>
            </motion.button>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {/* Toolbar */}
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
                placeholder="Search by name, company, email..."
                className="w-full pl-10 pr-4 py-3 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg focus:outline-none text-white placeholder-white/40 transition-all"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <X className="size-4" />
                </motion.button>
              )}
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
              <span className="hidden sm:inline">Filter by Status/Source</span>
              <span className="sm:hidden">Filter</span>
            </motion.button>
          </div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden"
          >
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#00D9FF]/20">
                    <th className="p-4 text-left">
                      <motion.input
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="checkbox"
                        checked={selectedLeads.length === leads.length}
                        onChange={toggleAll}
                        className="w-4 h-4 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                      />
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Lead Name
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Company
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Email Address
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Source
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">
                      Status
                    </th>
                    <th className="text-center p-4 text-xs uppercase tracking-wider text-white/60">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => {
                    const statusStyle = getStatusColor(lead.status);
                    const isHovered = hoveredRow === lead.id;

                    return (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHoveredRow(lead.id)}
                        onHoverEnd={() => setHoveredRow(null)}
                        className="border-b border-[#00D9FF]/10 transition-all"
                        style={{
                          backgroundColor: isHovered ? 'rgba(0, 217, 255, 0.05)' : 'transparent',
                        }}
                      >
                        <td className="p-4">
                          <motion.input
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="checkbox"
                            checked={selectedLeads.includes(lead.id)}
                            onChange={() => toggleLead(lead.id)}
                            className="w-4 h-4 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isCollapsed && <User className="size-4 text-[#00D9FF]" />}
                            <span className="text-white">{lead.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isCollapsed && <Building2 className="size-4 text-[#00D9FF]/60" />}
                            <span className="text-white/70">{lead.company}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {isCollapsed && <Mail className="size-4 text-[#00D9FF]/60" />}
                            <span className="text-white/60">{lead.email}</span>
                          </div>
                        </td>
                        <td className="p-4 text-white/60">{lead.sourceList}</td>
                        <td className="p-4">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex px-3 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border} ${isHovered ? statusStyle.glow : ''} transition-all`}
                          >
                            {getStatusLabel(lead.status)}
                          </motion.span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                boxShadow: '0 0 25px rgba(0, 217, 255, 0.8)',
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gradient-to-r from-[#00D9FF]/20 to-[#00B8D4]/20 border border-[#00D9FF]/60 text-[#00D9FF] rounded-lg hover:from-[#00D9FF]/30 hover:to-[#00B8D4]/30 transition-all text-sm shadow-lg shadow-[#00D9FF]/20"
                            >
                              View Data
                            </motion.button>
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                boxShadow: '0 0 25px rgba(0, 184, 212, 0.8)',
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gradient-to-r from-[#00B8D4]/20 to-[#0099CC]/20 border border-[#00B8D4]/60 text-[#00B8D4] rounded-lg hover:from-[#00B8D4]/30 hover:to-[#0099CC]/30 transition-all text-sm shadow-lg shadow-[#00B8D4]/20"
                            >
                              View Copy
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-[#00D9FF]/10">
              {leads.map((lead, index) => {
                const statusStyle = getStatusColor(lead.status);

                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-[#00D9FF]/5 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <motion.input
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLead(lead.id)}
                        className="w-4 h-4 mt-1 accent-[#00D9FF] cursor-pointer rounded border-[#00D9FF]/40"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="size-4 text-[#00D9FF]" />
                          <span className="text-white">{lead.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1 text-sm">
                          <Building2 className="size-3 text-[#00D9FF]/60" />
                          <span className="text-white/70">{lead.company}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                          <Mail className="size-3 text-[#00D9FF]/60" />
                          <span className="text-white/60 truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex px-2 py-1 rounded-full text-xs ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}
                          >
                            {getStatusLabel(lead.status)}
                          </motion.span>
                          <span className="text-xs text-white/40">{lead.sourceList}</span>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-3 py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg text-xs"
                          >
                            View Data
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-3 py-2 bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] rounded-lg text-xs"
                          >
                            View Copy
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#00D9FF]/20 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl bg-[#0A1628]/20">
              <div className="text-sm text-white/60">Showing 1-8 of 8</div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    borderColor: 'rgba(0, 217, 255, 0.6)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 border border-[#00D9FF]/30 rounded-lg hover:bg-[#00D9FF]/10 transition-colors text-white text-sm"
                >
                  <Download className="size-4" />
                  <span>Download</span>
                </motion.button>
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlays */}
      <NotificationsOverlay
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}
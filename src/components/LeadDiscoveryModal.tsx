import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { EmailGenerationConfigModal } from './EmailGenerationConfigModal';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  website: string;
  scrapedInfo: {
    employees: string;
    industry: string;
    location: string;
    revenue: string;
    technologies: string[];
    recentNews: string;
  };
}

const top5Leads: Lead[] = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Corp',
    email: 'john@acme.com',
    website: 'https://www.acmecorp.com',
    scrapedInfo: {
      employees: '50-200',
      industry: 'SaaS / Software',
      location: 'San Francisco, CA',
      revenue: '$5M-$10M',
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
      recentNews: 'Recently raised Series A funding of $5M'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'Beta Industries',
    email: 'jane@beta.com',
    website: 'https://www.betaindustries.com',
    scrapedInfo: {
      employees: '200-500',
      industry: 'Enterprise Software',
      location: 'New York, NY',
      revenue: '$10M-$50M',
      technologies: ['Python', 'Django', 'GCP', 'MongoDB'],
      recentNews: 'Launched new product line targeting SMBs'
    }
  },
  {
    id: 3,
    name: 'Bob Johnson',
    company: 'Gamma Tech',
    email: 'bob@gamma.com',
    website: 'https://www.gammatech.com',
    scrapedInfo: {
      employees: '10-50',
      industry: 'Developer Tools',
      location: 'Austin, TX',
      revenue: '$1M-$5M',
      technologies: ['TypeScript', 'GraphQL', 'Docker', 'Kubernetes'],
      recentNews: 'Expanding team and hiring aggressively'
    }
  },
  {
    id: 4,
    name: 'Sam Watson',
    company: 'Robotics Corp',
    email: 'sam.watson@roboticscorp.com',
    website: 'https://www.roboticscorp.com',
    scrapedInfo: {
      employees: '100-200',
      industry: 'Robotics / AI',
      location: 'Seattle, WA',
      revenue: '$10M-$50M',
      technologies: ['Python', 'TensorFlow', 'ROS', 'C++'],
      recentNews: 'Partnered with major automotive manufacturer'
    }
  },
  {
    id: 5,
    name: 'Rose Murphy',
    company: 'Software Development',
    email: 'rose.murphy@softwaredevelopment.com',
    website: 'https://www.softwaredevelopment.com',
    scrapedInfo: {
      employees: '20-50',
      industry: 'Custom Software',
      location: 'Boston, MA',
      revenue: '$2M-$5M',
      technologies: ['Java', 'Spring', 'Azure', 'MySQL'],
      recentNews: 'Won enterprise contract with Fortune 500 company'
    }
  }
];

interface LeadDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailGenerationComplete?: () => void;
}

export function LeadDiscoveryModal({ isOpen, onClose, onEmailGenerationComplete }: LeadDiscoveryModalProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleContinue = () => {
    setShowConfigModal(true);
  };

  const handleClose = () => {
    setShowCloseConfirm(true);
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    onClose();
  };

  const cancelClose = () => {
    setShowCloseConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && !showConfigModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 sm:inset-10 lg:inset-20 z-50 overflow-hidden"
            >
              <div className="h-full backdrop-blur-2xl bg-[#0A1628]/95 border-2 border-[#00D9FF]/40 rounded-2xl shadow-2xl shadow-[#00D9FF]/20 flex flex-col">
                {/* Header */}
                <div className="flex-shrink-0 p-4 sm:p-6 border-b border-[#00D9FF]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl text-white mb-1">
                        Discover Your Leads
                      </h2>
                      <p className="text-sm text-white/60">
                        Click on a prospect to view their scraped information
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClose}
                      className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors border border-[#00D9FF]/30"
                    >
                      <X className="size-5 sm:size-6 text-[#00D9FF]" />
                    </motion.button>
                  </div>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-hidden p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    {/* Left Side - Leads Table */}
                    <div className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-xl flex flex-col overflow-hidden">
                      <div className="flex-shrink-0 p-4 border-b border-[#00D9FF]/20">
                        <h3 className="text-lg text-white">Top 5 Prospects</h3>
                      </div>
                      <div className="flex-1 overflow-y-auto divide-y divide-[#00D9FF]/10">
                        {top5Leads.map((lead) => (
                          <motion.div
                            key={lead.id}
                            whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.05)' }}
                            onClick={() => handleLeadClick(lead)}
                            className={`p-4 cursor-pointer transition-all ${
                              selectedLead?.id === lead.id
                                ? 'bg-[#00D9FF]/10 border-l-4 border-l-[#00D9FF]'
                                : ''
                            }`}
                          >
                            <div className="text-white mb-1">{lead.name}</div>
                            <div className="text-sm text-white/70 mb-1">{lead.company}</div>
                            <div className="text-xs text-white/50">{lead.email}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Scraped Information */}
                    <div className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-xl flex flex-col overflow-hidden">
                      <div className="flex-shrink-0 p-4 border-b border-[#00D9FF]/20">
                        <h3 className="text-lg text-white">Scraped Information</h3>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {selectedLead ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                          >
                            <div>
                              <div className="text-xs text-white/60 mb-1">Company</div>
                              <div className="text-white">{selectedLead.company}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Industry</div>
                              <div className="text-white">{selectedLead.scrapedInfo.industry}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Employees</div>
                              <div className="text-white">{selectedLead.scrapedInfo.employees}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Location</div>
                              <div className="text-white">{selectedLead.scrapedInfo.location}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Est. Revenue</div>
                              <div className="text-white">{selectedLead.scrapedInfo.revenue}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-2">Technologies</div>
                              <div className="flex flex-wrap gap-2">
                                {selectedLead.scrapedInfo.technologies.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded text-xs text-[#00D9FF]"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Recent News</div>
                              <div className="text-white text-sm">{selectedLead.scrapedInfo.recentNews}</div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-white/40 text-sm">
                            Select a prospect to view their information
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 p-4 sm:p-6 border-t border-[#00D9FF]/20">
                  <div className="flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClose}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      disabled={!selectedLead}
                      className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg overflow-hidden ${
                        selectedLead
                          ? 'bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white shadow-[#00D9FF]/40'
                          : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {selectedLead && (
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
                      )}
                      <span className="relative">Continue to Configuration</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Email Generation Config Modal */}
      <EmailGenerationConfigModal
        isOpen={showConfigModal}
        onClose={() => {
          setShowConfigModal(false);
          onClose();
        }}
        onEmailGenerationComplete={onEmailGenerationComplete}
      />

      {/* Close Confirmation Dialog */}
      <AnimatePresence>
        {showCloseConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md mx-4"
            >
              <div className="backdrop-blur-2xl bg-[#0A1628]/95 border-2 border-[#00D9FF]/40 rounded-2xl shadow-2xl shadow-[#00D9FF]/20 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle className="size-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-2">Confirm Close</h3>
                    <p className="text-sm text-white/60">
                      Are you sure you want to close? Your progress will be lost.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={cancelClose}
                    className="px-4 py-2 border border-[#00D9FF]/30 text-white rounded-lg hover:bg-[#00D9FF]/10 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(220, 38, 38, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmClose}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg shadow-red-600/40"
                  >
                    Yes, Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
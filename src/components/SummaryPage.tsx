import { motion } from 'motion/react';
import { ArrowLeft, Copy, CheckCircle, TrendingUp, Mail, Building2, Users, Target, BarChart3, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SummaryPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const summaryData = {
    overview: {
      totalCampaigns: 12,
      activeCampaigns: 8,
      completedCampaigns: 4,
      totalLeads: 4850,
      totalEmails: 12450,
      totalCompanies: 890,
    },
    performance: {
      emailsSent: 12450,
      emailsOpened: 6225,
      openRate: 50,
      emailsClicked: 2490,
      clickRate: 20,
      repliesReceived: 872,
      replyRate: 7,
    },
    campaigns: [
      {
        id: 1,
        name: 'Tech Startups Q4',
        status: 'Active',
        leads: 850,
        emailsSent: 2340,
        openRate: 52,
        replyRate: 8,
        companies: 180,
        startDate: '2024-12-01',
      },
      {
        id: 2,
        name: 'Enterprise SaaS Outreach',
        status: 'Active',
        leads: 1200,
        emailsSent: 3600,
        openRate: 48,
        replyRate: 6,
        companies: 250,
        startDate: '2024-11-15',
      },
      {
        id: 3,
        name: 'Healthcare Industry',
        status: 'Active',
        leads: 650,
        emailsSent: 1950,
        openRate: 55,
        replyRate: 9,
        companies: 120,
        startDate: '2024-12-10',
      },
      {
        id: 4,
        name: 'FinTech Expansion',
        status: 'Active',
        leads: 920,
        emailsSent: 2760,
        openRate: 49,
        replyRate: 7,
        companies: 160,
        startDate: '2024-11-20',
      },
      {
        id: 5,
        name: 'E-commerce Growth',
        status: 'Completed',
        leads: 580,
        emailsSent: 1160,
        openRate: 51,
        replyRate: 6,
        companies: 95,
        startDate: '2024-10-01',
      },
      {
        id: 6,
        name: 'Real Estate Network',
        status: 'Active',
        leads: 450,
        emailsSent: 450,
        openRate: 46,
        replyRate: 5,
        companies: 75,
        startDate: '2024-12-15',
      },
    ],
    timeMetrics: {
      averageResponseTime: '2.4 hours',
      peakEngagementTime: '10:00 AM - 12:00 PM',
      bestDay: 'Tuesday',
      totalTimeInCampaigns: '45 days',
    },
    revenue: {
      estimatedValue: '$124,500',
      conversionRate: 3.2,
      averageDealSize: '$4,800',
      totalConversions: 142,
    },
  };

  const handleCopy = () => {
    const summaryText = `
CAMPAIGN SUMMARY REPORT
========================

OVERVIEW
--------
Total Campaigns: ${summaryData.overview.totalCampaigns}
Active Campaigns: ${summaryData.overview.activeCampaigns}
Completed Campaigns: ${summaryData.overview.completedCampaigns}
Total Leads: ${summaryData.overview.totalLeads.toLocaleString()}
Total Emails Sent: ${summaryData.overview.totalEmails.toLocaleString()}
Total Companies: ${summaryData.overview.totalCompanies.toLocaleString()}

PERFORMANCE METRICS
-------------------
Emails Sent: ${summaryData.performance.emailsSent.toLocaleString()}
Emails Opened: ${summaryData.performance.emailsOpened.toLocaleString()}
Open Rate: ${summaryData.performance.openRate}%
Emails Clicked: ${summaryData.performance.emailsClicked.toLocaleString()}
Click Rate: ${summaryData.performance.clickRate}%
Replies Received: ${summaryData.performance.repliesReceived.toLocaleString()}
Reply Rate: ${summaryData.performance.replyRate}%

CAMPAIGN DETAILS
----------------
${summaryData.campaigns.map(c => `
${c.name} (${c.status})
  - Leads: ${c.leads.toLocaleString()}
  - Emails Sent: ${c.emailsSent.toLocaleString()}
  - Open Rate: ${c.openRate}%
  - Reply Rate: ${c.replyRate}%
  - Companies: ${c.companies}
  - Start Date: ${c.startDate}
`).join('\n')}

TIME METRICS
------------
Average Response Time: ${summaryData.timeMetrics.averageResponseTime}
Peak Engagement Time: ${summaryData.timeMetrics.peakEngagementTime}
Best Day: ${summaryData.timeMetrics.bestDay}
Total Time in Campaigns: ${summaryData.timeMetrics.totalTimeInCampaigns}

REVENUE METRICS
---------------
Estimated Value: ${summaryData.revenue.estimatedValue}
Conversion Rate: ${summaryData.revenue.conversionRate}%
Average Deal Size: ${summaryData.revenue.averageDealSize}
Total Conversions: ${summaryData.revenue.totalConversions}
    `;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1E33] to-[#0A1628] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-lg text-white hover:bg-[#00D9FF]/10 transition-all w-fit"
          >
            <ArrowLeft className="size-5 text-[#00D9FF]" />
            <span>Back to Dashboard</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(0, 217, 255, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-[#00D9FF] via-[#00B8D4] to-[#0099CC] text-white shadow-[#00D9FF]/40"
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
            {copied ? (
              <>
                <CheckCircle className="size-5 relative" />
                <span className="relative">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-5 relative" />
                <span className="relative">Copy Summary</span>
              </>
            )}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-2">Campaign Summary</h1>
          <p className="text-white/60 text-sm sm:text-base">Complete overview of all your campaigns and performance metrics</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="size-4 sm:size-5 text-[#00D9FF]" />
                <div className="text-xs text-white/60">Total Campaigns</div>
              </div>
              <div className="text-xl sm:text-2xl text-[#00D9FF] bioluminescent-text">{summaryData.overview.totalCampaigns}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="size-4 sm:size-5 text-green-400" />
                <div className="text-xs text-white/60">Active</div>
              </div>
              <div className="text-xl sm:text-2xl text-green-400">{summaryData.overview.activeCampaigns}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-4 sm:size-5 text-blue-400" />
                <div className="text-xs text-white/60">Completed</div>
              </div>
              <div className="text-xl sm:text-2xl text-blue-400">{summaryData.overview.completedCampaigns}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="size-4 sm:size-5 text-[#00D9FF]" />
                <div className="text-xs text-white/60">Total Leads</div>
              </div>
              <div className="text-xl sm:text-2xl text-[#00D9FF] bioluminescent-text">{summaryData.overview.totalLeads.toLocaleString()}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="size-4 sm:size-5 text-[#00D9FF]" />
                <div className="text-xs text-white/60">Total Emails</div>
              </div>
              <div className="text-xl sm:text-2xl text-[#00D9FF] bioluminescent-text">{summaryData.overview.totalEmails.toLocaleString()}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="size-4 sm:size-5 text-[#00D9FF]" />
                <div className="text-xs text-white/60">Companies</div>
              </div>
              <div className="text-xl sm:text-2xl text-[#00D9FF] bioluminescent-text">{summaryData.overview.totalCompanies.toLocaleString()}</div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">Emails Sent</div>
              <div className="text-2xl sm:text-3xl text-white mb-2">{summaryData.performance.emailsSent.toLocaleString()}</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-white/60">Opened:</div>
                <div className="text-sm text-[#00D9FF]">{summaryData.performance.emailsOpened.toLocaleString()} ({summaryData.performance.openRate}%)</div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">Click Rate</div>
              <div className="text-2xl sm:text-3xl text-green-400 mb-2">{summaryData.performance.clickRate}%</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-white/60">Clicks:</div>
                <div className="text-sm text-green-400">{summaryData.performance.emailsClicked.toLocaleString()}</div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">Reply Rate</div>
              <div className="text-2xl sm:text-3xl text-purple-400 mb-2">{summaryData.performance.replyRate}%</div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-white/60">Replies:</div>
                <div className="text-sm text-purple-400">{summaryData.performance.repliesReceived.toLocaleString()}</div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="text-sm text-white/60 mb-2">Open Rate</div>
              <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text mb-2">{summaryData.performance.openRate}%</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-green-400" />
                <div className="text-xs text-green-400">Above Average</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Revenue Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">Revenue Metrics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="size-5 text-green-400" />
                <div className="text-sm text-white/60">Estimated Value</div>
              </div>
              <div className="text-2xl sm:text-3xl text-green-400">{summaryData.revenue.estimatedValue}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="size-5 text-[#00D9FF]" />
                <div className="text-sm text-white/60">Conversion Rate</div>
              </div>
              <div className="text-2xl sm:text-3xl text-[#00D9FF] bioluminescent-text">{summaryData.revenue.conversionRate}%</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="size-5 text-purple-400" />
                <div className="text-sm text-white/60">Avg Deal Size</div>
              </div>
              <div className="text-2xl sm:text-3xl text-purple-400">{summaryData.revenue.averageDealSize}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-5 text-blue-400" />
                <div className="text-sm text-white/60">Conversions</div>
              </div>
              <div className="text-2xl sm:text-3xl text-blue-400">{summaryData.revenue.totalConversions}</div>
            </div>
          </div>
        </motion.div>

        {/* Time Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">Time Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5 text-[#00D9FF]" />
                <div className="text-sm text-white/60">Avg Response Time</div>
              </div>
              <div className="text-xl sm:text-2xl text-white">{summaryData.timeMetrics.averageResponseTime}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="size-5 text-green-400" />
                <div className="text-sm text-white/60">Peak Engagement</div>
              </div>
              <div className="text-lg text-white">{summaryData.timeMetrics.peakEngagementTime}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-5 text-blue-400" />
                <div className="text-sm text-white/60">Best Day</div>
              </div>
              <div className="text-xl sm:text-2xl text-white">{summaryData.timeMetrics.bestDay}</div>
            </div>
            <div className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5 text-purple-400" />
                <div className="text-sm text-white/60">Total Time</div>
              </div>
              <div className="text-xl sm:text-2xl text-white">{summaryData.timeMetrics.totalTimeInCampaigns}</div>
            </div>
          </div>
        </motion.div>

        {/* Campaign Details Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-[#00D9FF]/10"
        >
          <h2 className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">Campaign Details</h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00D9FF]/20">
                  <th className="text-left text-sm text-white/60 pb-3">Campaign Name</th>
                  <th className="text-left text-sm text-white/60 pb-3">Status</th>
                  <th className="text-left text-sm text-white/60 pb-3">Leads</th>
                  <th className="text-left text-sm text-white/60 pb-3">Emails Sent</th>
                  <th className="text-left text-sm text-white/60 pb-3">Open Rate</th>
                  <th className="text-left text-sm text-white/60 pb-3">Reply Rate</th>
                  <th className="text-left text-sm text-white/60 pb-3">Companies</th>
                  <th className="text-left text-sm text-white/60 pb-3">Start Date</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.campaigns.map((campaign, index) => (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="border-b border-[#00D9FF]/10 hover:bg-[#00D9FF]/5 transition-colors"
                  >
                    <td className="py-4 text-white">{campaign.name}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        campaign.status === 'Active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 text-white">{campaign.leads.toLocaleString()}</td>
                    <td className="py-4 text-white">{campaign.emailsSent.toLocaleString()}</td>
                    <td className="py-4 text-[#00D9FF]">{campaign.openRate}%</td>
                    <td className="py-4 text-green-400">{campaign.replyRate}%</td>
                    <td className="py-4 text-white">{campaign.companies}</td>
                    <td className="py-4 text-white/60 text-sm">{campaign.startDate}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {summaryData.campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="backdrop-blur-xl bg-[#0A1628]/60 border border-[#00D9FF]/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-white">{campaign.name}</div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    campaign.status === 'Active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-white/60 text-xs mb-1">Leads</div>
                    <div className="text-white">{campaign.leads.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Emails Sent</div>
                    <div className="text-white">{campaign.emailsSent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Open Rate</div>
                    <div className="text-[#00D9FF]">{campaign.openRate}%</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Reply Rate</div>
                    <div className="text-green-400">{campaign.replyRate}%</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Companies</div>
                    <div className="text-white">{campaign.companies}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Start Date</div>
                    <div className="text-white/80 text-xs">{campaign.startDate}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

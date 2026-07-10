import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import type { LeadOut } from '@/client';

interface LeadDetailModalProps {
  lead: LeadOut | null;
  onClose: () => void;
}

function Field({ label, value, href }: { label: string; value: string | number | null; href?: boolean }) {
  if (value === null || value === '') return null;
  return (
    <div className="py-2 border-b border-[#00D9FF]/10 last:border-0">
      <div className="text-xs text-white/50 uppercase tracking-wider mb-1">{label}</div>
      {href ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noreferrer"
          className="text-[#00D9FF] hover:underline text-sm flex items-center gap-1 break-all"
        >
          {value}
          <ExternalLink className="size-3 shrink-0" />
        </a>
      ) : (
        <div className="text-white text-sm break-all">{value}</div>
      )}
    </div>
  );
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto backdrop-blur-xl bg-[#0A1628]/95 border border-[#00D9FF]/30 rounded-2xl shadow-2xl shadow-[#00D9FF]/20">
              <div className="sticky top-0 backdrop-blur-xl bg-[#0A1628]/95 p-6 border-b border-[#00D9FF]/20 flex items-center justify-between">
                <h2 className="text-xl text-white">{lead.youtube_channel_name || 'Lead detail'}</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-[#00D9FF]/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <div>
                  <h3 className="text-sm text-[#00D9FF] uppercase tracking-wider mb-2 mt-2">Contact</h3>
                  <Field label="Email" value={lead.email} />
                  <Field label="Email source" value={lead.email_source} />
                  <Field
                    label="Email confidence"
                    value={lead.email_confidence !== null ? `${Math.round(lead.email_confidence * 100)}%` : null}
                  />
                  <Field label="Website" value={lead.website} href />

                  <h3 className="text-sm text-[#00D9FF] uppercase tracking-wider mb-2 mt-6">Social</h3>
                  <Field label="YouTube" value={lead.social_youtube} href />
                  <Field label="Twitter" value={lead.social_twitter} href />
                  <Field label="Instagram" value={lead.social_instagram} href />
                  <Field label="TikTok" value={lead.social_tiktok} href />
                  <Field label="Facebook" value={lead.social_facebook} href />
                  <Field label="LinkedIn" value={lead.social_linkedin} href />
                </div>

                <div>
                  <h3 className="text-sm text-[#00D9FF] uppercase tracking-wider mb-2 mt-2">YouTube identity</h3>
                  <Field label="Channel name" value={lead.youtube_channel_name} />
                  <Field label="Handle" value={lead.youtube_handle} />
                  <Field label="Channel ID" value={lead.youtube_channel_id} />
                  <Field label="Subscribers" value={lead.youtube_subscriber_count?.toLocaleString() ?? null} />
                  <Field label="Videos" value={lead.youtube_video_count?.toLocaleString() ?? null} />
                  <Field label="Uploads (last 30d)" value={lead.youtube_uploads_last_30d} />
                  <Field label="Avg views" value={lead.youtube_avg_views?.toLocaleString() ?? null} />
                  <Field label="Last upload" value={lead.youtube_last_upload_date} />

                  <h3 className="text-sm text-[#00D9FF] uppercase tracking-wider mb-2 mt-6">Categorization</h3>
                  <Field label="Country" value={lead.country} />
                  <Field label="Niche" value={lead.niche} />
                  <Field label="Category" value={lead.category} />

                  <h3 className="text-sm text-[#00D9FF] uppercase tracking-wider mb-2 mt-6">Provenance</h3>
                  <Field label="Sources" value={lead.sources.join(', ') || null} />
                  <Field label="Added to master table" value={new Date(lead.created_at).toLocaleString()} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

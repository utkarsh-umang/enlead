import { motion } from 'motion/react';
import { Bot, AlertOctagon, CheckCircle2, Loader2, MoonStar } from 'lucide-react';
import { useEnrichmentStatus, useResumeEnrichment } from '../hooks/api/useEnrichmentStatus';

function timeAgo(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso + 'Z').getTime()) / 1000);
  if (s < 60) return `${Math.round(s)}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

export function EnrichmentStatusPanel() {
  const { data: st } = useEnrichmentStatus();
  const resume = useResumeEnrichment();

  if (!st) return null;

  // Rough ETA from the last hour's throughput.
  const rate = st.attempts_last_hour; // per hour
  const etaHours = rate > 0 ? st.pending_low / rate : null;
  const eta =
    etaHours === null ? null : etaHours < 1 ? `~${Math.ceil(etaHours * 60)} min` : `~${Math.ceil(etaHours)} h`;

  const idle = !st.paused && (!st.worker_alive || st.worker_state === 'waiting');
  const active = !st.paused && st.worker_alive && st.worker_state === 'processing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="backdrop-blur-xl bg-[#0A1628]/40 border border-[#00D9FF]/30 rounded-2xl shadow-lg shadow-[#00D9FF]/10 overflow-hidden mb-6 sm:mb-8"
    >
      <div className="p-4 sm:p-6 border-b border-[#00D9FF]/20 flex items-center gap-3">
        <Bot className="size-5 text-[#00D9FF]" />
        <h2 className="text-lg sm:text-xl text-white flex-1">Email Finder</h2>
        {active && (
          <span className="flex items-center gap-2 text-sm text-[#00D9FF]">
            <Loader2 className="size-4 animate-spin" /> active
          </span>
        )}
        {idle && st.pending_low === 0 && (
          <span className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 className="size-4" /> queue empty
          </span>
        )}
        {idle && st.pending_low > 0 && !st.worker_alive && (
          <span className="flex items-center gap-2 text-sm text-white/50">
            <MoonStar className="size-4" /> worker not running
          </span>
        )}
      </div>

      {st.paused && (
        <div className="m-4 sm:m-6 mb-0 sm:mb-0 p-4 bg-red-500/10 border border-red-500/40 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertOctagon className="size-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-300">
                Paused — the worker hit a hard block and is waiting for you.
              </p>
              <p className="text-xs text-red-400/80 mt-1 break-all">{st.pause_reason}</p>
              <p className="text-xs text-white/50 mt-2">
                Nothing was lost: the affected leads are still queued. Fix the cause (e.g. recharge
                OpenAI credits), then continue.
              </p>
              <button
                onClick={() => resume.mutate()}
                disabled={resume.isPending}
                className="mt-3 px-4 py-2 bg-red-500/20 border border-red-500/60 text-red-200 rounded-lg text-sm hover:bg-red-500/30 disabled:opacity-50 transition-colors"
              >
                {resume.isPending ? 'Resuming…' : "Continue — I've fixed it"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">In queue</div>
          <div className="text-xl text-[#00D9FF]">{st.pending_low.toLocaleString()}</div>
          {eta && st.pending_low > 0 && (
            <div className="text-xs text-white/40 mt-0.5">{eta} at current rate</div>
          )}
        </div>
        <div>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Tried today</div>
          <div className="text-xl text-white">{st.attempts_today.toLocaleString()}</div>
          <div className="text-xs text-white/40 mt-0.5">{st.attempts_last_hour} in the last hour</div>
        </div>
        <div>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Found today</div>
          <div className="text-xl text-green-400">{st.found_today.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Worker</div>
          <div className="text-sm text-white mt-1">
            {st.worker_alive ? (st.worker_state ?? '—') : 'offline'}
            {st.worker_in_flight > 0 && st.worker_alive && ` · ${st.worker_in_flight} in flight`}
          </div>
          {st.worker_last_seen_at && (
            <div className="text-xs text-white/40 mt-0.5">
              last seen {timeAgo(st.worker_last_seen_at)}
            </div>
          )}
        </div>
      </div>

      {/* The sentence that answers "can I close my laptop?" */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs text-white/50">
        {st.paused
          ? 'Waiting on you — closing the laptop changes nothing.'
          : active
            ? 'Work in progress — closing the laptop pauses it safely; it resumes on wake.'
            : st.pending_low > 0 && !st.worker_alive
              ? 'Leads are queued but no worker is running — start it to process them.'
              : 'Nothing running — safe to close.'}
      </div>
    </motion.div>
  );
}

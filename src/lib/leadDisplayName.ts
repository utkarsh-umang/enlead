import type { LeadOut } from '@/client';

/** The one name-like field a lead actually has: channel name for
 * YouTube-native leads, person name (falling back to company) for
 * person-centric sources like Apollo. Mirrors the server-side display_name
 * used by the export-history endpoint. */
export function leadDisplayName(lead: LeadOut): string | null {
  const person = [lead.first_name, lead.last_name].filter(Boolean).join(' ');
  return lead.youtube_channel_name || person || lead.company_name || null;
}

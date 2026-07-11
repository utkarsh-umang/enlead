import { useQuery } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export function useLeadEnrichment(leadId: string | null) {
  return useQuery({
    queryKey: ['leads', 'enrichment', leadId],
    queryFn: () => LeadsService.getLeadEnrichmentAttempts(leadId!),
    enabled: leadId !== null,
  });
}

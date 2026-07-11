import { useQuery } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export function useLeadRawRows(leadId: string | null) {
  return useQuery({
    queryKey: ['leads', 'raw', leadId],
    queryFn: () => LeadsService.getLeadRawRows(leadId!),
    enabled: leadId !== null,
  });
}

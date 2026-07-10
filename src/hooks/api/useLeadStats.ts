import { useQuery } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export function useLeadStats() {
  return useQuery({
    queryKey: ['leads', 'stats'],
    queryFn: () => LeadsService.getLeadStats(),
  });
}

import { useQuery } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export function useLeads(page: number, pageSize: number, search: string) {
  return useQuery({
    queryKey: ['leads', page, pageSize, search],
    queryFn: () => LeadsService.listLeads(page, pageSize, search || undefined),
  });
}

import { useQuery } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export interface LeadFilters {
  source?: string;
  hasEmail?: boolean;
}

export function useLeads(page: number, pageSize: number, search: string, filters: LeadFilters = {}) {
  return useQuery({
    queryKey: ['leads', page, pageSize, search, filters.source, filters.hasEmail],
    queryFn: () =>
      LeadsService.listLeads(page, pageSize, search || undefined, filters.source, filters.hasEmail),
  });
}

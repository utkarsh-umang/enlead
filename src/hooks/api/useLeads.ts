import { useQuery } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export interface LeadFilters {
  source?: string;
  hasEmail?: boolean;
  finderTried?: boolean;
  /** true = an email the finder earned, false = one that came with the CSV. */
  emailFromFinder?: boolean;
}

export function useLeads(page: number, pageSize: number, search: string, filters: LeadFilters = {}) {
  return useQuery({
    queryKey: [
      'leads',
      page,
      pageSize,
      search,
      filters.source,
      filters.hasEmail,
      filters.finderTried,
      filters.emailFromFinder,
    ],
    queryFn: () =>
      LeadsService.listLeads(
        page,
        pageSize,
        search || undefined,
        filters.source,
        filters.hasEmail,
        filters.finderTried,
        filters.emailFromFinder
      ),
  });
}

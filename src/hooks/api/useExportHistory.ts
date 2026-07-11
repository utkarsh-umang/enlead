import { useQuery } from '@tanstack/react-query';
import { ExportsService } from '@/client';

export function useExportHistory() {
  return useQuery({
    queryKey: ['exports'],
    queryFn: () => ExportsService.listExports(),
  });
}

export function useExportLeads(exportId: string | null, page: number, pageSize = 25) {
  return useQuery({
    queryKey: ['exports', exportId, 'leads', page, pageSize],
    queryFn: () => ExportsService.getExportLeads(exportId!, page, pageSize),
    enabled: exportId !== null,
  });
}

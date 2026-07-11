import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EnrichmentService } from '@/client';

export function useEnrichmentStatus() {
  return useQuery({
    queryKey: ['enrichment-status'],
    queryFn: () => EnrichmentService.getEnrichmentStatus(),
    // Live-ish panel: refetch every 10s while the page is open. One cheap
    // aggregate query server-side.
    refetchInterval: 10_000,
  });
}

export function useResumeEnrichment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => EnrichmentService.resumeEnrichment(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrichment-status'] });
    },
  });
}

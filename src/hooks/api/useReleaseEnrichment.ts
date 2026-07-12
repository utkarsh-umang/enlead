import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SourcesService } from '@/client';

export function useReleaseEnrichment(source: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => SourcesService.releaseEnrichmentHold(source),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources'] });
      queryClient.invalidateQueries({ queryKey: ['enrichment-status'] });
    },
  });
}

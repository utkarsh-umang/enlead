import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchesService } from '@/client';

export function useUploadBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    // source is optional: empty/undefined = auto-detect (the mapping's
    // source_label); anything else overrides the label for this batch.
    mutationFn: ({ file, source }: { file: File; source?: string }) =>
      BatchesService.uploadBatch({ file, source: source || null }),
    onSuccess: () => {
      // The new/merged leads from this batch are now in master_leads —
      // whatever is showing the table needs to refetch (stats included:
      // its key is ['leads', 'stats']). New source labels also change the
      // source drill-downs and the enrichment queue counts.
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['sources'] });
      queryClient.invalidateQueries({ queryKey: ['enrichment-status'] });
    },
  });
}

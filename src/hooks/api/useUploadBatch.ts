import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchesService } from '@/client';

export function useUploadBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    // source is optional: empty/undefined = auto-detect (the mapping's
    // source_label); anything else overrides the label for this batch.
    mutationFn: ({
      file,
      source,
      enrichmentHold,
      alreadyContactedYear,
      alreadyContactedMonth,
    }: {
      file: File;
      source?: string;
      enrichmentHold?: boolean;
      // Both or neither — the list was already sent on Instantly in this
      // month, so the contact event is backfilled at import.
      alreadyContactedYear?: number;
      alreadyContactedMonth?: number;
    }) =>
      BatchesService.uploadBatch({
        file,
        source: source || null,
        enrichment_hold: enrichmentHold ?? false,
        already_contacted_year: alreadyContactedYear ?? null,
        already_contacted_month: alreadyContactedMonth ?? null,
      }),
    onSuccess: () => {
      // The new/merged leads from this batch are now in master_leads —
      // whatever is showing the table needs to refetch (stats included:
      // its key is ['leads', 'stats']). New source labels also change the
      // source drill-downs and the enrichment queue counts. An import that
      // backfilled a contact event also moved the export history.
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['sources'] });
      queryClient.invalidateQueries({ queryKey: ['enrichment-status'] });
      queryClient.invalidateQueries({ queryKey: ['exports'] });
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchesService } from '@/client';

export function useUploadBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => BatchesService.uploadBatch({ file }),
    onSuccess: () => {
      // The new/merged leads from this batch are now in master_leads —
      // whatever is showing the table needs to refetch.
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

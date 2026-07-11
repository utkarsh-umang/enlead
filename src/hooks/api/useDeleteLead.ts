import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LeadsService } from '@/client';

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leadId: string) => LeadsService.deleteLead(leadId),
    onSuccess: () => {
      // Deleting a lead changes counts everywhere it's reflected — the
      // table, the Dashboard stats, and its source's drill-down.
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['sources'] });
    },
  });
}

import { useQuery } from '@tanstack/react-query';
import { BatchesService } from '@/client';

export function useBatchDetail(batchId: string | null) {
  return useQuery({
    queryKey: ['batches', batchId],
    queryFn: () => BatchesService.getBatchDetail(batchId!),
    enabled: batchId !== null,
  });
}

import { useQuery } from '@tanstack/react-query';
import { SourcesService } from '@/client';

export function useSourceDetail(source: string) {
  return useQuery({
    queryKey: ['sources', source],
    queryFn: () => SourcesService.getSourceDetail(source),
    enabled: !!source,
  });
}

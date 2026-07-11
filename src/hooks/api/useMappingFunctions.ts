import { useQuery } from '@tanstack/react-query';
import { MappingFunctionsService } from '@/client';

export function useMappingFunctions() {
  return useQuery({
    queryKey: ['mapping-functions'],
    queryFn: () => MappingFunctionsService.listMappingFunctions(),
  });
}

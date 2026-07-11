import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExportsService } from '@/client';
import type { ExportCreateIn, ExportSelection } from '@/client';

export function useExportPreview(selection: ExportSelection, enabled: boolean) {
  return useQuery({
    queryKey: ['export-preview', selection],
    queryFn: () => ExportsService.previewExport(selection),
    enabled,
    // The preview reflects live export state (already_exported changes the
    // moment an export commits) — don't serve a stale one from cache.
    staleTime: 0,
  });
}

export function useCreateExport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ExportCreateIn) => {
      // The endpoint responds with the CSV itself (text/csv); the generated
      // client hands it back as a string. Turn it into a browser download.
      const csv: string = await ExportsService.createExport(body);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const month = String(body.month).padStart(2, '0');
      link.href = url;
      link.download = `instantly-${body.year}-${month}-leads.csv`;
      link.click();
      URL.revokeObjectURL(url);
      return csv;
    },
    onSuccess: () => {
      // last_contacted on leads and any open preview both just changed.
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['export-preview'] });
    },
  });
}

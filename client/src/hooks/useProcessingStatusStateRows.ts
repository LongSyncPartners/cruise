import { fetchProcessingStatusStateRows } from "@/api/propertyApi";
import { useQuery } from "@tanstack/react-query";

export const processingStatusStateKeys = {
  all: ["processingStatusState"] as const,
  detail: (propertyCode?: string) =>
    [...processingStatusStateKeys.all, propertyCode ?? ""] as const,
};

export function useProcessingStatusStateRows(
  propertyCode?: string,
  enabled = true
) {
  return useQuery({
    queryKey: processingStatusStateKeys.detail(propertyCode),
    queryFn: () => fetchProcessingStatusStateRows(propertyCode),
    enabled,
  });
}
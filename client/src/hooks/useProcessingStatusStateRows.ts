import { fetchProcessingStatusStateRows } from "@/api/propertyApi";
import { propertyKeys } from "@/queries/propertyKeys";
import { useQuery } from "@tanstack/react-query";

export function useProcessingStatusStateRows(
  propertyCode?: string,
  enabled = true
) {
  return useQuery({
    queryKey: propertyKeys.processingStatusState(propertyCode),
    queryFn: () => fetchProcessingStatusStateRows(propertyCode),
    enabled,
  });
}
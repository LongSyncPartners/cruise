import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPropertyColumnConfigs, savePropertyColumnConfigs } from "@/api/propertyApi";
import { propertyKeys } from "@/queries/propertyKeys";
import { PropertyColumnConfig } from "@/features/properties/types";

export function usePropertyColumnConfigs() {
  return useQuery({
    queryKey: propertyKeys.propertyColumnConfigs,
    queryFn: fetchPropertyColumnConfigs,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useSavePropertyColumnConfigs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnConfigs: PropertyColumnConfig[]) =>
      savePropertyColumnConfigs(columnConfigs),
    onSuccess: (data) => {
      queryClient.setQueryData(propertyKeys.propertyColumnConfigs, data);
    },
  });
}
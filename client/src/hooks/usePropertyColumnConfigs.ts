import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PropertyColumnConfig } from "@/features/properties/propertyColumns";
import { fetchPropertyColumnConfigs, savePropertyColumnConfigs } from "@/api/propertyApi";

export const propertyColumnConfigKeys = {
  all: ["propertyColumnConfigs"] as const,
};

export function usePropertyColumnConfigs() {
  return useQuery({
    queryKey: propertyColumnConfigKeys.all,
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
      queryClient.setQueryData(propertyColumnConfigKeys.all, data);
    },
  });
}
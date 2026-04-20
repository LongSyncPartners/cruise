import { fetchProperties } from "@/api/propertyApi";
import { propertyKeys } from "@/queries/propertyKeys";
import { useQuery } from "@tanstack/react-query";

export function useProperties() {
  return useQuery({
    queryKey: propertyKeys.lists(),
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
}
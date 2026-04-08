import { useQuery } from "@tanstack/react-query";
import { fetchProperties, fetchPropertiesFromStubApi } from "@/api/propertyApi";
import { propertyKeys } from "@/queries/propertyKeys";

export const useProperties = () => {
  return useQuery({
    queryKey: propertyKeys.lists(),
    queryFn: fetchPropertiesFromStubApi,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
};
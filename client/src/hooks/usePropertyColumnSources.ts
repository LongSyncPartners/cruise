import { fetchPropertyColumnSources } from "@/api/propertyApi";
import { propertyKeys } from "@/queries/propertyKeys";
import { useQuery } from "@tanstack/react-query";

export function usePropertyColumnSources() {
  return useQuery({
    queryKey: propertyKeys.propertyColumnSources,
    queryFn: fetchPropertyColumnSources,
  });
}
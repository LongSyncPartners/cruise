import { fetchPropertyColumnSources } from "@/api/propertyApi";
import { useQuery } from "@tanstack/react-query";


export const propertyColumnSourceKeys = {
  all: ["propertyColumnSources"] as const,
};

export function usePropertyColumnSources() {
  return useQuery({
    queryKey: propertyColumnSourceKeys.all,
    queryFn: fetchPropertyColumnSources,
  });
}
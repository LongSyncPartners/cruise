import { fetchPropertyMasterData } from "@/api/propertyApi";
import { useQuery } from "@tanstack/react-query";


export const propertyMasterDataKeys = {
  all: ["propertyMasterData"] as const,
};

export function usePropertyMasterData() {
  return useQuery({
    queryKey: propertyMasterDataKeys.all,
    queryFn: fetchPropertyMasterData,
  });
}
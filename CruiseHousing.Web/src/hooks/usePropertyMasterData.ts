import { fetchPropertyMasterData } from "@/api/propertyApi";
import { propertyKeys } from "@/queries/propertyKeys";
import { useQuery } from "@tanstack/react-query";

export function usePropertyMasterData() {
  return useQuery({
    queryKey: propertyKeys.propertyMasterData,
    queryFn: fetchPropertyMasterData,
  });
}
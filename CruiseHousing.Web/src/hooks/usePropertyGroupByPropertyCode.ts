import { useQuery } from "@tanstack/react-query";
import { getPropertyGroupByPropertyCode } from "@/api/propertyApi";

export const usePropertyGroupByPropertyCode = (
  propertyCode?: string | null
) => {
  return useQuery({
    queryKey: ["propertyGroupByPropertyCode", propertyCode],
    queryFn: () => getPropertyGroupByPropertyCode(propertyCode!),
    enabled: !!propertyCode,
  });
};
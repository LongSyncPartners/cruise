import { useQuery } from "@tanstack/react-query";

import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";
import { fetchPropertyIncomeExpenseTabsByGroup } from "@/api/propertyApi";

export const usePropertiesByGroup = (group?: string) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.tabsByGroup(group ?? ""),

    queryFn: () => {
      if (!group) return Promise.resolve([]);
      return fetchPropertyIncomeExpenseTabsByGroup(group);
    },

    enabled: !!group,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
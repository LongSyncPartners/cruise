import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseTabsByPropertyCode } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

export const usePropertyIncomeExpenseTabsByGroup = (group?: string) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.tabsByGroup(group ?? ""),
    queryFn: () => {
      if (!group) return Promise.resolve([]);

      return fetchPropertyIncomeExpenseTabsByPropertyCode(group);
    },
    enabled: !!group,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
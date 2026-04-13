import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseTabsByGroupFromStubApi } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

export const usePropertyIncomeExpenseTabsByGroup = (group?: string) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.tabsByGroup(group ?? ""),
    queryFn: () => {
      if (!group) return Promise.resolve([]);

      return fetchPropertyIncomeExpenseTabsByGroupFromStubApi(group);
    },
    enabled: !!group,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
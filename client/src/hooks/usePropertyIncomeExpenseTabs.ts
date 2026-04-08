import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseTabsByPropertyCodeFromStubApi } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

/**
 * Fetch tab list by propertyCode only
 */
export const usePropertyIncomeExpenseTabs = (propertyCode?: string) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.tabs(propertyCode ?? ""),
    queryFn: () => {
      if (!propertyCode) {
        return Promise.resolve([]);
      }

      return fetchPropertyIncomeExpenseTabsByPropertyCodeFromStubApi(propertyCode);
    },
    enabled: !!propertyCode,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
};
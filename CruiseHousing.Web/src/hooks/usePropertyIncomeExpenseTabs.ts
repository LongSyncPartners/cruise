import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseTabsByPropertyCode } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";
import { PropertyTabSummary } from "@/features/shared/types";

/**
 * Fetch tab list by propertyCode only
 */
export const usePropertyIncomeExpenseTabs = (propertyCode?: string) : UseQueryResult<PropertyTabSummary[], Error> => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.tabs(propertyCode ?? ""),
    queryFn: () => {
      if (!propertyCode) {
        return Promise.resolve<PropertyTabSummary[]>([]);
      }

      return fetchPropertyIncomeExpenseTabsByPropertyCode(propertyCode);
    },
    enabled: !!propertyCode,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
};
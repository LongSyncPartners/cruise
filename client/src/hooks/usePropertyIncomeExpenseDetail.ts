import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseDetailFromStubApi } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

/**
 * Fetch full property income/expense detail
 * - tab summary
 * - row list
 */
export const usePropertyIncomeExpenseDetail = (propertyCode?: string) => {
  return useQuery({
    queryKey: propertyCode
      ? propertyIncomeExpenseDetailKeys.detail(propertyCode)
      : propertyIncomeExpenseDetailKeys.all,
    queryFn: () => {
      if (!propertyCode) {
        throw new Error("propertyCode is required");
      }

      return fetchPropertyIncomeExpenseDetailFromStubApi(propertyCode);
    },
    enabled: !!propertyCode,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
};
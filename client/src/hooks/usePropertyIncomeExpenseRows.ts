import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseRowsFromStubApi } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

/**
 * Fetch row list by propertyCode
 */
export const usePropertyIncomeExpenseRows = (propertyCode?: string) => {
  return useQuery({
    queryKey: propertyCode
      ? propertyIncomeExpenseDetailKeys.rows(propertyCode)
      : propertyIncomeExpenseDetailKeys.all,
    queryFn: () => {
      if (!propertyCode) {
        throw new Error("propertyCode is required");
      }

      return fetchPropertyIncomeExpenseRowsFromStubApi(propertyCode);
    },
    enabled: !!propertyCode,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
    refetchOnWindowFocus: false,
  });
};
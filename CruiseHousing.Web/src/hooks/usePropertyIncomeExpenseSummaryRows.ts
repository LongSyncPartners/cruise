import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseSummaryRows } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

export const usePropertyIncomeExpenseSummaryRows = (
  companyCode?: string,
  year?: number
) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.propertyIncomeExpenseSummaryRows(
      companyCode ?? "",
      year ?? 0
    ),
    queryFn: () =>
      fetchPropertyIncomeExpenseSummaryRows(
        companyCode as string,
        year as number
      ),
    enabled: !!companyCode && !!year, 
  });
};
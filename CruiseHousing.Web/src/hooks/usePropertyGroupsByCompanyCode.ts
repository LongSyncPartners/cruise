import { useQuery } from "@tanstack/react-query";
import { fetchPropertyIncomeExpenseSummaryTabs } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

export const usePropertyGroupsByCompanyCode = (companyCode?: string) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.groupTabs(companyCode ?? ""),
    queryFn: () =>
      fetchPropertyIncomeExpenseSummaryTabs(companyCode as string),
    enabled: !!companyCode,
  });
};
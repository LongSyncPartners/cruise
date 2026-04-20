import { useQuery } from "@tanstack/react-query";
import { fetchManagementCompanies } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";

export const useManagementCompanies = () => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.managementCompanies(),
    queryFn: fetchManagementCompanies,
  });
};
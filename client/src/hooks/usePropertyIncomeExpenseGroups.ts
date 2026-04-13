import { useQuery } from "@tanstack/react-query";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";
import { getPropertyGroups } from "@/api/propertyIncomeExpenseDetailApi";

export const usePropertyIncomeExpenseGroups = () => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.groups(),
    queryFn: async () => {
      return getPropertyGroups();
    },
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });
};
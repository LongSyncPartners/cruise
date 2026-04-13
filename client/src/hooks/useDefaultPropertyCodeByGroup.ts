import { useQuery } from "@tanstack/react-query";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";
import { getDefaultPropertyCodeByGroup } from "@/api/propertyIncomeExpenseDetailApi";

export const useDefaultPropertyCodeByGroup = (group?: string) => {
  return useQuery({
    queryKey: propertyIncomeExpenseDetailKeys.defaultPropertyCode(group ?? ""),
    queryFn: () => {
      if (!group) return Promise.resolve("");

      return Promise.resolve(getDefaultPropertyCodeByGroup(group));
    },
    enabled: !!group,
    staleTime: 5 * 60 * 1000,
  });
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePropertyIncomeExpenseRows } from "@/api/propertyIncomeExpenseDetailApi";
import { propertyIncomeExpenseDetailKeys } from "@/queries/propertyIncomeExpenseDetailKeys";
import type { PropertyIncomeExpenseDetailRow } from "@/features/property-income-expense-detail/types";

type SavePropertyIncomeExpenseDetailRowsParams = {
  propertyCode: string;
  rows: PropertyIncomeExpenseDetailRow[];
};

export const useSavePropertyIncomeExpenseDetailRows = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyCode,
      rows,
    }: SavePropertyIncomeExpenseDetailRowsParams) => {
      return savePropertyIncomeExpenseRows(propertyCode, rows);
    },

    onSuccess: (_data, variables) => {
      const { propertyCode, rows } = variables;

      queryClient.setQueryData(
        propertyIncomeExpenseDetailKeys.rows(propertyCode),
        rows
      );

      queryClient.invalidateQueries({
        queryKey: propertyIncomeExpenseDetailKeys.rows(propertyCode),
      });

      queryClient.invalidateQueries({
        queryKey: propertyIncomeExpenseDetailKeys.detail(propertyCode),
      });
    },
  });
};
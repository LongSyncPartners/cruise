import { useMutation, useQueryClient } from "@tanstack/react-query";

import { propertyIncomeExpenseListKeys } from "@/queries/propertyIncomeExpenseListKeys";
import { savePropertyIncomeExpenseListRows } from "@/api/propertyIncomeExpenseListApi";
import { ListEditRow } from "@/features/property-income-expense-list/types";

type SavePropertyIncomeExpenseListRowsParams = {
  propertyCode: string;
  rows: ListEditRow[];
};

export const useSavePropertyIncomeExpenseListRows = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyCode,
      rows,
    }: SavePropertyIncomeExpenseListRowsParams) => {
      return savePropertyIncomeExpenseListRows(propertyCode, rows);
    },

    onSuccess: (_data, variables) => {
      const { propertyCode, rows } = variables;

      queryClient.setQueryData(
        propertyIncomeExpenseListKeys.rows(propertyCode),
        rows
      );

      queryClient.invalidateQueries({
        queryKey: propertyIncomeExpenseListKeys.rows(propertyCode),
      });

      queryClient.invalidateQueries({
        queryKey: propertyIncomeExpenseListKeys.detail(propertyCode),
      });
    },
  });
};
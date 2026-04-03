import { type PropertyIncomeExpenseDetailRow } from "./types";
import { addDays, format } from "date-fns";

const today = new Date();

export const initialdata: PropertyIncomeExpenseDetailRow[] = Array.from(
  { length: 200 },
  (_, i) => {
    const income = i % 2 === 0 ? 40000 + i * 1000 : 0;
    const expense = i % 2 !== 0 ? 50000 + i * 500 : 0;
    const balance = 0;
    let expectedAmount = 120000 + i * 1000;
    let managementCompanyAmount = 120000 + i * 1000;

    const date = addDays(today, (i - 200) * 5);
    let yearMonth = format(date, "yyyy-MM");
    if (i > 0) {
      if ((yearMonth !== format(addDays(today, (i - 199) * 5), "yyyy-MM")) && (yearMonth == format(addDays(today, (i - 201) * 5), "yyyy-MM"))) {

      } else
      {
        yearMonth = '';
        expectedAmount = 0;
        managementCompanyAmount = 0;
      }
    } else {
      yearMonth = '';
      expectedAmount = 0;
      managementCompanyAmount = 0;
    }

    return {
        id: i + 1,
        yearMonth: yearMonth,
        expectedAmount: expectedAmount,
        managementCompanyAmount: managementCompanyAmount,
        transactionDate: format(date, "yyyy-MM-dd"),
        counterparty: 'XXXXXXXXXXXXXX',
        description: i % 2 === 0 ? "XXXXXXXXXXXXXXXXXXXX" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        income,
        expense,
        balance,
        note: i % 3 === 0 ? "特記事項あり" : "",
    };
  }
);

import { ListEditRow, SubjectTabInfo, TabInternalOwnerRow, TabOwnerManagementCompanyRow, TabOwnerRow, TabPropertyManagementCompanyRow } from "./types";


// 👉 generate 100 rows
export const createTabPropertyManagementCompanyRows = (): TabPropertyManagementCompanyRow[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const rent = Math.floor(Math.random() * 100000) + 50000;
    const otherIncome = Math.floor(Math.random() * 20000);

    const managementFee = Math.floor(Math.random() * 10000);
    const repairCost = Math.floor(Math.random() * 15000);
    const garden = Math.floor(Math.random() * 5000);
    const brokerage = Math.floor(Math.random() * 8000);
    const otherExpense = Math.floor(Math.random() * 3000);

    const totalIncome = rent + otherIncome;
    const totalExpense =
      managementFee + repairCost + garden + brokerage + otherExpense;

    const net = totalIncome - totalExpense;
    const received = net - Math.floor(Math.random() * 5000);
    const diff = net - received;

    return {
      id: i + 1,

      yearMonth: `2026/${String((i % 12) + 1).padStart(2, "0")}`,

      rentAmount: rent,
      otherIncomeAmount: otherIncome,
      totalIncomeAmount: totalIncome,

      managementFee: managementFee,
      repairCost: repairCost,
      gardenMaintenanceCost: garden,
      brokerageFee: brokerage,
      otherExpenseAmount: otherExpense,
      totalExpenseAmount: totalExpense,

      netAmount: net,
      receivedAmount: received,
      differenceAmount: diff,
      executedState: false,
    };
  });
};


export const createTabOwnerManagementCompanyRows =
  (): TabOwnerManagementCompanyRow[] => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = String(i + 1).padStart(2, "0");

      const managementEntrust = Math.floor(Math.random() * 50000);
      const managementConsignment = Math.floor(Math.random() * 40000);
      const constructionDeposit = Math.floor(Math.random() * 30000);
      const repairCost = Math.floor(Math.random() * 20000);
      const fee = Math.floor(Math.random() * 15000);

      return {
        id: i + 1,
        yearMonth: `2026/${month}`,

        managementEntrust,
        managementConsignment,
        constructionDeposit,
        repairCost,
        fee,
        executedState: false,
      };
    });
  };


  export const createTabInternalOwnerRows = (): TabInternalOwnerRow[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");

    const rentAmount = 120000 + i * 3000;
    const otherIncomeAmount = 8000 + i * 500;
    const totalIncomeAmount = rentAmount + otherIncomeAmount;

    const managementFee = 12000 + i * 300;
    const repairCost = 7000 + i * 400;
    const gardenMaintenanceCost = 3000 + i * 100;
    const brokerageFee = 4500 + i * 150;
    const subleaseCost = 25000 + i * 800;
    const otherExpenseAmount = 3500 + i * 120;
    const extraPaymentCost = 5000 + i * 200;

    const totalExpenseAmount =
      managementFee +
      repairCost +
      gardenMaintenanceCost +
      brokerageFee +
      subleaseCost +
      otherExpenseAmount +
      extraPaymentCost;

    const managementCompanyIncome = totalIncomeAmount - totalExpenseAmount;

    return {
      id: i + 1,
      yearMonth: `2026/${month}`,

      totalIncomeAmount,
      rentAmount,
      otherIncomeAmount,

      totalExpenseAmount,
      managementFee,
      repairCost,
      gardenMaintenanceCost,
      brokerageFee,
      subleaseCost,
      otherExpenseAmount,
      extraPaymentCost,

      managementCompanyIncome,
      executedState: false,
    };
  });
};


export const createTabOwnerRows = (): TabOwnerRow[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const m = String(i + 1).padStart(2, "0");

    const subleaseRent = 150000 + i * 2000;
    const otherIncome = 10000 + i * 500;
    const totalIncome = subleaseRent + otherIncome;

    const managementFee = 12000 + i * 200;
    const repairCost = 8000 + i * 300;
    const constructionFee = 5000 + i * 150;
    const garden = 3000 + i * 100;
    const fee = 4000 + i * 120;
    const propertyTax = 10000 + i * 200;
    const fireInsurance = 2000 + i * 50;
    const floodInsurance = 1500 + i * 40;
    const hoa = 3000 + i * 80;
    const fixedRepair = 6000 + i * 150;
    const otherExpense = 2500 + i * 100;

    const totalExpense =
      managementFee +
      repairCost +
      constructionFee +
      garden +
      fee +
      propertyTax +
      fireInsurance +
      floodInsurance +
      hoa +
      fixedRepair +
      otherExpense;

    const ownerPayment = totalIncome - totalExpense;

    return {
      id: i + 1,
      yearMonth: `2026/${m}`,

      totalIncomeAmount: totalIncome,
      subleaseRent,
      otherIncomeAmount: otherIncome,

      totalExpenseAmount: totalExpense,
      managementFee,
      repairCost,
      constructionFee,
      gardenMaintenanceCost: garden,
      fee,
      propertyTax,
      fireInsurance,
      floodInsurance,
      hoaDues: hoa,
      fixedRepairCost: fixedRepair,
      otherExpenseAmount: otherExpense,

      ownerPaymentAmount: ownerPayment,
      executedState: false,
    };
  });
};

export const createSubjectTabs = (): SubjectTabInfo[] => {
  const subjects = [
    "全て",
    "その他収入",
    "支出計",
    "管理料",
    "修繕費",
    "庭手入れ",
    "仲介手数料",
    "ｻﾌﾞﾘｰｽ原価",
    "その他支出",
    "別途支払費用",
    "管理会社収入",
  ];

  return subjects.map((subject, index) => ({

      code : subject,
      label: subject,

  }));
};

import {
  DETAIL_TAB_VALUES,
  DetailTabValue,
  getSubjectOptionsByDetailTab,
} from "./subjectOptions";

export const createListEditRows = (
  detailTabValue: DetailTabValue,
  subjectTabValue: string
): ListEditRow[] => {
  const categoriesMap: Record<DetailTabValue, DetailTabValue[]> = {
    [DETAIL_TAB_VALUES.ALL]: [
      DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY,
      DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY,
      DETAIL_TAB_VALUES.INTERNAL_OWNER,
      DETAIL_TAB_VALUES.OWNER,
    ],
    [DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY]: [
      DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY,
    ],
    [DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY]: [
      DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY,
    ],
    [DETAIL_TAB_VALUES.INTERNAL_OWNER]: [DETAIL_TAB_VALUES.INTERNAL_OWNER],
    [DETAIL_TAB_VALUES.OWNER]: [DETAIL_TAB_VALUES.OWNER],
  };

  const subjectOptions = getSubjectOptionsByDetailTab(detailTabValue).filter(
    (item) => item.value !== "all"
  );

  const subjects =
    subjectTabValue === "all"
      ? subjectOptions.map((item) => item.value)
      : subjectOptions.some((item) => item.value === subjectTabValue)
        ? [subjectTabValue]
        : subjectOptions.map((item) => item.value);

  const categories =
    categoriesMap[detailTabValue] ?? categoriesMap[DETAIL_TAB_VALUES.ALL];

  const debitOptions = ["現金", "普通預金", "未収金"];
  const creditOptions = ["売上", "雑収入", "未払金"];

  const subjectSeed = subjectTabValue
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const seed = Number(detailTabValue) * 100 + subjectSeed;

  const random = (i: number, max: number) => {
    return Math.abs(Math.sin(i + seed)) * max;
  };

  return Array.from({ length: 5 }, (_, i) => {
    const day = (i % 28) + 1;

    const categoryIndex =
      Math.floor(random(i, categories.length)) % categories.length;

    const subjectIndex =
      Math.floor(random(i + 1, subjects.length)) % subjects.length;

    const amountBase = Math.floor(random(i + 2, 5000)) + 1000;

    return {
      id: i + 1,
      transactionDate: `2024-04-${day.toString().padStart(2, "0")}`,
      detailType: categories[categoryIndex],
      subject: subjects[subjectIndex],
      amount: amountBase,
      masterAmount: Math.floor(amountBase * 0.9),
      accountingSubjectName: `会計科目_${Math.floor(random(i + 3, 20))}`,
      appliedSubjectAux: `補助_${Math.floor(random(i + 4, 5)) + 1}`,
      debit:
        debitOptions[
          Math.floor(random(i + 5, debitOptions.length)) %
            debitOptions.length
        ],
      debitAux: `借方補助_${Math.floor(random(i + 6, 3)) + 1}`,
      credit:
        creditOptions[
          Math.floor(random(i + 7, creditOptions.length)) %
            creditOptions.length
        ],
      creditAux: `貸方補助_${Math.floor(random(i + 8, 3)) + 1}`,
      uploadProcessedDate : `2024-04-${day.toString().padStart(2, "0")}`,
    };
  });
};


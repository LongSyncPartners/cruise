
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

      yearMonth: `2025/${String((i % 12) + 1).padStart(2, "0")}`,

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
        yearMonth: `2025/${month}`,

        managementEntrust,
        managementConsignment,
        constructionDeposit,
        repairCost,
        fee,
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
      yearMonth: `2025/${month}`,

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
      yearMonth: `2025/${m}`,

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

export const createListEditRows = (): ListEditRow[] => {
  const categories = ["収入", "支出", "調整"];
  const subjects = [
    "賃料",
    "修繕費",
    "管理料",
    "その他",
    "仲介手数料",
  ];

  const debitOptions = ["現金", "普通預金", "未収金"];
  const creditOptions = ["売上", "雑収入", "未払金"];

  return Array.from({ length: 30 }, (_, i) => {
    const day = (i % 28) + 1;

    return {
      id: i + 1,

      transactionDate: `2024-04-${day.toString().padStart(2, "0")}`,

      category: categories[i % categories.length],

      subject: subjects[i % subjects.length],

      amount: (i + 1) * 1000,

      masterAmount: (i + 1) * 900,

      accountingSubjectName: `会計科目_${i + 1}`,

      appliedSubjectAux: `補助_${(i % 5) + 1}`,

      debit: debitOptions[i % debitOptions.length],

      debitAux: `借方補助_${(i % 3) + 1}`,

      credit: creditOptions[i % creditOptions.length],

      creditAux: `貸方補助_${(i % 3) + 1}`,
    };
  });
};
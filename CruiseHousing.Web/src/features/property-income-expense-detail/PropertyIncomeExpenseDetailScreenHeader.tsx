import SummarizeIcon from '@mui/icons-material/Summarize';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Typography } from '@mui/material';
import { ViewMode } from './PropertyIncomeExpenseDetailScreen';

type PropertyIncomeExpenseViewHeaderProps = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export default function PropertyIncomeExpenseScreenHeader({ viewMode, onChange }: PropertyIncomeExpenseViewHeaderProps) {
  return (
    <div className="property-income-expense-detail-common-header">
        <div className={`common-header-item ${viewMode === "detail" ? "active" : ""}`} onClick={() => onChange("detail")}>
          <ReceiptLongIcon />
          <Typography>物件収支明細</Typography>
        </div>
        <div className={`common-header-item ${viewMode === "summary" ? "active" : ""}`} onClick={() => onChange("summary")}>
          <SummarizeIcon />
          <Typography>管理会社別サマリー</Typography>
        </div>
    </div>
  );
}
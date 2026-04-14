import SummarizeIcon from '@mui/icons-material/Summarize';
import SubjectIcon from '@mui/icons-material/Subject';
import { Typography } from '@mui/material';
import { ViewMode } from './PropertyIncomeExpenseScreen';

type PropertyIncomeExpenseViewHeaderProps = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export default function PropertyIncomeExpenseScreenHeader({ viewMode, onChange }: PropertyIncomeExpenseViewHeaderProps) {
  return (
    <div className="property-income-expense-detail-common-header">
        <div className="common-header-item" onClick={() => onChange("detail")}>
          <SubjectIcon />
          <Typography>物件収支明細</Typography>
        </div>
        <div className="common-header-item" onClick={() => onChange("summary")}>
          <SummarizeIcon />
          <Typography>管理会社別サマリー</Typography>
        </div>
    </div>
  );
}
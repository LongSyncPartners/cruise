import SubjectIcon from '@mui/icons-material/Subject';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography } from '@mui/material';
import { ViewMode } from './PropertyIncomeExpenseListScreen';

type PropertyIncomeExpenseViewHeaderProps = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export default function PropertyIncomeExpenseDetailScreenHeader({ viewMode, onChange }: PropertyIncomeExpenseViewHeaderProps) {
  return (
    <div className="property-income-expense-detail-common-header">
        <div className={`common-header-item ${viewMode === "view" ? "active" : ""}`} onClick={() => onChange("view")}>
          <SubjectIcon />
          <Typography>照会</Typography>
        </div>
        <div className={`common-header-item ${viewMode === "edit" ? "active" : ""}`} onClick={() => onChange("edit")}>
          <EditNoteIcon />
          <Typography>編集</Typography>
        </div>
        <div className={`common-header-item ${viewMode === "download" ? "active" : ""}`} onClick={() => onChange("download")}>
          <DownloadIcon />
          <Typography>ダウンロード</Typography>
        </div>
    </div>
  );
}
import { Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import PropertyDataGrid from "./PropertyDataGrid";
import LoadingDialog from "../shared/LoadingDialog";

import { useProperties } from "@/hooks/useProperties";
import { usePropertiesGridStore } from "@/stores/propertiesGridStore";

import "./index.style.css";

export default function Properties() {
  const { isLoading, isFetching, refetch } = useProperties();
  const resetGridView = usePropertiesGridStore((state) => state.resetGridView);

  const handleRefresh = async () => {
    await refetch();
    resetGridView();
  };

  return (
    <div className="properties-container">
      <div className="properties-common-header">
        <div className="common-header-item" onClick={handleRefresh}>
          <RefreshIcon />
          <Typography>最新情報を更新</Typography>
        </div>
      </div>

      <Typography sx={{ fontSize: "150%", fontWeight: 500, paddingBottom: 2 }}>
        物件一覧
      </Typography>

      <div className="properties-grid-contaniner">
        <PropertyDataGrid />
      </div>

      <LoadingDialog open={isLoading || isFetching} />
    </div>
  );
}
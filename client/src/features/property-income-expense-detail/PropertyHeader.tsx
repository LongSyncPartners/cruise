import { Box, Typography } from "@mui/material";
import { type PropertyHeaderProps  } from "./types";

const Item = ({ label, value }: { label: string; value?: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Typography sx={{ fontWeight: 600 }}>{label}：</Typography>
    <Typography>{value || "-"}</Typography>
  </Box>
);

const PropertyHeader = ({
  propertyCode,
  roomCode,
  managementType,
  propertyType,
  managementCompany,
  managementPeriod,
}: PropertyHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 3,
        px: 2,
        py: 1,
        backgroundColor: "#f5f5f5",
        marginBottom: 3,
      }}
    >
      <Item label="物件番号" value={propertyCode} />
      <Item label="部屋番号" value={roomCode} />
      <Item label="管理種別" value={managementType} />
      <Item label="建物種別" value={propertyType} />
      <Item label="管理会社" value={managementCompany} />
      <Item label="管理開始終了日" value={managementPeriod} />
    </Box>
  );
};

export default PropertyHeader;
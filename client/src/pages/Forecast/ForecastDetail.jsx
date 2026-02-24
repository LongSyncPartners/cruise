import {
  Drawer,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const HEADER_HEIGHT = 64;

/* ====== Reusable row ====== */
function FormRow({ label, widthLabel = 90, widthText = 200, backgroundColor ="#e0dfdf"}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ width : widthLabel}}>{label}</Typography>
      <TextField
        size="small"
        variant="outlined"
        sx={{ backgroundColor: backgroundColor , width: widthText}}
        value={""}
      >
      </TextField>
    </Box>
  );
}

/* ====== Section wrapper ====== */
function Section({hasBorder = true, title, children }) {
  return (
    <Box sx={{ mb: 2 }}>
      {hasBorder ? <Divider/> : ""}
      
      <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      
      {children}
    </Box>
  );
}

/* ====== Main Drawer ====== */
export default function ForecastDetail({ open, onClose }) {

  return (
    <Drawer
      variant="temporary"
      hideBackdrop
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: "forecast-detail"
        }
      }}
    >
      <Box sx={{ p: 3, pt:0, height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          className = "forecast-detail-header"
        >
          <Typography variant="h6">
            予測詳細
          </Typography>

          <IconButton 
            onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ overflowY: "auto", pr: 1, mt:1 }}>
        {/* 顧客情報 */}
        <Section title="顧客情報" hasBorder={false}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormRow label="顧客番号" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="供給" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="顧客氏名" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="開閉栓区分" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="地図番号" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="住所" />
            </Grid>
          </Grid>
        </Section>

        {/* 容器情報 */}
        <Section title="容器情報">
          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            設置１側
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormRow label="設置番号" />
            </Grid>
            <Grid item xs={3}>
              <FormRow label="LPG容量" widthText="90px"  />
            </Grid>
            <Grid item xs={3}>
              <FormRow label="本数" widthLabel="40px" widthText="48px" />
            </Grid>
          </Grid>

          <Typography fontWeight="bold" sx={{ mb: 1 }}>
            設置２側
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormRow label="設置番号" />
            </Grid>
            <Grid item xs={3}>
              <FormRow label="LPG容量" widthText="90px"  />
            </Grid>
            <Grid item xs={3}>
              <FormRow label="本数" widthLabel="40px" widthText="48px" />
            </Grid>
          </Grid>
        </Section>

        {/* 今回配送情報 */}
        <Section title="今回配送情報">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormRow label="予測日" backgroundColor="#fff"/>
            </Grid>
            <Grid item xs={6}>
              <FormRow label="予測指針" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="今回利用量/日" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="今回配送間隔" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="ガス切日" />
            </Grid>
          </Grid>
        </Section>

        {/* 前回配送情報 */}
        <Section title="前回配送情報">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormRow label="前回配送日" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="前回配送指針" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="前回利用量/日" />
            </Grid>
            <Grid item xs={6}>
              <FormRow label="前回配送間隔" />
            </Grid>
          </Grid>
        </Section>
      </Box>

        {/* Footer */}
        <Box
          className = "forecast-detail-footer"
        >
          <Button variant="contained" color="success" onClick={onClose} className="close-button">閉じる</Button>

          <Button variant="contained" color="success">保存</Button>

        </Box>
      </Box>
    </Drawer>
  );
}

import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/* ===== Reusable Parts ===== */
const FormRow = ({ label }) => (
  <Box className="form-row">
    <Typography className="form-label">
      {label}
    </Typography>
    <TextField
      size="small"
      fullWidth
      className="form-input"
      variant="outlined"
    />
  </Box>
);

const FormRowPeriod = ({ label }) => (
  <Box className="form-row">
    <Typography className="form-label">
      {label}
    </Typography>

    <Box className="period-group">
      <TextField
        size="small"
        fullWidth
        className="form-input"
      />
      <Typography className="period-separator">〜</Typography>
      <TextField
        size="small"
        fullWidth
        className="form-input"
      />
    </Box>
  </Box>
);

export default function ForecastSearch() {

  const { state } = useLocation();
  const { data } = state || {};
  const navigate = useNavigate();

  return (
    <Box className="search-container">
      {/* Header */}
      <Box className="search-header">
        <Typography className="forecast-title">
          予測結果
        </Typography>

        {data ? (<Button variant="contained" onClick={() => navigate('/coefficient')}>係数情報画面へ戻る</Button>)
               : (<Button variant="contained" className="search-button">検索</Button>)}
      </Box>

      <Accordion className="search-condition-container">
        <AccordionSummary
          className="search-condition-summary"
          expandIcon={<ExpandMoreIcon />}
        >
        <Typography component="span">検索条件</Typography>
        </AccordionSummary>

        <AccordionDetails className="search-condition-detail">
          {/* Search Form */}
          <Grid container spacing={6}>
              {/* Left */}
              <Grid>
              <FormRow label="企業番号" />
              <FormRow label="伝票予測" />
              <FormRowPeriod label="配送予定期間" />
              <FormRow label="予測条件" />
              <FormRowPeriod label="検針・メータ交換日" />
              </Grid>

              {/* Right */}
              <Grid>
              <FormRowPeriod label="前回配送日" />
              <FormRowPeriod label="ガス切予定日" />
              <FormRow label="地域" />
              <FormRow label="顧客番号" />
              <FormRow label="顧客氏名" />
              </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
    </Box>
  );
};
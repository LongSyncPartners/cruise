import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  type ProcessingStatusStateRow,
} from "./types";
import { PROCESSING_STATUS_STATE_ROWS } from "./property";

type Props = {
  open: boolean;
  onClose: () => void;
  propertyCode?: string;
  rows?: ProcessingStatusStateRow[];
};

export default function ProcessingStatusStateDialog({
  open,
  onClose,
  propertyCode = "",
  rows = PROCESSING_STATUS_STATE_ROWS,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>該当物件の処理ステータス状態</DialogTitle>

      <DialogContent dividers>
        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>処理ステータスコード</TableCell>
                <TableCell>処理ステータス名</TableCell>
                <TableCell>状態</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.code}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import * as React from "react";
import {
  Box,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export type HeaderContextMenuState = {
  mouseX: number;
  mouseY: number;
  field: string;
  headerName: string;
} | null;

export type HeaderOption = {
  value: string;
  label: string;
};

type CustomContextMenuHeaderProps = {
  contextMenu: HeaderContextMenuState;
  headerOptions?: HeaderOption[];
  onClose: () => void;
  onRenameHeader?: (field: string, headerName: string) => void;
  onDeleteHeader?: (field: string) => void;
  onAddHeader?: (
    afterField: string,
    headerName: string,
    dataSource?: string
  ) => void;
};

const DEFAULT_HEADER_OPTIONS: HeaderOption[] = [
  { value: "propertyName", label: "物件名" },
  { value: "propertyAddress", label: "物件住所" },
];

export default function CustomContextMenuHeader({
  contextMenu,
  headerOptions,
  onClose,
  onRenameHeader,
  onDeleteHeader,
  onAddHeader,
}: CustomContextMenuHeaderProps) {
  const [renameValue, setRenameValue] = React.useState("");
  const [selectedHeaderValue, setSelectedHeaderValue] = React.useState("");
  const [openSection, setOpenSection] = React.useState<"rename" | "add" | null>(
    null
  );

  const availableHeaderOptions =
    headerOptions?.length ? headerOptions : DEFAULT_HEADER_OPTIONS;

  React.useEffect(() => {
    if (contextMenu) {
      setRenameValue(contextMenu.headerName ?? "");
      setSelectedHeaderValue(availableHeaderOptions[0]?.value ?? "");
      setOpenSection(null);
    } else {
      setRenameValue("");
      setSelectedHeaderValue(availableHeaderOptions[0]?.value ?? "");
      setOpenSection(null);
    }
  }, [contextMenu, availableHeaderOptions]);

  const handleToggleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSection((prev) => (prev === "rename" ? null : "rename"));
  };

  const handleToggleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSection((prev) => (prev === "add" ? null : "add"));
  };

  const handleRename = () => {
    if (contextMenu && renameValue.trim()) {
      onRenameHeader?.(contextMenu.field, renameValue.trim());
    }
    onClose();
  };

  const handleDelete = () => {
    if (contextMenu) {
      onDeleteHeader?.(contextMenu.field);
    }
    onClose();
  };

  const handleAdd = () => {
    if (!contextMenu || !selectedHeaderValue) return;

    const selectedOption = availableHeaderOptions.find(
      (option) => option.value === selectedHeaderValue
    );

    if (!selectedOption) return;

    onAddHeader?.(
      contextMenu.field,
      selectedOption.label,
      selectedOption.value
    );
    onClose();
  };

  const handleChangeHeaderValue = (event: SelectChangeEvent<string>) => {
    setSelectedHeaderValue(event.target.value);
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      sx={{width:260}}
    >
      <MenuItem
        onClick={handleToggleRename}
        sx={{ fontWeight: 400, minWidth: 220 }}
      >
        <DriveFileRenameOutlineIcon sx={{ mr: 1, color: "#467ABA" }} />
        ヘッダー名を変更
      </MenuItem>

      <Collapse in={openSection === "rename"} timeout={1000} unmountOnExit>
        <Box sx={{ px: 1.5, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder="ヘッダー名"
              autoFocus={openSection === "rename"}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
            />

            <IconButton
              disabled={!renameValue.trim()}
              onClick={(e) => {
                e.stopPropagation();
                handleRename();
              }}
            >
              <DriveFileRenameOutlineIcon
                sx={{ color: "#467ABA", fontSize: "150%" }}
              />
            </IconButton>
          </Box>
        </Box>
      </Collapse>

      <Divider />

      <MenuItem
        onClick={handleToggleAdd}
        sx={{ fontWeight: 400, minWidth: 220 }}
      >
        <ControlPointIcon sx={{ mr: 1, color: "#25d30e" }} />
        右にカラムを追加
      </MenuItem>

      <Collapse in={openSection === "add"} timeout={1000} unmountOnExit>
        <Box sx={{ px: 1.5, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedHeaderValue}
                onChange={handleChangeHeaderValue}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {availableHeaderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton
              disabled={!selectedHeaderValue}
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
            >
              <ControlPointIcon
                sx={{ color: "#25d30e", fontSize: "150%" }}
              />
            </IconButton>
          </Box>
        </Box>
      </Collapse>

      <Divider />

      <MenuItem onClick={handleDelete} sx={{ fontWeight: 400 }}>
        <DeleteForeverIcon
          sx={{ fontSize: "150%", mr: 1, color: "#ff5959" }}
        />
        ヘッダーを削除
      </MenuItem>
    </Menu>
  );
}
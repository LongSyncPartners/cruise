import * as React from "react";
import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { useState } from "react";

export type CellContextMenuState = {
  mouseX: number;
  mouseY: number;
  rowId: GridRowId;
  field: string;
  row: unknown;
  value: unknown;
} | null;

type Props = {
  contextMenu: CellContextMenuState;
  onClose: () => void;
  onCopy?: (menu: NonNullable<CellContextMenuState>) => void;
  onCopyAll?: () => void;
  onPaste?: (menu: NonNullable<CellContextMenuState>) => void;
  onPasteBelow?: (menu: NonNullable<CellContextMenuState>) => void;
  onAdd?: (menu: NonNullable<CellContextMenuState>, rowCount: number) => void;
  onDelete?: (menu: NonNullable<CellContextMenuState>) => void;
  onSetSelectedRowsColor?: (
    menu: NonNullable<CellContextMenuState>,
    color: string
  ) => void;
  onRenameHeader?: (field: string, headerName: string) => void;
  canPaste?: boolean;
};

export default function CustomContextMenu({
  contextMenu,
  onClose,
  onCopy,
  onCopyAll,
  onPaste,
  onPasteBelow,
  onAdd,
  onDelete,
  onSetSelectedRowsColor,
  onRenameHeader,
  canPaste = false,
}: Props) {
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [addRowCount, setAddRowCount] = useState<number>(2);
  const [headerName, setHeaderName] = useState("");

  const isHeader = contextMenu?.rowId === "header";

  React.useEffect(() => {
    if (!contextMenu) {
      setShowColorOptions(false);
      setHeaderName("");
    }
  }, [contextMenu]);

  const handleCopy = () => {
    if (contextMenu && onCopy) {
      onCopy(contextMenu);
    }
    onClose();
  };

  const handleCopyAll = () => {
    if (onCopyAll) {
      onCopyAll();
    }
    onClose();
  };

  const handlePaste = () => {
    if (contextMenu && onPaste) {
      onPaste(contextMenu);
    }
    onClose();
  };

  const handlePasteBelow = () => {
    if (contextMenu && onPasteBelow) {
      onPasteBelow(contextMenu);
    }
    onClose();
  };

  const handleAddMultiple = () => {
    if (contextMenu && onAdd) {
      onAdd(contextMenu, addRowCount);
    }
    onClose();
  };

  const handleDelete = () => {
    if (contextMenu && onDelete) {
      onDelete(contextMenu);
    }
    onClose();
  };

  const handleToggleColorOptions = () => {
    setShowColorOptions((prev) => !prev);
  };

  const handleSetSelectedRowsColor = (color: string) => {
    if (contextMenu && onSetSelectedRowsColor) {
      onSetSelectedRowsColor(contextMenu, color);
    }
    setShowColorOptions(false);
    onClose();
  };

  const handleRenameHeaderClick = () => {
    if (contextMenu && headerName.trim()) {
      onRenameHeader?.(contextMenu.field, headerName.trim());
    }
    onClose();
  };

  const colorBoxStyle = (color: string, border = false) => ({
    width: 18,
    height: 18,
    backgroundColor: color,
    border: border ? "1px solid #ccc" : "none",
    cursor: "pointer",
    borderRadius: 2,
    transition: "transform 0.1s",
  });

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
    >
      {isHeader
        ? [
            <MenuItem
              key="rename-header"
              disableRipple
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 1,
                width: 260,
                cursor: "default",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography fontSize={14} fontWeight={600}>
                Change Header Name
              </Typography>

              <TextField
                size="small"
                value={headerName}
                onChange={(e) => setHeaderName(e.target.value)}
                placeholder="Enter new name"
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") {
                    handleRenameHeaderClick();
                  }
                }}
              />

              <Button
                variant="contained"
                size="small"
                disabled={!headerName.trim()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRenameHeaderClick();
                }}
              >
                Apply
              </Button>
            </MenuItem>,
          ]
        : [
            <MenuItem key="copy" onClick={handleCopy}>
              <ContentCopyIcon sx={{ mr: 2 }} />
              選択行をコピー
            </MenuItem>,

            <MenuItem key="paste" onClick={handlePaste} disabled={!canPaste}>
              <ContentPasteIcon sx={{ mr: 2 }} />
              この行に貼り付け
            </MenuItem>,

            <MenuItem
              key="paste-below"
              onClick={handlePasteBelow}
              disabled={!canPaste}
            >
              <ContentPasteIcon sx={{ mr: 2 }} />
              下行を追加して貼り付け
            </MenuItem>,

            <Divider key="divider-color-1" />,

            <MenuItem key="set-color" onClick={handleToggleColorOptions}>
              <ColorizeIcon sx={{ mr: 2 }} />
              選択行の背景色を設定
            </MenuItem>,

            <MenuItem key="color-options" sx={{ pl: 2 }}>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <span
                  onClick={() => handleSetSelectedRowsColor("none")}
                  style={colorBoxStyle("#ffffff", true)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <span
                  onClick={() => handleSetSelectedRowsColor("gray")}
                  style={colorBoxStyle("#e0e0e0")}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <span
                  onClick={() => handleSetSelectedRowsColor("yellow")}
                  style={colorBoxStyle("#faed77")}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <span
                  onClick={() => handleSetSelectedRowsColor("blue")}
                  style={colorBoxStyle("#90caf9")}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <span
                  onClick={() => handleSetSelectedRowsColor("pink")}
                  style={colorBoxStyle("#f48fb1")}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </MenuItem>,

            <Divider key="divider-add-2" />,

            <MenuItem key="add-multiple" onClick={handleAddMultiple}>
              <ControlPointIcon sx={{ mr: 2 }} />
              下に
              <Select
                size="small"
                value={String(addRowCount)}
                onChange={(e: SelectChangeEvent<string>) =>
                  setAddRowCount(Number(e.target.value))
                }
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                variant="standard"
                sx={{
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    py: 0,
                    pr: 2,
                  },
                  textAlign: "right",
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
              </Select>
              行を追加
            </MenuItem>,

            <MenuItem key="delete" onClick={handleDelete}>
              <DeleteForeverIcon sx={{ mr: 2 }} />
              選択行を削除
            </MenuItem>,

            <Divider key="divider-copy-all-3" />,

            <MenuItem key="copy-all" onClick={handleCopyAll}>
              <ContentCopyIcon sx={{ mr: 2 }} />
              全ての収支データをコピー
            </MenuItem>,
          ]}
    </Menu>
  );
}
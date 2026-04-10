import * as React from "react";
import { Divider, Menu, MenuItem } from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { Link } from "react-router-dom";
import { PropertyRow } from "../properties/types";
import { ScreenId } from "./enum";
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
  onOpenProcessingStatusDialog?: (menu: NonNullable<CellContextMenuState>) => void;
  onCopy?: (menu: NonNullable<CellContextMenuState>) => void;
  onPaste?: (menu: NonNullable<CellContextMenuState>) => void;
  onPasteBelow?: (menu: NonNullable<CellContextMenuState>) => void;
  onAdd?: (menu: NonNullable<CellContextMenuState>) => void;
  onDelete?: (menu: NonNullable<CellContextMenuState>) => void;
  onSetSelectedRowsColor?: (
    menu: NonNullable<CellContextMenuState>,
    color: string
  ) => void;
  screenId?: ScreenId;
  canPaste?: boolean;
};

export default function CustomContextMenu({
  contextMenu,
  onClose,
  onOpenProcessingStatusDialog,
  onCopy,
  onPaste,
  onPasteBelow,
  onAdd,
  onDelete,
  onSetSelectedRowsColor,
  screenId,
  canPaste = false,
}: Props) {
  const [showColorOptions, setShowColorOptions] = useState(false);

  React.useEffect(() => {
    if (!contextMenu) {
      setShowColorOptions(false);
    }
  }, [contextMenu]);

  const handleOpenProcessingStatusDialog = () => {
    if (contextMenu && onOpenProcessingStatusDialog) {
      onOpenProcessingStatusDialog(contextMenu);
    }
    onClose();
  };

  const handleCopy = () => {
    if (contextMenu && onCopy) {
      onCopy(contextMenu);
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

  const handleAdd = () => {
    if (contextMenu && onAdd) {
      onAdd(contextMenu);
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
      {screenId === ScreenId.PROPERTY_LIST
        ? [
            <MenuItem
              key="go-finance"
              component={Link}
              to={`/properties/${(contextMenu?.row as PropertyRow)?.propertyCode || ""}/finance`}
              sx={{
                "&:hover": {
                  color: "inherit",
                  textDecoration: "none",
                },
              }}
            >
              <ReceiptLongIcon sx={{ mr: 1 }} />
              物件収支明細画面へ移動
            </MenuItem>,
            <MenuItem
              key="open-processing-status-dialog"
              onClick={handleOpenProcessingStatusDialog}
            >
              <InfoOutlinedIcon sx={{ mr: 1 }} />
              処理ステータス状態を表示
            </MenuItem>,
            <Divider key="divider-go-finance" />,
          ]
        : null}

      <MenuItem onClick={handleCopy}>
        <ContentCopyIcon sx={{ mr: 2 }} />
        この行をコピー
      </MenuItem>

      <MenuItem onClick={handlePaste} disabled={!canPaste}>
        <ContentPasteIcon sx={{ mr: 2 }} />
        この行に貼り付け
      </MenuItem>

      <MenuItem onClick={handlePasteBelow} disabled={!canPaste}>
        <ContentPasteIcon sx={{ mr: 2 }} />
        下行を追加して貼り付け
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleToggleColorOptions}>
        <ColorizeIcon sx={{ mr: 2 }} />
        選択行の背景色を設定
      </MenuItem>

      <MenuItem sx={{ pl: 2 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            onClick={() => handleSetSelectedRowsColor("none")}
            style={colorBoxStyle("#ffffff")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <span
            onClick={() => handleSetSelectedRowsColor("gray")}
            style={colorBoxStyle("#e0e0e0")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <span
            onClick={() => handleSetSelectedRowsColor("yellow")}
            style={colorBoxStyle("#faed77")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <span
            onClick={() => handleSetSelectedRowsColor("blue")}
            style={colorBoxStyle("#90caf9")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          <span
            onClick={() => handleSetSelectedRowsColor("pink")}
            style={colorBoxStyle("#f48fb1")}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleAdd}>
        <ControlPointIcon sx={{ mr: 2 }} />
        下行を追加
      </MenuItem>

      <MenuItem onClick={handleDelete}>
        <DeleteForeverIcon sx={{ mr: 2 }} />
        この行を削除
      </MenuItem>
    </Menu>
  );
}
import * as React from "react";
import { Divider, Menu, MenuItem } from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
  screenId,
  canPaste = false,
}: Props) {

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
      {screenId === ScreenId.PROPERTY_LIST ? 
        [
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
      
      <MenuItem 
        onClick={handleCopy}>
        <ContentCopyIcon sx={{ mr : 2}}></ContentCopyIcon>
        この行をコピー
      </MenuItem>

      <MenuItem onClick={handlePaste}　disabled={!canPaste}>
        <ContentPasteIcon sx={{ mr : 2}}></ContentPasteIcon>
        この行に貼り付け
      </MenuItem>

      <MenuItem onClick={handlePasteBelow}　disabled={!canPaste}>
        <ContentPasteIcon sx={{ mr : 2}}></ContentPasteIcon>
        下行を追加して貼り付け
      </MenuItem>

      {/* LINE */}
      <Divider /> 

      <MenuItem onClick={handleAdd}>
        <ControlPointIcon sx={{ mr : 2}}></ControlPointIcon>
        下行を追加
      </MenuItem>

      <MenuItem onClick={handleDelete}>
        <DeleteForeverIcon sx={{ mr : 2}}></DeleteForeverIcon>
        この行を削除
      </MenuItem>

    </Menu>
  );
}
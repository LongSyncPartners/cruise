import * as React from "react";
import {
  Divider,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import type { GridRowId } from "@mui/x-data-grid";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useState } from "react";

export type CellContextMenuState = {
  mouseX: number;
  mouseY: number;
  rowId: GridRowId;
  field: string;
  row: unknown;
  value: unknown;
} | null;

export type ContextMenuFeature = {
  copy?: boolean;
  paste?: boolean;
  pasteBelow?: boolean;
  color?: boolean;
  addRows?: boolean;
  delete?: boolean;
  copyAll?: boolean;
  openFloatingPanel?: boolean;
};

const DEFAULT_FEATURES: ContextMenuFeature = {
  copy: true,
  paste: true,
  pasteBelow: true,
  color: true,
  addRows: true,
  delete: true,
  copyAll: false,
  openFloatingPanel: true,
};

type Props = {
  contextMenu: CellContextMenuState;
  onClose: () => void;
  features?: ContextMenuFeature;
  onCopy?: (menu: NonNullable<CellContextMenuState>) => void;
  onCopyAll?: () => void;
  onPasteAll?: () => void;
  onPaste?: (menu: NonNullable<CellContextMenuState>) => void;
  onPasteBelow?: (menu: NonNullable<CellContextMenuState>) => void;
  onAdd?: (menu: NonNullable<CellContextMenuState>, rowCount: number) => void;
  onDelete?: (menu: NonNullable<CellContextMenuState>) => void;
  onSetSelectedRowsColor?: (
    menu: NonNullable<CellContextMenuState>,
    color: string
  ) => void;
  onOpenFloatPanelClick?: (
    menu: NonNullable<CellContextMenuState>
  ) => void;

  canPaste?: boolean;
  canPasteAll?: boolean;
};

export default function CustomContextMenu({
  contextMenu,
  features,
  onClose,
  onCopy,
  onCopyAll,
  onPaste,
  onPasteAll,
  onPasteBelow,
  onAdd,
  onDelete,
  onSetSelectedRowsColor,
  onOpenFloatPanelClick,
  canPaste = false,
  canPasteAll = false,
}: Props) {
  const enabledFeatures = {
    ...DEFAULT_FEATURES,
    ...features,
  };

  const [showColorOptions, setShowColorOptions] = useState(false);
  const [addRowCount, setAddRowCount] = useState<number>(2);

  React.useEffect(() => {
    if (!contextMenu) {
      setShowColorOptions(false);
    }
  }, [contextMenu]);

  const handleCopy = () => {
    if (contextMenu) onCopy?.(contextMenu);
    onClose();
  };

  const handleCopyAll = () => {
    onCopyAll?.();
    onClose();
  };

  const handlePasteAll = () => {
    onPasteAll?.();
    onClose();
  };

  const handlePaste = () => {
    if (contextMenu) onPaste?.(contextMenu);
    onClose();
  };

  const handlePasteBelow = () => {
    if (contextMenu) onPasteBelow?.(contextMenu);
    onClose();
  };

  const handleAddMultiple = () => {
    if (contextMenu) onAdd?.(contextMenu, addRowCount);
    onClose();
  };

  const handleDelete = () => {
    if (contextMenu) onDelete?.(contextMenu);
    onClose();
  };

  const handleSetSelectedRowsColor = (color: string) => {
    if (contextMenu) onSetSelectedRowsColor?.(contextMenu, color);
    setShowColorOptions(false);
    onClose();
  };

  const handleOpenFloatPanelClick = () => {
    if (contextMenu) onOpenFloatPanelClick?.(contextMenu);
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

  const renderColorBox = (
    colorKey: string,
    displayColor: string,
    border = false
  ) => (
    <span
      onClick={() => handleSetSelectedRowsColor(colorKey)}
      style={colorBoxStyle(displayColor, border)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  );

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
      {enabledFeatures.copy && (
        <MenuItem onClick={handleCopy}>
          <ContentCopyIcon sx={{ mr: 2 }} />
          選択行をコピー
        </MenuItem>
      )}

      {enabledFeatures.paste && (
        <MenuItem onClick={handlePaste} disabled={!canPaste}>
          <ContentPasteIcon sx={{ mr: 2 }} />
          この行に貼り付け
        </MenuItem>
      )}

      {enabledFeatures.pasteBelow && (
        <MenuItem onClick={handlePasteBelow} disabled={!canPaste}>
          <ContentPasteIcon sx={{ mr: 2 }} />
          下行を追加して貼り付け
        </MenuItem>
      )}

      {enabledFeatures.color && 
      [
        <Divider key="divider-color" />,

        <MenuItem
          key="set-color"
          onClick={() => setShowColorOptions((prev) => !prev)}
        >
          <ColorizeIcon sx={{ mr: 2 }} />
          選択行の背景色を設定
        </MenuItem>,

        showColorOptions && (
          <MenuItem key="color-options" sx={{ pl: 2 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {renderColorBox("none", "#ffffff", true)}
              {renderColorBox("gray", "#e0e0e0")}
              {renderColorBox("yellow", "#faed77")}
              {renderColorBox("blue", "#90caf9")}
              {renderColorBox("pink", "#f48fb1")}
            </div>
          </MenuItem>
        ),
      ]}

      {enabledFeatures.addRows && 
      [
        <Divider key="divider-add" />,

        <MenuItem key="add-rows" onClick={handleAddMultiple}>
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
      ]}

      {enabledFeatures.delete && (
        <MenuItem onClick={handleDelete}>
          <DeleteForeverIcon sx={{ mr: 2 }} />
          選択行を削除
        </MenuItem>
      )}

      {enabledFeatures.copyAll && 
      [
        <Divider key="divider-copy-all" />,

        <MenuItem key="copy-all" onClick={handleCopyAll}>
          <ContentCopyIcon sx={{ mr: 2 }} />
          全ての収支データを複写
        </MenuItem>,
        <MenuItem key="paste-all" onClick={handlePasteAll} disabled={!canPasteAll}>
          <ContentPasteIcon sx={{ mr: 2 }} />
          複写データを貼り付け
        </MenuItem>,
      ]}

      {enabledFeatures.openFloatingPanel && 
        [
          <Divider key="divider-open-float-panel"/>,
          <MenuItem key="open-float-panel" onClick={handleOpenFloatPanelClick}>
            <ReadMoreIcon sx={{ mr: 2 }} />
            更に詳細項目を表示
          </MenuItem>,
        ]
      }
    </Menu>
  );
}
import { useRef, useState } from "react";
import React from "react";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";

import CurrencyCell from "@/features/shared/CurrencyCell";
import EditableCurrencyValue from "@/features/shared/EditableCurrencyValue";
import EditableTextField from "@/features/shared/EditableTextField";
import EditableDateField from "@/features/shared/EditableDateField";

import {
  type CommonFloatingPanelProps,
} from "@/features/shared/types";
import EditableDropdownList from "./EditableDropdownList";

export default function CommonFloatingPanel<
  TRow extends { id?: string | number },
  TField extends keyof TRow
>({
  open,
  onClose,
  selectedRow,
  displayFields,
  fieldLabels,
  fieldComponentMap,
  onSelectedRowChange,
}: CommonFloatingPanelProps<TRow, TField>) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -50, y: 150 })

  if (!open) return null;

  const updateSelectedRow = (key: TField, value: unknown) => {
    if (!selectedRow) return;

    onSelectedRowChange?.({
      ...selectedRow,
      [key]: value,
    });
  };

  const renderFieldValue = (key: TField) => {
    if (!selectedRow) return null;

    const value = selectedRow[key];
    const config = fieldComponentMap[key];

    if (config.readOnly) {
      if (config.type === "currency") {
        return <CurrencyCell value={value as number | null | undefined} />;
      }

      return String(value ?? "");
    }

    switch (config.type) {
      case "currency":
        return (
          <EditableCurrencyValue
            value={value as number | null | undefined}
            onChange={(nextValue) =>
              updateSelectedRow(key, nextValue ?? undefined)
            }
          />
        );

      case "date":
        return (
          <EditableDateField
            value={value as string | null | undefined}
            required={config.required}
            onChange={(nextValue) =>
              updateSelectedRow(key, nextValue ?? undefined)
            }
          />
        );

      case "text":
        return (
          <EditableTextField
            value={value as string | null | undefined}
            required={config.required}
            maxLength={config.maxLength}
            onChange={(nextValue) =>
              updateSelectedRow(key, nextValue ?? undefined)
            }
          />
        );

      case "select":
        return (
          <EditableDropdownList
            value={value as string | number | null | undefined}
            options={config.options ?? []}
            required={config.required}
            onChange={(nextValue) =>
              updateSelectedRow(key, nextValue ?? undefined)
            }
          />
        );

      default:
        return String(value ?? "");
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".floating-panel-header"
      position={position}
      onStop={(_, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
    >
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 320,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 1300,
        }}
      >
        <div
          className="floating-panel-header"
          style={{
            cursor: "move",
            paddingLeft: "10px",
            background: "#1976d2",
            color: "#fff",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            display: "flex",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {selectedRow && (
          <div style={{ padding: 16, maxHeight: "calc(100vh - 200px)", overflowY: "auto", }}>
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "8px",
                fontWeight: "bold",
              }}
            >
              {displayFields.map((key) => {
                const label = fieldLabels[key] ?? String(key);

                return (
                  <React.Fragment key={String(key)}>
                    <dt
                      style={{
                        fontWeight: "bold",
                        background: "#1976d2",
                        borderRight: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        padding: "6px",
                        color: "#fff",
                      }}
                    >
                      {label}
                    </dt>

                    <dd
                      style={{
                        margin: 0,
                        borderBottom: "1px solid #ccc",
                        padding: "6px",
                        minHeight: 28,
                      }}
                    >
                      {renderFieldValue(key)}
                    </dd>
                  </React.Fragment>
                );
              })}
            </dl>
          </div>
        )}
      </div>
    </Draggable>
  );
}
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import CloseIcon from '@mui/icons-material/Close';
import { PropertyIncomeExpenseDetailRow } from "../types";
import React from "react";
import { PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS } from "./propertyIncomeExpenseDetailColumnLabels";
import CurrencyCell from "@/features/shared/CurrencyCell";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: PropertyIncomeExpenseDetailRow | null;
};

export default function FloatingPanel({ open, onClose, selectedRow }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 90, y: 117 });

  if (!open) return null;

  const FLOAT_PANEL_DISPLAY_FIELDS = [
    "yearMonth",
    "expectedAmount",
    "managementCompanyAmount",
    "transactionDate",
    "counterparty",
    "description",
    "income",
    "expense",
    "balance",
    "note",
    ] as const satisfies readonly (keyof PropertyIncomeExpenseDetailRow)[];

    const CURRENCY_FIELDS = [
        "expectedAmount",
        "managementCompanyAmount",
        "income",
        "expense",
        "balance",
    ] as const;

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
          top: 100,
          right: 100,
          width: 260,
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
                marginLeft: "auto"
            }}
          >
            <CloseIcon/>
          </button>
        </div>

        {selectedRow && (
        <div style={{ padding: 16 }}>
            <dl
            style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "8px",
                fontWeight: "bold",
                
            }}
            >
           {FLOAT_PANEL_DISPLAY_FIELDS.map((key) => {
                const label =
                    PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS[
                        key as keyof typeof PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS
                    ] ?? key;
                const value = selectedRow[key];

                 const isCurrency = CURRENCY_FIELDS.includes(
                    key as (typeof CURRENCY_FIELDS)[number]
                );

                return (
                    <React.Fragment key={key}>
                    <dt style={{ 
                        fontWeight: "bold",
                        background: "#1976d2",
                        borderRight: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        padding: "6px",
                        color: "#fff",
                        }}>{label}</dt>
                    <dd style={{ 
                        margin: 0 ,
                        borderBottom: "1px solid #ccc",
                        padding: "6px",
                        }}>
                        
                         {isCurrency ? (
                            <CurrencyCell value={value as number} />
                            ) : (
                            String(value ?? "")
                            )}

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
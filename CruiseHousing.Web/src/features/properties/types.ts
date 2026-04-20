import {GridColDef, type GridRowId} from "@mui/x-data-grid";

export type PropertyRow = {
    id: GridRowId;
    propertyCode: string;
    managementType : string;
    propertyType: string;
    managementCompany: string;
    managementStartDate: string;
    managementEndDate: string;
    managementDate?: string;
    propertyStatus: string;
    ownerName: string;
    processingStatus: string;
    propertyName : string;
    propertyAddress : string;
};

export type ProcessingStatusStateRow = {
  code: string;
  name: string;
  state: string;
};

export type HeaderOption = {
  value: string;
  label: string;
};

export type PropertyDataGridProps = {
  height?: number;
  columns: GridColDef<PropertyRow>[];
  dataSourceOptions?: HeaderOption[];
  onRenameHeader?: (field: string, headerName: string) => void;
  onDeleteHeader?: (field: string) => void;
  onAddHeader?: (
    afterField: string,
    headerName: string,
    dataSource?: string
  ) => void;
  onSave?: () => void;
};

export type PropertyColumnConfig = {
  field: string;
  headerName: string;
  dataSource?: string;
  visible?: boolean;
};

export type PropertyColumnSource = {
  field: string;
  headerName: string;
  visible?: boolean;
};

export const PROPERTY_MASTER_TYPES = [
  "managementType",
  "processingStatus",
  "propertyStatus",
  "propertyType",
] as const;
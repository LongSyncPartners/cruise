import {type GridRowId} from "@mui/x-data-grid";

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
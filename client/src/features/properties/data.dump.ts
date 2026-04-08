import { MANAGEMENT_TYPE_OPTIONS, PROCESSING_STATUS_OPTIONS, PROPERTY_STATUS_OPTIONS, PROPERTY_TYPE_OPTIONS } from "./property";
import { type PropertyRow } from "./types"
import { addDays,format } from 'date-fns';

const today = new Date();

export const paggingdata: PropertyRow[] = Array.from({ length: 400 }, (_, i) => ({
    id: i + 1,
    propertyCode: `C-${(i + 1).toString().padStart(2, "0")}`,
    managementType: MANAGEMENT_TYPE_OPTIONS[i % 2].value,
    propertyType: PROPERTY_TYPE_OPTIONS[i % 3].value,
    managementCompany: `株式会社ウッドストック${i + 1}`,
    managementStartDate: format(addDays(today, i), 'yyyy/MM/dd'),
    managementEndDate: format(addDays(today, i + 30 ), 'yyyy/MM/dd'),
    managementDate: `${format(addDays(today, i), 'yyyy/MM/dd')} ～ ${format(addDays(today, i + 30 ), 'yyyy/MM/dd')}`,
    propertyStatus: PROPERTY_STATUS_OPTIONS[i % 2].value,
    ownerName: `株式会社中部建材センター ${i + 1}`,
    processingStatus: PROCESSING_STATUS_OPTIONS[i % 8].value,
}));
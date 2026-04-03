import { type PropertyRow } from "./types"
import { addDays,format } from 'date-fns';

const today = new Date();

export const paggingdata: PropertyRow[] = Array.from({ length: 400 }, (_, i) => ({
    id: i + 1,
    propertyCode: `P00${i + 1}`,
    managementType:  i % 2 === 0 ? '一般管理' : 'サブリース',
    propertyType: i % 2 === 0 ? 'apartment' : 'mansion',
    managementCompany: `XXXXXXX${i + 1}`,
    managementStartDate: format(addDays(today, i), 'yyyy/MM/dd'),
    managementEndDate: format(addDays(today, i + 30 ), 'yyyy/MM/dd'),
    managementDate: `${format(addDays(today, i), 'yyyy/MM/dd')} ～ ${format(addDays(today, i + 30 ), 'yyyy/MM/dd')}`,
    propertyStatus: i % 2 === 0 ? 'active' : 'closed',
    ownerName: `オーナー ${i + 1}`,
    processingStatus: i % 2 === 0 ? '000' : '999',
}));
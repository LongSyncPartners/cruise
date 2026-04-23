/**
 * Tab summary only
 */
export type PropertyHeaderProps = {
  propertyCode: string;
  roomCode?: string;
  managementType: string;
  propertyType: string;
  managementCompany: string;
  managementPeriod?: string;
  owner?: string;
};

export type PropertyTabSummary = {
  id: string;
  label: string;
  header: PropertyHeaderProps;
};
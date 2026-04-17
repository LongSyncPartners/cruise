export const propertyKeys = {
  all: ["properties"] as const,
  propertyColumnConfigs: ["propertyColumnConfigs"] as const,
  propertyColumnSources: ["propertyColumnSources"] as const,
  processingStatusState: (propertyCode?: string) =>
    [..."processingStatusState", propertyCode ?? ""] as const,
  propertyMasterData: ["propertyMasterData"] as const,
  lists: () => [...propertyKeys.all, "list"] as const,
  detail: (id: string) => [...propertyKeys.all, id] as const,
};
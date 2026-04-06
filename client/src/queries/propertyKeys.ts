export const propertyKeys = {
  all: ["properties"] as const,
  lists: () => [...propertyKeys.all, "list"] as const,
  detail: (id: string) => [...propertyKeys.all, id] as const,
};
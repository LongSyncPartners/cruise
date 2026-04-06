import { apiClient } from "./client";
import { paggingdata } from "@/features/properties/data.dump";

export const fetchProperties = async () => {
  const res = await apiClient.get("/properties");
  return res.data;
};

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPropertiesFromStubApi() {
  await sleep(500);
  return paggingdata;
}
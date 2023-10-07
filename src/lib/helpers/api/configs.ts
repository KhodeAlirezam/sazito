import { AxiosRequestConfig } from "axios";

export const apiConfigs: Record<string, Partial<AxiosRequestConfig>> = {
  getProducts: {
    url: "products",
    method: "GET",
  },
} as const;

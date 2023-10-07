import axios, { AxiosRequestConfig } from "axios";

import { apiConfigs } from "./configs";

//This is a minimal implementation
export const Request = (function (baseURL) {
  const apiHandlers: Record<
    keyof typeof apiConfigs,
    <R>(args: AxiosRequestConfig) => Promise<R>
  > = {};

  Object.keys(apiConfigs).forEach((key) => {
    const axiosInstance = async <R>(args: AxiosRequestConfig) => {
      try {
        const res = await axios
          .create({
            baseURL,
          })
          .request<R>({ ...args, ...apiConfigs[key] });

        if (!res || !res.data) {
          throw new Error("something went wrong");
        }

        return res.data as R;
      } catch (error) {
        throw error;
      }
    };

    apiHandlers[key] = axiosInstance;
  });

  return apiHandlers;
})(process.env.NEXT_PUBLIC_BASE_URL);

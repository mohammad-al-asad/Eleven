import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
  }),
  endpoints: () => ({}),
  tagTypes: ["aboutUs", "scriptures"],
});

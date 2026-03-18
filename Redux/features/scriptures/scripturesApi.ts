import { baseApi } from "../baseApi";

export const scripturesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScriptures: builder.query({
      query: (params) => ({
        url: "scriptures",
        method: "GET",
        params,
      }),
      providesTags: ["scriptures"],
    }),
  }),
});

export const { useGetAllScripturesQuery } = scripturesApi;

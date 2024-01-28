import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSales: builder.mutation({
      query: (createInfo) => ({
        url: '/sales/create-sales',
        method: 'POST',
        body: createInfo,
      }),
      invalidatesTags: ["AllSales"]
    }),
    allSales: builder.query({
      query: () => ({
        url: '/sales',
        method: 'GET',
      }),
      providesTags: ["AllSales"]
    }),
    
  }),
});



export const { useAllSalesQuery, useCreateSalesMutation} = authApi;

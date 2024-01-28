import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGadget: builder.mutation({
      query: (createInfo) => ({
        url: '/products/create-product',
        method: 'POST',
        body: createInfo,
      }),
      invalidatesTags: ["AllGadget"]
    }),
    updateGadget: builder.mutation({
      query: (data) => ({
        url: `/products/update-product/${data.id}`,
        method: 'PUT',
        body: data.updateInfo,
      }),
      invalidatesTags: ["AllGadget"]
    }),
    bulkDelete: builder.mutation({
      query: (ids) => ({
        url: '/products/bulk-delete',
        method: 'PUT',
        body: ids,
      }),
      invalidatesTags: ["AllGadget"]
    }),
    Delete: builder.mutation({
      query: (id) => ({
        url: `/products/delete-product/${id}`,
        method: 'PUT',
        body: id,
      }),
      invalidatesTags: ["AllGadget"]
    }),
    singleProduct: builder.query({
      query: (id) => ({
        url: `/products/single-product/${id}`,
        method: 'GET',
      }),
      providesTags: ["AllGadget"]
    }),
    allGadget: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ["AllGadget"]
    }),
    
  }),
});



export const { useCreateGadgetMutation, useAllGadgetQuery, useBulkDeleteMutation, useDeleteMutation, useUpdateGadgetMutation, useSingleProductQuery} = authApi;

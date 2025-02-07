/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  import { RootState } from '../store';
  import { logout, setUser } from '../features/auth/authSlice';
import { setCart } from '../features/product/productSlice';
import { setmCart } from '../features/product/managerCartSlice';
  
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://gadget-management-server.vercel.app/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
  
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  });
  
  const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
  > = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result?.error?.status === 401) {
      //* Send Refresh
  
      const res = await fetch('https://gadget-management-server.vercel.app/api/v1/auth/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });
  
      const data = await res.json();
  
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        const cart = (api.getState() as RootState).cart;
        const mCart = (api.getState() as RootState).mCart;
  
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );
        api.dispatch(
          setCart({
           cart,
          })
        );
        api.dispatch(
          setmCart({
           mCart,
          })
        );

  
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: ["AllGadget", "AllSales"],
  });


  
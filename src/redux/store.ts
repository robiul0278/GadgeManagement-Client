import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import mCartReducer from "./features/product/managerCartSlice";
import { baseApi } from "./api/baseApi";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth cart mCart",
  storage,
};

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedProductReducer = persistReducer(persistConfig, productReducer);

const persistedRootReducer = persistReducer(
  persistConfig,
  combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    cart: productReducer,
    mCart: mCartReducer,
  })
);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

/* 
const persistedRootReducer = persistReducer(persistConfig, combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  product: productReducer,
}));

export const store = configureStore({
  reducer: persistedRootReducer,
  // ...other configurations
});

*/

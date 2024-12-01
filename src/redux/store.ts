// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import idSlice from "./idSlice";

// Create the store
export const store = configureStore({
  reducer: {
    id: idSlice, // Renamed to match the slice name
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

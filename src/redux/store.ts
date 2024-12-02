// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

// RootState tipini tanımlama
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

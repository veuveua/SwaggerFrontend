// src/redux/expenseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: number;
  buildingName: string;
  address: string;
  adminName: string;
  phoneNumber: string;
  periodicDate: string;
  identification: string;
  color: string;
  monthlyFee: number;
  yearlyFee: number;
  paidFee: number;
  revision: number;
  remainderFee: number;
  expense: number;
  profit: number;
  description: string;
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
  },
});

export const { setExpenses, addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;

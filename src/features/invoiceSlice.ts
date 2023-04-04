import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { InvoiceType } from '../types/dbTypes';
import data from '../db/data.json';

// Define a type for the slice state
interface InitialStateTypes {
  invoices: InvoiceType[];
  isEditing: boolean;
}

// Define the initial state using that type
const initialState: InitialStateTypes = {
  invoices: data,
  isEditing: false,
};

export const invoiceSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setisEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setisEditing } = invoiceSlice.actions;

export default invoiceSlice.reducer;

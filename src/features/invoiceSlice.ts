import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

// Define a type for the slice state
interface InitialStateTypes {
  value: number;
}

// Define the initial state using that type
const initialState: InitialStateTypes = {
  value: 0,
};

export const invoiceSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = invoiceSlice.actions;

export default invoiceSlice.reducer;

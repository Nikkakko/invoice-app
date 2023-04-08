import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { InvoiceType, Item, InputProps } from '../types/dbTypes';
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

    addNewItem: (state, action: PayloadAction<string>) => {
      // find item based on id and add new item
      const id = action.payload;
      const invoice = state.invoices.find(invoice => invoice.id === id);

      const newItem = {
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
      };

      if (invoice) {
        invoice.items.push(newItem);
      }

      return state;
    },

    deleteItem: (
      state,
      action: PayloadAction<{ id: string | undefined; index: number }>
    ) => {
      const { id, index } = action.payload;
      const findInvoice = state.invoices.find(invoice => invoice.id === id);
      if (findInvoice) {
        findInvoice.items.splice(index, 1);
      }
    },

    updateInputs: (
      state,
      action: PayloadAction<{ id: string | undefined; item: InputProps }>
    ) => {
      const { id, item } = action.payload;
      const findInvoice = state.invoices.find(invoice => invoice.id === id);
      const {
        streetAddress,
        fromCity,
        postCode,
        country,
        clientName,
        clientEmail,
        clientStreetAddress,
        clientCity,
        clientPostCode,
        clientCountry,
        invoiceDate,
        paymentDue,
        projectDescription,
        items,
      } = item;

      if (findInvoice) {
        // loop and change
        findInvoice.createdAt = invoiceDate;
        findInvoice.paymentDue = paymentDue;
        findInvoice.description = projectDescription;
        findInvoice.senderAddress.street = streetAddress;
        findInvoice.senderAddress.city = fromCity;
        findInvoice.senderAddress.postCode = postCode;
        findInvoice.senderAddress.country = country;
        findInvoice.clientName = clientName;
        findInvoice.clientEmail = clientEmail;
        findInvoice.clientAddress.street = clientStreetAddress;
        findInvoice.clientAddress.city = clientCity;
        findInvoice.clientAddress.postCode = clientPostCode;
        findInvoice.clientAddress.country = clientCountry;

        // items
        findInvoice.items = findInvoice.items.map((item, index) => {
          return {
            ...item,
            name: items[index].name,
            quantity: items[index].quantity,
            price: items[index].price,
            total: items[index].quantity * items[index].price,
          };
        });
      }
    },
  },
});

export const { setisEditing, addNewItem, updateInputs, deleteItem } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;

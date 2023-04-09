import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { InvoiceType, Item, InputProps } from '../types/dbTypes';
import data from '../db/data.json';
import { addDays, format } from 'date-fns';
import { generateRandomID } from '../helpers/randomId';

// Define a type for the slice state
interface InitialStateTypes {
  invoices: InvoiceType[];
  invoicesFiltered: InvoiceType[];
  isEditing: boolean;
}

// Define the initial state using that type
const initialState: InitialStateTypes = {
  invoices: data,
  invoicesFiltered: data,
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
      const filteredInvoice = state.invoicesFiltered.find(
        invoice => invoice.id === id
      );

      const newItem = {
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
      };

      if (invoice) {
        invoice.items.push(newItem);
        filteredInvoice?.items.push(newItem);
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

    filterItems: (state, action: PayloadAction<{ status: string }>) => {
      const { status } = action.payload;

      // create copy of actual invoice array
      const invoicesCopy = [...state.invoicesFiltered];

      if (status === 'all') {
        state.invoices = invoicesCopy;
      } else {
        const filteredInvoices = state.invoices.filter(
          invoice => invoice.status === status
        );

        state.invoices = filteredInvoices;
      }
    },

    updateInputs: (
      state,
      action: PayloadAction<{ id: string | undefined; item: InputProps }>
    ) => {
      const { id, item } = action.payload;
      const findInvoice = state.invoices.find(invoice => invoice.id === id);
      if (findInvoice?.status === 'draft') {
        // set status to pending
        findInvoice.status = 'pending';
      }

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

        // change filtered invoice

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

    saveInvoice: (state, action: PayloadAction<{ item: InputProps }>) => {
      const { item } = action.payload;

      // Each ID should be 2 random uppercased letters followed by 4 random numbers.
      const randomId = generateRandomID();

      const paymentDueDate = addDays(
        new Date(item?.invoiceDate),
        item?.paymentTerms
      );
      const formattedPaymentDueDate = format(paymentDueDate, 'yyyy-MM-dd');

      const newItem = {
        id: randomId,
        createdAt: item.invoiceDate,
        paymentDue: formattedPaymentDueDate,
        description: item.projectDescription,
        paymentTerms: item.paymentTerms,
        clientName: item.clientName,
        clientEmail: item.clientEmail,
        status: 'pending',
        senderAddress: {
          street: item.streetAddress,
          city: item.fromCity,
          postCode: item.postCode,
          country: item.country,
        },
        clientAddress: {
          street: item.clientStreetAddress,
          city: item.clientCity,
          postCode: item.clientPostCode,
          country: item.clientCountry,
        },
        items: item.items.map((item: Item) => {
          return {
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
          };
        }),
        // map through items and calculate total for each item based on item.quantity * item.price
        total: item.items.reduce(
          (acc: number, item: Item) => acc + item.quantity * item.price, // 0 is the initial value
          0
        ),
      };

      state.invoices.push(newItem);
    },

    saveAsDraft: (state, action: PayloadAction<{ item: InputProps }>) => {
      const { item } = action.payload;

      // Each ID should be 2 random uppercased letters followed by 4 random numbers.
      const randomId = generateRandomID();

      const paymentDueDate = item.invoiceDate
        ? addDays(new Date(item.invoiceDate), item.paymentTerms)
        : null;

      const formattedPaymentDueDate = paymentDueDate
        ? format(paymentDueDate, 'yyyy-MM-dd')
        : null;

      const newItem = {
        id: randomId,
        createdAt: item.invoiceDate || '',
        paymentDue: formattedPaymentDueDate || '',
        description: item.projectDescription || '',
        paymentTerms: item.paymentTerms || 0,
        clientName: item.clientName || '',
        clientEmail: item.clientEmail || '',
        status: 'draft',
        senderAddress: {
          street: item.streetAddress || '',
          city: item.fromCity || '',
          postCode: item.postCode || '',
          country: item.country || '',
        },
        clientAddress: {
          street: item.clientStreetAddress || '',
          city: item.clientCity || '',
          postCode: item.clientPostCode || '',
          country: item.clientCountry || '',
        },
        items: item.items.map((item: Item) => {
          return {
            name: item.name || '',
            quantity: item.quantity || 0,
            price: item.price || 0,
            total: item.quantity * item.price || 0,
          };
        }),
        // map through items and calculate total for each item based on item.quantity * item.price
        total: item.items.reduce(
          (acc: number, item: Item) => acc + item.quantity * item.price, // 0 is the initial value
          0
        ),
      };

      state.invoices.push(newItem);
    },

    updateStatus: (
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) => {
      const { id } = action.payload;
      const findInvoice = state.invoices.find(invoice => invoice.id === id);
      if (findInvoice) {
        // check if status !== paid

        if (findInvoice.status !== 'paid') {
          findInvoice.status = 'paid';
        } else {
          return;
        }
      }
    },
  },
});

export const {
  setisEditing,
  addNewItem,
  updateInputs,
  deleteItem,
  saveInvoice,
  updateStatus,
  saveAsDraft,
  filterItems,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

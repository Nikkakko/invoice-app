import {
  Routes,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Home, InvoiceDetail, InvoiceEdit, NewInvoice } from './pages';
import RootLayout from './layout/RootLayout';
import DetailLayout from './layout/DetailLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='invoice/:id' element={<DetailLayout />}>
        <Route index element={<InvoiceDetail />} />
        <Route path='edit' element={<InvoiceEdit />} />
      </Route>
      <Route path='/' element={<DetailLayout />}>
        <Route path='/invoice/new' element={<InvoiceEdit />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

import styled from 'styled-components';
import { Header, InvoiceCard, Invoices, NoInvoices } from '../components';
import { useAppSelector } from '../app/hooks';

const Home = () => {
  const { invoices } = useAppSelector(state => state.invoice);
  return (
    <InvocieWrapper>
      <Invoices />
      {invoices.map(invoice => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
      {invoices.length === 0 && <NoInvoices />}
    </InvocieWrapper>
  );
};

const InvocieWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;
export default Home;

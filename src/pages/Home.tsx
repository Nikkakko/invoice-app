import styled from 'styled-components';
import { InvoiceCard } from '../components';
import { useAppSelector } from '../app/hooks';

const Home = () => {
  const { invoices } = useAppSelector(state => state.invoice);
  return (
    <InvocieWrapper>
      {invoices.map(invoice => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </InvocieWrapper>
  );
};

const InvocieWrapper = styled.div`
  margin-top: 32px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;
export default Home;

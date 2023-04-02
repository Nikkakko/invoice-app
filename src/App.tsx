import styled from 'styled-components';
import { Header, InvoiceCard, Invoices } from './components';
import { useAppSelector } from './app/hooks';

const App = () => {
  const { invoices } = useAppSelector(state => state.invoice);
  return (
    <Container>
      <Header />
      <Main>
        <Invoices />
        <InvocieWrapper>
          {invoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </InvocieWrapper>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 32px 24px 105px 24px;
`;

const InvocieWrapper = styled.div`
  margin-top: 32px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export default App;

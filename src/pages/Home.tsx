import styled from 'styled-components';
import { Header, InvoiceCard, Invoices, NoInvoices } from '../components';
import { useAppSelector } from '../app/hooks';
import { device } from '../styles/mediaQureis';
import EditSidebar from '../components/Sidebar/EditSidebar';

const Home = () => {
  const { invoices, isEditSidebarOpen } = useAppSelector(
    state => state.invoice
  );
  return (
    <InvocieWrapper>
      <Invoices />
      <Wrapper>
        {invoices.map(invoice => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </Wrapper>
      {invoices.length === 0 && <NoInvoices />}
    </InvocieWrapper>
  );
};

const InvocieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* gap: 16px; */
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 32px;

  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(572px, 1fr));
    margin-top: 55px;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
    margin-top: 64px;
  }
`;

export default Home;

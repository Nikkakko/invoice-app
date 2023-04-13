import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import styled from 'styled-components';

import GoBack from '../components/Buttons/GoBack';
import { BodyTextVariant, SmallHeadingVariant } from '../styles/globalStyles';
import { DetailClient } from '../components';
import DetailFooter from '../components/page/DetailFooter';
import { device } from '../styles/mediaQureis';
import EditSidebar from '../components/Sidebar/EditSidebar';

const InvoiceDetail = () => {
  const { invoices, isEditSidebarOpen } = useAppSelector(
    state => state.invoice
  );
  const { id } = useParams();
  const currentInvoice = invoices.find(invoice => invoice.id === id);

  return (
    <Container>
      {currentInvoice && (
        <>
          <StatusCard>
            <DetailFooter />
            <BodyTextVariant>Status</BodyTextVariant>
            <Status status={currentInvoice.status}>
              <StatusText color={currentInvoice.status}>
                {currentInvoice.status}
              </StatusText>
            </Status>
            <TabletShow />
          </StatusCard>

          <ClientWrapper>
            <DetailClient invoice={currentInvoice} />
          </ClientWrapper>
        </>
      )}
      <TabletHide>
        <DetailFooter />
      </TabletHide>

      {isEditSidebarOpen && <EditSidebar />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    width: 730px;
  }
`;

const StatusCard = styled.div`
  margin-top: 31px;
  background: ${({ theme }) => theme.colors.invoiceCardBG};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;

  padding: 24px 24px 27px 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${device.tablet} {
    justify-content: flex-start;
    gap: 20px;
    position: relative;
    padding: 20px 32px;

    //select the first child component
    & > *:first-child {
      /* margin-right: 20px; */
      position: absolute;
      max-width: fit-content;
      max-height: fit-content;
      left: 20%;
      transform: translate(45%, -40%); //move the element to the center
      background: transparent;
      box-shadow: none;
    }
  }

  @media ${device.laptopL} {
  }
`;

const StatusText = styled(SmallHeadingVariant)<{ color: string }>`
  color: ${({ color }) =>
    color === 'paid' ? '#33D69F' : color === 'pending' ? '#F59E0B' : '#373B53'};
  z-index: 1;

  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: ${({ color }) =>
      color === 'paid'
        ? '#33D69F'
        : color === 'pending'
        ? '#F59E0B'
        : '#373B53'};
  }
`;

const Status = styled.div<{
  status: string;
}>`
  border-radius: 6px;
  padding: 14px 19px 11px 18px;
  position: relative;
  width: 104px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: ${({ status }) =>
      status === 'paid'
        ? '#33D69F'
        : status === 'pending'
        ? '#F59E0B'
        : '#373B53'};
    opacity: 0.06;
  }
`;

const ClientWrapper = styled.div`
  margin-top: 16px;

  @media ${device.tablet} {
    margin-top: 24px;
  }
`;

const TabletHide = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;

const TabletShow = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`;

export default InvoiceDetail;

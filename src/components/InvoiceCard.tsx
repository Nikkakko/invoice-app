import { FC } from 'react';
import { InvoiceType } from '../types/dbTypes';
import styled from 'styled-components';
import {
  BodyTextVariant,
  SmallHeading,
  SmallHeadingVariant,
} from '../styles/globalStyles';

interface InvoiceCardProps {
  invoice: InvoiceType;
}

const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  return (
    <Container>
      <ClientWrapper>
        <SmallHeadingVariant>
          <HashTag>#</HashTag>
          {invoice.id}
        </SmallHeadingVariant>
        <BodyTextVariant>{invoice.clientName}</BodyTextVariant>
      </ClientWrapper>

      <InfoWrapper>
        <DatePaidWrapper>
          <BodyTextVariant>Due {invoice.paymentDue}</BodyTextVariant>
          <SmallHeading>£ {invoice.total}</SmallHeading>
        </DatePaidWrapper>
        <Status status={invoice.status}>
          <StatusText color={invoice.status}>{invoice.status}</StatusText>
        </Status>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.invoiceCardBG};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  padding: 25px 24px 22px 24px;
  width: 100%;
`;

const HashTag = styled.span`
  color: #7e88c3;
`;

const ClientWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const DatePaidWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusText = styled(SmallHeadingVariant)<{ color: string }>`
  color: ${({ color }) =>
    color === 'paid' ? '#33D69F' : color === 'pending' ? '#F59E0B' : '#373B53'};
  z-index: 1;
`;

const Status = styled.div<{
  status: string;
}>`
  border-radius: 6px;
  padding: 14px 30px 11px 30px;
  position: relative;

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

export default InvoiceCard;

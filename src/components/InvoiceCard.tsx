import { FC } from 'react';
import { InvoiceType } from '../types/dbTypes';
import styled from 'styled-components';
import {
  BodyTextVariant,
  SmallHeading,
  SmallHeadingVariant,
} from '../styles/globalStyles';
import { useNavigate } from 'react-router-dom';
import { device } from '../styles/mediaQureis';
import { ArrowRight } from '../svgs';

interface InvoiceCardProps {
  invoice: InvoiceType;
}

const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <ClientWrapper>
        <SmallHeadingVariant>
          <HashTag>#</HashTag>
          {invoice.id}
        </SmallHeadingVariant>
        <TabletHide>
          <BodyTextVariant>Due {invoice.paymentDue}</BodyTextVariant>
        </TabletHide>
        <BodyTextVariant>{invoice.clientName}</BodyTextVariant>
      </ClientWrapper>

      <InfoWrapper>
        <DatePaidWrapper>
          <MobileHide>
            <BodyTextVariant>Due {invoice.paymentDue}</BodyTextVariant>
          </MobileHide>
          <SmallHeading>£ {invoice.total}</SmallHeading>
        </DatePaidWrapper>
        <Status status={invoice.status}>
          <StatusText color={invoice.status}>{invoice.status}</StatusText>
        </Status>
        <TabletHide>
          <ArrowRight />
        </TabletHide>
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

  // first element margin top 16px

  cursor: pointer;

  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 16px 24px;
  }
`;

const HashTag = styled.span`
  color: #7e88c3;
`;

const ClientWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${device.tablet} {
    align-items: center;
    // first chaild margin-left 28px  second child margin-left 51px
    & > *:nth-child(2) {
      margin-left: 28px;
    }

    & > *:nth-child(3) {
      margin-left: 51px;
    }
  }
`;

const InfoWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;

  @media ${device.tablet} {
    align-items: center;

    margin-left: 82px;
    margin-top: 0;

    & > *:nth-child(1) {
    }

    & > *:nth-child(2) {
      margin-left: 40px;
    }

    & > *:nth-child(3) {
      margin-left: 20px;
    }
  }
`;

const DatePaidWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    align-items: center;
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

  @media ${device.tablet} {
  }
`;

const TabletHide = styled.div`
  display: none;

  @media ${device.tablet} {
    display: block;
  }
`;

const MobileHide = styled.div`
  display: block;

  @media ${device.tablet} {
    display: none;
  }
`;

export default InvoiceCard;

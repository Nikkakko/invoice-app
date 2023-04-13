import { FC } from 'react';
import { InvoiceType } from '../../types/dbTypes';
import styled from 'styled-components';
import {
  BodyTextVariant,
  SmallHeadingVariant,
} from '../../styles/globalStyles';
import { formatDate } from '../../helpers/formatDate';
import TotalCard from './TotalCard';
import { device } from '../../styles/mediaQureis';

interface DetailClientProps {
  invoice: InvoiceType;
}

const DetailClient: FC<DetailClientProps> = ({ invoice }) => {
  const { clientAddress, senderAddress } = invoice;
  const { street, city, postCode, country } = clientAddress;
  const {
    street: senderStreet,
    city: senderCity,
    postCode: senderPostCode,
    country: senderCountry,
  } = senderAddress;

  const formatedDate = formatDate(invoice.createdAt, 'DD MMM YYYY');
  const formatedDueDate = formatDate(invoice.paymentDue, 'DD MMM YYYY');

  return (
    <ClientWrapper>
      <PersonalInfo>
        <ClientInfo>
          <SmallHeadingVariant>
            <Hashtag>#</Hashtag>
            {invoice.id}
          </SmallHeadingVariant>
          <BodyTextVariant>{invoice.description}</BodyTextVariant>
        </ClientInfo>
        <SenderWrapper>
          <SenderText>{senderStreet}</SenderText>
          <SenderText>{senderCity}</SenderText>
          <SenderText>{senderPostCode}</SenderText>
          <SenderText>{senderCountry}</SenderText>
        </SenderWrapper>
      </PersonalInfo>

      <TabletWrapper>
        <InvoiceWrapper>
          <InvoiceDate>
            <Date>
              <BodyTextVariant>Invoice Date</BodyTextVariant>
              <SmallHeadingVariant>{formatedDate}</SmallHeadingVariant>
            </Date>
            <Due>
              <BodyTextVariant>Payment Due</BodyTextVariant>
              <SmallHeadingVariant>{formatedDueDate}</SmallHeadingVariant>
            </Due>
          </InvoiceDate>
          <BillTo>
            <Bill>
              <BodyTextVariant>Bill To</BodyTextVariant>
              <SmallHeadingVariant>{invoice.clientName}</SmallHeadingVariant>
            </Bill>
            <BillAddress>
              <ClientText>{street}</ClientText>
              <ClientText>{city}</ClientText>
              <ClientText>{postCode}</ClientText>
              <ClientText>{country}</ClientText>
            </BillAddress>
          </BillTo>
        </InvoiceWrapper>
        <SentTo>
          <BodyTextVariant>Sent to</BodyTextVariant>
          <SentText>{invoice.clientEmail}</SentText>
        </SentTo>
      </TabletWrapper>

      <TotalCard invoice={invoice.items} />
    </ClientWrapper>
  );
};

const ClientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.invoiceCardBG};

  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;

  padding: 25px 24px;

  @media ${device.tablet} {
    padding: 33px 32px;
  }

  @media ${device.laptopL} {
    padding: 49px 48px;
  }
`;

const Hashtag = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media ${device.tablet} {
    gap: 7px;
  }
`;

const SenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SenderText = styled(BodyTextVariant)`
  line-height: 18px;
`;

const InvoiceWrapper = styled.div`
  display: flex;
  margin-top: 31px;
  gap: 61px;

  @media ${device.tablet} {
    gap: 119px;
    margin-top: 0;
  }
`;

const TabletWrapper = styled.div`
  @media ${device.tablet} {
    display: flex;
    align-items: flex-start;
    margin-top: 21px;
  }

  @media ${device.laptopL} {
    /* margin-top: 0px; */
  }
`;

const InvoiceDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
`;

const Date = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const Due = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const BillTo = styled.div``;

const Bill = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const BillAddress = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;

const ClientText = styled(BodyTextVariant)`
  line-height: 18px;
`;

const SentTo = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  gap: 13px;

  @media ${device.tablet} {
    margin-top: 0;
    margin-left: 117px;
  }
`;

const SentText = styled(SmallHeadingVariant)`
  line-height: 20px;
  text-transform: lowercase;
`;

export default DetailClient;

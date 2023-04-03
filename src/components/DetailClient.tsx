import { FC } from 'react';
import { InvoiceType } from '../types/dbTypes';
import styled from 'styled-components';
import { BodyTextVariant, SmallHeadingVariant } from '../styles/globalStyles';

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

  console.log(invoice);

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
`;

const Hashtag = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ClientInfo = styled.div``;

const SenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SenderText = styled(BodyTextVariant)`
  line-height: 18px;
`;

export default DetailClient;

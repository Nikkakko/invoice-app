import { FC } from 'react';
import { InvoiceType } from '../types/dbTypes';
import styled from 'styled-components';

interface InvoiceCardProps {
  invoice: InvoiceType;
}

const InvoiceCard: FC<InvoiceCardProps> = ({ invoice }) => {
  return <Container>InvoiceCard</Container>;
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.invoiceCardBG};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
`;

export default InvoiceCard;

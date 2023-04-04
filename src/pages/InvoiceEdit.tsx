import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { SmallHeadingVariant } from '../styles/globalStyles';
import InputeField from '../components/InputeField';
import { useForm } from 'react-hook-form';

interface InvoiceEditProps {}

const InvoiceEdit: FC<InvoiceEditProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const { invoices } = useAppSelector(state => state.invoice);
  const currentInvoice = invoices.find(item => item.id === id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Container>
      <TitleWrapper>
        <Title>
          Edit <HashTag>#</HashTag>
          {currentInvoice?.id}
        </Title>
      </TitleWrapper>
      <BillForm>
        <SubTitle>Bill Form</SubTitle>
        <InputeField label='Street Address' name='streetAddress' />
      </BillForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
`;

const TitleWrapper = styled.div``;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  /* identical to box height, or 133% */

  letter-spacing: -0.5px;

  /* 08 */

  color: ${({ theme }) => theme.colors.primary};
`;

const SubTitle = styled(SmallHeadingVariant)`
  color: #7c5dfa;
  margin-bottom: 24px;
`;

const HashTag = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const BillForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
`;
export default InvoiceEdit;

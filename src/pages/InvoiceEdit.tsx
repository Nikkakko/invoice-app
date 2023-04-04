import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { SmallHeadingVariant } from '../styles/globalStyles';
import InputeField from '../components/InputeField';
import { useForm, useFieldArray } from 'react-hook-form';
import { IconDelete } from '../assets';

interface InvoiceEditProps {}
type InputProps = {};

const InvoiceEdit: FC<InvoiceEditProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const { invoices } = useAppSelector(state => state.invoice);
  const currentInvoice = invoices.find(item => item.id === id);
  const { fields, append, remove } = useFieldArray({
    name: 'items',
  });
  const { street, city, postCode, country } =
    currentInvoice?.senderAddress || {};
  const {
    street: clientStreet,
    city: clientCity,
    postCode: clientPostCode,
    country: clientCountry,
  } = currentInvoice?.clientAddress || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress: street,
      fromCity: city,
      postCode,
      country,
      clientName: currentInvoice?.clientName,
      clientEmail: currentInvoice?.clientEmail,
      clientStreet: clientStreet,
      clientCity: clientCity,
      clientPostCode: clientPostCode,
      clientCountry: clientCountry,
      invoiceDate: currentInvoice?.createdAt,
      paymentTerms: currentInvoice?.paymentTerms,
      projectDescription: currentInvoice?.description,
    },
  });

  console.log(currentInvoice);

  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    // set the default values of the form to the current invoice
  }, [currentInvoice]);

  return (
    <Container>
      <TitleWrapper>
        <Title>
          Edit <HashTag>#</HashTag>
          {currentInvoice?.id}
        </Title>
      </TitleWrapper>
      <BillForm>
        <SubTitle>Bill From</SubTitle>
        <InputeField
          {...register('streetAddress', { required: true })}
          label='Street Address'
          name='streetAddress'
        />
        <CityCode>
          <InputeField
            {...register('fromCity', { required: true })}
            label='City'
            name='fromCity'
          />
          <InputeField
            {...register('postCode', { required: true })}
            label='Post Code'
            name='postCode'
          />
        </CityCode>
        <CountryCode>
          <InputeField
            {...register('country', { required: true })}
            label='Country'
            name='country'
          />
        </CountryCode>
      </BillForm>
      <BillTo>
        <SubTitle>Bill To</SubTitle>
        <InputeField
          {...register('clientName', { required: true })}
          label='Client Name'
          name='clientName'
        />
        <InputeField
          {...register('clientEmail', { required: true })}
          label='Client Email'
          name='clientEmail'
        />
        <InputeField
          {...register('clientStreet', { required: true })}
          label='Street Address'
          name='streetAddress'
        />
        <CityCode>
          <InputeField
            {...register('clientCity', { required: true })}
            label='City'
            name='toCity'
          />
          <InputeField
            {...register('clientPostCode', { required: true })}
            label='Post Code'
            name='postCode'
          />
        </CityCode>
        <CountryCode>
          <InputeField
            {...register('clientCountry', { required: true })}
            label='Country'
            name='country'
          />
        </CountryCode>
        <InputeField
          {...register('invoiceDate', { required: true })}
          label='Invoice Date'
          name='invoiceDate'
        />
        <InputeField
          {...register('paymentTerms', { required: true })}
          label='Payment Terms'
          name='paymentTerms'
        />
        <InputeField
          {...register('projectDescription', { required: true })}
          label='Project Description'
          name='projectDescription'
        />
      </BillTo>

      <ItemList>
        <ListTitle>Item List</ListTitle>
        {currentInvoice?.items.map((item, idx) => (
          <Item key={idx}>
            <InputeField
              // set the default value of the input to the current invoice

              label='Item Name'
              name='itemName'
            />
            <ItemWrapper>
              <InputeField
                // set the default value of the input to the current invoice

                label='Quantity'
                name='quantity'
                padding='18px 39px 15px 20px'
                width='64px'
              />
              <InputeField
                label='Price'
                name='price'
                padding='18px 37px 15px 20px'
                width='100px'
              />
              <InputeField label='Total' name='total' />
              <DeleteImg src={IconDelete} alt='' />
            </ItemWrapper>
          </Item>
        ))}
      </ItemList>
      <AddneItem>
        <AddneItemBtn>Add New Item</AddneItemBtn>
      </AddneItem>
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
  /* width: 100%; */
`;

const ListTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  /* identical to box height, or 178% */

  letter-spacing: -0.375px;

  color: #777f98;
`;

const HashTag = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const BillForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
`;

const CityCode = styled.div`
  display: flex;
  gap: 23px;
  margin-top: 25px;
`;

const CountryCode = styled.div`
  margin-top: 25px;
`;

const BillTo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 41px;

  // margin top 25px not for first of type element
  & > *:not(:first-of-type) {
    margin-top: 25px;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 69px;
`;

const Item = styled.div`
  margin-top: 33px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 16px;
  margin-top: 25px;
`;

const AddneItem = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;

const AddneItemBtn = styled.button`
  width: 100%;
  background: #f9fafe;
  border-radius: 24px;
  border: none;

  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */

  text-align: center;
  letter-spacing: -0.25px;

  /* 07 */

  color: #7e88c3;
`;

const DeleteImg = styled.img``;
export default InvoiceEdit;

import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { SmallHeadingVariant } from '../styles/globalStyles';
import InputeField from '../components/InputeField';
import {
  useForm,
  useFieldArray,
  Controller,
  useWatch,
  Control,
} from 'react-hook-form';
import { IconDelete, IconPlus } from '../assets';
import { addNewItem, updateInputs } from '../features/invoiceSlice';
import { InputProps } from '../types/dbTypes';

interface InvoiceEditProps {}

const InvoiceEdit: FC<InvoiceEditProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { invoices } = useAppSelector(state => state.invoice);
  const currentInvoice = invoices.find(item => item.id === id);

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
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      streetAddress: street,
      fromCity: city,
      postCode: postCode,
      country: country,
      clientName: currentInvoice?.clientName,
      clientEmail: currentInvoice?.clientEmail,
      clientStreetAddress: clientStreet,
      clientCity: clientCity,
      clientPostCode: clientPostCode,
      clientCountry: clientCountry,
      invoiceDate: currentInvoice?.createdAt,
      paymentDue: currentInvoice?.paymentDue,
      projectDescription: currentInvoice?.description,
      paymentTerms: currentInvoice?.paymentTerms,

      items: currentInvoice?.items,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: InputProps) => {
    // dispatch(updateInputs({ id, item: data }));

    console.log(data);
  };

  useEffect(() => {}, []);

  const handleAddItem = (id: string) => {
    dispatch(addNewItem(id));

    append({ name: '', quantity: 0, price: 0, total: 0 });
  };

  console.log(currentInvoice?.items, 'items from redux');

  const handleUpdateInput = () => {
    const data = getValues();

    dispatch(updateInputs({ id, item: data }));
  };

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
            name='fromCountry'
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
          {...register('clientStreetAddress', { required: true })}
          label='Street Address'
          name='clientStreetAddress'
        />
        <CityCode>
          <InputeField
            {...register('clientCity', { required: true })}
            label='City'
            name='clientCity'
          />
          <InputeField
            {...register('clientPostCode', { required: true })}
            label='Post Code'
            name='clientPostCode'
          />
        </CityCode>
        <CountryCode>
          <InputeField
            {...register('clientCountry', { required: true })}
            label='Country'
            name='clientCountry'
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
          name='paymentDue'
        />
        <InputeField
          {...register('projectDescription', { required: true })}
          label='Project Description'
          name='projectDescription'
        />
      </BillTo>

      <ItemList>
        <ListTitle>Item List</ListTitle>
        <Item>
          {fields?.map((item, index) => (
            <ItemWrapper key={index}>
              <InputeField
                {...register(`items.${index}.name`, { required: true })}
                label='Item Name'
                name={`items.${index}.name`}
              />

              <InputeField
                {...register(`items.${index}.quantity`, {
                  required: true,
                  valueAsNumber: true,
                })}
                label='Quantity'
                name={`items.${index}.quantity`}
                type='number'
              />

              <InputeField
                {...register(`items.${index}.price`, {
                  required: true,
                  valueAsNumber: true,
                })}
                label='Price'
                name={`items.${index}.price`}
                type='number'
              />

              <PriceBox>
                <TotalValue>Total</TotalValue>
                <TotalPrice>
                  {
                    // check if is Nan
                    isNaN(
                      watch(`items.${index}.price`) *
                        watch(`items.${index}.quantity`)
                    )
                      ? 0
                      : watch(`items.${index}.price`) *
                        watch(`items.${index}.quantity`)
                  }
                </TotalPrice>
              </PriceBox>
            </ItemWrapper>
          ))}
        </Item>
      </ItemList>
      <AddneItem>
        <AddneItemBtn onClick={() => handleAddItem(currentInvoice?.id || '')}>
          <img src={IconPlus} alt='' />
          Add New Item
        </AddneItemBtn>
        <button onClick={handleUpdateInput}>save changes</button>
      </AddneItem>
      <GrayContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-left: 0;
`;

const TotalValue = styled(SmallHeadingVariant)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 0px 15px 0px;
`;
const TotalText = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height, or 115% */

  letter-spacing: -0.1px;

  /* 07 */

  color: ${({ theme }) => theme.colors.paragraph};
`;

const GrayContainer = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0001) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );

  width: 100%;
  height: 64px;
  position: absolute;
  bottom: 50px;
  left: 0;
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
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 25px;

  // select img and align it to flex end
  & > *:last-child {
    align-self: flex-end;
    margin-bottom: 16px;
  }
`;

const AddneItem = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const AddneItemBtn = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.bannerBG};
  border-radius: 24px;
  border: none;

  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */

  text-align: center;
  letter-spacing: -0.25px;
  padding: 18px 107px 15px 107px;

  /* 07 */

  cursor: pointer;
  color: #7e88c3;

  img {
    margin-right: 2px;
  }
`;

const DeleteImg = styled.img`
  cursor: pointer;
`;
export default InvoiceEdit;

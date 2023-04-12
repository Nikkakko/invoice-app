import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { SmallHeadingVariant } from '../styles/globalStyles';
import InputeField from '../components/InputeField';
import {
  useForm,
  useFieldArray,
  UseFormWatch,
  Controller,
} from 'react-hook-form';
import { IconPlus } from '../assets';
import {
  addNewItem,
  deleteInvoice,
  deleteItem,
  saveAsDraft,
  saveInvoice,
  setisEditing,
  updateInputs,
} from '../features/invoiceSlice';
import { InputProps } from '../types/dbTypes';
import DeleteIcon from '../svgs/DeleteIcon';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import ArrowDown from '../svgs/ArrowDown';
import DetailFooter from '../components/page/DetailFooter';
import { SelectField } from '../components';
import { device } from '../styles/mediaQureis';

interface InvoiceEditProps {
  isSidebar?: boolean | undefined;
  newInvoice?: boolean | undefined;
}

const InvoiceEdit: FC<InvoiceEditProps> = ({ isSidebar, newInvoice }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { invoices, isEditing } = useAppSelector(state => state.invoice);
  const [itemError, setItemError] = useState<boolean>(false);
  const currentInvoice = invoices.find(item => item.id === id);
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[2];
  const navigate = useNavigate();

  //get current path

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
    if (isEditing) {
      handleUpdateInput();
    } else {
      handleSaveInvoice();
    }
  };

  const calculateTotal = (index: number, watch: UseFormWatch<InputProps>) => {
    const price = watch(`items.${index}.price`);
    const quantity = watch(`items.${index}.quantity`);
    const total = price * quantity;

    if (isNaN(price * quantity)) {
      return 0;
    } else {
      return total.toFixed(2);
    }
  };

  const handleAddItem = (id: string) => {
    dispatch(addNewItem(id));
    append({ name: '', quantity: 0, price: 0, total: 0 });
  };

  const handleDeleteItem = (id: string, index: number) => {
    dispatch(deleteItem({ id, index }));
    remove(index);
  };

  function handleUpdateInput() {
    const data = getValues();
    dispatch(updateInputs({ id, item: data }));
  }

  function handleSaveInvoice() {
    const data = getValues();
    dispatch(saveInvoice({ item: data }));
    navigate('/');
  }

  useEffect(() => {
    if (currentLocation !== 'new' && !newInvoice) {
      dispatch(setisEditing(true));
    }
  }, []);

  function handleDraft() {
    const data = getValues();
    dispatch(saveAsDraft({ item: data }));
  }

  return (
    <Container isSidebar={isSidebar}>
      <TitleWrapper>
        <Title>
          {isEditing ? `Edit #${currentInvoice?.id}` : 'New Invoice'}
        </Title>
      </TitleWrapper>
      <BillForm>
        <SubTitle>Bill From</SubTitle>
        <InputeField
          {...register('streetAddress', {
            required: "can't be empty",
          })}
          label='Street Address'
          name='streetAddress'
          error={errors.streetAddress?.message}
        />
        <CityCode>
          <InputeField
            {...register('fromCity', { required: "can't be empty" })}
            label='City'
            name='fromCity'
            error={errors.fromCity?.message}
          />
          <InputeField
            {...register('postCode', { required: "can't be empty" })}
            label='Post Code'
            name='postCode'
            error={errors.postCode?.message}
          />
        </CityCode>
        <CountryCode>
          <InputeField
            {...register('country', { required: "can't be empty" })}
            label='Country'
            name='country'
            error={errors.country?.message}
          />
        </CountryCode>
      </BillForm>
      <BillTo>
        <SubTitle>Bill To</SubTitle>
        <InputeField
          {...register('clientName', { required: "can't be empty" })}
          label='Client Name'
          name='clientName'
          error={errors.clientName?.message}
        />
        <InputeField
          {...register('clientEmail', { required: "can't be empty" })}
          label='Client Email'
          name='clientEmail'
          error={errors.clientEmail?.message}
        />
        <InputeField
          {...register('clientStreetAddress', { required: "can't be empty" })}
          label='Street Address'
          name='clientStreetAddress'
          error={errors.clientStreetAddress?.message}
        />
        <CityCode>
          <InputeField
            {...register('clientCity', { required: "can't be empty" })}
            label='City'
            name='clientCity'
            error={errors.clientCity?.message}
          />
          <InputeField
            {...register('clientPostCode', { required: "can't be empty" })}
            label='Post Code'
            name='clientPostCode'
            error={errors.clientPostCode?.message}
          />
        </CityCode>
        <CountryCode>
          <InputeField
            {...register('clientCountry', { required: "can't be empty" })}
            label='Country'
            name='clientCountry'
            error={errors.clientCountry?.message}
          />
        </CountryCode>

        <InputeField
          {...register('invoiceDate', {
            required: "can't be empty",
          })}
          label='Invoice Date'
          name='invoiceDate'
          error={errors.invoiceDate?.message}
          type='date'
        />

        <SelectGroup>
          <SelectLabel error={!!errors.paymentTerms?.message}>
            Payment Terms
            {errors.paymentTerms?.message && (
              <Error>{errors.paymentTerms?.message}</Error>
            )}
          </SelectLabel>
          <Select
            {...register('paymentTerms', {
              required: "can't be empty",
              valueAsNumber: true,
            })}
            name='paymentTerms'
            defaultValue={currentInvoice?.paymentTerms}
            //make error boolean
            error={!!errors.paymentTerms?.message}
          >
            <Option value={currentInvoice?.paymentTerms || ''}>
              Net {currentInvoice?.paymentTerms} Days
            </Option>
            <Option value='1'>Net 1 Day</Option>
            <Option value='7'>Net 7 Day</Option>
            <Option value='14'>Net 14 Day</Option>
            <Option value='30'>Net 30 Day</Option>
          </Select>

          <ArrowDown />
        </SelectGroup>

        <InputeField
          {...register('projectDescription', { required: "can't be empty" })}
          label='Project Description'
          name='projectDescription'
          error={errors.projectDescription?.message}
        />
      </BillTo>
      <ItemList>
        <ListTitle>Item List</ListTitle>
        {fields?.map((item, index) => (
          <Item key={index}>
            <InputeField
              {...register(`items.${index}.name`, {
                required: "can't be empty",
              })}
              label='Item Name'
              name={`items.${index}.name`}
              error={errors.items?.[index]?.name?.message}
            />

            <ItemWrapper>
              <InputeField
                {...register(`items.${index}.quantity`, {
                  required: "can't be empty",
                  valueAsNumber: true,
                })}
                label='Qty.'
                name={`items.${index}.quantity`}
                type='number'
                width='64px'
                error={errors.items?.[index]?.quantity?.message}
              />

              <InputeField
                {...register(`items.${index}.price`, {
                  required: "can't be empty",
                  valueAsNumber: true,
                })}
                label='Price'
                name={`items.${index}.price`}
                type='number'
                width='100px'
                error={errors.items?.[index]?.price?.message}
              />

              <InputeField
                {...register(`items.${index}.total`, {
                  required: true,
                  valueAsNumber: true,
                })}
                label='Total'
                name={`items.${index}.total`}
                type='number'
                value={calculateTotal(index, watch)}
                disabled
                width='100px'
                error={errors.items?.[index]?.total?.message}
              />
              <DeleteIcon
                onClick={() =>
                  handleDeleteItem(currentInvoice?.id || '', index)
                }
              />
            </ItemWrapper>
          </Item>
        ))}
      </ItemList>
      <AddneItem>
        <AddneItemBtn onClick={() => handleAddItem(currentInvoice?.id || '')}>
          <img src={IconPlus} alt='' />
          Add New Item
        </AddneItemBtn>
      </AddneItem>
      {/* <GrayContainer /> */}

      {itemError && fields.length === 0 && (
        <Error style={{ position: 'absolute', bottom: '100px' }}>
          Please add at least one item
        </Error>
      )}
      <DetailFooter
        onSubmit={handleSubmit(onSubmit)}
        handleDraft={handleDraft}
        isSidebar={isSidebar}
        newInvoice={newInvoice}
      />
    </Container>
  );
};

const Container = styled.div<{
  isSidebar: boolean | undefined;
}>`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  /* padding: 0 32px; */

  position: ${({ isSidebar }) => (isSidebar ? 'relative' : 'none')};

  //device
  @media ${device.tablet} {
    margin-top: 0;
    // make scrollable through the container
  }
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
2;

const Item = styled.div`
  margin-top: 33px;
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  //gap not last child
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

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  width: 100%;
  position: relative;

  svg {
    position: absolute;
    right: 16px;
    top: 60%;
  }
`;

const SelectLabel = styled.label<{
  error?: boolean;
}>`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height, or 115% */

  letter-spacing: -0.1px;

  /* 07 */

  color: ${({ theme, error }) => (error ? '#ec5757' : theme.colors.paragraph)};

  display: flex;
  justify-content: space-between;
`;

const Select = styled.select<{
  name: string;
  error?: boolean;
}>`
  width: 100%;
  padding: 16px;

  border: ${({ name, theme, error }) =>
    name === 'total'
      ? 'none'
      : error
      ? `1px solid #ec5757`
      : `1px solid ${theme.colors.inputBorder}`};

  //remove arrow
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 4px;

  &:focus {
    outline: none;
  }

  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */

  letter-spacing: -0.25px;

  /* 08 */

  color: ${({ theme }) => theme.colors.primary};

  background: ${({ theme }) => theme.colors.inputBG} !important;
`;

const Error = styled.span`
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height, or 150% */

  letter-spacing: -0.208333px;

  /* 08 */

  color: #ec5757;
`;

const Option = styled.option``;

export default InvoiceEdit;

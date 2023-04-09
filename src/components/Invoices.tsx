import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  BodyTextVariant,
  MediumHeading,
  SmallHeadingVariant,
} from '../styles/globalStyles';
import ArrowDown from '../svgs/ArrowDown';
import Button from './Buttons/Button';
import { IconCheck, IconPlus } from '../assets';
import { useNavigate } from 'react-router-dom';
import { filterItems } from '../features/invoiceSlice';

interface InvoicesProps {}

const Invoices: FC<InvoicesProps> = ({}) => {
  const { invoices } = useAppSelector(state => state.invoice);
  const [status, setStatus] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const statusOptions = [
    { name: 'Draft', value: 'draft' },
    { name: 'Pending', value: 'pending' },
    { name: 'Paid', value: 'paid' },
  ];

  const handleNewInvoice = () => {
    navigate('/invoice/new');
  };

  const handleStatusChange = (value: string) => {
    if (status === value) {
      setStatus(null);
      setChecked(false);
      dispatch(filterItems({ status: 'all' }));
    } else {
      setStatus(value);
      dispatch(filterItems({ status: value }));
    }
  };

  return (
    <Container>
      <InvoicesWrapper>
        <MediumHeading>Invoices</MediumHeading>
        <BodyTextVariant>{invoices.length} Invoices</BodyTextVariant>
      </InvoicesWrapper>

      <RightWrapper>
        <FilterWrapper>
          <SmallHeadingVariant onClick={() => setIsFilterOpen(prev => !prev)}>
            Filter
          </SmallHeadingVariant>
          <ArrowDown />
        </FilterWrapper>

        <Button
          title='New'
          onClick={handleNewInvoice}
          icon={IconPlus}
          bg='#7C5DFA'
          color='#fff'
          radius='24px'
        />
      </RightWrapper>

      {isFilterOpen && (
        <CheckboxContainer>
          {statusOptions.map(option => (
            <CheckboxWrapper key={option.value}>
              <CheckboxInput
                id={option.value}
                name={option.name}
                value={option.value}
                checked={checked || status === option.value}
                onChange={() => handleStatusChange(option.value)}
              />
              <CheckboxLabel htmlFor={option.value}>
                {option.name}
              </CheckboxLabel>
            </CheckboxWrapper>
          ))}
        </CheckboxContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18.54px;
`;

const InvoicesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 100;

  background: ${({ theme }) => theme.colors.inputBG};
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
  border-radius: 8px;
  padding: 24px 88px 24px 24px;
  gap: 15px;

  position: absolute;
  left: 50px;
  top: 80px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 13px;
`;

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;

  //change the color of the checkbox
  -webkit-appearance: none;
  appearance: none;
  /* creating a custom design */
  width: 20px;
  height: 20px;
  border-radius: 2px;

  outline: none;
  cursor: pointer;

  background: #dfe3fa;

  &:hover {
    border: 2px solid #7c5dfa;
  }

  &:checked {
    background: #7c5dfa;

    // creating a checkmark
    background-image: url(${IconCheck});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CheckboxLabel = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */

  letter-spacing: -0.25px;

  /* 08 */

  color: ${({ theme }) => theme.colors.primary};
`;

export default Invoices;

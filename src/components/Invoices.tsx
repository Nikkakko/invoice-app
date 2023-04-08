import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  BodyTextVariant,
  MediumHeading,
  SmallHeadingVariant,
} from '../styles/globalStyles';
import ArrowDown from '../svgs/ArrowDown';
import Button from './Buttons/Button';
import { IconPlus } from '../assets';
import { useNavigate } from 'react-router-dom';

interface InvoicesProps {}

const Invoices: FC<InvoicesProps> = ({}) => {
  const { invoices } = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNewInvoice = () => {
    navigate('/invoice/new');
  };

  return (
    <Container>
      <InvoicesWrapper>
        <MediumHeading>Invoices</MediumHeading>
        <BodyTextVariant>{invoices.length} Invoices</BodyTextVariant>
      </InvoicesWrapper>

      <RightWrapper>
        <FilterWrapper>
          <SmallHeadingVariant>Filter</SmallHeadingVariant>
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

export default Invoices;

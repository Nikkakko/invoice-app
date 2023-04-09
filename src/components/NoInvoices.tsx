import { FC } from 'react';
import { EmptyIllustration } from '../assets';
import styled from 'styled-components';
import { BodyTextVariant, MediumHeading } from '../styles/globalStyles';

interface NoInvoicesProps {}

const NoInvoices: FC<NoInvoicesProps> = ({}) => {
  return (
    <Container>
      <img src={EmptyIllustration} alt='empty illustration' />

      <Wrapper>
        <MediumHeading>There is nothing here</MediumHeading>
        <BodyTextVariant>
          Create an invoice by clicking the <strong>New</strong> button and get
          started
        </BodyTextVariant>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 102px;

  img {
    width: 193px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 23px;
  margin-top: 42px;
  text-align: center;

  p {
    max-width: 200px;
  }
`;

export default NoInvoices;

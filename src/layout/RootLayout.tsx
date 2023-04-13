import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components';
import { device } from '../styles/mediaQureis';

const RootLayout = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: ${({ theme }) => theme.colors.white}; */

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    display: flex;
    flex-direction: row;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 32px 24px 105px 24px;
  /* background: ${({ theme }) => theme.colors.editBG}; */
  position: relative;

  @media ${device.tablet} {
    padding: 61px 48px 173px 48px;
  }

  @media ${device.laptopL} {
    /* padding: 77px 355px 0 252px; */
    align-items: center;
    width: 100%;
  }
`;

export default RootLayout;

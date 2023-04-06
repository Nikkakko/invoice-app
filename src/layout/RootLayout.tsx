import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components';

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
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 32px 24px 105px 24px;
  background: ${({ theme }) => theme.colors.editBG};

  position: relative;
`;

export default RootLayout;

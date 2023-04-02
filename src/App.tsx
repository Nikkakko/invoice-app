import styled from 'styled-components';
import { Header } from './components';

const App = () => {
  return (
    <Container>
      <Header />

      <Main></Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 32px 24px 105px 24px;
`;

export default App;

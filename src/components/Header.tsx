import { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Logo } from '../assets';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleTheme } from '../features/themeSlice';
import { MoonIcon, SunIcon } from '../svgs';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <LogoWrapper>
        <LogoImage src={Logo} alt='Logo' />
      </LogoWrapper>

      <ToggleThemeButton>
        {isDarkMode ? (
          <SunIcon onClick={() => dispatch(toggleTheme())} />
        ) : (
          <MoonIcon onClick={() => dispatch(toggleTheme())} />
        )}

        <Line />
        <UserMenu>
          <AvatarImage src={Avatar} alt='Avatar' />
        </UserMenu>
      </ToggleThemeButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 72px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.headerBG};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  background: #7c5dfa;
  border-radius: 0px 20px 20px 0px;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 72px;
    height: 72px;
    background: #9277ff;
    border-radius: 0px 20px 20px 0px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    left: 0;
    top: 36.35px;
  }
`;

const LogoImage = styled.img`
  z-index: 1;
`;

const ToggleThemeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  gap: 24px;

  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 0 24px; */
`;

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Line = styled.div`
  width: 1px;
  height: 72px;
  background: #494e6e;
`;

export default Header;

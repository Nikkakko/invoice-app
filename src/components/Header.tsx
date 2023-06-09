import { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Logo } from '../assets';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleTheme } from '../features/themeSlice';
import { MoonIcon, SunIcon } from '../svgs';
import { device } from '../styles/mediaQureis';

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

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    height: 100%;
    position: fixed;
    width: 103px;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
  }
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

    @media ${device.laptopL} {
      width: 103px;
      height: 52px;
      top: 51.5px;
      border-radius: 0px 20px 0px 20px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }
  }

  @media ${device.laptopL} {
    width: 103px;
    height: 103px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const LogoImage = styled.img`
  z-index: 1;

  // make unselectable
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */

  user-select: none;
`;

const ToggleThemeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  gap: 24px;

  transition: all 0.3s ease-in-out;

  svg {
    cursor: pointer;
  }

  @media ${device.laptopL} {
    flex-direction: column;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 0 24px; */

  @media ${device.laptopL} {
    padding: 24px 0;
  }
`;

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  @media ${device.laptopL} {
    width: 40px;
    height: 40px;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 72px;
  background: #494e6e;

  @media ${device.laptopL} {
    width: 103px;
    height: 1px;
  }
`;

export default Header;

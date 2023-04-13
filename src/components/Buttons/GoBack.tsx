import { FC } from 'react';
import styled from 'styled-components';
import { SmallHeadingVariant } from '../../styles/globalStyles';

interface GoBackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: string;
  bg?: string;
  color?: string;
  radius?: string;
  onClick?: () => void;
}

const GoBack: FC<GoBackProps> = ({ title, icon, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <IconWrapper>
        <IconImg src={icon} alt='icon' />
      </IconWrapper>
      <SmallHeadingVariant>{title}</SmallHeadingVariant>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 23px;

  border: none;
  background: none;

  h3 {
    &:hover {
      color: #7e88c3;
    }
  }
`;

const IconImg = styled.img``;

const IconWrapper = styled.div``;

export default GoBack;

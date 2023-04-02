import React, { FC } from 'react';
import styled from 'styled-components';
import { BodyTextVariant } from '../styles/globalStyles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: string;
  bg?: string;
  color?: string;
  radius?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  icon,
  bg,
  color,
  radius,
  ...props
}) => {
  return (
    <StyledButton
      style={{
        background: bg,
        color: color,
        borderRadius: radius,
      }}
    >
      {icon && (
        <IconWrapper>
          <IconImg src={icon} alt='icon' />
        </IconWrapper>
      )}
      <TitleText>{title}</TitleText>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  padding: 6px 15px 6px 6px;
  gap: 8px;
  display: flex;
  align-items: center;
`;

const IconImg = styled.img``;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled(BodyTextVariant)`
  color: ${({ theme }) => theme.colors.white};
`;

export default Button;

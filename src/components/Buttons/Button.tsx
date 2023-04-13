import React, { FC } from 'react';
import styled from 'styled-components';
import { BodyTextVariant } from '../../styles/globalStyles';
import { device } from '../../styles/mediaQureis';
device;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: string;
  bg?: string;
  color?: string;
  radius?: string;
  padding?: string;
  hoverBg?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  icon,
  bg,
  color,
  radius,
  padding,
  hoverBg,
  ...props
}) => {
  return (
    <StyledButton
      style={{
        background: bg,
        color: color,
        borderRadius: radius,
        padding: padding ? padding : '6px 15px 6px 6px',
      }}
      {...props}
      onClick={props.onClick}
      hoverBg={hoverBg}
    >
      {icon && (
        <IconWrapper>
          <IconImg src={icon} alt='icon' />
        </IconWrapper>
      )}
      <TitleText>
        {title} <TabletHide>Invoice</TabletHide>
      </TitleText>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  hoverBg?: string;
}>`
  border: none;
  gap: 8px;
  display: flex;
  align-items: center;

  cursor: pointer;

  &:hover {
    background: ${({ hoverBg }) => hoverBg} !important;
  }

  @media ${device.tablet} {
    gap: 16px;
  }
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
  font-weight: 700;
  font-size: 15px;
`;

const TabletHide = styled.span`
  display: none;

  @media ${device.tablet} {
    display: inline;
  }
`;

export default Button;

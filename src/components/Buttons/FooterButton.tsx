import { FC } from 'react';
import styled from 'styled-components';
import { SmallHeadingVariant } from '../../styles/globalStyles';

interface FooterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  bgColor?: string;
  color?: string;
  padding: string;
}

const FooterButton: FC<FooterButtonProps> = ({
  title,
  bgColor,
  color,
  padding,

  ...props
}) => {
  return (
    <Button
      style={{
        background: bgColor,
        color: color,
        padding: padding,
      }}
      onClick={props.onClick}
    >
      {title}
    </Button>
  );
};

const Button = styled.button`
  border-radius: 24px;
  border: none;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */

  text-align: center;
  letter-spacing: -0.25px;

  cursor: pointer;
`;

const TitleText = styled(SmallHeadingVariant)`
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */

  text-align: center;
  letter-spacing: -0.25px;

  color: #ffffff;
`;
export default FooterButton;

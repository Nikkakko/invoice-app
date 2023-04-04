import React, { forwardRef, FC } from 'react';
import styled from 'styled-components';
import { CalendarIcon } from '../assets';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  padding?: string;
  width?: string;
}

const InputField: FC<InputFieldProps> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(({ label, name, padding, width, ...rest }, ref) => {
  return (
    <FormGroup>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input ref={ref} name={name} {...rest} padding={padding} width={width} />
      {name === 'invoiceDate' && <CalendarImg src={CalendarIcon} />}
    </FormGroup>
  );
});

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
`;

const Input = styled.input<{
  name: string | undefined;
  padding?: string | undefined;
  width?: string | undefined;
}>`
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  background: ${({ name, theme }) =>
    name === 'total' ? 'none' : theme.colors.inputBG};
  border: ${({ name, theme }) =>
    name === 'total' ? 'none' : `1px solid ${theme.colors.inputBorder}`};

  padding: 18px 0px 15px 20px;
  width: ${({ width }) => (width ? width : '100%')};

  /* FONTS */
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  text-transform: capitalize;
  letter-spacing: -0.25px;
  /* FONTS */

  &:focus {
    outline: none;
  }

  cursor: ${({ readOnly }) => (readOnly ? 'not-allowed' : 'pointer')};
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height, or 115% */

  letter-spacing: -0.1px;

  /* 07 */

  color: ${({ theme }) => theme.colors.paragraph};
`;

const CalendarImg = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export default InputField;

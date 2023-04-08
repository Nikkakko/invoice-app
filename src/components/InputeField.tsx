import React, { forwardRef, FC } from 'react';
import styled from 'styled-components';
import { CalendarIcon } from '../assets';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  padding?: string;
  width?: string;
  error?: string;
}

const InputField: FC<InputFieldProps> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(({ label, name, padding, width, error, ...rest }, ref) => {
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={name} error={error ? true : false}>
          {label}
          {error && <Error>{error}</Error>}
        </Label>
      )}
      <Input
        ref={ref}
        name={name}
        {...rest}
        padding={padding}
        width={width}
        error={error ? error : undefined}
      />
      {/* {name === 'invoiceDate' && <CalendarImg src={CalendarIcon} />} */}
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
  type?: string | undefined;
  error?: string | undefined;
}>`
  color: ${({ theme, name }) =>
    name === 'total' ? theme.colors.secondary : theme.colors.primary};
  border-radius: 4px;
  background: ${({ name, theme }) =>
    name === 'total' ? 'none' : theme.colors.inputBG};
  border: ${({ name, theme, error }) =>
    name === 'total'
      ? 'none'
      : error
      ? `1px solid #ec5757`
      : `1px solid ${theme.colors.inputBorder}`};

  padding: ${({ padding }) => (padding ? padding : '18px 0px 15px 20px')};
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

  //remove arrow from number input
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  cursor: ${({ readOnly }) => (readOnly ? 'not-allowed' : 'pointer')};

  //customize type date input
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 16px;
    opacity: 0.5;
  }
`;

const Label = styled.label<{ error?: boolean }>`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height, or 115% */

  letter-spacing: -0.1px;

  /* 07 */

  color: ${({ theme, error }) => (error ? '#ec5757' : theme.colors.paragraph)};

  display: flex;
  justify-content: space-between;
`;

const Error = styled.span`
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height, or 150% */

  letter-spacing: -0.208333px;

  /* 08 */

  color: #ec5757;
`;

const CalendarImg = styled.img`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

export default InputField;

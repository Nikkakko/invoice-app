import React, { forwardRef, FC } from 'react';
import styled from 'styled-components';
import { BodyTextVariant } from '../styles/globalStyles';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: FC<InputFieldProps> = forwardRef<
  HTMLInputElement,
  InputFieldProps
>(({ label, name, ...rest }, ref) => {
  return (
    <FormGroup>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input ref={ref} name={name} {...rest} />
    </FormGroup>
  );
});

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.inputBG};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: 4px;

  padding: 18px 0px 15px 20px;
  width: 100%;

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

export default InputField;

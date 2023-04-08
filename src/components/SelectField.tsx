import { FC, forwardRef } from 'react';
import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';

interface SelectFieldProps {
  label?: string;
  name?: string | undefined;
  error?: string | undefined;
  value?: number | undefined;
}

const SelectField: FC<SelectFieldProps> = forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(({ label, name, error, value }, ref) => {
  return (
    <SelectGroup>
      {label && <label htmlFor={name}>{label}</label>}
      <Select name={name} ref={ref}>
        <Option value={value}>Next {value} days</Option>
        <Option value={Number(1)}>Next {Number(1)} day</Option>
        <Option value='3'>Next {Number(7)} days</Option>
        <Option value='4'>Next {Number(14)} days</Option>
        <Option value='5'>Next {Number(30)} days</Option>
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectGroup>
  );
});

const SelectGroup = styled.div``;
const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  font-size: 1rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export default SelectField;

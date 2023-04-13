import { FC } from 'react';
import styled from 'styled-components';

interface ArrowDownProps {
  isFilterOpen?: boolean;
}

const ArrowDown: FC<ArrowDownProps> = ({ isFilterOpen }) => {
  return (
    <Svg
      width='11'
      height='7'
      xmlns='http://www.w3.org/2000/svg'
      isFilterOpen={isFilterOpen}
    >
      <path
        d='M1 1l4.228 4.228L9.456 1'
        stroke='#7C5DFA'
        strokeWidth='2'
        fill='none'
        fillRule='evenodd'
      />
    </Svg>
  );
};

const Svg = styled.svg`
  //rotate arrow when filter is open

  // animate arrow rotation
  transition: transform 0.3s ease-in-out;

  transform: ${({ isFilterOpen }: ArrowDownProps) =>
    isFilterOpen && 'rotate(180deg)'};
`;

export default ArrowDown;

import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'League Spartan', sans-serif;
        background-color: ${({ theme }) => theme.colors.background};
        

    }
`;

export const LargeHeading = styled.h1`
  font-weight: 700;
  font-size: 36px;
  line-height: 33px;
  letter-spacing: -1.125px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const MediumHeading = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: -0.75px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const SmallHeading = styled.h3`
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */

  letter-spacing: -0.25px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const SmallHeadingVariant = styled.h3`
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  /* identical to box height, or 100% */
  letter-spacing: -0.25px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BodyText = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* or 138% */

  letter-spacing: -0.1px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const BodyTextVariant = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  /* or 115% */

  letter-spacing: -0.1px;

  color: ${({ theme }) => theme.colors.primary};
`;

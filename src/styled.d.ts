// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      headerBG: string;
      white: string;
      invoiceCardBG: string;
      bannerBG: string;
      totalBG: string;
      inputBG: string;
      inputBorder: string;
      paragraph: string;
      editBG: string;
    };
  }
}

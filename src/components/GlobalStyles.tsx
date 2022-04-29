import { css, Global } from '@emotion/react';

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url('/fonts/inter-roman.var.woff2') format('woff2');
          font-named-instance: 'Regular';
        }

        @font-face {
          font-family: 'Inter';
          font-style: italic;
          font-weight: 100 900;
          font-display: swap;
          src: url('/fonts/inter-italic.var.woff2') format('woff2');
          font-named-instance: 'Italic';
        }
      `}
    />
  );
};

export default GlobalStyles;

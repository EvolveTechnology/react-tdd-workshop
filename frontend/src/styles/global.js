import { createGlobalStyle } from "styled-components";
import reset from "styles/reset";
import normalize from "styles/normalize";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}

  @font-face {
  font-family: 'Inconsolata';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Inconsolata Regular'), local('Inconsolata-Regular'), url('https://fonts.gstatic.com/s/inconsolata/v18/QldKNThLqRwH-OJ1UHjlKGlZ5qg.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

  * {
    font-family: 'Inconsolata', monospace;
  }

  html { 
   font-size: 10pt;
  }

  html, body {
    height: 100%;
  }

  body {
      background: ${({ theme: { colors } }) => colors.muted};
      color:${({ theme: { colors } }) => colors.text};
  }

  *::-webkit-scrollbar {
    width: 8px;
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme: { colors } }) =>
      `${colors.highlight} ${colors.background}`};
  }

  *::-webkit-scrollbar-track {
    background: ${({ theme: { colors } }) => colors.muted};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { colors } }) => colors.highlight} ;
    border-radius: 4px;
    border: 3px solid ${({ theme: { colors } }) => colors.highlight};
  }

  [data-reach-dialog-content]{
    background: ${({ theme: { colors } }) => colors.muted};
  }
`;

export default GlobalStyle;

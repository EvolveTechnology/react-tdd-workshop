import { createGlobalStyle } from "styled-components";
import reset from "styles/reset";
import normalize from "styles/normalize";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}

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

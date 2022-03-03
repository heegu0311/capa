import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: var(--fontSize-root--big);
    font-family: var(--fontFamily);
    color: var(--color-black);
    background-color: var(--color-white);
  }

  button, input, textarea {
    padding: 0;
    border: none;
    outline: none;
    background-color: inherit;
  }

  button {
    cursor: pointer;
    :active,
    :hover,
    :focus {
      outline: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  :root {
    --fontFamily: "Noto Sans KR" ;
    --fontSize-root--big: 16px;
    --fontSize-root--small: 14px;
    --lineHeight-normal: 1;
    --lineHeight-loose: 1.25;
    --lineHeight-relaxed: 1.5;
    --color-maingreen--100: #36CCC8;
    --color-maingreen--75: #68D9D6;
    --color-maingreen--50: #9BE6E3;
    --color-maingreen--25: #CDF2F1;
    --color-maingreen--10: #EBFAFA;
    --color-red: #FF5252;
    --color-red--25: #FFD4D4;
    --color-red--10: #FFEDED;
    --color-yellow: #F9CD50;
    --color-yellow--10: #FEFAED;
    --color-green: #278400;
    --color-green--10: #E9F2E5;
    --color-blue: #2762F4;
    --color-black: #3A3A42;
    --color-darkgray: #62626A;
    --color-gray: #919196;
    --color-lightgray: #DCDCE0;
    --color-palegray: #EEF2F6;
    --color-darkwhite: #F6F6FA;
    --color-white: #FCFCFF;
    --color-shadow: #1D1D2133;
    --color-modalbg: #1D1D21E5;
`;

export default GlobalStyle;

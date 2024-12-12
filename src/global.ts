import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin:0;
    padding: 0;
    overflow: hidden;
  }

  *::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    margin-left: 15px;
}

*::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}

*::-webkit-scrollbar-thumb {
    background: #4d5159;
    border: 1px solid #4d5159;
    border-radius: 5px;
    transition: .5s;
}

*::-webkit-scrollbar-thumb:hover {
    background: #c4c4c4;
}

*::-webkit-scrollbar-thumb:active {
    background: #f1f1f1;
}

*::-webkit-scrollbar-track {
    background: #2c2f33;
    border-left: 1px solid #000;
    border-radius: 0;
}

`;

export default GlobalStyle;

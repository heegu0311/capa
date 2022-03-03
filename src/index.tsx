import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Normalize } from "styled-normalize";
import GlobalStyle from "./components/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Normalize />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

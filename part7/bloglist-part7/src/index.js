import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import myTheme from "./chakra-ultils/theme";
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={myTheme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

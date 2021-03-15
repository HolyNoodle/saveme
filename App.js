// React
import React from "react";

// Third party
import moment from "moment";
import { StatusBar } from "react-native";
import { I18nextProvider } from "react-i18next";
import translations from "./src/translations";
import { ThemeProvider } from "styled-components";

// Components
import Entrypoint from "./src";
import themes from "./src/themes";

moment.locale("fr");

const App = () => (
  <I18nextProvider i18n={translations}>
    <ThemeProvider theme={themes.women}>
      <StatusBar barStyle="dark-content" />
      <Entrypoint />
    </ThemeProvider>
  </I18nextProvider>
);

export default App;

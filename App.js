// React
import React from "react";

// Third party
import moment from "moment";
import { StatusBar } from "react-native";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { Provider } from "overmind-react";

// Configuration
import state from './src/state';
import translations from "./src/translations";

// Components
import Entrypoint from "./src";
import themes from "./src/themes";

moment.locale("fr");

const App = () => (
  <I18nextProvider i18n={translations}>
    <ThemeProvider theme={themes.women}>
      <Provider value={state}>
        <StatusBar barStyle="dark-content" />
        <Entrypoint />
      </Provider>
    </ThemeProvider>
  </I18nextProvider>
);

export default App;

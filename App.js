// React
import React from 'react';

// Third party
import moment from 'moment';
import {StatusBar} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import translations from './src/translations';

// Components
import Entrypoint from './src';

moment.locale('fr');

const App = () => (
  <I18nextProvider i18n={translations}>
    <StatusBar barStyle="dark-content" />
    <Entrypoint />
  </I18nextProvider>
);

export default App;

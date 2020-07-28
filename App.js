import React from 'react';
import {StatusBar} from 'react-native';

import Entrypoint from './src';
import {I18nextProvider} from 'react-i18next';

import translations from './src/translations';

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <I18nextProvider i18n={translations}>
      <Entrypoint />
    </I18nextProvider>
  </>
);

export default App;

import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

import Entrypoint from './src';

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Entrypoint />
    </SafeAreaView>
  </>
);

export default App;

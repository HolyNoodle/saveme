import React from 'react';
import {StatusBar} from 'react-native';

import Entrypoint from './src';
import {I18nextProvider} from 'react-i18next';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import translations from './src/translations';

const Stack = createStackNavigator();

const App = () => (
  <I18nextProvider i18n={translations}>
    <StatusBar barStyle="dark-content" />

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Entrypoint} />
      </Stack.Navigator>
    </NavigationContainer>
  </I18nextProvider>
);

export default App;

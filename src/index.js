// React
import React from 'react';

// Third party
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Components
import Service from './domains/Service';
import SessionList from './domains/Session/components/List';
import Config from './domains/Configuration';

const Tab = createBottomTabNavigator();

const Entrypoint = ({ }) => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={"home"}>
        <Tab.Screen name="home" component={Service} options={{ title: t('nav:home') }} />
        <Tab.Screen name="sessions" component={SessionList} options={{ title: t('nav:sessions') }} />
        <Tab.Screen name="parameters" component={Config} options={{ title: t('nav:config') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Entrypoint;

// React
import React from "react";

// Third party
import { useTranslation } from "react-i18next";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import styled from "styled-components/native";

//Components
import Service from "./domains/Service";
import SessionList from "./domains/Session/components/List";
import Config from "./domains/Configuration";
import { useTheme } from "styled-components";

const Tab = createBottomTabNavigator();

const TabIcon = styled(Icon)`
  color: ${({ color }) => color};
`;
const HomeIcon = (props) => <TabIcon {...props} name="home" type="Feather" />;
const SessionsIcon = (props) => (
  <TabIcon {...props} name="list" type="Feather" />
);
const SettingsIcon = (props) => (
  <TabIcon {...props} name="setting" type="AntDesign" />
);

const Entrypoint = ({}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.PRIMARY_BACKGROUND_COLOR,
      primary: theme.PRIMARY_BACKGROUND_COLOR,
      card: theme.PRIMARY_BUTTON_BACKGROUND_COLOR,
      text: theme.PRIMARY_BUTTON_TEXT_COLOR,
      border: theme.PRIMARY_BUTTON_BACKGROUND_COLOR,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator initialRouteName={"home"}>
        <Tab.Screen
          name="home"
          component={Service}
          options={{ title: t("nav:home"), tabBarIcon: HomeIcon }}
        />
        <Tab.Screen
          name="sessions"
          component={SessionList}
          options={{ title: t("nav:sessions"), tabBarIcon: SessionsIcon }}
        />
        <Tab.Screen
          name="settings"
          component={Config}
          options={{ title: t("nav:config"), tabBarIcon: SettingsIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Entrypoint;

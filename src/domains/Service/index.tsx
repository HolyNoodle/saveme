// React
import React from "react";

// Third party
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

// Components
import Session from "./views/CurrentSession";
import Service from "./views/Service";

const Stack = createStackNavigator();

const StackNavigationService = () => {
  const {t} = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"service"}
        component={Service}
        options={{ title: t("nav:home") }} />
      <Stack.Screen
        name={"current-session"}
        component={Session}
        options={{ title: t("nav:current-session") }} />
    </Stack.Navigator>
  );
};

export default StackNavigationService;

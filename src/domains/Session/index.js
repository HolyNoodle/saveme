// React
import React from "react";

// Third party
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Session from "./views/Session";
import SessionList from "./views/SessionList";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const StackNavigationSessionList = () => {
  const {t} = useTranslation();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"list"}
        component={SessionList}
        options={{ title: t("nav:sessions") }} />
      <Stack.Screen
        name={"details"}
        component={Session}
        options={{ title: t("nav:session-details") }} />
    </Stack.Navigator>
  );
};

export default StackNavigationSessionList;

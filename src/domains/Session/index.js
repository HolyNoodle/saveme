// React
import React from "react";

// Third party
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Session from "./views/Session";
import SessionList from "./views/SessionList";

const Stack = createStackNavigator();

const StackNavigationSessionList = () => (
  <Stack.Navigator>
    <Stack.Screen name={"list"} component={SessionList} />
    <Stack.Screen name={"details"} component={Session} />
  </Stack.Navigator>
);

export default StackNavigationSessionList;

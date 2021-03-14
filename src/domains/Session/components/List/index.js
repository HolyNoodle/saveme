// React
import React, { useState, useEffect } from "react";

// Third party
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import { List } from "native-base";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";

// Utils
import { convertJavaDateToMoment } from "../../../../utils";
import { getSessionList, removeSession } from "../../utils";
import { SessionScreen } from "../../index";
import { ListItem, PrimaryText } from "../../../../components/Layout";

const SessionList = ({ navigation }) => {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState();

  const handleDeleteFolder = (session) => {
    removeSession(session).then(() => setSessions());
  };
  const handleOpenSession = (session) => {
    navigation.navigate("sessions", { screen: "details", params: { session } });
  };

  useEffect(() => {
    if (sessions !== undefined) {
      return;
    }

    getSessionList().then((sessions) => {
      const normalizedSessions = sessions.map((s) => ({
        ...s,
        startDate: convertJavaDateToMoment(s.startDate),
      }));

      setSessions(sortBy(normalizedSessions, "startDate").reverse());
    });
  }, [sessions]);

  return (
    <List>
      {map(sessions, (item) => {
        const { startDate } = item;
        return (
          <ListItem key={startDate} onPress={() => handleOpenSession(item)}>
            <PrimaryText>
              {startDate.format(
                t("common:long_date_format")
              )}
            </PrimaryText>
          </ListItem>
        );
      })}
    </List>
  );
};

const Stack = createStackNavigator();

const StackNavigationSessionList = () => (
  <Stack.Navigator>
    <Stack.Screen name={"list"} component={SessionList} />
    <Stack.Screen name={"details"} component={SessionScreen} />
  </Stack.Navigator>
);

export default StackNavigationSessionList;

// React
import React, { useEffect } from "react";

// Third party
import { List } from "native-base";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";

// State
import { useOvermind } from "../../../../state";

// Utils
import { convertJavaDateToMoment } from "../../../../utils";

// Components
import Loader from "../../../../components/Loader";
import { SessionScreen } from "../../index";
import { SecondaryIconButton, ListItem, PrimaryText } from "../../../../components/Layout";
import RemoveSessionIconButton from "./components/RemoveSessionIconButton";

const SessionList = ({ navigation }) => {
  const { t } = useTranslation();
  const {
    state: {
      sessions: { loading, invalid, sessions = {} },
    },
    actions: {
      sessions: { getSessions },
    }
  } = useOvermind();

  const handleOpenSession = (session) => {
    navigation.navigate("sessions", { screen: "details", params: { session } });
  };

  useEffect(() => {
    if (!invalid) return;

    getSessions();
  }, [invalid]);

  return (
    <>
      {loading && <Loader />}
      <List>
        {Object.values(sessions).map((item) => {
          const { startDate } = item;
          return (
            <ListItem key={startDate} onPress={() => handleOpenSession(item)}>
              <PrimaryText>
                {convertJavaDateToMoment(startDate).format(t("common:long_date_format"))}
              </PrimaryText>
            </ListItem>
          );
        })}
      </List>
    </>
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

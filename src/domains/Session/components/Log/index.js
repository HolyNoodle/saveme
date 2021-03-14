// React
import React from "react";

// Third party
import moment from "moment";
import { FlatList, Text } from "react-native";

// Components
import GeolocationLog from "./GeolocationLog";

const LogEntry = ({ date, children }) => (
  <>
    <Text>{date && moment(date).format("DD/MM/YYYY HH:mm:ss")}</Text>
    {children}
  </>
);
const Event = ({ message }) => <Text>{message}</Text>;
const Error = ({ ex }) => <Text>ERROR : {JSON.stringify(ex)}</Text>;
const SMS = ({ message, number, event }) => (
  <Text>
    SMS: {event} to {number}: {message}
  </Text>
);
const logComponentMap = {
  event: Event,
  geolocation: GeolocationLog,
  error: Error,
  SMS,
};

const LogList = ({ session }) => {
  const {
    logger: { logs },
  } = session;

  return (
    <FlatList
      data={logs}
      keyExtractor={({ date }) => date}
      renderItem={({ item }) => {
        const { date, type, data } = item;
        const Component = logComponentMap[type];

        return (
          <LogEntry date={date}>
            <Component {...data} date={date} type={type} />
          </LogEntry>
        );
      }}
    />
  );
};

export default React.memo(LogList);

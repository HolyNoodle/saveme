// React
import React, { useMemo } from "react";

// Third party
import moment from "moment";
import { FlatList, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

// Components
import GeolocationLog from "./GeolocationLog";
import LogEntry from "./LogEntry";
import SMS from "./SMSLog";
import { ListItem, PrimaryText } from "../../../../components/Layout";

const Event = ({ message }) => {
  const { t } = useTranslation();
  return <PrimaryText>{t(`session:${message}`)}</PrimaryText>;
};
const Error = ({ origin, exception, stacktrace }) => (
  <View>
    <PrimaryText>
      ERROR - {origin} : {exception}
    </PrimaryText>
    <PrimaryText>{stacktrace}</PrimaryText>
  </View>
);
const logComponentMap = {
  event: Event,
  geolocation: GeolocationLog,
  error: Error,
  SMS,
};

const LogList = ({ session, ...listProps }) => {
  const { logger: { logs = [] } = {} } = session;

  const sortedLogs = useMemo(() => {
    let lastElement = null;
    const normalizedLogs = logs.map(({ date, ...log }) => {
      const momentDate = date && moment(date);
      const elapsedTime =
        lastElement && momentDate.diff(lastElement.date, "seconds");

      const newElement = {
        ...log,
        date: momentDate,
        elapsedTime,
      };

      lastElement = newElement;

      return newElement;
    });

    return normalizedLogs.sort(
      ({ date: dateA }, { date: dateB }) => dateA.valueOf() - dateB.valueOf()
    );
  }, [logs]);

  return (
    <FlatList
      {...listProps}
      data={sortedLogs}
      keyExtractor={({ date }, index) => date.valueOf() + "_" + index}
      renderItem={({ item }) => {
        const { date, type, data, elapsedTime } = item;
        const Component = logComponentMap[type];

        return (
          <ListItem>
            <LogEntry date={date} elapsedTime={elapsedTime}>
              <Component {...data} date={date} type={type} />
            </LogEntry>
          </ListItem>
        );
      }}
    />
  );
};

export default React.memo(LogList);

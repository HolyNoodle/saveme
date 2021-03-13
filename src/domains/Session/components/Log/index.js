import React from 'react';
import moment from 'moment';
import {FlatList, Text} from 'react-native';

const LogEntry = ({date, children}) => (
  <>
    <Text>{date && moment(date).format('DD/MM/YYYY HH:mm:ss')}</Text>
    {children}
  </>
);
const Event = ({message}) => <Text>{message}</Text>;
const Geolocation = ({location}) => (
  <Text>GEOLOCATION : {JSON.stringify(location)}</Text>
);
const Error = ({ex}) => <Text>ERROR : {JSON.stringify(ex)}</Text>;
const SMS = ({message, number, event}) => <Text>SMS: {event} to {number}: {message}</Text>
const logComponentMap = {
  event: Event,
  geolocation: Geolocation,
  error: Error,
  SMS
};

const LogList = ({session}) => {
  const {
    logger: {logs},
  } = session;

  return (
    <FlatList
      data={logs}
      renderItem={({item}) => {
        const {date, type, data} = item;
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

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

const logComponentMap = {
  event: Event,
  geolocation: Geolocation,
  error: Error,
};

const LogList = ({session}) => {
  const {log} = session;

  return (
    <FlatList
      data={log}
      renderItem={({item}) => {
        const {date, type, ...rest} = item;
        const Component = logComponentMap[type];

        return (
          <LogEntry date={date}>
            <Component {...rest} date={date} type={type} />
          </LogEntry>
        );
      }}
    />
  );
};

export default LogList;

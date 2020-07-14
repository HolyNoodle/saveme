import React from 'react';

import {FlatList, Text} from 'react-native';

const LogList = ({session}) => {
  const {log} = session;

  return (
    <FlatList
      data={log}
      renderItem={({item}) => {
        const {date, value} = item;

        return (
          <Text>
            {date.format('DD/MM/YYYY HH:mm:ss')} -&gt; {value}
          </Text>
        );
      }}
    />
  );
};

export default LogList;

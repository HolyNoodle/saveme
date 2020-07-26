import React from 'react';
import {View, Text} from 'react-native';

import Clock from './components/Clock';
import {SessionContext} from '../../contexts';
import LogList from './components/Log';

const Session = ({session}) => {
  const {startDate} = session;

  return (
    <SessionContext.Provider value={session}>
      <View>
        <Text>Session</Text>
        <Clock startDate={startDate} />
        <LogList session={session} />
      </View>
    </SessionContext.Provider>
  );
};

export default Session;

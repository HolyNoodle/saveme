// React
import React from 'react';

// Third party
import {View, Text} from 'react-native';

// Contexts
import {SessionContext} from '../../contexts';

// Utils
import { convertJavaDateToMoment } from '../../utils';
import { getSessionAudioFilePath } from './utils';

// Components
import Clock from './components/Clock';
import LogList from './components/Log';
import AudioFile from './components/AudioFile';

const Session = ({session}) => {
  const {startDate, endDate} = session;
  const normalizedStartDate = startDate && convertJavaDateToMoment(startDate);
  const normalizedEndDate = endDate && convertJavaDateToMoment(endDate);

  return (
    <SessionContext.Provider value={session}>
      <View>
        <Text>Session</Text>
        <Clock startDate={normalizedStartDate} endDate={normalizedEndDate} />
        <LogList session={session} />
        <AudioFile filePath={getSessionAudioFilePath(session)} />
      </View>
    </SessionContext.Provider>
  );
};

export const SessionScreen = ({route: {params:{session}}}) => <Session session={session} />

export default Session;

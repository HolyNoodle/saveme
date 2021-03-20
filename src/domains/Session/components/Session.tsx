// React
import React, {useLayoutEffect} from 'react';

// Contexts
import {SessionContext} from '../../../contexts';

// Utils
import {convertJavaDateToMoment} from '../../../utils';

// Components
import Clock from './Clock';
import LogList from './Log';
import AudioFile from './AudioFile';
import RemoveSessionIconButton from './RemoveSessionIconButton';

// Types
import {Session as SessionType} from 'src/types';
import moment from 'moment';

const getSessionAudioFilePath = ({sessionName}: SessionType) =>
  sessionName + '/audio-record.mp4';

interface SessionProps {
  session: SessionType;
  navigation?: any;
}
const Session: React.FunctionComponent<SessionProps> = ({
  session,
  navigation,
}) => {
  const {startDate, endDate} = session;
  const normalizedStartDate = startDate && convertJavaDateToMoment(startDate) || moment();
  const normalizedEndDate = endDate && convertJavaDateToMoment(endDate) || moment();

  useLayoutEffect(() => {
    navigation &&
      navigation.setOptions({
        headerRight: () => <RemoveSessionIconButton session={session} />,
      });
  }, [navigation]);

  return (
    <SessionContext.Provider value={session}>
      <LogList
        session={session}
        ListHeaderComponent={
          <>
            <Clock
              startDate={normalizedStartDate}
              endDate={normalizedEndDate}
            />
            {endDate && (
              <AudioFile filePath={getSessionAudioFilePath(session)} />
            )}
          </>
        }
      />
    </SessionContext.Provider>
  );
};

export default Session;

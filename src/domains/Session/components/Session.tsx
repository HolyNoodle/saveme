// React
import React, {useLayoutEffect} from 'react';

// Third party
import moment from 'moment';

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

// State
import { useOvermind } from '../../../state';

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
  useOvermind();
  
  const {startDate, endDate} = session;
  const normalizedStartDate = startDate && convertJavaDateToMoment(startDate) || moment();
  const normalizedEndDate = endDate && convertJavaDateToMoment(endDate) || moment();

  useLayoutEffect(() => {
    navigation && endDate &&
      navigation.setOptions({
        headerRight: () => <RemoveSessionIconButton session={session} />,
      });
  }, [navigation, endDate]);

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

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import * as RNFS from 'react-native-fs';
import {PERMISSIONS} from 'react-native-permissions';

import AudioRecorder from '../Audio';
import {PermissionGate} from '../Permission';
import Clock from './components/Clock';
import {SessionContext} from '../../contexts';
import LogList from './components/Log';

const Session = ({session, onChange}) => {
  const {startDate, folder} = session;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      RNFS.mkdir(folder).then(() => {
        setReady(true);
        onChange({...session});
      });
    }
  }, [ready, setReady, onChange, folder, session]);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession: onChange,
      }}>
      <View>
        <Text>Session</Text>
        <Clock startDate={startDate} />
        {ready && (
          <AudioRecorder
            record={!!folder}
            fileName={`${folder}/audio-recording.wav`}
          />
        )}
        <LogList session={session} />
      </View>
    </SessionContext.Provider>
  );
};

const ProtectedSession = (props) => (
  <PermissionGate
    permission={PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE}
    force={true}>
    <PermissionGate
      permission={PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE}
      force={true}>
      <Session {...props} />
    </PermissionGate>
  </PermissionGate>
);

export default ProtectedSession;

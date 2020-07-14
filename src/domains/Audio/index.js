//React
import React, {useEffect, useRef, useContext} from 'react';

// Views
import {Text} from 'react-native';

// Third party
import moment from 'moment';

// Native modules
import AudioRecord from 'react-native-audio-record';
import {PERMISSIONS} from 'react-native-permissions';
import * as RNFS from 'react-native-fs';

// Components
import {PermissionGate} from '../Permission';

// Contexts
import {SessionContext} from '../../contexts';

const AudioRecorder = ({record = false, fileName}) => {
  const {session, setSession} = useContext(SessionContext);
  const started = useRef(false);

  useEffect(() => {
    if (record && !started.current) {
      AudioRecord.init({
        sampleRate: 16000, // default 44100
        channels: 1, // 1 or 2, default 1
        bitsPerSample: 16, // 8 or 16, default 16
        audioSource: 6, // android only (see below),
        wavFile: fileName.replace(RNFS.DocumentDirectoryPath, ''),
      });

      AudioRecord.start();
      setSession({
        ...session,
        log: [
          ...session.log,
          {type: 'event', date: moment(), value: 'START_RECORDING'},
        ],
      });
      started.current = true;
    }

    if (!record && started) {
      AudioRecord.stop();
      setSession({
        ...session,
        log: [
          ...session.log,
          {type: 'event', date: moment(), value: 'START_RECORDING'},
        ],
      });
      started.current = false;
    }
  }, [record, fileName]);

  useEffect(() => {
    return () => {
      if (started.current) {
        AudioRecord.stop();
        started.current = false;
      }
    };
  }, []);

  return record && started && <Text>Audio recording</Text>;
};

const ProtectedAudioRecorder = (props) => (
  <PermissionGate permission={PERMISSIONS.ANDROID.RECORD_AUDIO} force={true}>
    <AudioRecorder {...props} />
  </PermissionGate>
);

export default ProtectedAudioRecorder;

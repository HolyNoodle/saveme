import React, {useState, useEffect} from 'react';
import {View, ScrollView, Button, Text} from 'react-native';

import moment from 'moment';
import * as RNFS from 'react-native-fs';

import EmergencyNotification from './native-modules/EmergencyNotification';
import Session from './domains/Session';
import SessionList from './domains/Session/components/List';
import {PERMISSIONS} from 'react-native-permissions';
import {PermissionGate, SpecialPermissionGate} from './domains/Permission';

const Entrypoint = ({}) => {
  const [serviceState, setServiceState] = useState();
  const [session, setSession] = useState();

  const {started = false, mode = 'INACTIVE'} = serviceState || {};

  const handleChangeSession = (newSession) => {
    console.log('new session', newSession);
    const {folder} = newSession;

    if (folder) {
      RNFS.writeFile(
        folder + '/session.json',
        JSON.stringify(newSession),
        'utf8',
      );
    }

    setSession(newSession);
  };

  useEffect(() => {
    const callback = (json) => setServiceState(JSON.parse(json));

    const interval = setInterval(() => {
      EmergencyNotification.refreshState(callback);
    }, 500);

    EmergencyNotification.refreshState(callback);

    return () => clearInterval(interval);
  }, [setServiceState]);

  useEffect(() => {
    if (mode === 'HELP' || mode === 'EMERGENCY') {
      setSession({
        startDate: moment(),
        endDate: undefined,
        folder: `${RNFS.DocumentDirectoryPath}/${moment().format(
          'YYYYMMDDHHmm',
        )}`,
        log: [],
        actions: [],
      });
    } else {
      setSession(undefined);
    }
  }, [mode]);

  const handleStart = () => {
    EmergencyNotification.startService();
  };
  const handleStop = () => {
    EmergencyNotification.stopService();
  };

  return (
    <View>
      <Text>mode: {mode}</Text>
      {session && <Session onChange={handleChangeSession} session={session} />}
      {!session && <SessionList />}
      {!started ? (
        <SpecialPermissionGate>
          <Button onPress={handleStart} title={'Start'} />
        </SpecialPermissionGate>
      ) : (
        <Button onPress={handleStop} title={'Stop'} />
      )}
    </View>
  );
};

export default Entrypoint;

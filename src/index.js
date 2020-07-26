import React, {useState, useEffect} from 'react';

import {View, Button, Text} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

import EmergencyNotification from './native-modules/EmergencyNotification';
import Session from './domains/Session';
import SessionList from './domains/Session/components/List';
import {SpecialPermissionGate, PermissionGate} from './domains/Permission';

const Entrypoint = ({}) => {
  const [serviceState, setServiceState] = useState();

  const {started = false, mode = 'INACTIVE', session} = serviceState || {};

  useEffect(() => {
    const callback = (json) => setServiceState(JSON.parse(json));

    const interval = setInterval(() => {
      EmergencyNotification.refreshState(callback);
    }, 500);

    EmergencyNotification.refreshState(callback);

    return () => clearInterval(interval);
  }, [setServiceState]);

  const handleStart = () => {
    console.log('start')
    EmergencyNotification.startService();
  };
  const handleStop = () => {
    EmergencyNotification.stopService();
  };

  return (
    <View>
      <Text>mode: {mode}</Text>
      {session && <Session session={session} />}
      {!session && <SessionList />}
      {!started ? (
        <PermissionGate
          permissions={[
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          ]}
          force={true}>
          <SpecialPermissionGate>
            <Button onPress={handleStart} title={'Start'} />
          </SpecialPermissionGate>
        </PermissionGate>
      ) : (
        <Button onPress={handleStop} title={'Stop'} />
      )}
    </View>
  );
};

export default Entrypoint;

import React, {useState, useEffect} from 'react';
import {View, ScrollView, Button, Text} from 'react-native';

import EmergencyNotification from './native-modules/EmergencyNotification';
import Session from './domains/Session';

const Entrypoint = ({}) => {
  const [serviceState, setServiceState] = useState();

  EmergencyNotification.registerCallback((json) =>
    setServiceState(JSON.parse(json)),
  );

  useEffect(() => {
    EmergencyNotification.refreshState();
  }, []);

  const {started = false, mode = 'INACTIVE'} = serviceState || {};
  const isSessionNeeded = mode === 'HELP' || mode === 'EMERGENCY';

  const handleStart = () => {
    EmergencyNotification.startService();
  };
  const handleStop = () => {
    EmergencyNotification.stopService();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text>mode: {mode}</Text>
        {isSessionNeeded && <Session />}
        {!started ? (
          <Button onPress={handleStart} title={'Start'} />
        ) : (
          <Button onPress={handleStop} title={'Stop'} />
        )}
      </View>
    </ScrollView>
  );
};

export default Entrypoint;

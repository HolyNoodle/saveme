import React, {useEffect, useState} from 'react';

import {check, request, RESULTS} from 'react-native-permissions';
import {Button, Text} from 'react-native';

import DrawOnTopPermissionModule from '../../native-modules/DrawOnTopPermissionModule';

const PermissionButton = ({permission, onRequest}) => (
  <Button
    onPress={() => {
      request(permission).then(onRequest);
    }}
    title={'Request permission'}
  />
);

export const PermissionSetting = ({permission, onChange}) => {
  const [state, setState] = useState();
  useEffect(() => {
    check(permission).then((result) => {
      setState(result);
    });
  });

  switch (state) {
    case RESULTS.UNAVAILABLE:
      console.log(permission, 'not available');
      return <Text>Not available</Text>;
    case RESULTS.DENIED:
      return (
        <>
          <Text>Permission denied</Text>
          <PermissionButton permission={permission} />
        </>
      );
    case RESULTS.GRANTED:
      return <Text>OK</Text>;
    case RESULTS.BLOCKED:
      console.log(permission, 'blocked');
      return <Text>Blocked</Text>;
  }

  return <Text>Checking permission</Text>;
};

export const PermissionGate = ({permission, children, force = false}) => {
  const [state, setState] = useState();
  useEffect(() => {
    check(permission).then((result) => {
      setState(result);
    });
  });

  if (state === RESULTS.GRANTED) {
    return children;
  }

  return force && <PermissionSetting permission={permission} />;
};

export const SpecialPermissionGate = ({children}) => {
  const [state, setState] = useState(false);
  const [ready, setReady] = useState(false);

  const requestPermission = () => {
    return DrawOnTopPermissionModule.requestPermission()
      .then(() => setState(true))
      .catch(() => setState(false));
  };

  useEffect(() => {
    if (!ready) {
      DrawOnTopPermissionModule.hasPermission().then((value) => {
        setState(value);
        setReady(true);
      });
    }
  }, [ready]);

  if (!ready) {
    return <Text>Checking permissions</Text>;
  }

  if (state) {
    return children;
  }

  return (
    <Button
      onPress={() => requestPermission()}
      title={'Request special permission'}
    />
  );
};

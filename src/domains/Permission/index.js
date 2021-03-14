import React, {useEffect, useState} from 'react';

import {check, request, RESULTS} from 'react-native-permissions';
import {Button, Text} from 'react-native';

import DrawOnTopPermissionModule from '../../native-modules/DrawOnTopPermissionModule';
import {map, filter} from 'lodash';

const PermissionButton = ({permission, onRequest}) => (
  <Button
    onPress={() => {
      request(permission).then(onRequest);
    }}
    title={'Request permission ' + permission}
  />
);

export const PermissionSetting = ({permission}) => {
  const [state, setState] = useState();
  useEffect(() => {
    check(permission).then((result) => {
      setState(result);
    });
  });

  switch (state) {
    case RESULTS.UNAVAILABLE:
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
      return <Text>Blocked</Text>;
  }

  return <Text>Checking permission</Text>;
};

export const PermissionGate = ({permissions = [], children, force = false}) => {
  const [state, setState] = useState();

  useEffect(() => {
    const permissionPromises = permissions.map(check);

    Promise.all(permissionPromises).then((allResults) => {
      setState(allResults);
    });
  }, [permissions]);

  if (state && filter(state, (s) => s !== RESULTS.GRANTED).length === 0) {
    return children;
  }

  return (
    force &&
    map(permissions, (permission) => {
      if (state === RESULTS.GRANTED) {
        return null;
      }

      return <PermissionSetting key={permission} permission={permission} />;
    })
  );
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

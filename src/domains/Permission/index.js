import React, { useEffect, useState } from "react";

import { check, request, RESULTS } from "react-native-permissions";
import { Button, Text } from "react-native";

import DrawOnTopPermissionModule from "../../native-modules/DrawOnTopPermissionModule";

const PermissionButton = ({ permission, onRequest }) => (
  <Button
    onPress={() => {
      request(permission).then(onRequest);
    }}
    title={"Request permission " + permission}
  />
);

export const PermissionSetting = ({ permission, onUpdate }) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (!state) {
      check(permission).then((result) => {
        setState(result);
      });
    }
  }, [state]);

  switch (state) {
    case RESULTS.UNAVAILABLE:
      return <Text>Not available</Text>;
    case RESULTS.DENIED:
      return (
        <PermissionButton
          permission={permission}
          onRequest={onUpdate}
        />
      );
    case RESULTS.GRANTED:
      return null;
    case RESULTS.BLOCKED:
      return <Text>Blocked</Text>;
  }

  return <Text>Checking permission</Text>;
};

export const PermissionGate = ({
  permissions = [],
  children,
  force = false,
}) => {
  const [state, setState] = useState();

  useEffect(() => {
    if(!!state) {
      return;
    }

    const permissionPromises = permissions.map(check);

    Promise.all(permissionPromises).then((allResults) => {
      setState(allResults);
    });
  }, [state, permissions]);

  if (state && state.filter((s) => s !== RESULTS.GRANTED).length === 0) {
    return children;
  }

  const handlePermissionUpdate = (index) => {
    check(permissions[index]).then(result => {
      setState(state => {
        const newState = [...state];
        newState[index] = result;
        return newState;
      })
    })
  }

  return (
    force &&
    permissions.map((permission, index) => {
      if (state === RESULTS.GRANTED) {
        return null;
      }

      return <PermissionSetting key={permission} permission={permission} onUpdate={() => handlePermissionUpdate(index)} />;
    })
  );
};

export const SpecialPermissionGate = ({ children }) => {
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
      title={"Request special permission"}
    />
  );
};

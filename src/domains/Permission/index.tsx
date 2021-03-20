// React
import React, { useEffect, useState } from "react";

// Third party
import { Permission, RESULTS } from "react-native-permissions";
import { Button, Text } from "react-native";
import { useOvermind } from "../../state";

// Modules
import DrawOnTopPermissionModule from "../../native-modules/DrawOnTopPermissionModule";

// Components
import PermissionSetting from "./components/PermissionSetting";

export interface PermissionGateProps {
  permissions: Array<Permission>;
  children: any
}
export const PermissionGate: React.FunctionComponent<PermissionGateProps> = ({
  permissions = [],
  children
}) => {
  const {
    state: { permissions: statePermissions },
  } = useOvermind();

  const isAuthorized = permissions.reduce(
    (acc, permission) =>
      acc &&
      statePermissions[permission] &&
      statePermissions[permission].result === RESULTS.GRANTED,
    true
  );

  if (isAuthorized) {
    return children;
  }

  const permissionToRequest = permissions.find(
    (permission) =>
      !statePermissions[permission] ||
      statePermissions[permission].result !== RESULTS.GRANTED
  );

  return <PermissionSetting key={permissionToRequest} permission={permissionToRequest} />;
};

export interface SpecialPermissionGateProps {
  children: any;
}
export const SpecialPermissionGate: React.FunctionComponent<SpecialPermissionGateProps> = ({ children }) => {
  const [state, setState] = useState(false);
  const [ready, setReady] = useState(false);

  const requestPermission = () => {
    return DrawOnTopPermissionModule.requestPermission()
      .then(() => setState(true))
      .catch(() => setState(false));
  };

  useEffect(() => {
    if (!ready) {
      DrawOnTopPermissionModule.hasPermission().then((value: boolean) => {
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

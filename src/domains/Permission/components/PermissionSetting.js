// React
import React, { useEffect } from "react";

// Third party
import { RESULTS } from "react-native-permissions";
import { Text } from "react-native";
import { useOvermind } from "../../../state";

// Modules
import Loader from "../../../components/Loader";
import PermissionButton from "./PermissionButton";

const PermissionSetting = ({ permission }) => {
  const {
    state: {
      permissions: { [permission]: { result } = {} },
    },
    actions: {
      permissions: { checkPermission },
    },
  } = useOvermind();
  useEffect(() => {
    if (!result || result === RESULTS.UNAVAILABLE) {
      checkPermission(permission);
    }
  }, [result]);

  switch (result) {
    case RESULTS.UNAVAILABLE:
      return <Text>Not available</Text>;
    case RESULTS.DENIED:
      return <PermissionButton permission={permission} />;
    case RESULTS.GRANTED:
      return null;
    case RESULTS.BLOCKED:
      return <Text>Blocked</Text>;
  }

  return <Loader />;
};

export default PermissionSetting;
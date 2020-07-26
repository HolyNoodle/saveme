import React, {useEffect, useRef} from 'react';

import {PermissionGate} from '../Permission';
import {PERMISSIONS} from 'react-native-permissions';
import {Text} from 'react-native';

const GeolocationRecorder = () => {
  const getLocationRef = useRef();

  useEffect(() => {
    getLocationRef.current();

    const intervalId = setInterval(getLocationRef.current, 100 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return <Text>Recording position</Text>;
};

const ProtectedGeolocationRecorder = (props) => (
  <PermissionGate
    permission={PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION}
    force={true}>
    <PermissionGate
      permission={PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION}
      force={true}>
      <GeolocationRecorder {...props} />
    </PermissionGate>
  </PermissionGate>
);

export default ProtectedGeolocationRecorder;

import React from 'react';

// Third party
import {H3} from 'native-base';
import {useTranslation} from 'react-i18next';
import {Permission, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// Components
import {
  ListItem,
  PrimaryText,
  SpacedRow,
  Switch,
} from '../../../components/Layout';

// State
import {useOvermind} from '../../../state';
import {Configuration} from '../types';

const usePermissionGuard = (permissions: Array<Permission>) => (fn: (value: boolean, ...args: Array<any>) => void ) => async (value: boolean, ...args: Array<any>) => {
  if (value === false) {
    fn(value, ...args);
    return;
  }
  const isGranted = await permissions.reduce<Promise<boolean>>(async (acc: Promise<boolean>, permission: Permission) => {
    const previousResult = await acc;

    if (!previousResult) {
      return previousResult;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  }, Promise.resolve(true));

  if (isGranted) {
    fn(value, ...args);
  }
};

interface RecordersProps {
  configuration: Configuration;
  onFieldUpdate: (key: string) => (value: any) => void;
}

const Recorders: React.FunctionComponent<RecordersProps> = ({configuration, onFieldUpdate}) => {
  useOvermind();

  const {t} = useTranslation();
  const audioGuard = usePermissionGuard([PERMISSIONS.ANDROID.RECORD_AUDIO]);
  const geolocationGuard = usePermissionGuard([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  ]);
  const deviceGuard = usePermissionGuard([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ]);

  return (
    <>
      <H3>{t('config:recorders')}</H3>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t('config:isMicrophoneRecorderEnabled')}</PrimaryText>
          <Switch
            value={configuration.isMicrophoneRecorderEnabled}
            onValueChange={audioGuard(
              onFieldUpdate('isMicrophoneRecorderEnabled'),
            )}
          />
        </SpacedRow>
      </ListItem>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t('config:isGoelocationRecorderEnabled')}</PrimaryText>
          <Switch
            value={configuration.isGoelocationRecorderEnabled}
            onValueChange={geolocationGuard(
              onFieldUpdate('isGoelocationRecorderEnabled'),
            )}
          />
        </SpacedRow>
      </ListItem>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t('config:isDevicesRecorderEnabled')}</PrimaryText>
          <Switch
            value={configuration.isDevicesRecorderEnabled}
            onValueChange={deviceGuard(
              onFieldUpdate('isDevicesRecorderEnabled'),
            )}
          />
        </SpacedRow>
      </ListItem>
    </>
  );
};

export default Recorders;

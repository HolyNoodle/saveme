// React
import React, { useState, useEffect } from 'react';

// Third party
import {
  Container,
  Text,
  Button,
  Footer,
  Content,
  FooterTab,
} from 'native-base';
import { useTranslation } from 'react-i18next';
import { PERMISSIONS } from 'react-native-permissions';

// Services
import EmergencyNotification from '../../native-modules/EmergencyNotification';

// Components
import { SpecialPermissionGate, PermissionGate } from '../Permission';

const Service = ({ }) => {
  const { t } = useTranslation();
  const [serviceState, setServiceState] = useState();
  const { started = false } = serviceState || {};

  useEffect(() => {
    const callback = (json) => {
      const newServiceState = JSON.parse(json);
      setServiceState(serviceState => {
        if (!serviceState || serviceState.started != newServiceState.started || serviceState.mode != newServiceState.mode || newServiceState.session) {
          return newServiceState;
        }

        return serviceState
      });
    };

    const interval = setInterval(() => {
      EmergencyNotification.refreshState(callback);
    }, 500);

    EmergencyNotification.refreshState(callback);

    return () => clearInterval(interval);
  }, [setServiceState]);

  const handleStart = () => {
    EmergencyNotification.startService();
  };
  const handleStop = () => {
    EmergencyNotification.stopService();
  };

  return (
    <Container>
      <Content>
        <Text>TBD</Text>
      </Content>
      <Footer>
        <FooterTab>
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
                <Button onPress={handleStart} primary full>
                  <Text>{t('service:start')}</Text>
                </Button>
              </SpecialPermissionGate>
            </PermissionGate>
          ) : (
            <Button onPress={handleStop} danger full>
              <Text>{t('service:stop')}</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default Service;

// React
import React, {useEffect} from 'react';

// Third party
import {Container, Text, Button, Footer, Content, FooterTab} from 'native-base';
import {useTranslation} from 'react-i18next';
import {PERMISSIONS} from 'react-native-permissions';

// Services
import EmergencyNotification from '../../../native-modules/EmergencyNotification';

// Components
import {PermissionGate} from '../../Permission';

// State
import {useOvermind} from '../../../state';

// Types
import {ServiceState} from '../types';

interface ServiceProps {
  navigation: any;
}

const Service: React.FunctionComponent<ServiceProps> = ({navigation}) => {
  const {t} = useTranslation();
  const {
    state: {
      service: serviceState,
    },
    actions: {
      service: {setService},
    },
  } = useOvermind();
  const {started = false, session} = serviceState || {};

  useEffect(() => {
    const callback = (json: string) => {
      const newServiceState = JSON.parse(json);

      setService((serviceState: ServiceState) => {
        if (
          !serviceState ||
          serviceState.started != newServiceState.started ||
          serviceState.mode != newServiceState.mode ||
          newServiceState.session
        ) {
          return newServiceState;
        }

        return serviceState;
      });
    };

    const interval = setInterval(() => {
      EmergencyNotification.refreshState(callback);
    }, 500);

    EmergencyNotification.refreshState(callback);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    EmergencyNotification.startService();
  };
  const handleStop = () => {
    EmergencyNotification.stopService();
  };

  useEffect(() => {
    if(session) {
      navigation.navigate('home', {screen: 'current-session'});
    }
  }, [session]);

  return (
    <Container>
      <Content>
        <Text>TBD</Text>
      </Content>
      <Footer>
        <FooterTab>
          {!started ? (
            <PermissionGate
              permissions={[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]}>
              <Button onPress={handleStart} primary full>
                <Text>{t('service:start')}</Text>
              </Button>
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

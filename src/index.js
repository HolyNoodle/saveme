// React
import React, {useState, useEffect} from 'react';

// Third party
import {
  Container,
  Text,
  Button,
  Footer,
  Content,
  FooterTab,
  Header,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {PERMISSIONS} from 'react-native-permissions';

// Services
import EmergencyNotification from './native-modules/EmergencyNotification';

// Components
import Session from './domains/Session';
import SessionList from './domains/Session/components/List';
import {SpecialPermissionGate, PermissionGate} from './domains/Permission';

const Entrypoint = ({}) => {
  const {t} = useTranslation();
  const [serviceState, setServiceState] = useState();

  const {started = false, mode = 'INACTIVE', session} = serviceState || {};

  useEffect(() => {
    const callback = (json) => setServiceState(JSON.parse(json));

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
      <Header />
      <Content>
        <Text>mode: {mode}</Text>
        {session && <Session session={session} />}
        {!session && <SessionList />}
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

export default Entrypoint;

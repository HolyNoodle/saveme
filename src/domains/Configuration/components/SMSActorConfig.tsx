// React
import React from 'react';

// Third party
import {Icon, View} from 'native-base';
import {useTranslation} from 'react-i18next';
import {PERMISSIONS} from 'react-native-permissions';
import styled from 'styled-components';

// Components
import {InputArea, InputPhone} from '../../../components/Form';
import {PrimaryText, Row, SecondaryText} from '../../../components/Layout';
import {PermissionGate} from '../../Permission';

const PhoneIcon = styled(Icon)`
  width: 10%;
  transform: scale(0.85);
  margin-right: -10px;
`;
const Phone = styled(InputPhone)`
  width: 90%;
`;

interface SMSActorProps {
  message: string;
  number: string;
}
interface SMSActorConfigProps extends SMSActorProps {
  onChange: (actorConfiguration: {message: string, number: string}) => void;
}
const SMSActorConfig: React.FunctionComponent<SMSActorConfigProps> = ({
  message,
  number,
  onChange,
}) => {
  const {t} = useTranslation();
  const handleFieldChange = (field: string) => (value: string) => {
    onChange({message, number, [field]: value});
  };

  return (
    <PermissionGate permissions={[PERMISSIONS.ANDROID.SEND_SMS]}>
      <Row>
        <PhoneIcon type={'AntDesign'} name={'phone'} />
        <Phone
          value={number}
          placeholder={t('config:sms-number')}
          onChange={handleFieldChange('number')}
        />
      </Row>
      <View style={{marginTop: 18}}>
        <SecondaryText>{t('config:sms-message')}</SecondaryText>
        <InputArea value={message} onChange={handleFieldChange('message')} />
      </View>
    </PermissionGate>
  );
};

export const SMSActorDetails: React.FunctionComponent<SMSActorProps> = ({message, number}) => {
  const {t} = useTranslation();

  return (
    <>
      <PrimaryText size={'small'}>
        {number || t('config:sms-number-empty')}
      </PrimaryText>
      <SecondaryText
        numberOfLines={1}
        ellipsizeMode={'tail'}
        size={'small'}
        style={{flex: 1, marginLeft: 5}}>
        {message || t('config:sms-message-empty')}
      </SecondaryText>
    </>
  );
};

export default SMSActorConfig;

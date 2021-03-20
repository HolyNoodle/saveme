// React
import React, {useState} from 'react';

// Third party
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';
import {Alert, ToastAndroid} from 'react-native';

// Components
import {SecondaryButton, SecondaryButtonIcon} from '../../../components/Layout';
import {LoadingIcon} from '../../../components/Loader';

// State
import {useOvermind} from '../../../state';

// Types
import {Session} from 'src/types';

interface RemoveSessionIconButtonProps {
  session: Session;
}
const RemoveSessionIconButton: React.FunctionComponent<RemoveSessionIconButtonProps> = ({
  session,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [removing, setRemoving] = useState(false);
  const {
    actions: {
      sessions: {removeSession},
    },
  } = useOvermind();

  const handleRemove = async () => {
    try {
      await removeSession(session);
    } catch (ex) {
      ToastAndroid.show(t('session:remove-session-error'), ToastAndroid.SHORT);
      console.error(ex);
    }

    setRemoving(false);

    navigation.navigate('sessions', {screen: 'list'});
  };

  const handlePress = () => {
    setRemoving(true);
    Alert.alert(
      t('common:confirm-remove-title'),
      t('common:confirm-remove-message'),
      [
        {
          text: t('common:actions-cancel'),
          onPress: () => setRemoving(false),
        },
        {
          text: t('common:actions-ok'),
          onPress: handleRemove,
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setRemoving(false),
      },
    );
  };

  const icon = !removing ? (
    <SecondaryButtonIcon name="delete" type="MaterialIcons" />
  ) : (
    <LoadingIcon />
  );

  return (
    <SecondaryButton
      onPress={handlePress}
      icon={icon}
      style={{marginRight: 5}}
    />
  );
};

export default RemoveSessionIconButton;

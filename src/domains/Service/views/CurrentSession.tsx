// React
import React from 'react';

// Components
import Session from '../../Session/components/Session';

// State
import {useOvermind} from '../../../state';

interface SessionScreenProps {
  navigation: any
}

export const SessionScreen: React.FunctionComponent<SessionScreenProps> = ({
  navigation,
  ...props
}) => {
  const {
    state: {
      service: {session},
    },
  } = useOvermind();

  if (!session) {
    navigation && navigation.navigate('home', {screen: 'service'});
    return null;
  }

  return <Session {...props} session={session} />;
};

export default SessionScreen;

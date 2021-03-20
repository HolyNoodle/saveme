// React
import React from 'react';

// Components
import Session from '../components/Session';

// Types
import {Session as SessionType} from 'src/types';

interface SessionScreenProps {
  route: {params: {session: SessionType}};
}
export const SessionScreen: React.FunctionComponent<SessionScreenProps> = ({
  route: {
    params: {session},
  },
  ...props
}) => <Session {...props} session={session} />;

export default SessionScreen;

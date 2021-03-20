// React
import React, {useEffect} from 'react';

// Third party
import {List} from 'native-base';
import {useTranslation} from 'react-i18next';

// State
import {useOvermind} from '../../../state';

// Utils
import {convertJavaDateToMoment} from '../../../utils';

// Components
import Loader from '../../../components/Loader';
import {ListItem, PrimaryText} from '../../../components/Layout';
import {Session} from 'src/types';

interface SessionListScreenProps {
  navigation: any;
}
const SessionListScreen: React.FunctionComponent<SessionListScreenProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const {
    state: {
      sessions: {loading, invalid, sessions = {}},
    },
    actions: {
      sessions: {getSessions},
    },
  } = useOvermind();

  const handleOpenSession = (session: Session) => {
    navigation.navigate('sessions', {screen: 'details', params: {session}});
  };

  useEffect(() => {
    if (!invalid) return;

    getSessions();
  }, [invalid]);

  return (
    <>
      {loading && <Loader />}
      <List>
        {Object.values(sessions).map((item) => {
          const {startDate} = item as Session;
          return (
            <ListItem key={startDate} onPress={() => handleOpenSession(item as Session)}>
              <PrimaryText>
                {convertJavaDateToMoment(startDate).format(
                  t('common:long_date_format'),
                )}
              </PrimaryText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SessionListScreen;

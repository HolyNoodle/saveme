import React, {useState, useEffect} from 'react';

import * as RNFS from 'react-native-fs';
import {} from 'react-native';
import Sound from 'react-native-sound';

import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import {
  List,
  Container,
  Content,
  Text,
  Button,
  Icon,
  ListItem,
  Right,
} from 'native-base';
import {useTranslation} from 'react-i18next';
import {convertJavaDateToMoment} from '../../../../utils';

const SessionList = () => {
  const {t} = useTranslation();
  const [sessions, setSessions] = useState();
  const [playingSession, setPlayingSession] = useState();
  const [audio, setAudio] = useState();

  const handlePlay = (session) => {
    if (audio) {
      audio.stop();
      setPlayingSession();
      setAudio();
    }

    if (session !== playingSession) {
      const {sessionName} = session;

      const audioFile = sessionName + '/audio-record.mp4';
      const newAudio = new Sound(audioFile, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        setPlayingSession(session);
        setAudio(newAudio);

        newAudio.play(() => {
          setPlayingSession();
          setAudio();
        });
      });
    }
  };

  const handleDeleteFolder = (session) => {
    RNFS.unlink(session.sessionName);
    setSessions();
  };

  useEffect(() => {
    if (sessions !== undefined) {
      return;
    }

    RNFS.readDir(RNFS.DocumentDirectoryPath).then((folders) => {
      const promises = map(
        filter(folders, (f) => f.isDirectory()),
        async (folder) => {
          const filePath = folder.path + '/session.json';
          if (await RNFS.exists(filePath)) {
            return JSON.parse(
              await RNFS.readFile(folder.path + '/session.json', 'utf8'),
            );
          }

          return null;
        },
      );

      Promise.all(promises).then((listSessions) => {
        const filteredSessions = filter(listSessions, (s) => !!s);
        const processedSessions = map(filteredSessions, (s, index) => ({
          ...s,
          key: index,
          startDate: moment(s.startDate),
        }));

        setSessions(sortBy(processedSessions, 'startDate').reverse());
      });
    });
  }, [sessions]);

  return (
    <List>
      {map(sessions, (item) => {
        const {startDate} = item;
        return (
          <ListItem key={startDate}>
            <Text>
              {convertJavaDateToMoment(startDate).format(
                t('common:long_date_format'),
              )}
            </Text>
            <Button
              onPress={() => handlePlay(item)}
              rounded
              transparent
              icon
              primary>
              <Icon name={playingSession === item ? 'play' : 'stop'} />
            </Button>
            <Button
              onPress={() => handleDeleteFolder(item)}
              rounded
              icon
              transparent
              danger>
              <Icon name={'trash-outline'} />
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SessionList;

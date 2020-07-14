import React, {useState, useEffect} from 'react';

import * as RNFS from 'react-native-fs';
import {FlatList, Text, Button} from 'react-native';
import Sound from 'react-native-sound';

import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import moment from 'moment';

const SessionList = () => {
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
      const {folder} = session;

      const audioFile = folder + '/audio-recording.wav';
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
    RNFS.unlink(session.folder);
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
    <FlatList
      data={sessions}
      renderItem={({item = {}}) => {
        const {startDate, folder} = item;
        return (
          <Text>
            {moment(startDate).format('DD/MM/YYYY HH:mm')} -&gt; {folder}
            <Button
              title={playingSession === item ? 'stop' : 'play'}
              onPress={() => handlePlay(item)}
            />
            <Button title={'delete'} onPress={() => handleDeleteFolder(item)} />
          </Text>
        );
      }}
    />
  );
};

export default SessionList;

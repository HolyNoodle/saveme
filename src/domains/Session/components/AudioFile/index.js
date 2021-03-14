// React
import React, { useEffect, useState } from "react";

// Third party
import { Button, Text } from "native-base";
import { ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import Sound from "react-native-sound";

const AudioFile = ({ filePath }) => {
  const { t } = useTranslation();
  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioFile = filePath; ///sessionName + "/audio-record.mp4";
    const newAudio = new Sound(audioFile, "", (error) => {
      if (error) {
        ToastAndroid.show(t("common:error-audio-file-load"));
        console.error(error);
        return;
      }

      setAudio(newAudio);
    });

    return () => {
      setAudio();
      setIsPlaying(false);
    }
  }, [filePath])

  const handlePlayToggle = () => {
    if(!audio) {
      return;
    }

    if (isPlaying) {
      audio.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    audio.play(() => {
      audio.stop();
      setIsPlaying(false);
    });
  };

  return (
    <Button onPress={handlePlayToggle}>
      <Text>LISTEN</Text>
    </Button>
  );
};

export default AudioFile;

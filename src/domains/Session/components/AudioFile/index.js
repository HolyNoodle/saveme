// React
import React, { useEffect, useState } from "react";

// Third party
import { Icon, Text } from "native-base";
import { ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import Sound from "react-native-sound";
import * as RNFS from "react-native-fs";
import styled from "styled-components/native";

// Components
import { PrimaryButton, Row } from "../../../../components/Layout";

const StyledRow = styled(Row)`
  justify-content: center;
  margin: 8px 0;
`;

const AudioFile = ({ filePath }) => {
  const { t } = useTranslation();
  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    RNFS.exists(filePath).then((exists) => {
      if (!exists) {
        return;
      }

      const newAudio = new Sound(filePath, "", (error) => {
        if (error) {
          ToastAndroid.show(
            t("common:error-audio-file-load"),
            ToastAndroid.SHORT
          );
          console.error(error);
          return;
        }

        setAudio(newAudio);
      });
    });

    return () => {
      setAudio();
      setIsPlaying(false);
    };
  }, [filePath]);

  const handlePlayToggle = () => {
    if (!audio) {
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

  if (!audio) {
    return null;
  }

  const icon = isPlaying ? "stop-circle":"play-circle";

  return (
    <StyledRow>
      <PrimaryButton onPress={handlePlayToggle}>
        <Icon type={"Feather"} name={icon} />
        <Text>{t(`session:microphone-recording`)}</Text>
      </PrimaryButton>
    </StyledRow>
  );
};

export default AudioFile;

// React
import React, { useEffect, useState } from "react";

// Third party
import { Icon } from "native-base";
import { ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import Sound from "react-native-sound";
import * as RNFS from "react-native-fs";
import styled from "styled-components/native";

// Components
import { PrimaryButton, Row } from "../../../components/Layout";

const StyledRow = styled(Row)`
  justify-content: center;
  margin: 8px 0;
`;

interface AudioFileProps {
  filePath: string;
}
const AudioFile: React.FunctionComponent<AudioFileProps> = ({ filePath }) => {
  const { t } = useTranslation();
  const [audio, setAudio] = useState<Sound | undefined>();
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
      setAudio(undefined);
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

  const icon = isPlaying ? "stop-circle" : "play-circle";

  return (
    <StyledRow>
      <PrimaryButton
        onPress={handlePlayToggle}
        icon={<Icon type={"Feather"} name={icon} />}
      >
        {t(`session:microphone-recording`)}
      </PrimaryButton>
    </StyledRow>
  );
};

export default AudioFile;

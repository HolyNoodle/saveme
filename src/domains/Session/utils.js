// Third party
import * as RNFS from "react-native-fs";

export const removeSession = (session) => {
  return RNFS.unlink(session.sessionName);
};
export const getSessionAudioFilePath = ({sessionName}) => sessionName + "/audio-record.mp4";

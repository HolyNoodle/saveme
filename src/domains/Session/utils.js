// Third party
import * as RNFS from "react-native-fs";

export const getSessionList = () => {
  return new Promise((resolve, reject) => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((files) => {
        const folders = files.filter((f) => f.isDirectory());
        const promises = folders.map(async (folder) => {
          const filePath = folder.path + "/session.json";
          if (await RNFS.exists(filePath)) {
            return JSON.parse(
              await RNFS.readFile(folder.path + "/session.json", "utf8")
            );
          }

          return null;
        });

        Promise.all(promises)
          .then((listSessions) => {
            const filteredSessions = listSessions.filter((s) => !!s);
            const processedSessions = filteredSessions.map((s) => ({
              ...s,
              key: s.startDate,
            }));

            resolve(processedSessions);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};
export const removeSession = (session) => {
  return RNFS.unlink(session.sessionName);
};
export const getSessionAudioFilePath = ({sessionName}) => sessionName + "/audio-record.mp4";

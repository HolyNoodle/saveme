// Third party
import * as RNFS from "react-native-fs";

export const getSessionList = async () => {
  const files = await RNFS.readDir(RNFS.DocumentDirectoryPath)
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

  const listSessions = await Promise.all(promises);
  const filteredSessions = listSessions.filter((s) => !!s);
  const processedSessions = filteredSessions.map((s) => ({
    ...s,
    key: s.startDate,
  }));

  return processedSessions;
};
export const removeSession = (session) => {
  return RNFS.unlink(session.sessionName);
};
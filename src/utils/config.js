import * as RNFS from "react-native-fs";

export const readConfig = () =>
  RNFS.readFile(RNFS.DocumentDirectoryPath + "/config.json");

export const writeConfig = (config) =>
  new Promise((resolve, reject) => {
    RNFS.unlink(RNFS.DocumentDirectoryPath + "/config.json")
      .finally(() => {
        RNFS.writeFile(
          RNFS.DocumentDirectoryPath + "/config.json",
          JSON.stringify(config)
        )
          .then(resolve)
          .catch(reject);
      });
  });

// Third party
import * as RNFS from "react-native-fs";

// Types
import { Configuration } from "src/domains/Configuration/types";

export const readConfig = () =>
  RNFS.readFile(RNFS.DocumentDirectoryPath + "/config.json");

export const writeConfig = (config: Configuration) =>
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

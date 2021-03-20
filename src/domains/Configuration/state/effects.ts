// Third party
import * as RNFS from "react-native-fs";

export const readConfiguration = async () => { 
  const fileData = await RNFS.readFile(RNFS.DocumentDirectoryPath + "/config.json");
  return JSON.parse(fileData)
}

export const writeConfiguration = async (configuration) => {
  const filePath = RNFS.DocumentDirectoryPath + "/config.json";
  const exists = await RNFS.exists(filePath);

  if (exists) {
    await RNFS.unlink(filePath);
  }

  await RNFS.writeFile(filePath, JSON.stringify(configuration));
};

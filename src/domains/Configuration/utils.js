import * as RNFS from 'react-native-fs';

export const readConfiguration = () => {
  return new Promise((resolve) => {
    RNFS.readFile(`${RNFS.DocumentDirectoryPath}/config.json`, 'utf8').then(config => resolve(config)).catch(() => resolve({}))
  });
};
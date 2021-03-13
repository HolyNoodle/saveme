import React, { useState, useEffect } from 'react';

// Third party
import {
  Container,
  Content,
  Text,
  Button,
  Switch,
  Icon,
  View,
  Toast
} from 'native-base';
import { useTranslation } from 'react-i18next';
import * as RNFS from 'react-native-fs';

const Config = ({ }) => {
  const { t } = useTranslation();
  const [config, setConfig] = useState({});
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      RNFS.readFile(RNFS.DocumentDirectoryPath + "/config.json")
      .then(file => {
        setConfig(JSON.parse(file));
      })
      .catch(() => setConfig({}))
      .finally(() => {
        setInit(true);
      });
    }
  }, [init]);

  const handleFieldUpdate = (field) => (value) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
    RNFS.unlink(RNFS.DocumentDirectoryPath + "/config.json").then(() => {
      RNFS.writeFile(RNFS.DocumentDirectoryPath + "/config.json", JSON.stringify(newConfig))
        .catch(console.error);
    })
  };

  return (
    <View>
      {!init && (
        <Text>
          {t("common:loading")}
        </Text>
      )}
      {init && (
        <Text>
          {t("config:isMicrophoneRecorderEnabled")}
          <Switch
            value={config.isMicrophoneRecorderEnabled}
            onValueChange={handleFieldUpdate('isMicrophoneRecorderEnabled')}
          />
        </Text>
      )}
    </View>
  );
};

export default Config;
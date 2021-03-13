import React, { useState, useEffect } from 'react';

// Third party
import {
  Container,
  Content,
  Text,
  Switch,
  Icon,
  View
} from 'native-base';
import { useTranslation } from 'react-i18next';
import * as RNFS from 'react-native-fs';
import EntityList from '../../components/EntityList';
import TimelineItem from './components/TimelineItem';

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
        <View>
          <Text>{t("config:recorders")}</Text>
          <Text>
            {t("config:isMicrophoneRecorderEnabled")}
            <Switch
              value={config.isMicrophoneRecorderEnabled}
              onValueChange={handleFieldUpdate('isMicrophoneRecorderEnabled')}
            />
          </Text>
          <Text>
            {t("config:isGoelocationRecorderEnabled")}
            <Switch
              value={config.isGoelocationRecorderEnabled}
              onValueChange={handleFieldUpdate('isGoelocationRecorderEnabled')}
            />
          </Text>
          <Text>
            {t("config:isDevicesRecorderEnabled")}
            <Switch
              value={config.isDevicesRecorderEnabled}
              onValueChange={handleFieldUpdate('isDevicesRecorderEnabled')}
            />
          </Text>
          <EntityList 
            values={config.timeline} 
            onChange={handleFieldUpdate('timeline')} 
            translationSuffix={'actor'}
            component={TimelineItem}
          />
        </View>
      )}
    </View>
  );
};

export default Config;
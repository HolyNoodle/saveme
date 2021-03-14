import React, { useState, useEffect } from 'react';

// Third party
import { View, Separator } from 'native-base';
import { ToastAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';

// Utils
import { readConfig, writeConfig } from '../../utils/config';

// Components
import EntityList from '../../components/EntityList';
import TimelineItem from './components/TimelineItem';
import Loader from '../../components/Loader';
import Recorders from './components/Recorders';

const Config = ({ }) => {
  const { t } = useTranslation();
  const [config, setConfig] = useState({});
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      readConfig()
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
    writeConfig(newConfig).then(() => {
      ToastAndroid.show(t('config:saved'), ToastAndroid.SHORT)
    })
  };

  return (
    <View>
      {!init && <Loader />}
      {init && (
        <View>
          <Recorders config={config} onFieldUpdate={handleFieldUpdate} />
          <Separator />
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
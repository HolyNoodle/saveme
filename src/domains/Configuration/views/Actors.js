import React, { useState, useEffect } from 'react';

// Third party
import debounce from 'lodash/debounce';
import { View } from 'native-base';
import { ToastAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';

// Utils
import { readConfig, writeConfig } from '../../../utils/config';

// Components
import EntityList from '../../../components/EntityList';
import TimelineItem from '../components/TimelineItem';
import Loader from '../../../components/Loader';
import Recorders from '../components/Recorders';

const Configuation = () => {
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

  const handleFieldUpdate = (field) => debounce((value) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
    writeConfig(newConfig).then(() => {
      ToastAndroid.show(t('config:saved'), ToastAndroid.SHORT)
    })
  }, 500);

  return (
    <View>
      {!init && <Loader />}
      {init && (
        <View>
          <EntityList
            values={config.timeline.sort(({triggerTime: tA}, {triggerTime: tB}) => tA - tB)}
            onChange={handleFieldUpdate('timeline')}
            translationSuffix={'config'}
            component={TimelineItem}
          />
        </View>
      )}
    </View>
  );
};

export default Configuation;
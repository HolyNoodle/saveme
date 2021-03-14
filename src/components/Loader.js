import React from 'react';

// Third party
import { Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>
        {t("common:loading")}
      </Text>
    </View>
  );
};

export default Loader;
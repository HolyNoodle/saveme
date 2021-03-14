// React
import React from "react";

// Third party
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

const Geolocation = ({ longitude, latitude, altitude, speed }) => {
  const { t } = useTranslation();

  return <Text>{t('service:geolocation')} : {t('service:geolocation-log', {longitude, latitude, altitude, speed})}</Text>;
};

export default Geolocation;

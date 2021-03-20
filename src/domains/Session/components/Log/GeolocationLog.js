// React
import React, { useCallback } from "react";

// Third party
import { Linking, ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";

// Components
import {
  PrimaryText,
  SecondaryButton,
  SecondaryButtonIcon,
  SpacedRow,
} from "../../../../components/Layout";

const Geolocation = ({ longitude, latitude }) => {
  const { t } = useTranslation();
  const url = `https://www.google.com/maps/place/${latitude},${longitude}`;

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      ToastAndroid.show(
        t("session:geolocation-open-gmaps-error"),
        ToastAndroid.SHORT
      );
    }
  }, [url]);

  return (
    <SpacedRow>
      <PrimaryText>{t("session:geolocation")}</PrimaryText>
      <SecondaryButton
        onPress={handlePress}
        icon={<SecondaryButtonIcon type={"Entypo"} name={"location"} />}
      />
    </SpacedRow>
  );
};

export default Geolocation;

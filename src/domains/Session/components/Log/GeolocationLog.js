// React
import React, { useCallback } from "react";

// Third party
import { Linking, ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

// Components
import { SecondaryIconButton, PrimaryText } from "../../../../components/Layout";

const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding-right: 10px;
`;

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
    <StyledRow>
      <PrimaryText>{t("session:geolocation")}</PrimaryText>
      {/* <PrimaryTe<xt>{t('session:geolocation-details', {altitude, speed})}</PrimaryText> */}
      <SecondaryIconButton
        reversed
        type={"Entypo"}
        name={"location"}
        raised
        onPress={handlePress}
      />
    </StyledRow>
  );
};

export default Geolocation;

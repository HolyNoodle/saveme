// React
import React, {useCallback} from "react";

// Third party
import { Linking, ToastAndroid } from "react-native";
import { Button, Text } from "native-base";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding-right:10px;
`;

const Geolocation = ({ longitude, latitude }) => {
  const { t } = useTranslation();
  const url = `https://www.google.com/maps/place/${latitude},${longitude}`;

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      ToastAndroid.show(t('session:geolocation-open-gmaps-error'), ToastAndroid.SHORT);
    }
  }, [url]);

  return (
    <StyledRow>
      <Text>{t('session:geolocation')}</Text>
      {/* <Text>{t('session:geolocation-details', {altitude, speed})}</Text> */}
      <Button primary onPress={handlePress}>
        <Text>{t('session:geolocation-see-in-gmaps')}</Text>
      </Button>
    </StyledRow>
  );  
};

export default Geolocation;

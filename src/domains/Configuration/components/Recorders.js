import React from "react";

// Third party
import { H3 } from "native-base";
import { useTranslation } from "react-i18next";
import { PERMISSIONS, request, RESULTS } from "react-native-permissions";

// Components
import {
  ListItem,
  PrimaryText,
  SpacedRow,
  Switch,
} from "../../../components/Layout";

// State
import { useOvermind } from "../../../state";

const usePermissionGuard = (permissions) => (fn) => async (...args) => {
  if (args[0] === false) {
    fn(...args);
    return;
  }
  const isGranted = await permissions.reduce(async (acc, permission) => {
    const previousResult = await acc;

    if (!previousResult) {
      return previousResult;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  }, true);

  if (isGranted) {
    fn(...args);
  }
};

const Recorders = ({ configuration, onFieldUpdate }) => {
  useOvermind();

  const { t } = useTranslation();
  const audioGuard = usePermissionGuard([PERMISSIONS.ANDROID.RECORD_AUDIO]);
  const geolocationGuard = usePermissionGuard([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  ]);
  const deviceGuard = usePermissionGuard([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ]);

  return (
    <>
      <H3>{t("config:recorders")}</H3>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t("config:isMicrophoneRecorderEnabled")}</PrimaryText>
          <Switch
            value={configuration.isMicrophoneRecorderEnabled}
            onValueChange={audioGuard(
              onFieldUpdate("isMicrophoneRecorderEnabled")
            )}
          />
        </SpacedRow>
      </ListItem>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t("config:isGoelocationRecorderEnabled")}</PrimaryText>
          <Switch
            value={configuration.isGoelocationRecorderEnabled}
            onValueChange={geolocationGuard(
              onFieldUpdate("isGoelocationRecorderEnabled")
            )}
          />
        </SpacedRow>
      </ListItem>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t("config:isDevicesRecorderEnabled")}</PrimaryText>
          <Switch
            value={configuration.isDevicesRecorderEnabled}
            onValueChange={deviceGuard(
              onFieldUpdate("isDevicesRecorderEnabled")
            )}
          />
        </SpacedRow>
      </ListItem>
    </>
  );
};

export default Recorders;

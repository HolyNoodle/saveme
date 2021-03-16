import React from "react";

// Third party
import { H3 } from "native-base";
import { useTranslation } from "react-i18next";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

// Components
import { PermissionGate } from "../../Permission";
import {
  ListItem,
  PrimaryText,
  SpacedRow,
  Switch,
} from "../../../components/Layout";

const usePermissionGuard = (permissions) => (fn) => async (...args) => {
  console.log("guard", permissions, args);
  if (args[0] === false) {
    fn(...args);
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

const Recorders = ({ config, onFieldUpdate }) => {
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
            value={config.isMicrophoneRecorderEnabled}
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
            value={config.isGoelocationRecorderEnabled}
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
            value={config.isDevicesRecorderEnabled}
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

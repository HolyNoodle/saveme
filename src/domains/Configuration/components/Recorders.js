import React from "react";

// Third party
import { Switch, H3 } from "native-base";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "react-native-permissions";

// Components
import { PermissionGate } from "../../Permission";
import { ListItem, PrimaryText, SpacedRow } from "../../../components/Layout";

const Recorders = ({ config, onFieldUpdate }) => {
  const { t } = useTranslation();

  return (
    <>
      <H3>{t("config:recorders")}</H3>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t("config:isMicrophoneRecorderEnabled")}</PrimaryText>
          <PermissionGate
            permissions={[PERMISSIONS.ANDROID.RECORD_AUDIO]}
            force={true}
          >
            <Switch
              value={config.isMicrophoneRecorderEnabled}
              onValueChange={onFieldUpdate("isMicrophoneRecorderEnabled")}
            />
          </PermissionGate>
        </SpacedRow>
      </ListItem>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t("config:isGoelocationRecorderEnabled")}</PrimaryText>
          <PermissionGate
            permissions={[
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
              PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            ]}
            force={true}
          >
            <Switch
              value={config.isGoelocationRecorderEnabled}
              onValueChange={onFieldUpdate("isGoelocationRecorderEnabled")}
            />
          </PermissionGate>
        </SpacedRow>
      </ListItem>
      <ListItem>
        <SpacedRow>
          <PrimaryText>{t("config:isDevicesRecorderEnabled")}</PrimaryText>
          <PermissionGate
            permissions={[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]}
            force={true}
          >
            <Switch
              value={config.isDevicesRecorderEnabled}
              onValueChange={onFieldUpdate("isDevicesRecorderEnabled")}
            />
          </PermissionGate>
        </SpacedRow>
      </ListItem>
    </>
  );
};

export default Recorders;

import React from "react";

// Third party
import { Text, Switch, ListItem, H3 } from "native-base";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import { PERMISSIONS } from "react-native-permissions";

// Components
import { PermissionGate } from "../../Permission";

const Row = styled(ListItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 0;
  padding-left: 8px;
  padding-right: 8px;
`;

const Recorders = ({ config, onFieldUpdate }) => {
  const { t } = useTranslation();

  return (
    <>
      <H3>{t("config:recorders")}</H3>
      <Row>
        <Text>{t("config:isMicrophoneRecorderEnabled")}</Text>
        <PermissionGate
          permissions={[PERMISSIONS.ANDROID.RECORD_AUDIO]}
          force={true}
        >
          <Switch
            value={config.isMicrophoneRecorderEnabled}
            onValueChange={onFieldUpdate("isMicrophoneRecorderEnabled")}
          />
        </PermissionGate>
      </Row>
      <Row>
        <Text>{t("config:isGoelocationRecorderEnabled")}</Text>
        <PermissionGate
          permissions={[
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          ]}
          force={true}
        >
          <Switch
            value={config.isGoelocationRecorderEnabled}
            onValueChange={onFieldUpdate("isGoelocationRecorderEnabled")}
          />
        </PermissionGate>
      </Row>
      <Row>
        <Text>{t("config:isDevicesRecorderEnabled")}</Text>
        <PermissionGate
          permissions={[
            PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
          ]}
          force={true}
        >
          <Switch
            value={config.isDevicesRecorderEnabled}
            onValueChange={onFieldUpdate("isDevicesRecorderEnabled")}
          />
        </PermissionGate>
      </Row>
    </>
  );
};

export default Recorders;

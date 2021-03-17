// React
import React from "react";

// Third party
import { useTranslation } from "react-i18next";
import { useOvermind } from "../../../state";
import { Icon, Text } from "native-base";

// Components
import { PrimaryButton } from "../../../components/Layout";
import { sanitizeClassName } from "../../../utils";

const PermissionButton = ({ permission }) => {
  const { t } = useTranslation();
  const {
    state: {
      permissions: {
        [permission]: { loading },
      },
    },
    actions: {
      permissions: { requestPermission },
    },
  } = useOvermind();
  const handlePermissionRequest = () => {
    requestPermission(permission);
  };
  return (
    <PrimaryButton disabled={loading} onPress={handlePermissionRequest}>
      <Icon size={15} name={"security"} type={"MaterialIcons"} />
      <Text>{t("common:request-permissions")}</Text>
    </PrimaryButton>
  );
};

export default PermissionButton;

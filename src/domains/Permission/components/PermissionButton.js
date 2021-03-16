// React
import React from "react";

// Third party
import { useTranslation } from "react-i18next";
import { useOvermind } from "../../../state";
import { Icon } from "native-base";

// Components
import { PrimaryButton } from "../../../components/Layout";

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
    <PrimaryButton
      disabled={loading}
      icon={<Icon size={15} name={"security"} color={"white"} />}
      title={t("common:request-permission", { permission })}
      onPress={handlePermissionRequest}
    />
  );
};

export default PermissionButton;

// React
import React from "react";

// Third party
import { View } from "native-base";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from 'react-native-permissions';

// Components
import EditableField from "../../../components/EntityList/components/EditableField";
import { InputArea, InputPhone } from "../../../components/Form";
import { SecondaryText, SpacedRow } from "../../../components/Layout";
import { PermissionGate } from "../../Permission";

const SMSActorConfig = ({ edit = false, message, number, onChange }) => {
  const { t } = useTranslation();
  const handleFieldChange = (field) => (value) => {
    onChange({ message, number, [field]: value });
  };

  return (
    <PermissionGate permissions={[PERMISSIONS.ANDROID.SEND_SMS]} force={true}>
      <View>
        <SpacedRow style={{height: 50}}>
          <SecondaryText>{t("config:sms-number")}</SecondaryText>
          <EditableField
            editComponent={InputPhone}
            edit={edit}
            value={number}
            onChange={handleFieldChange("number")}
          />
        </SpacedRow>
        <View  style={{height: 125}}>
          <SecondaryText>{t("config:sms-message")}</SecondaryText>
          <EditableField
            editComponent={InputArea}
            edit={edit}
            value={message}
            onChange={handleFieldChange("message")}
          />
        </View>
      </View>
    </PermissionGate>
  );
};

export default SMSActorConfig;

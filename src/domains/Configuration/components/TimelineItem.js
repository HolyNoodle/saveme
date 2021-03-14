// React
import React from "react";

// Thrid party
import { useTranslation } from "react-i18next";
import { View, Text } from "native-base";

// Components
import EditActorConfig from "./ActorConfig";
import EditableField from "../../../components/EntityList/components/EditableField";
import { InputNumber } from "../../../components/Form";
import { Row } from "../../../components/Layout";

const TimelineItem = ({ edit, value = {}, onChange }) => {
  const { t } = useTranslation();
  const { triggerTime = 30 } = value || {};

  const handleFieldChange = (field) => (value) => {
    onChange({ ...value, [field]: value });
  };
  const handleActorChange = (actor) => {
    onChange({ ...value, ...actor });
  };

  return (
    <View>
      <Row>
        <Text>{t("config:trigger-time")}</Text>
        <EditableField
          value={triggerTime}
          edit={edit}
          editComponent={InputNumber}
          onChange={handleFieldChange("triggerTime")}
        />
      </Row>
      <View styled={{ flexDirection: "row" }}>
        <EditableField
          value={value || {}}
          edit={edit}
          editComponent={EditActorConfig}
          displayComponent={EditActorConfig}
          onChange={handleActorChange}
        />
      </View>
    </View>
  );
};

export default TimelineItem;

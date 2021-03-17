// React
import React from "react";

// Thrid party
import { useTranslation } from "react-i18next";
import { Text } from "native-base";
import styled from "styled-components";

// Components
import EditActorConfig from "./ActorConfig";
import EditableField from "../../../components/EntityList/components/EditableField";
import { InputNumber } from "../../../components/Form";
import { SpacedRow, AnimatedBorderView } from "../../../components/Layout";

const Container = styled(AnimatedBorderView)`
  display: flex;
  flex-direction: column;
  margin: 8px;
  border-width: 1;
  padding: 4px;
`;

const TimelineItem = ({ edit, value = {}, onChange }) => {
  const { t } = useTranslation();
  const { triggerTime = 30 } = value || {};

  const handleFieldChange = (field) => (newValue) => {
    onChange({ ...value, [field]: newValue });
  };
  const handleActorChange = (actor) => {
    onChange({ ...value, ...actor });
  };

  return (
    <>
      <SpacedRow style={{height: 50}}>
        <Text>{t("config:trigger-time")}</Text>
        <EditableField
          value={triggerTime}
          edit={edit}
          editComponent={InputNumber}
          onChange={handleFieldChange("triggerTime")}
        />
      </SpacedRow>
      <EditableField
        value={value || {}}
        edit={edit}
        editComponent={EditActorConfig}
        displayComponent={EditActorConfig}
        onChange={handleActorChange}
      />
    </>
  );
};

export default TimelineItem;

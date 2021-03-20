// React
import React, { useEffect, useState } from "react";

// Third party
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components";

// Components
import { SecondaryText, SpacedRow } from "../../../components/Layout";

// Utils
import { sanitizeClassName } from "../../../utils";

// Constants
import { actorComponents } from "../constants";
import { InputNumber } from "../../../components/Form";

const ActorView = styled.View`
  height: 100%;
  width: 100%;
  padding: 8px;
`;

const ActorPicker = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <Picker
      selectedValue={value}
      onValueChange={onChange}
      style={{ width: "70%" }}
    >
      {Object.keys(actorComponents).map((key) => key && (
        <Picker.Item
          key={key}
          label={t(`config:actor-${sanitizeClassName(key)}`)}
          value={key}
        />
      ))}
    </Picker>
  );
};

const EditableActorConfig = ({ edit = false, value = {}, onChange }) => {
  const { t } = useTranslation();
  const [triggerTime, setTriggerTime] = useState(value.triggerTime || "30");
  const [className, setClassName] = useState(value.className);
  const [extra, setExtra] = useState(value.extra);

  const { form: ActorConfig, getDefaultExtra } = actorComponents[className];

  useEffect(() => {
    onChange &&
      onChange({
        ...value,
        className,
        extra: getDefaultExtra ? getDefaultExtra(t) : {},
      });
  }, [className]);

  useEffect(() => {
    onChange && onChange({ ...value, triggerTime, className, extra });
  }, [className, triggerTime, extra]);

  return (
    <ActorView>
      <SpacedRow style={{ height: 50 }}>
        <ActorPicker value={className} onChange={setClassName} />
      </SpacedRow>
      <SpacedRow style={{ height: 50 }}>
        <SecondaryText>{t("config:trigger-time")}</SecondaryText>
        <InputNumber value={triggerTime} onChange={setTriggerTime} />
      </SpacedRow>

      {ActorConfig && (
        <ActorConfig edit={edit} {...extra} onChange={setExtra} />
      )}
    </ActorView>
  );
};

export default EditableActorConfig;

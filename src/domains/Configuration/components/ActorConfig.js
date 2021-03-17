// React
import React, { useEffect, useState } from "react";

// Third party
import { View } from "native-base";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

// Components
import SMSActorConfig from "./SMSActorConfig";
import EditableField from "../../../components/EntityList/components/EditableField";

// Utils
import { sanitizeClassName } from "../../../utils";
import { PrimaryText, SecondaryText, SpacedRow } from "../../../components/Layout";

const actorComponentMap = {
  "com.saveme.session.actors.SMSActor": SMSActorConfig,
};

const ActorPicker = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <Picker selectedValue={value} onValueChange={onChange} style={{width:'70%'}}>
      <Picker.Item
        key={"none"}
        label={t(`config:choose-actor`)}
        value={undefined}
      />
      {Object.keys(actorComponentMap).map((key) => (
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
  const [className, setClassName] = useState(value.className);
  const [extra, setExtra] = useState(value.extra);
  const ActorConfig = actorComponentMap[className];

  useEffect(() => {
    onChange && onChange({ ...value, className, extra });
  }, [className, extra]);

  return (
    <View>
      <SpacedRow style={{height: 50}}>
        <SecondaryText>{t("config:actor")}</SecondaryText>
        <EditableField
          edit={edit}
          value={className}
          onChange={setClassName}
          editComponent={ActorPicker}
          displayComponent={() => <PrimaryText>{t(`config:actor-${sanitizeClassName(className)}`)}</PrimaryText>}
        />
      </SpacedRow>

      {ActorConfig && (
        <ActorConfig edit={edit} {...extra} onChange={setExtra} />
      )}
    </View>
  );
};

export default EditableActorConfig;

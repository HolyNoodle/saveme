// React
import React, { useRef, useState } from "react";

// Third party
import { Icon, View } from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";

// Components
import EntityItem from "./components/Item";
import { PrimaryButton, PrimaryButtonText, Row } from "../Layout";

const EntityList = ({
  values = [],
  translationSuffix = "",
  onChange,
  component,
}) => {
  const { t } = useTranslation();
  const [adding, setAdding] = useState(false);
  const instanceIds = useRef(new Map()).current;

  const handleAddingClick = () => {
    setAdding(true);
  };
  const handleEditingChange = (oldEntity) => (entity) => {
    if (entity === null) {
      return;
    }

    const newValues = [...values];
    const index = newValues.findIndex((f) => f === oldEntity);
    if (entity) {
      newValues[index] = entity;
    } else {
      newValues.splice(index, 1);
    }

    onChange(newValues);
    setAdding(false);
  };
  const handleAddChange = (entity) => {
    entity.id = moment().valueOf();

    if (entity !== null) {
      onChange([...values, entity]);
    }
    setAdding(false);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      {adding && (
        <EntityItem
          edit={true}
          onChange={handleAddChange}
          component={component}
        />
      )}
      {!adding && (
        <Row style={{ margin: 8 }}>
          <PrimaryButton
            raised
            onPress={handleAddingClick}
            style={{ marginTopWidth: 8, marginBottomWidth: 8 }}
            icon={<Icon type={"AntDesign"} name={"pluscircleo"} />}
          >
            <PrimaryButtonText>
              {t(`${translationSuffix}:entity-add`)}
            </PrimaryButtonText>
          </PrimaryButton>
        </Row>
      )}
      {values &&
        values.map((entity) => (
          <EntityItem
            key={entity.id}
            value={entity}
            edit={false}
            onChange={handleEditingChange(entity)}
            component={component}
          />
        ))}
    </View>
  );
};

export default EntityList;

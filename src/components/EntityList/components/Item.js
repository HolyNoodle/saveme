// React
import React, { useState } from "react";

// Third party
import { useTranslation } from "react-i18next";
import { View, Text } from "native-base";
import {
  AnimatedBorderView,
  PrimaryButton,
  SecondaryButton,
  SpacedRow,
} from "../../Layout";
import styled from "styled-components/native";

const StyledBorderView = styled(AnimatedBorderView)`
  margin: 8px;
  padding: 8px;
`;

const EntityItem = ({
  value,
  component: Component,
  onChange,
  edit = false,
}) => {
  const { t } = useTranslation();
  const [item, setItem] = useState(value);
  const [editing, setEditing] = useState(edit);

  const handleItemChange = (item) => {
    setItem(item);
  };
  const handleEditClick = () => {
    setItem(value);
    setEditing(true);
  };
  const handleSaveClick = () => {
    onChange(item);
    setEditing(false);
  };
  const handleCancelClick = () => {
    onChange(null);
    setEditing(false);
  };
  const handleRemoveClick = () => {
    onChange();
    setEditing(false);
  };

  return (
    <StyledBorderView active={editing} style={{margin: 8}}>
      <Component edit={editing} value={item} onChange={handleItemChange} />
      {editing && (
        <SpacedRow style={{marginTopWidth: 8, marginBottomWidth: 8}}>
          <PrimaryButton primary onPress={handleSaveClick}>
            <Text>{t("common:actions-save")}</Text>
          </PrimaryButton>
          <SecondaryButton danger onPress={handleCancelClick}>
            <Text>{t("common:actions-cancel")}</Text>
          </SecondaryButton>
        </SpacedRow>
      )}
      {!editing && (
        <SpacedRow style={{marginTopWidth: 8, marginBottomWidth: 8}}>
          <PrimaryButton primary onPress={handleEditClick}>
            <Text>{t("common:actions-edit")}</Text>
          </PrimaryButton>
          <SecondaryButton danger onPress={handleRemoveClick}>
            <Text>{t("common:actions-remove")}</Text>
          </SecondaryButton>
        </SpacedRow>
      )}
    </StyledBorderView>
  );
};

export default EntityItem;

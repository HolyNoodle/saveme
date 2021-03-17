// React
import React, { useState } from "react";

// Third party
import { useTranslation } from "react-i18next";
import { Icon, Text } from "native-base";
import {
  AnimatedBorderView,
  GhostSecondaryButton,
  PrimaryButton,
  SpacedRow,
  SecondaryGhostButtonText,
  PrimaryButtonText,
} from "../../Layout";
import styled from "styled-components/native";
import { Alert } from "react-native";

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
    Alert.alert(
      t("common:confirm-remove-title"),
      t("common:confirm-remove-message"),
      [
        {
          text: t("common:actions-cancel"),
          onPress: () => setEditing(false),
        },
        {
          text: t("common:actions-ok"),
          onPress: () => {
            onChange();
            setEditing(false);
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setEditing(false),
        onPress: () => setEditing(false),
      }
    );
  };

  return (
    <StyledBorderView active={editing} style={{ margin: 8 }}>
      <Component edit={editing} value={item} onChange={handleItemChange} />
      {editing && (
        <SpacedRow style={{ marginTopWidth: 8, marginBottomWidth: 8 }}>
          <PrimaryButton
            onPress={handleSaveClick}
            icon={<Icon type={"Feather"} name={"save"} />}
          >
            {t("common:actions-save")}
          </PrimaryButton>
          <GhostSecondaryButton onPress={handleCancelClick}>
            <SecondaryGhostButtonText>
              {t("common:actions-cancel")}
            </SecondaryGhostButtonText>
          </GhostSecondaryButton>
        </SpacedRow>
      )}
      {!editing && (
        <SpacedRow style={{ marginTopWidth: 8, marginBottomWidth: 8 }}>
          <PrimaryButton
            onPress={handleEditClick}
            icon={<Icon type={"Feather"} name={"edit"} />}
          >
            {t("common:actions-edit")}
          </PrimaryButton>
          <GhostSecondaryButton onPress={handleRemoveClick}>
            {t("common:actions-remove")}
          </GhostSecondaryButton>
        </SpacedRow>
      )}
    </StyledBorderView>
  );
};

export default EntityItem;

// React
import React, { FunctionComponent, useState } from "react";

// Third party
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import { Alert, TouchableHighlight } from "react-native";

// Components
import {
  AnimatedBorderView,
  GhostSecondaryButton,
  GhostSecondaryButtonIcon,
  Row,
} from "../../Layout";

// Types
import { EntityItem as EntityItemProps, ObjectWithId } from "../types";

const StyledBorderView = styled(AnimatedBorderView)`
  margin: 8px;
  padding: 8px;
`;

const EntityItem: FunctionComponent<EntityItemProps> = ({
  value,
  component: Component,
  onChange,
  edit = false,
}) => {
  const { t } = useTranslation();
  const [item, setItem] = useState<ObjectWithId | undefined>(value);
  const [editing, setEditing] = useState<boolean>(edit);

  const handleItemChange = (item?: ObjectWithId) => {
    setItem(item);
    onChange(item);
    setEditing(false);
  };
  const handleEditClick = () => {
    setItem(value);
    setEditing(true);
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
      }
    );
  };

  return (
    <TouchableHighlight onPress={handleEditClick}>
      <StyledBorderView>
        <Row>
          <Component edit={editing} value={item} onChange={handleItemChange} />
          <GhostSecondaryButton
            size={'small'}
            onPress={handleRemoveClick}
            icon={
              <GhostSecondaryButtonIcon type={"AntDesign"} name={"delete"} />
            }
          />
        </Row>
      </StyledBorderView>
    </TouchableHighlight>
  );
};

export default EntityItem;

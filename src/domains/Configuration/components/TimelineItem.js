// React
import React, { useState } from "react";

// Thrid party
import { useTheme } from "styled-components/native";
import { useTranslation } from "react-i18next";

// Components
import EditActorConfig from "./ActorConfig";
import {
  GhostSecondaryButton,
  PrimaryButton,
  PrimaryButtonIcon,
  SecondaryText,
} from "../../../components/Layout";
import Modal from "../../../components/Layout/Modal";

// Constants
import { actorComponents } from "../constants";
import styled from "styled-components";

const DetailsContainer = styled.View`
  flex-direction: row;
  width: 60%;
`;

const TimelineItem = ({ edit: modalVisible, value = {}, onChange }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [actorConfiguraton, setActorConfiguration] = useState(value);
  const { className, triggerTime = "30", extra = {} } = actorConfiguraton;

  const handleActorSave = () => {
    onChange({ ...value, ...actorConfiguraton });
  };
  const handleActorChange = (actor) => {
    setActorConfiguration(actor);
  };
  const handleModalClose = () => {
    onChange(value);
  };

  const { icon: IconComponent, details: DetailsComponent } = actorComponents[
    className
  ];
  return (
    <>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        actions={
          <>
            <PrimaryButton
              onPress={handleActorSave}
              icon={<PrimaryButtonIcon type={"Feather"} name={"save"} />}
            >
              {t("common:actions-save")}
            </PrimaryButton>
            <GhostSecondaryButton onPress={handleModalClose}>
              {t("common:actions-cancel")}
            </GhostSecondaryButton>
          </>
        }
      >
        <EditActorConfig
          value={actorConfiguraton}
          onChange={handleActorChange}
        />
      </Modal>
      <SecondaryText size={"small"}>+{triggerTime}s</SecondaryText>
      <IconComponent style={{ color: theme.ACTIVE_COLOR }} />
      <DetailsContainer>
        {DetailsComponent && <DetailsComponent {...extra} />}
      </DetailsContainer>
    </>
  );
};

export default TimelineItem;

// React
import React, {useState} from 'react';

// Thrid party
import {useTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';

// Components
import EditActorConfig from './ActorConfig';
import {
  GhostSecondaryButton,
  PrimaryButton,
  PrimaryButtonIcon,
  SecondaryText,
} from '../../../components/Layout';
import Modal from '../../../components/Layout/Modal';

// Constants
import {actorComponents} from '../constants';
import styled from 'styled-components/native';

// Types
import {TimelineItem} from '../types';
import {Theme} from 'src/types';
import {EntityItemComponent} from 'src/components/EntityList/types';

const DetailsContainer = styled.View`
  flex-direction: row;
  width: 60%;
`;

const TimelineItemComponent: React.FunctionComponent<EntityItemComponent> = ({
  edit: modalVisible,
  value,
  onChange,
}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const [actorConfiguraton, setActorConfiguration] = useState<TimelineItem>(value as TimelineItem || {});
  const {className, triggerTime = '30', extra = {}} = actorConfiguraton || {};

  const handleActorSave = () => {
    onChange({...value, ...actorConfiguraton});
  };
  const handleActorChange = (actor: TimelineItem) => {
    setActorConfiguration(actor);
  };
  const handleModalClose = () => {
    onChange(value);
  };

  const {icon: IconComponent, details: DetailsComponent} = actorComponents[
    className
  ];
  return (
    <>
      <Modal
        visible={modalVisible}
        onRequestClose={handleModalClose}
        actions={
          <>
            <PrimaryButton
              onPress={handleActorSave}
              icon={<PrimaryButtonIcon type={'Feather'} name={'save'} />}>
              {t('common:actions-save')}
            </PrimaryButton>
            <GhostSecondaryButton onPress={handleModalClose}>
              {t('common:actions-cancel')}
            </GhostSecondaryButton>
          </>
        }>
        <EditActorConfig
          edit={false}
          value={actorConfiguraton}
          onChange={handleActorChange}
        />
      </Modal>
      <SecondaryText size={'small'}>+{triggerTime}s</SecondaryText>
      <IconComponent style={{color: theme.ACTIVE_COLOR}} />
      <DetailsContainer>
        {DetailsComponent && <DetailsComponent {...extra} />}
      </DetailsContainer>
    </>
  );
};

export default TimelineItemComponent;

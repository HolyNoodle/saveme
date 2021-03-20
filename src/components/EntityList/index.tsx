// React
import React, {FunctionComponent, useState} from 'react';

// Third party
import {Icon, View} from 'native-base';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

// Components
import EntityItem from './components/Item';
import {PrimaryButton, Row} from '../Layout';

// Types
import { EntityListProps, ObjectWithId} from './types';

const EntityList: FunctionComponent<EntityListProps> = ({
  values = [],
  translationSuffix = '',
  onChange,
  component,
}) => {
  const {t} = useTranslation();
  const [adding, setAdding] = useState(false);

  const handleAddingClick = () => {
    setAdding(true);
  };
  const handleEditingChange = (oldEntity: ObjectWithId) => (
    entity?: ObjectWithId,
  ) => {
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

    onChange && onChange(newValues);
    setAdding(false);
  };
  const handleAddChange = (entity?: ObjectWithId) => {
    const obj: ObjectWithId = entity || {id: moment().valueOf()};
    onChange && onChange([...values, obj]);
    setAdding(false);
  };

  return (
    <View style={{flexDirection: 'column'}}>
      {adding && (
        <EntityItem
          edit={true}
          onChange={handleAddChange}
          component={component}
        />
      )}
      {!adding && (
        <Row style={{margin: 8}}>
          <PrimaryButton
            onPress={handleAddingClick}
            style={{marginTop: 8, marginBottom: 8}}
            icon={<Icon type={'AntDesign'} name={'pluscircleo'} />}>
            {t(`${translationSuffix}:entity-add`)}
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

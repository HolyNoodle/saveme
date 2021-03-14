// React
import React, {useState} from 'react';

// Third party
import { Button, View, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

// Components
import EntityItem from './components/Item';

const EntityList = ({ values = [], translationSuffix = '', onChange, component }) => {
  const { t } = useTranslation();
  const [adding, setAdding] = useState(false);

  const handleAddingClick = () => {
    setAdding(true);
  };
  const handleEditingChange = (oldEntity) => (entity) => {
    if(entity === null) {
      return;
    }

    const newValues = [...values];
    const index = newValues.findIndex(f => f === oldEntity);
    if(entity) {
      newValues[index] = entity;
    }
    else {
      newValues.splice(index, 1);
    }

    onChange(newValues);
  };
  const handleAddChange = (entity) => {
    if(entity !== null) {
      onChange([...values, entity]);
    }
    setAdding(false);
  }

  return (
    <View style={{ flexDirection: 'column' }}>
      {values && values.map((entity, index) => (
        <EntityItem key={index} value={entity} edit={false} onChange={handleEditingChange(entity)} component={component} />
      ))}
      {adding && (
        <EntityItem edit={true} onChange={handleAddChange} component={component} />
      )}
      {!adding && (
        <Button primary onPress={handleAddingClick}>
          <Text>{t(`${translationSuffix}:entity-add`)}</Text>
        </Button>
      )}
    </View>
  )
}

export default EntityList;
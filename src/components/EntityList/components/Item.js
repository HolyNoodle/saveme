// React
import React, {useState} from 'react';

// Third party
import { useTranslation } from 'react-i18next';
import { Button, View, Text } from 'native-base';

const EntityItem = ({value, component: Component, onChange, edit = false}) => {
  const {t} = useTranslation();
  const [item, setItem] = useState(value);
  const [editing, setEditing] = useState(edit);

  const handleEditClick = () => {
    setEditing(true);
  }
  const handleSaveClick = () => {
    onChange(item);
    setEditing(false);
  }
  const handleCancelClick = () => {
    onChange(null);
    setEditing(false);
  }
  const handleRemoveClick = () => {
    onChange();
    setEditing(false);
  }


  return (
    <View>
      <Component edit={editing} value={item} onChange={setItem} />
      {editing && (
        <View>
          <Button primary onPress={handleSaveClick}><Text>{t('common:actions-save')}</Text></Button>
          <Button danger onPress={handleCancelClick}><Text>{t('common:actions-cancel')}</Text></Button>
        </View>
      )}
      {!editing && (
        <View>
          <Button primary onPress={handleEditClick}><Text>{t('common:actions-edit')}</Text></Button>
          <Button danger onPress={handleRemoveClick}><Text>{t('common:actions-remove')}</Text></Button>
        </View>
      )}
    </View>
  )
}

export default EntityItem;
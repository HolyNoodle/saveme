// React
import React from 'react';

// Third party
import { Text } from 'native-base';

const EditableField = ({edit, editComponent: EditComponent, displayComponent: DisplayComponent, ...props}) => edit ? (
  <EditComponent {...props} edit={edit} />
) : DisplayComponent ? <DisplayComponent edit={edit} {...props} /> : <Text>{props.value}</Text>;

export default EditableField;
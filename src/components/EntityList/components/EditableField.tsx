// React
import React from 'react';

// Components
import { PrimaryText } from '../../Layout';

const EditableField = ({edit, editComponent: EditComponent, displayComponent: DisplayComponent, ...props}) => edit ? (
  <EditComponent {...props} edit={edit} />
) : DisplayComponent ? <DisplayComponent edit={edit} {...props} /> : <PrimaryText>{props.value}</PrimaryText>;

export default EditableField;
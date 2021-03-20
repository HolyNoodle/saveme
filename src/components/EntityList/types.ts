import React from 'react';

export interface ObjectWithId {
  id: string | number;
}
export interface EntityListProps {
  values?: Array<ObjectWithId>;
  translationSuffix?: string;
  onChange?: (item: Array<ObjectWithId & any>) => void;
  component: React.FunctionComponent<EntityItemComponentProps>;
}
export interface EntityItemProps {
  value?: ObjectWithId;
  component: React.FunctionComponent<EntityItemComponentProps>;
  onChange: (item?: ObjectWithId & any) => void;
  edit?: boolean;
}
export interface EntityItemComponentProps {
  edit?: boolean;
  value?: ObjectWithId;
  onChange: (item?: ObjectWithId & any) => void;
}
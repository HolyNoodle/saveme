import React from 'react';

export interface ObjectWithId {
  id: string | number;
}
export interface EntityList {
  values?: Array<ObjectWithId>;
  translationSuffix?: string;
  onChange?: (item: Array<ObjectWithId & any>) => void;
  component: React.FunctionComponent<EntityItemComponent>;
}
export interface EntityItem {
  value?: ObjectWithId;
  component: React.FunctionComponent<EntityItemComponent>;
  onChange: (item?: ObjectWithId & any) => void;
  edit?: boolean;
}
export interface EntityItemComponent {
  edit?: boolean;
  value?: ObjectWithId;
  onChange: (item?: ObjectWithId & any) => void;
}
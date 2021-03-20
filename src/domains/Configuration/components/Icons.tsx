// React
import React from 'react';

// Third party
import { Icon, NativeBase } from 'native-base';

export const Unknown: React.FunctionComponent<NativeBase.Icon> = (props) => (
  <Icon {...props} type={'AntDesign'} name={'question'} />
);
export const SMS: React.FunctionComponent<NativeBase.Icon> = (props) => (
  <Icon {...props} type={'FontAwesome5'} name={'sms'} />
);
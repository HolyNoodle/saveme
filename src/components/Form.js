// React
import React from "react";

// Third party
import { TextInput } from "react-native";
import styled from "styled-components/native";


export const NormedInput = ({onChange, ...props}) => (
  <TextInput
    {...props}
    onChange={(event) => onChange && onChange(event.nativeEvent.text)}
  />
);

const StyleTextInput = styled(NormedInput)`
  border-bottom-width: 1px;
  width: 25%;
`;
const StyleTextArea = styled(StyleTextInput)`
  width: 100%;
`;

export const InputNumber = (props) => (
  <StyleTextInput
    {...props}
    keyboardType="numeric"
  />
);
export const InputPhone = (props) => (
  <StyleTextInput
    {...props}
    keyboardType="phone-pad"
  />
);
export const InputArea = (props) => (
  <StyleTextArea
    {...props}
    numberOfLines={4}
    multiline={true}
  />
);
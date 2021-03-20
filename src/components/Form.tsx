// React
import React, { useRef } from "react";

// Third party
import { Animated, Easing, TextInput as ReactTextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

// Types
import { Theme } from "src/types";

export type NormedInputProps = Omit<TextInputProps, 'onChange'> & {
  onChange: (value: string) => void
}

export const NormedInput: React.FunctionComponent<NormedInputProps> = React.forwardRef<ReactTextInput, NormedInputProps>(({ onChange, ...props }, ref) => (
  <ReactTextInput
    ref={ref}
    {...props}
    onChange={(event) => onChange && onChange(event.nativeEvent.text)}
  />
));

const StyledTextInput = styled(NormedInput)`
  border-bottom-width: 1px;
  border-radius: 12px;
  min-width: 25%;
  padding: 8px;
`;
const AnimatedStyleTextInput = Animated.createAnimatedComponent(
  StyledTextInput
);
const TextInput: React.FunctionComponent<NormedInputProps> = (props) => {
  const theme = useTheme() as Theme;
  const color = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(color, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = () => {
    Animated.timing(color, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.INACTIVE_COLOR, theme.ACTIVE_COLOR],
  });

  return (
    <AnimatedStyleTextInput
      {...props}
      style={[props.style, { borderColor }]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

const StyleTextArea = styled(TextInput)`
  width: 100%;
`;

export const InputNumber: React.FunctionComponent<NormedInputProps> = (props) => (
  <TextInput {...props} keyboardType="numeric" />
);
export const InputPhone: React.FunctionComponent<NormedInputProps> = (props) => (
  <TextInput {...props} keyboardType="phone-pad" />
);
export const InputArea: React.FunctionComponent<NormedInputProps> = (props) => (
  <StyleTextArea {...props} numberOfLines={4} multiline={true} />
);

// React
import React, { useRef, useEffect } from "react";

// Third party
import { Animated, Easing, TextInput as ReactTextInput } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

export const NormedInput = React.forwardRef(({ onChange, ...props }, ref) => (
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
const TextInput = (props) => {
  const theme = useTheme();
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

export const InputNumber = (props) => (
  <TextInput {...props} keyboardType="numeric" />
);
export const InputPhone = (props) => (
  <TextInput {...props} keyboardType="phone-pad" />
);
export const InputArea = (props) => (
  <StyleTextArea {...props} numberOfLines={4} multiline={true} />
);

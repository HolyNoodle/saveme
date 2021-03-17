// React
import React, { useEffect, useRef } from "react";

// Third party
import {
  Button,
  ListItem as ReactListItem,
  Switch as ReactSwitch,
} from "native-base";
import styled, { useTheme } from "styled-components/native";
import { Animated, Easing } from "react-native";

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const SpacedRow = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;
export const Col = styled.View`
  display: flex;
  flex-direction: column;
`;
export const PrimaryText = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`;
export const SecondaryText = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`;
export const ListItem = styled(ReactListItem)`
  margin-left: 0;
  padding-left: 8px;
  padding-right: 8px;
`;
export const StyledButton = styled(Button)`
  height: 36px;
  min-width: 36px;
  border-radius: 21px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
`;
export const PrimaryButton = styled(StyledButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryButton = styled(StyledButton)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;
export const Switch = ({ value, ...props }) => {
  const theme = useTheme();
  const inactiveColor = "rgba(180,180,180,1)";

  return (
    <ReactSwitch
      trackColor={{
        true: theme.PRIMARY_BUTTON_BACKGROUND_COLOR,
        false: inactiveColor,
      }}
      value={value}
      thumbColor={value ? theme.PRIMARY_BUTTON_BACKGROUND_COLOR : inactiveColor}
      {...props}
    />
  );
};
export const AnimatedBorderView = ({ active = false, children }) => {
  const theme = useTheme();
  const color = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(color, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(color, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);

  const borderColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.INACTIVE_COLOR, theme.ACTIVE_COLOR],
  });

  return (
    <Animated.View style={[{ borderColor, borderWidth: 1, margin: 8, padding: 8 }]}>
      {children}
    </Animated.View>
  );
};

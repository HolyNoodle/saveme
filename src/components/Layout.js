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
  font-size: 18px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`;
export const SecondaryText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`;
export const ButtonText = styled(PrimaryText)`
  font-size: 16px;
  text-transform: uppercase;
`;
export const PrimaryButtonText = styled(ButtonText)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_TEXT_COLOR};
`;
export const SecondaryButtonText = styled(ButtonText)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_TEXT_COLOR};
`;
export const PrimaryGhostButtonText = styled(ButtonText)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryGhostButtonText = styled(ButtonText)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;

export const ListItem = styled(ReactListItem)`
  margin-left: 0;
  padding-left: 8px;
  padding-right: 8px;
`;
export const StyledButton = styled(Button)`
  height: 36px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;
export const PrimaryButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;
const IconContainer = styled.View`
  margin: 0;
  padding: 0;
  margin-left:-15px;
  margin-right: -10px;
  transform: scale(0.85);
`;
export const PrimaryButton = ({ children, icon, ...props }) => (
  <PrimaryButtonStyle {...props}>
    {icon && <IconContainer>{icon}</IconContainer>}
    <PrimaryButtonText>{children}</PrimaryButtonText>
  </PrimaryButtonStyle>
);
export const SecondaryButton = ({ children, icon, ...props }) => (
  <SecondaryButtonStyle {...props}>
    {icon && <IconContainer>{icon}</IconContainer>}
    <SecondaryButtonText>{children}</SecondaryButtonText>
  </SecondaryButtonStyle>
);
export const PrimaryGhostButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
  border-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
  border-width: 1;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`;

export const SecondaryGhostButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
  border-color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
  border-width: 1;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`;
export const GhostPrimaryButton = ({ children, icon, ...props }) => (
  <PrimaryGhostButtonStyle {...props}>
    {icon && <IconContainer>{icon}</IconContainer>}
    <PrimaryGhostButtonText>{children}</PrimaryGhostButtonText>
  </PrimaryGhostButtonStyle>
);
export const GhostSecondaryButton = ({ children, icon, ...props }) => (
  <SecondaryGhostButtonStyle {...props}>
    {icon && <IconContainer>{icon}</IconContainer>}
    <SecondaryGhostButtonText>{children}</SecondaryGhostButtonText>
  </SecondaryGhostButtonStyle>
);
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
    <Animated.View
      style={[{ borderColor, borderWidth: 1, margin: 8, padding: 8, borderRadius: 8 }]}
    >
      {children}
    </Animated.View>
  );
};

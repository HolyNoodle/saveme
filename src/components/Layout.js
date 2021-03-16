// React
import React from "react";

// Third party
import {
  Button,
  Icon,
  ListItem as ReactListItem,
  Switch as ReactSwitch,
} from "native-base";
import styled, { useTheme } from "styled-components/native";

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
  font-size: 18px;
  padding: 12px;
  height: 42px;
  border-radius: 21px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const PrimaryButton = styled(StyledButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryButton = styled.Button`
`;
export const IconButton = styled(Icon)`
  font-size: 18px;
  padding: 12px;
  width: 42px;
  height: 42px;
  border-radius: 21px;
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

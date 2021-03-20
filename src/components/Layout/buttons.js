// React
import React from "react";

// Third party
import { Button, Icon } from "native-base";
import styled from "styled-components/native";

// Components
import { PrimaryText } from "./texts";

export const ButtonText = styled(PrimaryText)`
  font-size: 16px;
  text-transform: uppercase;
  margin-left: 10px;
  margin-right: 10px;
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
export const StyledButton = styled(Button)`
  height: 36px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  transform: scale(${({size = 'normal', theme}) => theme.BUTTON_SIZE[size]});

`;
export const PrimaryButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;
export const PrimaryGhostButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
  border-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
  border-width: 1px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`;

export const SecondaryGhostButtonStyle = styled(StyledButton)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
  border-color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
  border-width: 1px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`;
export const GenericButton = ({
  children,
  icon,
  buttonStyle: ButtonStyle,
  textStyle: TextStyle,
  ...props
}) => (
  <ButtonStyle {...props}>
    {icon}
    {children && <TextStyle>{children}</TextStyle>}
  </ButtonStyle>
);
export const PrimaryButton = (props) => (
  <GenericButton
    {...props}
    buttonStyle={PrimaryButtonStyle}
    textStyle={PrimaryButtonText}
  />
);
export const SecondaryButton = (props) => (
  <GenericButton
    {...props}
    buttonStyle={SecondaryButtonStyle}
    textStyle={SecondaryButtonText}
  />
);
export const GhostPrimaryButton = (props) => (
  <GenericButton
    {...props}
    buttonStyle={PrimaryGhostButtonStyle}
    textStyle={PrimaryGhostButtonText}
  />
);
export const GhostSecondaryButton = (props) => (
  <GenericButton
    {...props}
    buttonStyle={SecondaryGhostButtonStyle}
    textStyle={SecondaryGhostButtonText}
  />
);
export const IconButtonStyle = styled(Icon)`
  margin: 0px;
  margin-left: -5px;
  margin-right: -5px;
  transform: scale(0.85);
`;
export const PrimaryButtonIcon = styled(IconButtonStyle)`
  color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`;
export const SecondaryButtonIcon = styled(IconButtonStyle)`
  color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`;
export const GhostPrimaryButtonIcon = styled(IconButtonStyle)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const GhostSecondaryButtonIcon = styled(IconButtonStyle)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;

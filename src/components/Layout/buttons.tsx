// React
import React from 'react';

// Third party
import {Button, Icon, NativeBase} from 'native-base';
import styled from 'styled-components/native';

// Components
import {PrimaryText} from './texts';

// Utils
import {scaleItem} from './utils';

export const ButtonText = styled(PrimaryText)`
  font-size: 16px;
  text-transform: uppercase;
  margin-left: 10px;
  margin-right: 10px;
`;
export const PrimaryButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.PRIMARY_BUTTON_TEXT_COLOR};
`;
export const SecondaryButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.SECONDARY_BUTTON_TEXT_COLOR};
`;
export const PrimaryGhostButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryGhostButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
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
  ${scaleItem};
`;
export const PrimaryButtonStyle = styled(StyledButton)`
  color: ${({theme}) => theme.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${({theme}) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryButtonStyle = styled(StyledButton)`
  color: ${({theme}) => theme.SECONDARY_BUTTON_TEXT_COLOR};
  background-color: ${({theme}) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;
export const PrimaryGhostButtonStyle = styled(StyledButton)`
  color: ${({theme}) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
  border-color: ${({theme}) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
  border-width: 1px;
  background-color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
`;

export const SecondaryGhostButtonStyle = styled(StyledButton)`
  color: ${({theme}) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
  border-color: ${({theme}) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
  border-width: 1px;
  background-color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
`;

export interface GenericButtonExternalProps extends NativeBase.Button, SizableElement {
  icon?: any;
}
export interface GenericButtonProps extends GenericButtonExternalProps {
  buttonStyle: any;
  textStyle: any;
}
export const GenericButton: React.FunctionComponent<GenericButtonProps> = ({
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
export const PrimaryButton: React.FunctionComponent<GenericButtonExternalProps> = (
  props,
) => (
  <GenericButton
    {...props}
    buttonStyle={PrimaryButtonStyle}
    textStyle={PrimaryButtonText}
  />
);
export const SecondaryButton: React.FunctionComponent<GenericButtonExternalProps> = (
  props,
) => (
  <GenericButton
    {...props}
    buttonStyle={SecondaryButtonStyle}
    textStyle={SecondaryButtonText}
  />
);
export const GhostPrimaryButton: React.FunctionComponent<GenericButtonExternalProps> = (
  props,
) => (
  <GenericButton
    {...props}
    buttonStyle={PrimaryGhostButtonStyle}
    textStyle={PrimaryGhostButtonText}
  />
);
export const GhostSecondaryButton: React.FunctionComponent<GenericButtonExternalProps> = (
  props,
) => (
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
`;
export const PrimaryButtonIcon = styled(IconButtonStyle)`
  color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
`;
export const SecondaryButtonIcon = styled(IconButtonStyle)`
  color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
`;
export const GhostPrimaryButtonIcon = styled(IconButtonStyle)`
  color: ${({theme}) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const GhostSecondaryButtonIcon = styled(IconButtonStyle)`
  color: ${({theme}) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;

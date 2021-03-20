// Third party
import styled from "styled-components/native";

export const GenericText = styled.Text`
  font-size: ${({size = 'normal', theme}) => theme.FONT_SIZE[size]};
`;
export const PrimaryText = styled(GenericText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`;
export const SecondaryText = styled(GenericText)`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`;
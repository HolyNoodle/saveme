// Third party
import { Icon, ListItem as ReactListItem } from "native-base";
import styled from "styled-components/native";

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
export const PrimaryButton = styled.Button`
  background-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryButton = styled.Button`
  background-color: ${({ theme }) => theme.SECONDARY_BUTTON_COLOR};
`;
export const IconButton = styled(Icon)`
  font-size: 18px;
  padding: 12px;
  width: 42px;
  border-radius: 21px;
`;
export const PrimaryIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.PRIMARY_BUTTON_BACKGROUND_COLOR};
`;
export const SecondaryIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.SECONDARY_BUTTON_TEXT_COLOR};
  background-color: ${({ theme }) => theme.SECONDARY_BUTTON_BACKGROUND_COLOR};
`;
// Third party
import styled from "styled-components/native";

// Utils
import { scaleItem } from "./utils";

export const GenericText = styled.Text`
  ${scaleItem}
`;
export const PrimaryText = styled(GenericText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`;
export const SecondaryText = styled(GenericText)`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`;
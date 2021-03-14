// React
import React from "react";

// Third party
import styled from "styled-components/native";
import { Row } from "../../../../components/Layout";

const StyledContainer = styled(Row)`
  width: 100%;
`;
const StyledDate = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.SECONDARY_TEXT_COLOR};
  margin-right: 8px;
  width: 10%;
`;

const LogEntry = ({ elapsedTime, children }) => (
  <StyledContainer>
    <StyledDate>
      {`+${elapsedTime || 0}s`}
    </StyledDate>
    {children}
  </StyledContainer>
);

export default LogEntry;

// React
import React from "react";

// Third party
import styled from "styled-components/native";

const StyledContainer = styled.View`
  border-width: 1px;
  padding: 8px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.03);
`;
const StyledDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
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

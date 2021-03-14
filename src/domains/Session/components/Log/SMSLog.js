// React
import React from "react";

// Third party
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

const Pending = styled.Text`
  color: orangered;
`;
const Sent = styled.Text`
  color: green;
`;
const Error = styled.Text`
  color: red;
`;
const SentContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const SMS = ({ message, number, event }) => {
  const { t } = useTranslation();

  if (event === "SENDING") {
    return <Pending>{t("session:sms-sending", { event, number })}</Pending>;
  }

  if (event === "SENT") {
    return (
      <SentContainer>
        <Sent>{t("session:sms-sent", { event, number })}</Sent>
        <Text>{t("session:sms-message")}</Text>
        <Text>{message}</Text>
      </SentContainer>
    );
  }

  return <Error>{t("session:sms-error", { envet, number, message })}</Error>;
};

export default SMS;

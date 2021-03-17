//React
import React, { useState, useEffect, useRef } from "react";

// Third party
import moment from "moment";
import { useTranslation } from "react-i18next";
import { PrimaryText, SpacedRow } from "../../../../components/Layout";
import styled from "styled-components/native";

const Container = styled(SpacedRow)`
  width: 100%;
  padding: 8px;
`;

const Clock = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const [, setNow] = useState(false);
  const intervalId = useRef();

  useEffect(() => {
    if (!endDate) {
      if (!intervalId.current) {
        intervalId.current = setInterval(function () {
          setNow((now) => !now);
        }, 100);
      }

      return () => {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      };
    }
  }, [setNow, endDate]);

  const timeAnchor = endDate || moment();
  const diff = timeAnchor.diff(startDate);
  const seconds = Math.ceil((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

  const time = [
    hours > 0 && hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].filter(s => !!s).join(':');

  return (
    <Container>
      <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
        {t("session:clock-title", {
          date: startDate && startDate.format("dddd DD MMMM YYYY"),
          time: startDate && startDate.format("HH:mm"),
        })}
      </PrimaryText>
      <PrimaryText>{t("session:clock-elapsed-time", { time })}</PrimaryText>
    </Container>
  );
};

export default Clock;

//React
import React, { useState, useEffect, useRef } from "react";

// Third party
import { View, Text } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Clock = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const [, setNow] = useState(false);
  const intervalId = useRef();

  if (!endDate) {
    useEffect(() => {
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
    }, [setNow]);
  }

  const timeAnchor = endDate || moment();
  const diff = timeAnchor.diff(startDate);
  const seconds = Math.ceil((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

  return (
    <View>
      <Text>
        {t("session:clock-title", {
          date: startDate && startDate.format("dddd DD MMMM YYYY"),
          time: startDate && startDate.format("HH:mm"),
        })}
      </Text>
      <Text>
        {t("session:clock-elapsed-time", {
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        })}
      </Text>
    </View>
  );
};

export default Clock;

import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";

import moment from "moment";

const Clock = ({ startDate, endDate }) => {
  const [, setNow] = useState(false);
  const intervalId = useRef();

  if (!endDate) {
    useEffect(() => {
      if (!intervalId.current) {
        intervalId.current = setInterval(function () {
          setNow((now) => !!now);
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
        {startDate.format('LLLL')}
        {endDate && endDate.format('LLL')}
      </Text>
      <Text>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

export default Clock;

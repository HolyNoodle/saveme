import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';

import moment from 'moment';

const Clock = ({startDate}) => {
  const [now, setNow] = useState(false);
  const intervalId = useRef();

  useEffect(() => {
    if (!intervalId.current) {
      intervalId.current = setInterval(function () {
        setNow(!!now);
      }, 500);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [now, setNow]);

  const diff = moment().diff(startDate);
  const seconds = Math.ceil((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

  return (
    <View>
      <Text>
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

export default Clock;

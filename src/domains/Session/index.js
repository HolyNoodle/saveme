import React, {useState, useEffect} from 'react';
import {Vibration, View, Text} from 'react-native';
import moment from 'moment';
import MicStream from 'react-native-microphone-stream';

const Session = ({id}) => {
  const [startDate] = useState(moment());
  const [now, setNow] = useState(moment());
  const [audioData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => setNow(moment()), 1000);

    Vibration.vibrate([0, 200, 200, 200, 200, 200]);

    const listener = MicStream.addListener((data) => console.log(data));
    MicStream.init({
      bufferSize: 4096,
      sampleRate: 44100,
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    });
    MicStream.start();

    return () => {
      MicStream.stop();
      listener.remove();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View>
      <Text>Session {Math.ceil(now.diff(startDate) / 1000)}</Text>
      <Text>Recording audio</Text>
    </View>
  );
};

export default Session;

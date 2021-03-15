// React
import React, { useLayoutEffect } from "react";

// Contexts
import { SessionContext } from "../../contexts";

// Utils
import { convertJavaDateToMoment } from "../../utils";
import { getSessionAudioFilePath } from "./utils";

// Components
import Clock from "./components/Clock";
import LogList from "./components/Log";
import AudioFile from "./components/AudioFile";
import RemoveSessionIconButton from "./components/List/components/RemoveSessionIconButton";

const Session = ({ session, navigation }) => {
  const { startDate, endDate } = session;
  const normalizedStartDate = startDate && convertJavaDateToMoment(startDate);
  const normalizedEndDate = endDate && convertJavaDateToMoment(endDate);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RemoveSessionIconButton session={session} />
    });
  }, [navigation]);

  return (
    <SessionContext.Provider value={session}>
      <LogList
        session={session}
        ListHeaderComponent={
          <>
            <Clock
              startDate={normalizedStartDate}
              endDate={normalizedEndDate}
            />
            {endDate && (
              <AudioFile filePath={getSessionAudioFilePath(session)} />
            )}
          </>
        }
      />
    </SessionContext.Provider>
  );
};

export const SessionScreen = ({
  route: {
    params: { session }
  },
  ...props
}) => <Session {...props} session={session} />;

export default Session;

// React
import React from "react";

// Contexts
import { SessionContext } from "../../contexts";

// Utils
import { convertJavaDateToMoment } from "../../utils";
import { getSessionAudioFilePath } from "./utils";

// Components
import Clock from "./components/Clock";
import LogList from "./components/Log";
import AudioFile from "./components/AudioFile";

const Session = ({ session }) => {
  const { startDate, endDate } = session;
  const normalizedStartDate = startDate && convertJavaDateToMoment(startDate);
  const normalizedEndDate = endDate && convertJavaDateToMoment(endDate);

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
    params: { session },
  },
}) => <Session session={session} />;

export default Session;

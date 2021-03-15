// Third party
import sortBy from "lodash/sortBy";

// Utils
import { convertJavaDateToMoment } from "../../utils";

export const getSessions = async ({ state, effects }) => {
  state.sessions.loading = true;

  const sessions = await effects.sessions.getSessionList();
  const sortedSessions = sortBy(
    sessions,
    ({ startDate }) => convertJavaDateToMoment(startDate).valueOf() * -1
  );
  state.sessions.sessions = sortedSessions.reduce(
    (sessions, session) => ({ ...sessions, [session.startDate]: session }),
    {}
  );

  state.sessions.loading = false;
  state.sessions.invalid = false;
};
export const invalidateSessions = ({ state }) => {
  state.sessions.invalid = true;
};

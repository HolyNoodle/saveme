// React
import React from "react";

// Components
import Session from "../components/Session";

export const SessionScreen = ({
  route: {
    params: { session }
  },
  ...props
}) => <Session {...props} session={session} />;

export default SessionScreen;

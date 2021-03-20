// React
import React from 'react';

// Types
import { Session } from './types';

export const SessionContext = React.createContext<Session | undefined>(undefined);

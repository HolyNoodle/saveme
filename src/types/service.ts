import { Session } from "./session";

export interface ServiceState {
  started: boolean,
  session?: Session
}
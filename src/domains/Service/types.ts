// Types
import {Session} from 'src/types';

export interface ServiceState {
  session?: Session;
  started: boolean;
  mode: 'INACTIVE' | 'LISTENING' | 'HELP' | 'EMERGENCY';
}

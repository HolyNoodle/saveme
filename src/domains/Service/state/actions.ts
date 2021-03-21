// Types
import {Configuration} from 'src/state';

export const setService = async (
  {state, actions}: Configuration,
  stateFn: (serviceState: any) => any,
) => {
  const newService = stateFn(state.service.service);

  const wasInSession =
    state.service.service &&
    (state.service.service.mode === 'HELP' ||
      state.service.service.mode === 'EMERGENCY');
  const isNotInSession =
    newService.mode === 'INACTIVE' || newService.mode === 'LISTENING';

  wasInSession && isNotInSession && actions.sessions.invalidateSessions();

  if (state.service.service !== newService) {
    state.service = newService;
  }
};

// Third party
import { createOvermind, IConfig } from 'overmind';
import { createActionsHook, createEffectsHook, createHook, createReactionHook, createStateHook } from 'overmind-react';
import { namespaced } from 'overmind/config'

// State
import sessions from '../domains/Session/state'
import permissions from '../domains/Permission/state'
import configuration from '../domains/Configuration/state'
import service from '../domains/Service/state'

const config = namespaced({
  sessions,
  permissions,
  configuration,
  service
});

export type Configuration = IConfig<{
  state: typeof config.state,
  actions: typeof config.actions;
  effect: typeof config.effects;
}>;

export const useOvermind = createHook<Configuration>();
export const useOvermindState = createStateHook();
export const useOvermindActions = createActionsHook();
export const useOvermindEffects = createEffectsHook();
export const useOvermindReaction = createReactionHook();

export default createOvermind(config);
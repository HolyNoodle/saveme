// Third party
import { createOvermind } from 'overmind';
import { createActionsHook, createEffectsHook, createHook, createReactionHook, createStateHook } from 'overmind-react';
import { namespaced } from 'overmind/config'

// State
import sessions from '../domains/Session/state'
import permissions from '../domains/Permission/state'
import configuration from '../domains/Configuration/state'

const config = namespaced({
  sessions,
  permissions,
  configuration
});

export const useOvermind = createHook();
export const useOvermindState = createStateHook();
export const useOvermindActions = createActionsHook();
export const useOvermindEffects = createEffectsHook();
export const useOvermindReaction = createReactionHook();

export default createOvermind(config);
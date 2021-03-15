// Third party
import { createOvermind } from 'overmind';
import { createActionsHook, createEffectsHook, createHook, createReactionHook, createStateHook } from 'overmind-react';
import { namespaced } from 'overmind/config'

// State
import common from './common'
import sessions from './sessions'

const config = namespaced({
  common,
  sessions
});

export const useOvermind = createHook();
export const useOvermindState = createStateHook();
export const useOvermindActions = createActionsHook();
export const useOvermindEffects = createEffectsHook();
export const useOvermindReaction = createReactionHook();

export default createOvermind(config);
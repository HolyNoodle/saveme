import {Configuration as StateConfiguration} from 'src/state';
import {Configuration} from '../types';

export const readConfiguration = async ({
  state,
  effects,
}: StateConfiguration) => {
  state.configuration.loading = true;

  try {
    state.configuration.configuration = await effects.configuration.readConfiguration();
  } catch (ex) {
    console.warn('Error while trying to read the configuration file', ex);
    state.configuration.configuration = {};
  }

  state.configuration.loading = false;
  state.configuration.invalid = false;
};
export const writeConfiguration = async (
  {state, actions, effects}: StateConfiguration,
  configuration: Configuration,
) => {
  const newConfiguration = {
    ...state.configuration.configuration,
    ...configuration,
  };

  await effects.configuration.writeConfiguration(newConfiguration);

  actions.configuration.readConfiguration();
};
export const invalidateConfiguration = ({state}: StateConfiguration) => {
  state.configuration.invalid = true;
};

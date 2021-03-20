import { mutate } from "overmind";

export const readConfiguration = async ({ state, effects }) => {
  state.configuration.loading = true;

  try {
    state.configuration.configuration = await effects.configuration.readConfiguration();
  } catch(ex) {
    console.warn('Error while trying to read the configuration file', ex);
    state.configuration.configuration = {};
  }

  state.configuration.loading = false;
  state.configuration.invalid = false;
};
export const writeConfiguration = async ({ state, actions, effects }, configuration) => {
  const newConfiguration = {...state.configuration.configuration, ...configuration};

  await effects.configuration.writeConfiguration(newConfiguration);

  actions.configuration.readConfiguration();
};
export const invalidateConfiguration = ({ state }) => {
  state.configuration.invalid = true;
};

export const checkPermission = async ({ state, effects }, permission) => {
  if(!state.permissions[permission]) {
    state.permissions[permission] = {}
  };

  state.permissions[permission].loading = true;

  state.permissions[permission].result = await effects.permissions.checkPermission(permission);

  state.permissions[permission].loading = false;
};
export const requestPermission = async ({ state, effects }, permission) => {
  if(!state.permissions[permission]) {
    state.permissions[permission] = {}
  };
  
  state.permissions[permission].loading = true;

  state.permissions[permission].result = await effects.permissions.requestPermission(permission);

  state.permissions[permission].loading = false;
};
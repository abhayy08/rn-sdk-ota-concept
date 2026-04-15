import { ConfigActionKind } from '../../../types/config.types';
export const setConfig = newConfig => {
  return {
    type: ConfigActionKind.SET_CONFIG,
    payload: newConfig
  };
};
//# sourceMappingURL=configActions.js.map
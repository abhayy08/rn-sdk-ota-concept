import { MetaActionKind } from '../../../types/meta.types';
export const setMeta = newMeta => {
  return {
    type: MetaActionKind.SET_META,
    payload: newMeta
  };
};
//# sourceMappingURL=metaActions.js.map
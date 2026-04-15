import { UpdateMetaActionKind } from '../../../types/updateMeta.types';
const updateMetaReducer = (state, action) => {
  const {
    type
  } = action;
  switch (type) {
    case UpdateMetaActionKind.SET_CURRENTLY_RUNNING_META:
      const {
        payload: currentlyRunningPayload
      } = action;
      return {
        ...state,
        currentlyRunningBundle: currentlyRunningPayload
      };
    case UpdateMetaActionKind.SET_NEW_BUNDLE_META:
      const {
        payload: newBundlePayload
      } = action;
      return {
        ...state,
        newBundle: newBundlePayload
      };
    case UpdateMetaActionKind.SET_INIT_PROD_SLOT:
      const {
        payload: initProdSlot
      } = action;
      return {
        ...state,
        initialProdSlot: initProdSlot
      };
    case UpdateMetaActionKind.SET_PENDING_RELEASE_HASH:
      const {
        payload: pendingReleaseHash
      } = action;
      return {
        ...state,
        pendingReleaseHash: pendingReleaseHash
      };
    default:
      return state;
  }
};
export default updateMetaReducer;
//# sourceMappingURL=updateMetaReducer.js.map
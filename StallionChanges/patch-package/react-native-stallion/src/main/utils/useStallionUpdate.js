import { useContext } from 'react';
import { GlobalContext } from '../state';
import { SWITCH_STATES } from '../../types/meta.types';
export const useStallionUpdate = () => {
  var _metaState$prodSlot, _updateMetaState$newB;
  const {
    updateMetaState,
    metaState
  } = useContext(GlobalContext);
  return {
    isRestartRequired: metaState.switchState === SWITCH_STATES.PROD && Boolean((_metaState$prodSlot = metaState.prodSlot) === null || _metaState$prodSlot === void 0 ? void 0 : _metaState$prodSlot.tempHash) && Boolean(updateMetaState === null || updateMetaState === void 0 ? void 0 : (_updateMetaState$newB = updateMetaState.newBundle) === null || _updateMetaState$newB === void 0 ? void 0 : _updateMetaState$newB.id),
    currentlyRunningBundle: updateMetaState === null || updateMetaState === void 0 ? void 0 : updateMetaState.currentlyRunningBundle,
    newReleaseBundle: updateMetaState === null || updateMetaState === void 0 ? void 0 : updateMetaState.newBundle
  };
};
//# sourceMappingURL=useStallionUpdate.js.map
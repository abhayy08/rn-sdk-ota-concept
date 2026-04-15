import { useEffect, useMemo, useCallback } from 'react';
import { SLOT_STATES, SWITCH_STATES } from '../../../types/meta.types';
import { UpdateMetaActionKind } from '../../../types/updateMeta.types';
import { API_PATHS } from '../../constants/apiConstants';
import { useApiClient } from '../../utils/useApiClient';
const useUpdateMetaActions = (updateMetaState, metaState, updateMetaDispatch, configState) => {
  const {
    getData
  } = useApiClient(configState);
  const currentSlot = useMemo(() => {
    if (metaState.switchState === SWITCH_STATES.PROD) {
      return metaState.prodSlot.currentSlot;
    } else if (metaState.switchState === SWITCH_STATES.STAGE) {
      return metaState.stageSlot.currentSlot;
    }
    return null;
  }, [metaState]);
  useEffect(() => {
    var _metaState$prodSlot;
    if (metaState !== null && metaState !== void 0 && (_metaState$prodSlot = metaState.prodSlot) !== null && _metaState$prodSlot !== void 0 && _metaState$prodSlot.currentSlot && !(updateMetaState !== null && updateMetaState !== void 0 && updateMetaState.initialProdSlot)) {
      var _metaState$prodSlot2;
      updateMetaDispatch({
        type: UpdateMetaActionKind.SET_INIT_PROD_SLOT,
        payload: metaState === null || metaState === void 0 ? void 0 : (_metaState$prodSlot2 = metaState.prodSlot) === null || _metaState$prodSlot2 === void 0 ? void 0 : _metaState$prodSlot2.currentSlot
      });
    }
  }, [metaState, updateMetaDispatch, updateMetaState, currentSlot]);
  const currentlyRunningHash = useMemo(() => {
    var _metaState$prodSlot3, _metaState$prodSlot4;
    switch (updateMetaState.initialProdSlot) {
      case SLOT_STATES.DEFAULT:
        return '';
      case SLOT_STATES.NEW:
        return (metaState === null || metaState === void 0 ? void 0 : (_metaState$prodSlot3 = metaState.prodSlot) === null || _metaState$prodSlot3 === void 0 ? void 0 : _metaState$prodSlot3.newHash) || '';
      case SLOT_STATES.STABLE:
        return (metaState === null || metaState === void 0 ? void 0 : (_metaState$prodSlot4 = metaState.prodSlot) === null || _metaState$prodSlot4 === void 0 ? void 0 : _metaState$prodSlot4.stableHash) || '';
      default:
        return '';
    }
  }, [metaState.prodSlot, updateMetaState.initialProdSlot]);
  const newReleaseHash = useMemo(() => {
    var _metaState$prodSlot5;
    return updateMetaState.pendingReleaseHash || ((_metaState$prodSlot5 = metaState.prodSlot) === null || _metaState$prodSlot5 === void 0 ? void 0 : _metaState$prodSlot5.tempHash) || '';
  }, [metaState.prodSlot, updateMetaState.pendingReleaseHash]);
  const getUpdateMetaData = useCallback(releaseId => {
    return getData(API_PATHS.GET_META_FROM_HASH, {
      projectId: configState.projectId,
      checksum: releaseId
    });
  }, [configState, getData]);
  useEffect(() => {
    if (currentlyRunningHash && !updateMetaState.currentlyRunningBundle) {
      getUpdateMetaData(currentlyRunningHash).then(res => {
        if (res.data) {
          updateMetaDispatch({
            type: UpdateMetaActionKind.SET_CURRENTLY_RUNNING_META,
            payload: res.data
          });
        }
      });
    }
  }, [currentlyRunningHash, updateMetaState, updateMetaDispatch, getUpdateMetaData]);
  useEffect(() => {
    if (newReleaseHash && !updateMetaState.newBundle) {
      getUpdateMetaData(newReleaseHash).then(res => {
        if (res.data) {
          updateMetaDispatch({
            type: UpdateMetaActionKind.SET_NEW_BUNDLE_META,
            payload: res.data
          });
        }
      });
    }
  }, [newReleaseHash, updateMetaState, updateMetaDispatch, getUpdateMetaData]);
};
export default useUpdateMetaActions;
//# sourceMappingURL=useUpdateMetaActions.js.map
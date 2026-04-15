import { useCallback, useContext, useMemo } from 'react';
import { GlobalContext } from '../../../../state';
import { toggleStallionSwitchNative } from '../../../../utils/StallionNativeUtils';
import { SWITCH_STATES } from '../../../../../types/meta.types';
const useStallionModal = () => {
  var _downloadState$data2;
  const {
    isModalVisible,
    configState,
    metaState,
    bundleState,
    downloadState,
    actions: {
      setIsModalVisible,
      selectBucket,
      refreshMeta,
      setDownloadErrorMessage
    }
  } = useContext(GlobalContext);
  const onBackPress = useCallback(() => {
    requestAnimationFrame(() => selectBucket());
  }, [selectBucket]);
  const onClosePress = useCallback(() => {
    requestAnimationFrame(() => setIsModalVisible(false));
  }, [setIsModalVisible]);
  const loginRequired = configState !== null && configState !== void 0 && configState.sdkToken ? false : true;
  const isBackEnabled = useMemo(() => bundleState.selectedBucketId ? true : false, [bundleState.selectedBucketId]);
  const isDownloading = useMemo(() => {
    return downloadState.isLoading;
  }, [downloadState.isLoading]);
  const downloadProgress = useMemo(() => {
    var _downloadState$data;
    return ((_downloadState$data = downloadState.data) === null || _downloadState$data === void 0 ? void 0 : _downloadState$data.currentProgress) || 0;
  }, [(_downloadState$data2 = downloadState.data) === null || _downloadState$data2 === void 0 ? void 0 : _downloadState$data2.currentProgress]);
  const downloadError = useMemo(() => downloadState.error, [downloadState.error]);
  const handleSwitch = useCallback(newSwitchStatus => {
    setDownloadErrorMessage('');
    toggleStallionSwitchNative(newSwitchStatus ? SWITCH_STATES.STAGE : SWITCH_STATES.PROD);
    refreshMeta();
    if (!newSwitchStatus) {
      selectBucket();
    }
  }, [refreshMeta, selectBucket, setDownloadErrorMessage]);
  const internalIsRestartRequired = useMemo(() => {
    var _metaState$prodSlot, _metaState$stageSlot;
    return metaState.switchState === SWITCH_STATES.PROD && (_metaState$prodSlot = metaState.prodSlot) !== null && _metaState$prodSlot !== void 0 && _metaState$prodSlot.tempHash || metaState.switchState === SWITCH_STATES.STAGE && (_metaState$stageSlot = metaState.stageSlot) !== null && _metaState$stageSlot !== void 0 && _metaState$stageSlot.tempHash ? true : false;
  }, [metaState]);
  return {
    isModalVisible,
    onBackPress,
    onClosePress,
    loginRequired,
    metaState,
    isBackEnabled,
    isDownloading,
    downloadProgress,
    downloadError,
    handleSwitch,
    internalIsRestartRequired
  };
};
export default useStallionModal;
//# sourceMappingURL=useStallionModal.js.map
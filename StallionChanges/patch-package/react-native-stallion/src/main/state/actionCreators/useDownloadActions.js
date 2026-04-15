import { useCallback } from 'react';
import { downloadBundleNative } from '../../utils/StallionNativeUtils';
import { setDownloadData, setDownloadError, setDownloadLoading } from '../actions/downloadActions';
const useDownloadActions = (dispatch, refreshStallionMeta, configState) => {
  const downloadBundle = useCallback((apiDownloadUrl, hash) => {
    dispatch(setDownloadLoading());
    const projectId = configState.projectId;
    const url = `${apiDownloadUrl}?projectId=${projectId}`;
    requestAnimationFrame(() => {
      downloadBundleNative({
        url,
        hash
      }).then(_ => {
        dispatch(setDownloadData({
          currentProgress: 1
        }));
        refreshStallionMeta();
      }).catch(err => {
        dispatch(setDownloadError(err.toString()));
      });
    });
  }, [dispatch, refreshStallionMeta, configState]);
  const setProgress = useCallback(newProgress => {
    dispatch(setDownloadData({
      currentProgress: newProgress
    }));
  }, [dispatch]);
  const setDownloadErrorMessage = message => {
    dispatch(setDownloadError(message));
  };
  return {
    downloadBundle,
    setProgress,
    setDownloadErrorMessage
  };
};
export default useDownloadActions;
//# sourceMappingURL=useDownloadActions.js.map
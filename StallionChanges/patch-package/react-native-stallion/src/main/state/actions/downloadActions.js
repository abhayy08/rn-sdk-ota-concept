import { DownloadActionKind } from '../../../types/download.types';
export const setDownloadLoading = () => {
  return {
    type: DownloadActionKind.SET_DOWNLOAD_LOADING
  };
};
export const setDownloadData = downloadData => {
  return {
    type: DownloadActionKind.SET_DOWNLOAD_DATA,
    payload: downloadData
  };
};
export const setDownloadError = errorString => {
  return {
    type: DownloadActionKind.SET_DOWNLOAD_ERROR,
    payload: errorString
  };
};
//# sourceMappingURL=downloadActions.js.map
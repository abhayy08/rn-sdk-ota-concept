import { DownloadActionKind } from '../../../types/download.types';
const DEFAULT_DOWNLOAD_DATA = {
  currentProgress: 0
};
const downloadReducer = (state, action) => {
  const {
    type
  } = action;
  switch (type) {
    case DownloadActionKind.SET_DOWNLOAD_LOADING:
      return {
        data: Object.assign({}, DEFAULT_DOWNLOAD_DATA),
        isLoading: true,
        error: null
      };
    case DownloadActionKind.SET_DOWNLOAD_DATA:
      const {
        payload: downloadDataPayload
      } = action;
      return {
        data: downloadDataPayload,
        isLoading: !((downloadDataPayload === null || downloadDataPayload === void 0 ? void 0 : downloadDataPayload.currentProgress) === 1),
        error: null
      };
    case DownloadActionKind.SET_DOWNLOAD_ERROR:
      const {
        payload: downloadError
      } = action;
      return {
        data: Object.assign({}, DEFAULT_DOWNLOAD_DATA),
        isLoading: false,
        error: downloadError
      };
    default:
      return state;
  }
};
export default downloadReducer;
//# sourceMappingURL=downloadReducer.js.map
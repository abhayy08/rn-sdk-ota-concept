import { useCallback } from 'react';
import { API_PATHS } from '../../constants/apiConstants';
import { DEFAULT_ERROR_MESSAGE, EMPTY_ERROR_MESSAGE_BUNDLE, CURRENT_PLATFORM } from '../../constants/appConstants';
import { BUNDLE_API_PAGE_SIZE } from '../../constants/apiConstants';
import { extractError } from '../../utils/errorUtil';
import { setBundleData, setBundleError, setBundleLoading, setBundlePaginationOffset, setPaginatedBundleData, setSelectedBucketId, setBundleNextPageLoading } from '../actions/bundleActions';
import { useApiClient } from '../../utils/useApiClient';
const useBundleActions = (dispatch, bundleState, clearUserLogin, configState) => {
  const {
    getData
  } = useApiClient(configState, clearUserLogin);
  const fetchBundles = useCallback((bucketId, pageOffset) => {
    const selectedBucketId = bucketId || bundleState.selectedBucketId;
    const pageOffsetReceivedValue = pageOffset || '';
    if (pageOffsetReceivedValue === '') {
      dispatch(setBundleLoading());
    } else {
      dispatch(setBundleNextPageLoading(true));
    }
    getData(API_PATHS.FETCH_BUNDLES_ADVANCED, {
      projectId: configState.projectId,
      bucketId: selectedBucketId,
      platform: CURRENT_PLATFORM,
      pageSize: BUNDLE_API_PAGE_SIZE,
      paginationOffset: pageOffsetReceivedValue
    }).then(bundleResponse => {
      var _bundleResponse$data, _bundleResponse$data2;
      const bundlesData = bundleResponse === null || bundleResponse === void 0 ? void 0 : (_bundleResponse$data = bundleResponse.data) === null || _bundleResponse$data === void 0 ? void 0 : _bundleResponse$data.paginatedData;
      const nextPageOffset = bundleResponse === null || bundleResponse === void 0 ? void 0 : (_bundleResponse$data2 = bundleResponse.data) === null || _bundleResponse$data2 === void 0 ? void 0 : _bundleResponse$data2.paginationOffset;
      if (bundlesData) {
        if (bundlesData.length) {
          if (pageOffsetReceivedValue === '') {
            dispatch(setBundleData(bundlesData));
          } else {
            dispatch(setPaginatedBundleData(bundlesData));
          }
        } else if (pageOffsetReceivedValue === '') {
          dispatch(setBundleError(EMPTY_ERROR_MESSAGE_BUNDLE));
        }
        dispatch(setBundlePaginationOffset(nextPageOffset));
      } else {
        dispatch(setBundleError(extractError(bundleResponse)));
      }
    }).catch(_ => {
      dispatch(setBundleError(DEFAULT_ERROR_MESSAGE));
    });
  }, [dispatch, bundleState.selectedBucketId, configState, getData]);
  const selectBucket = useCallback(selectedBucketId => {
    dispatch(setSelectedBucketId(selectedBucketId));
  }, [dispatch]);
  return {
    fetchBundles,
    selectBucket
  };
};
export default useBundleActions;
//# sourceMappingURL=useBundleActions.js.map
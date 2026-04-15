import { useCallback } from 'react';
import { extractError } from '../../utils/errorUtil';
import { setBucketData, setBucketError, setBucketLoading } from '../actions/bucketActions';
import { DEFAULT_ERROR_MESSAGE, EMPTY_ERROR_MESSAGE } from '../../constants/appConstants';
import { API_PATHS } from '../../constants/apiConstants';
import { useApiClient } from '../../utils/useApiClient';
const useBucketActions = (dispatch, clearUserLogin, configState) => {
  const {
    getData
  } = useApiClient(configState, clearUserLogin);
  const fetchBuckets = useCallback(() => {
    dispatch(setBucketLoading());
    getData(API_PATHS.FETCH_BUCKETS, {
      projectId: configState.projectId
    }).then(bucketResponse => {
      if (bucketResponse !== null && bucketResponse !== void 0 && bucketResponse.data) {
        if (bucketResponse.data.length) {
          dispatch(setBucketData(bucketResponse.data));
        } else {
          dispatch(setBucketError(EMPTY_ERROR_MESSAGE));
        }
      } else {
        dispatch(setBucketError(extractError(bucketResponse)));
      }
    }).catch(_ => {
      dispatch(setBucketError(DEFAULT_ERROR_MESSAGE));
    });
  }, [dispatch, configState, getData]);
  return {
    fetchBuckets
  };
};
export default useBucketActions;
//# sourceMappingURL=useBucketActions.js.map
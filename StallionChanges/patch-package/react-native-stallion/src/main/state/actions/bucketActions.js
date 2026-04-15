import { BucketActionKind } from '../../../types/bucket.types';
export const setBucketLoading = () => {
  return {
    type: BucketActionKind.SET_BUCKET_LOADING
  };
};
export const setBucketData = bucketData => {
  return {
    type: BucketActionKind.SET_BUCKET_DATA,
    payload: bucketData
  };
};
export const setBucketError = errorString => {
  return {
    type: BucketActionKind.SET_BUCKET_ERROR,
    payload: errorString
  };
};
//# sourceMappingURL=bucketActions.js.map
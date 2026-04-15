import { BundleActionKind } from '../../../types/bundle.types';
export const setBundleLoading = () => {
  return {
    type: BundleActionKind.SET_BUNDLE_LOADING
  };
};
export const setBundleNextPageLoading = isNextPageLoading => {
  return {
    type: BundleActionKind.SET_NEXT_PAGE_LOADING,
    payload: isNextPageLoading
  };
};
export const setBundleData = bundleData => {
  return {
    type: BundleActionKind.SET_BUNDLE_DATA,
    payload: bundleData
  };
};
export const setBundleError = errorString => {
  return {
    type: BundleActionKind.SET_BUNDLE_ERROR,
    payload: errorString
  };
};
export const setSelectedBucketId = bucketId => {
  return {
    type: BundleActionKind.SET_SELECTED_BUCKET,
    payload: bucketId
  };
};
export const setBundlePaginationOffset = paginationOffset => {
  return {
    type: BundleActionKind.SET_PAGINATION_OFFSET,
    payload: paginationOffset
  };
};
export const setPaginatedBundleData = bundleData => {
  return {
    type: BundleActionKind.SET_PAGINATED_BUNDLE_DATA,
    payload: bundleData
  };
};
//# sourceMappingURL=bundleActions.js.map
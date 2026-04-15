import { useCallback, useContext, useEffect, useMemo } from 'react';
import { CARD_TYPES, IS_ANDROID, VERSION_PREFIX } from '../../../../constants/appConstants';
import { GlobalContext } from '../../../../state';
const useListing = () => {
  const {
    bucketState,
    bundleState,
    metaState,
    actions: {
      fetchBuckets,
      fetchBundles,
      selectBucket
    }
  } = useContext(GlobalContext);
  const bundlesListingEnabled = useMemo(() => bundleState.selectedBucketId ? true : false, [bundleState.selectedBucketId]);
  const listingLoading = useMemo(() => {
    if (bundlesListingEnabled) return bundleState.isLoading;
    return bucketState.isLoading;
  }, [bucketState.isLoading, bundleState.isLoading, bundlesListingEnabled]);
  const nextPageLoading = useMemo(() => {
    if (bundlesListingEnabled) return bundleState.isNextPageLoading;
    return false;
  }, [bundleState.isNextPageLoading, bundlesListingEnabled]);
  const listingData = useMemo(() => {
    var _bucketState$data;
    if (bundlesListingEnabled) {
      var _bundleState$data;
      return (bundleState === null || bundleState === void 0 ? void 0 : (_bundleState$data = bundleState.data) === null || _bundleState$data === void 0 ? void 0 : _bundleState$data.map(bundleData => ({
        type: CARD_TYPES.BUNDLE,
        id: bundleData.id,
        version: bundleData.version,
        name: `${VERSION_PREFIX}${bundleData.version}`,
        description: bundleData.releaseNote,
        updatedAt: bundleData.updatedAt,
        author: bundleData.author.fullName,
        downloadUrl: bundleData.downloadUrl
      }))) || [];
    }
    return ((_bucketState$data = bucketState.data) === null || _bucketState$data === void 0 ? void 0 : _bucketState$data.map(bucketItem => ({
      type: CARD_TYPES.BUCKET,
      id: bucketItem.id,
      name: bucketItem.name,
      updatedAt: bucketItem.updatedAt,
      bundleCount: (IS_ANDROID ? bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.latestAndroidBundleVersion : bucketItem === null || bucketItem === void 0 ? void 0 : bucketItem.latestIosBundleVersion) || 0
    }))) || [];
  }, [bucketState.data, bundleState.data, bundlesListingEnabled]);
  const listingError = useMemo(() => {
    if (bundlesListingEnabled) return bundleState.error;
    return bucketState.error;
  }, [bucketState.error, bundleState.error, bundlesListingEnabled]);
  const fetchListing = useCallback(() => {
    if (bundlesListingEnabled) {
      fetchBundles();
    } else {
      fetchBuckets();
    }
  }, [fetchBuckets, fetchBundles, bundlesListingEnabled]);
  const setBucketSelection = useCallback(bucketId => {
    selectBucket(bucketId);
    fetchBundles(bucketId);
  }, [selectBucket, fetchBundles]);
  const fetchNextPage = useCallback(() => {
    if (bundlesListingEnabled && !bundleState.isNextPageLoading && !bundleState.isLoading && bundleState.pageOffset) {
      fetchBundles(bundleState.selectedBucketId, bundleState.pageOffset);
    }
  }, [fetchBundles, bundlesListingEnabled, bundleState.selectedBucketId, bundleState.pageOffset, bundleState.isNextPageLoading, bundleState.isLoading]);
  useEffect(() => {
    fetchListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    listingData,
    listingError,
    listingLoading,
    metaState,
    fetchListing,
    setBucketSelection,
    fetchNextPage,
    nextPageLoading,
    isBackEnabled: bundleState !== null && bundleState !== void 0 && bundleState.selectedBucketId ? true : false
  };
};
export default useListing;
//# sourceMappingURL=useListing.js.map
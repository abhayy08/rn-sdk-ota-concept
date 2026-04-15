import { IBundleAction, IBundleDataList } from '../../../types/bundle.types';
export declare const setBundleLoading: () => IBundleAction;
export declare const setBundleNextPageLoading: (isNextPageLoading: boolean) => IBundleAction;
export declare const setBundleData: (bundleData: IBundleDataList) => IBundleAction;
export declare const setBundleError: (errorString: string) => IBundleAction;
export declare const setSelectedBucketId: (bucketId?: string | null) => IBundleAction;
export declare const setBundlePaginationOffset: (paginationOffset?: string | null) => IBundleAction;
export declare const setPaginatedBundleData: (bundleData: IBundleDataList) => IBundleAction;
//# sourceMappingURL=bundleActions.d.ts.map
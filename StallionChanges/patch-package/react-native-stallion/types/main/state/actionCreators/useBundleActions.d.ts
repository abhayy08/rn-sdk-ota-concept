import React from 'react';
import { IBundleAction, IBundleState } from '../../../types/bundle.types';
import { IStallionConfigJson } from '../../../types/config.types';
declare const useBundleActions: (dispatch: React.Dispatch<IBundleAction>, bundleState: IBundleState, clearUserLogin: (shouldClear: boolean) => void, configState: IStallionConfigJson) => {
    fetchBundles: (bucketId?: string | null, pageOffset?: string | null) => void;
    selectBucket: (selectedBucketId?: string | null) => void;
};
export default useBundleActions;
//# sourceMappingURL=useBundleActions.d.ts.map
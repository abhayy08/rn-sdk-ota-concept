import React from 'react';
import { IBucketAction } from '../../../types/bucket.types';
import { IStallionConfigJson } from '../../../types/config.types';
declare const useBucketActions: (dispatch: React.Dispatch<IBucketAction>, clearUserLogin: (shouldClear: boolean) => void, configState: IStallionConfigJson) => {
    fetchBuckets: () => void;
};
export default useBucketActions;
//# sourceMappingURL=useBucketActions.d.ts.map
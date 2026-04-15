import React from 'react';
import { CARD_TYPES } from '../../../../constants/appConstants';
export interface IBucketCard {
    type: CARD_TYPES.BUCKET;
    id: string;
    name: string;
    updatedAt: string;
    bundleCount?: number;
    handlePress?: () => void;
}
declare const _default: React.NamedExoticComponent<IBucketCard>;
export default _default;
//# sourceMappingURL=BucketCard.d.ts.map
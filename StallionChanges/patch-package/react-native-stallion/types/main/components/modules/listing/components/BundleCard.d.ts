import React from 'react';
import { CARD_TYPES } from '../../../../constants/appConstants';
export interface IBundleCard {
    type: CARD_TYPES.BUNDLE;
    version: number;
    id: string;
    name: string;
    description: string;
    updatedAt: string;
    author: string;
    downloadUrl: string;
}
declare const _default: React.NamedExoticComponent<IBundleCard>;
export default _default;
//# sourceMappingURL=BundleCard.d.ts.map
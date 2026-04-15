import React from 'react';
import { IStallionMeta } from '../../../types/meta.types';
import { IUpdateMetaAction } from '../../../types/updateMeta.types';
import { IUpdateMetaState } from '../reducers/updateMetaReducer';
import { IStallionConfigJson } from '../../../types/config.types';
declare const useUpdateMetaActions: (updateMetaState: IUpdateMetaState, metaState: IStallionMeta, updateMetaDispatch: React.Dispatch<IUpdateMetaAction>, configState: IStallionConfigJson) => void;
export default useUpdateMetaActions;
//# sourceMappingURL=useUpdateMetaActions.d.ts.map
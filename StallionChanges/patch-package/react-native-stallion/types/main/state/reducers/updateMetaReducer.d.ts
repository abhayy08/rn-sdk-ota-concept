import { SLOT_STATES } from '../../../types/meta.types';
import { IUpdateMeta, IUpdateMetaAction } from '../../../types/updateMeta.types';
export interface IUpdateMetaState {
    currentlyRunningBundle: IUpdateMeta | null;
    newBundle: IUpdateMeta | null;
    initialProdSlot: SLOT_STATES | null;
    pendingReleaseHash: string | null;
}
declare const updateMetaReducer: (state: IUpdateMetaState, action: IUpdateMetaAction) => IUpdateMetaState;
export default updateMetaReducer;
//# sourceMappingURL=updateMetaReducer.d.ts.map
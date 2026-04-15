export declare enum SWITCH_STATES {
    PROD = "PROD",
    STAGE = "STAGE"
}
export declare enum SLOT_STATES {
    STABLE = "STABLE_SLOT",
    NEW = "NEW_SLOT",
    DEFAULT = "DEFAULT_SLOT"
}
export interface IStallionSlotData {
    currentSlot: SLOT_STATES;
    stableHash?: string;
    newHash?: string;
    tempHash?: string;
}
export interface IStallionMeta {
    switchState: SWITCH_STATES;
    prodSlot: IStallionSlotData;
    stageSlot: IStallionSlotData;
}
export declare enum MetaActionKind {
    SET_META = "SET_META",
    GET_META = "GET_META"
}
export interface ISetMeta {
    type: MetaActionKind.SET_META;
    payload: IStallionMeta;
}
export type IMetaAction = ISetMeta;
//# sourceMappingURL=meta.types.d.ts.map
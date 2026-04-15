import { IUseStallionModal, IWithStallion } from './types/utils.types';
export declare let withStallion: IWithStallion;
export declare let useStallionModal: () => IUseStallionModal;
export { sync, restart } from './main/utils/StallionNativeUtils';
export { useStallionUpdate } from './main/utils/useStallionUpdate';
export declare const addEventListener: (listener: (data?: import("./main/state/useStallionEvents").IStallionNativeEventData | undefined) => void) => void;
export declare const removeEventListener: (listenerToRemove: (data?: import("./main/state/useStallionEvents").IStallionNativeEventData | undefined) => void) => void;
//# sourceMappingURL=index.d.ts.map
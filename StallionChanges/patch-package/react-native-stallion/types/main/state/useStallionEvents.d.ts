import { NativeEventTypesProd, NativeEventTypesStage } from '../constants/appConstants';
import { IStallionConfigJson } from '../../types/config.types';
import { IStallionInitParams } from '../../types/utils.types';
import { IUpdateMetaAction } from '../../types/updateMeta.types';
export interface IStallionNativeEventData {
    type: NativeEventTypesProd | NativeEventTypesStage;
    eventId: string;
    eventTimestamp: number;
    releaseHash?: string;
    error?: string;
    progress?: string;
}
export declare const useStallionEvents: (refreshMeta: () => Promise<void>, setProgress: (newProgress: number) => void, configState: IStallionConfigJson, updateMetaDispatch: React.Dispatch<IUpdateMetaAction>, stallionInitParams?: IStallionInitParams) => void;
//# sourceMappingURL=useStallionEvents.d.ts.map
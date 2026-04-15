import { IStallionNativeEventData } from '../state/useStallionEvents';
type EventListener = (data?: IStallionNativeEventData) => void;
declare class EventEmitter {
    private events;
    addEventListener(listener: EventListener): void;
    removeEventListener(listenerToRemove: EventListener): void;
    emit(data?: IStallionNativeEventData): void;
}
export declare const stallionEventEmitter: EventEmitter;
export {};
//# sourceMappingURL=StallionEventEmitter.d.ts.map
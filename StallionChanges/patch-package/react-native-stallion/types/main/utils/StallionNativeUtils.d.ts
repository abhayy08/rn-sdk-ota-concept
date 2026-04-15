import { TDownloadBundleNative, TSetSdkTokenNative, TGetStallionMetaNative, TToggleStallionSwitchNative, TOnLaunchBundleNative, TGetStallionConfigNative } from 'src/types/utils.types';
export declare const setSdkTokenNative: TSetSdkTokenNative;
export declare const getStallionMetaNative: TGetStallionMetaNative;
export declare const getStallionConfigNative: TGetStallionConfigNative;
export declare const toggleStallionSwitchNative: TToggleStallionSwitchNative;
export declare const downloadBundleNative: TDownloadBundleNative;
export declare const onLaunchNative: TOnLaunchBundleNative;
export declare const sync: () => void;
export declare const popEventsNative: () => Promise<string>;
export declare const acknowledgeEventsNative: (eventIds: string) => Promise<string>;
export declare const restart: () => void;
//# sourceMappingURL=StallionNativeUtils.d.ts.map
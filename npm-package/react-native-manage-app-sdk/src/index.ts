import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-manage-app-sdk' doesn't seem to be linked. ` +
  `Make sure to rebuild the app after installing the package.\n\n` +
  `Android: run './gradlew assembleDebug' or rebuild in Android Studio.\n` +
  `iOS: run 'pod install' then rebuild.`;

const ManageAppSDKNativeModule = NativeModules.ManageAppSDKModule
  ? NativeModules.ManageAppSDKModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export type SDKParams = {
  [key: string]: string | boolean | number;
};

/**
 * Launch the ManageApp SDK screen.
 * All key/value pairs in `params` are forwarded as Intent extras to the native Activity.
 *
 * @example
 * launchManageAppSDK({ userId: 'abc123', theme: 'dark' });
 */
export function launchManageAppSDK(params: SDKParams = {}): void {
  if (Platform.OS !== 'android') {
    console.warn('react-native-manage-app-sdk: launchManageAppSDK is Android-only for now.');
    return;
  }
  ManageAppSDKNativeModule.launchManageAppSDK(params);
}

/**
 * Close the ManageApp SDK screen and return to the host app.
 */
export function closeManageAppSDK(): void {
  if (Platform.OS !== 'android') return;
  ManageAppSDKNativeModule.closeManageAppSDK();
}

/**
 * Preload the SDK React instance in the background.
 * Call this early (e.g. in your App's useEffect on mount) to warm up the
 * SDK so that launchManageAppSDK opens instantly.
 *
 * @example
 * useEffect(() => { preloadManageAppSDKInstance(); }, []);
 */
export function preloadManageAppSDKInstance(): void {
  if (Platform.OS !== 'android') return;
  ManageAppSDKNativeModule.preloadManageAppSDKInstance();
}

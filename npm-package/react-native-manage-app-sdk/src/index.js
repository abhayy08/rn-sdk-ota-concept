'use strict';

const { NativeModules, Platform } = require('react-native');

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

/**
 * Launch the ManageApp SDK screen.
 * @param {Object} params - Key/value pairs forwarded as Intent extras to the native Activity.
 */
function launchManageAppSDK(params = {}) {
  if (Platform.OS !== 'android') {
    console.warn('react-native-manage-app-sdk: launchManageAppSDK is Android-only for now.');
    return;
  }
  ManageAppSDKNativeModule.launchManageAppSDK(params);
}

/**
 * Close the ManageApp SDK screen and return to the host app.
 */
function closeManageAppSDK() {
  if (Platform.OS !== 'android') return;
  ManageAppSDKNativeModule.closeManageAppSDK();
}

/**
 * Preload the SDK React instance in the background.
 * Call this early (e.g. in your App's useEffect on mount).
 */
function preloadManageAppSDKInstance() {
  if (Platform.OS !== 'android') return;
  ManageAppSDKNativeModule.preloadManageAppSDKInstance();
}

module.exports = {
  launchManageAppSDK,
  closeManageAppSDK,
  preloadManageAppSDKInstance,
};

// Support both default and named imports
module.exports.default = module.exports;

"use strict";

const { NativeModules, Platform } = require("react-native");

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
      },
    );

/**
 * Launch the ManageApp SDK screen.
 * @param {Object} params - Key/value pairs forwarded as Intent extras (Android)
 *                          or initial props (iOS).
 */
function launchManageAppSDK(params = {}) {
  ManageAppSDKNativeModule.launchManageAppSDK(params);
}

/**
 * Close the ManageApp SDK screen and return to the host app.
 */
function closeManageAppSDK() {
  ManageAppSDKNativeModule.closeManageAppSDK();
}

/**
 * Preload the SDK React instance in the background.
 * Call this early (e.g. in your App's useEffect on mount).
 * On iOS this is currently a no-op.
 */
function preloadManageAppSDKInstance() {
  if (Platform.OS !== "android") {
    console.warn("react-native-manage-app-sdk: preloadManageAppSDKInstance is Android-only for now.");
    return;
  }
  ManageAppSDKNativeModule.preloadManageAppSDKInstance();
}

module.exports = {
  launchManageAppSDK,
  closeManageAppSDK,
  preloadManageAppSDKInstance,
};

// Support both default and named imports
module.exports.default = module.exports;

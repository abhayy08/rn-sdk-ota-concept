import StallionNativeModule from '../../StallionNativeModule';
export const setSdkTokenNative = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.updateSdkToken;
export const getStallionMetaNative = () => {
  return new Promise((resolve, reject) => {
    StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.getStallionMeta().then(metaString => {
      try {
        resolve(JSON.parse(metaString));
      } catch (_) {
        reject('invalid meta string');
      }
    }).catch(() => {
      reject('failed to fetch meta string');
    });
  });
};
export const getStallionConfigNative = () => {
  return new Promise((resolve, reject) => {
    StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.getStallionConfig().then(configString => {
      try {
        resolve(JSON.parse(configString));
      } catch (_) {
        reject('invalid config string');
      }
    }).catch(() => {
      reject('failed to fetch config string');
    });
  });
};
export const toggleStallionSwitchNative = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.toggleStallionSwitch;
export const downloadBundleNative = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.downloadStageBundle;
export const onLaunchNative = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.onLaunch;
export const sync = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.sync;
export const popEventsNative = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.popEvents;
export const acknowledgeEventsNative = StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : StallionNativeModule.acknowledgeEvents;
export const restart = () => {
  var _StallionNativeModule;
  StallionNativeModule === null || StallionNativeModule === void 0 ? void 0 : (_StallionNativeModule = StallionNativeModule.restart) === null || _StallionNativeModule === void 0 ? void 0 : _StallionNativeModule.call(StallionNativeModule);
};
//# sourceMappingURL=StallionNativeUtils.js.map
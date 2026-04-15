const DIGITAL_STORAGE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
export const getDigitalStorageSize = sizeInBytes => {
  var _sizeInBytes;
  let digitalStorageUnitIndex = 0;
  while (sizeInBytes >= 1024 && digitalStorageUnitIndex < DIGITAL_STORAGE_UNITS.length - 1) {
    sizeInBytes /= 1024;
    digitalStorageUnitIndex++;
  }
  return `${(_sizeInBytes = sizeInBytes) === null || _sizeInBytes === void 0 ? void 0 : _sizeInBytes.toFixed(2)} ${DIGITAL_STORAGE_UNITS === null || DIGITAL_STORAGE_UNITS === void 0 ? void 0 : DIGITAL_STORAGE_UNITS[digitalStorageUnitIndex]}`;
};
//# sourceMappingURL=getSize.js.map
try {
  // const stallionConfig = require('../../example/stallion.config.js'); // testing import
  const stallionConfig = require('../../../../stallion.config.js'); // prod import
  console.log(stallionConfig === null || stallionConfig === void 0 ? void 0 : stallionConfig.stallionEnabled);
} catch (_) {
  console.log(true);
}
//# sourceMappingURL=getStallionEnabled.js.map
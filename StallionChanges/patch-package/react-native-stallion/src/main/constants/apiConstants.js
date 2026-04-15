export const API_BASE_URL = 'https://api.stalliontech.io';
export let API_PATHS = /*#__PURE__*/function (API_PATHS) {
  API_PATHS["LOGIN"] = "/api/v1/sdk/auth/verify-pin";
  API_PATHS["VERIFY_OTP"] = "/api/v1/auth/verify-otp";
  API_PATHS["FETCH_BUCKETS"] = "/api/v1/sdk/list-buckets";
  API_PATHS["FETCH_BUNDLES"] = "/api/v1/bundle/list";
  API_PATHS["FETCH_BUNDLES_ADVANCED"] = "/api/v1/sdk/list-bundles";
  API_PATHS["USER_PROFILE"] = "/api/v1/sdk/user-profile";
  API_PATHS["LOG_EVENTS"] = "/api/v1/analytics/log-bulk-events";
  API_PATHS["GET_META_FROM_HASH"] = "/api/v1/sdk/get-meta-from-hash";
  return API_PATHS;
}({});
export const BUNDLE_API_PAGE_SIZE = 10;
//# sourceMappingURL=apiConstants.js.map
import { Platform } from 'react-native';
export const HEADER_TITLE = 'Stallion';
export const Login_TITLE = 'Login to continue';
export const PROFILE_TITLE = 'Profile';
export const HEADER_SLAB_HEIGHT = 50;
export const STD_MARGIN = HEADER_SLAB_HEIGHT / 5;
export const END_REACH_THRESHOLD = 0;
export const DOWNLOAD_BUTTON_TEXT = 'Download';
export const DOWNLOADED_TEXT = 'Downloaded';
export const APPLIED_TEXT = 'Applied';
export const LOGOUT_BUTTON_TEXT = 'Logout';
export const FOOTER_INFO_TITLE = 'Active Bucket: ';
export const FOOTER_INFO_SUBTITLE = 'Version: ';
export let SWITCH_TEXTS = /*#__PURE__*/function (SWITCH_TEXTS) {
  SWITCH_TEXTS["ON"] = "Testing";
  SWITCH_TEXTS["OFF"] = "Production";
  return SWITCH_TEXTS;
}({});
export let FOOTER_SUB_TEXTS = /*#__PURE__*/function (FOOTER_SUB_TEXTS) {
  FOOTER_SUB_TEXTS["PROD"] = "User facing version";
  FOOTER_SUB_TEXTS["STAGE"] = "Internal sharing version";
  return FOOTER_SUB_TEXTS;
}({});
export const SWITCH_TITLE = 'Switch ';
export const BUCKET_CARD_UPDATED_TEXT = 'Updated at: ';
export const BUCKET_CARD_BUNDLE_COUNT_TEXT = 'Bundles: ';
export const BUCKET_CARD_AUTHOR_TEXT = 'Author: ';
export const BUNDLE_CARD_RELEASE_NOTE = 'Release Note: ';
export const BUNDLE_CARD_AUTHOR = 'Author';
export const DOWNLOAD_PROGRESS_EVENT = 'StallionDownloadProgress';
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Check your network connection';
export const EMPTY_ERROR_MESSAGE = 'No buckets found';
export const EMPTY_ERROR_MESSAGE_BUNDLE = 'No bundles found';
export const EMPTY_DOWNLOAD_MESSAGE = 'No bundle is downloaded yet';
export const DEFAULT_ERROR_PREFIX = 'Error: ';
export const VERSION_PREFIX = 'V';
export const RETRY_BUTTON_TEXT = 'Retry';
export const CURRENT_PLATFORM = Platform.OS;
export const IS_ANDROID = CURRENT_PLATFORM === 'android';
export const KEYBOARD_AVOIDING_BEHAVIOUR = IS_ANDROID ? 'height' : 'padding';
export let LOGIN_PAGE_KEYS = /*#__PURE__*/function (LOGIN_PAGE_KEYS) {
  LOGIN_PAGE_KEYS["email"] = "Email";
  LOGIN_PAGE_KEYS["password"] = "Password";
  return LOGIN_PAGE_KEYS;
}({});
export let CARD_TYPES = /*#__PURE__*/function (CARD_TYPES) {
  CARD_TYPES["BUNDLE"] = "BUNDLE";
  CARD_TYPES["BUCKET"] = "BUCKET";
  return CARD_TYPES;
}({});
export const BUNDLE_APPLIED_TEXT = 'Applied';
export const DOWNLOADING_TEXT = 'Downloading';
export const EMPTY_STATE = {
  data: null,
  isLoading: false,
  error: null
};
export const PIN_LENGTH = 6;
export const SUBMIT_BUTTON_TEXT = 'Continue';
export const PIN_BACK_BUTTON_TEXT = 'BACK';
export const PIN_INPUT_KEY = 'Enter PIN';
export const NOT_APPLICABLE_TEXT = 'N/A';
export let BUCKET_CARD_TEXTS = /*#__PURE__*/function (BUCKET_CARD_TEXTS) {
  BUCKET_CARD_TEXTS["DOWNLOADED"] = "Downloaded";
  BUCKET_CARD_TEXTS["APPLIED"] = "Applied";
  BUCKET_CARD_TEXTS["VERSION"] = "Version";
  BUCKET_CARD_TEXTS["BUNDLES"] = "Bundles";
  BUCKET_CARD_TEXTS["UPDATED"] = "Updated";
  return BUCKET_CARD_TEXTS;
}({});
export let SWITCH_STATE_KEYS = /*#__PURE__*/function (SWITCH_STATE_KEYS) {
  SWITCH_STATE_KEYS["Enabled"] = "True";
  SWITCH_STATE_KEYS["Disabled"] = "False";
  return SWITCH_STATE_KEYS;
}({});
export const NO_RELEASE_NOTE_TEXT = 'No release note provided';
export const STALLION_LOGO_URL = 'https://d2shjbuzwp1rpv.cloudfront.net/stallion_logo.png';
export const STALLION_EB_INFO = 'A crash occurred in the app. We have switched Stallion off. Check crash report below. Continue crash to invoke other exception handlers.';
export const STALLION_EB_BTN_TXT = 'Continue Crash';
export const DOWNLOAD_ALERT_HEADER = 'Download Successful';
export const DOWNLOAD_ALERT_SWITCH_MESSAGE = 'Stallion has been switched on. ';
export const DOWNLOAD_ALERT_MESSAGE = 'Restart the app for changes to take effect.';
export const DOWNLOAD_ALERT_BUTTON = 'Ok';
export let NATIVE_CONSTANTS = /*#__PURE__*/function (NATIVE_CONSTANTS) {
  NATIVE_CONSTANTS["SDK_TOKEN"] = "x-sdk-access-token";
  NATIVE_CONSTANTS["APP_TOKEN"] = "x-app-token";
  NATIVE_CONSTANTS["SWITCH_STATE_INDENTIFIER"] = "switchState";
  NATIVE_CONSTANTS["PROD_DIRECTORY"] = "/StallionProd";
  NATIVE_CONSTANTS["STAGE_DIRECTORY"] = "/StallionStage";
  NATIVE_CONSTANTS["TEMP_FOLDER_SLOT"] = "/temp";
  NATIVE_CONSTANTS["NEW_FOLDER_SLOT"] = "/StallionNew";
  NATIVE_CONSTANTS["STABLE_FOLDER_SLOT"] = "/StallionStable";
  NATIVE_CONSTANTS["DEFAULT_FOLDER_SLOT"] = "/Default";
  NATIVE_CONSTANTS["CURRENT_PROD_SLOT_KEY"] = "stallionProdCurrentSlot";
  NATIVE_CONSTANTS["CURRENT_STAGE_SLOT_KEY"] = "stallionStageCurrentSlot";
  return NATIVE_CONSTANTS;
}({});
export let NativeEventTypesProd = /*#__PURE__*/function (NativeEventTypesProd) {
  NativeEventTypesProd["DOWNLOAD_STARTED_PROD"] = "DOWNLOAD_STARTED_PROD";
  NativeEventTypesProd["DOWNLOAD_ERROR_PROD"] = "DOWNLOAD_ERROR_PROD";
  NativeEventTypesProd["DOWNLOAD_PROGRESS_PROD"] = "DOWNLOAD_PROGRESS_PROD";
  NativeEventTypesProd["DOWNLOAD_COMPLETE_PROD"] = "DOWNLOAD_COMPLETE_PROD";
  NativeEventTypesProd["SYNC_ERROR_PROD"] = "SYNC_ERROR_PROD";
  NativeEventTypesProd["ROLLED_BACK_PROD"] = "ROLLED_BACK_PROD";
  NativeEventTypesProd["INSTALLED_PROD"] = "INSTALLED_PROD";
  NativeEventTypesProd["STABILIZED_PROD"] = "STABILIZED_PROD";
  NativeEventTypesProd["EXCEPTION_PROD"] = "EXCEPTION_PROD";
  NativeEventTypesProd["AUTO_ROLLED_BACK_PROD"] = "AUTO_ROLLED_BACK_PROD";
  return NativeEventTypesProd;
}({});
export let NativeEventTypesStage = /*#__PURE__*/function (NativeEventTypesStage) {
  NativeEventTypesStage["DOWNLOAD_ERROR_STAGE"] = "DOWNLOAD_ERROR_STAGE";
  NativeEventTypesStage["DOWNLOAD_PROGRESS_STAGE"] = "DOWNLOAD_PROGRESS_STAGE";
  NativeEventTypesStage["DOWNLOAD_COMPLETE_STAGE"] = "DOWNLOAD_COMPLETE_STAGE";
  NativeEventTypesStage["INSTALLED_STAGE"] = "INSTALLED_STAGE";
  return NativeEventTypesStage;
}({});
export const STALLION_NATIVE_EVENT = 'STALLION_NATIVE_EVENT';
export const RESTART_REQUIRED_MESSAGE = 'Bundle change detected. Click to restart app.';
export const DEFAULT_STALLION_PARAMS = {};
//# sourceMappingURL=appConstants.js.map
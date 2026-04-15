import { IStallionInitParams } from '../../types/utils.types';
export declare const HEADER_TITLE = "Stallion";
export declare const Login_TITLE = "Login to continue";
export declare const PROFILE_TITLE = "Profile";
export declare const HEADER_SLAB_HEIGHT = 50;
export declare const STD_MARGIN: number;
export declare const END_REACH_THRESHOLD = 0;
export declare const DOWNLOAD_BUTTON_TEXT = "Download";
export declare const DOWNLOADED_TEXT = "Downloaded";
export declare const APPLIED_TEXT = "Applied";
export declare const LOGOUT_BUTTON_TEXT = "Logout";
export declare const FOOTER_INFO_TITLE = "Active Bucket: ";
export declare const FOOTER_INFO_SUBTITLE = "Version: ";
export declare enum SWITCH_TEXTS {
    ON = "Testing",
    OFF = "Production"
}
export declare enum FOOTER_SUB_TEXTS {
    PROD = "User facing version",
    STAGE = "Internal sharing version"
}
export declare const SWITCH_TITLE = "Switch ";
export declare const BUCKET_CARD_UPDATED_TEXT = "Updated at: ";
export declare const BUCKET_CARD_BUNDLE_COUNT_TEXT = "Bundles: ";
export declare const BUCKET_CARD_AUTHOR_TEXT = "Author: ";
export declare const BUNDLE_CARD_RELEASE_NOTE = "Release Note: ";
export declare const BUNDLE_CARD_AUTHOR = "Author";
export declare const DOWNLOAD_PROGRESS_EVENT = "StallionDownloadProgress";
export declare const DEFAULT_ERROR_MESSAGE = "Something went wrong. Check your network connection";
export declare const EMPTY_ERROR_MESSAGE = "No buckets found";
export declare const EMPTY_ERROR_MESSAGE_BUNDLE = "No bundles found";
export declare const EMPTY_DOWNLOAD_MESSAGE = "No bundle is downloaded yet";
export declare const DEFAULT_ERROR_PREFIX = "Error: ";
export declare const VERSION_PREFIX = "V";
export declare const RETRY_BUTTON_TEXT = "Retry";
export declare const CURRENT_PLATFORM: "ios" | "android" | "windows" | "macos" | "web";
export declare const IS_ANDROID: boolean;
export declare const KEYBOARD_AVOIDING_BEHAVIOUR: string;
export declare enum LOGIN_PAGE_KEYS {
    email = "Email",
    password = "Password"
}
export declare enum CARD_TYPES {
    BUNDLE = "BUNDLE",
    BUCKET = "BUCKET"
}
export declare const BUNDLE_APPLIED_TEXT = "Applied";
export declare const DOWNLOADING_TEXT = "Downloading";
export declare const EMPTY_STATE: {
    data: null;
    isLoading: boolean;
    error: null;
};
export declare const PIN_LENGTH = 6;
export declare const SUBMIT_BUTTON_TEXT = "Continue";
export declare const PIN_BACK_BUTTON_TEXT = "BACK";
export declare const PIN_INPUT_KEY = "Enter PIN";
export declare const NOT_APPLICABLE_TEXT = "N/A";
export declare enum BUCKET_CARD_TEXTS {
    DOWNLOADED = "Downloaded",
    APPLIED = "Applied",
    VERSION = "Version",
    BUNDLES = "Bundles",
    UPDATED = "Updated"
}
export declare enum SWITCH_STATE_KEYS {
    Enabled = "True",
    Disabled = "False"
}
export declare const NO_RELEASE_NOTE_TEXT = "No release note provided";
export declare const STALLION_LOGO_URL = "https://d2shjbuzwp1rpv.cloudfront.net/stallion_logo.png";
export declare const STALLION_EB_INFO = "A crash occurred in the app. We have switched Stallion off. Check crash report below. Continue crash to invoke other exception handlers.";
export declare const STALLION_EB_BTN_TXT = "Continue Crash";
export declare const DOWNLOAD_ALERT_HEADER = "Download Successful";
export declare const DOWNLOAD_ALERT_SWITCH_MESSAGE = "Stallion has been switched on. ";
export declare const DOWNLOAD_ALERT_MESSAGE = "Restart the app for changes to take effect.";
export declare const DOWNLOAD_ALERT_BUTTON = "Ok";
export declare enum NATIVE_CONSTANTS {
    SDK_TOKEN = "x-sdk-access-token",
    APP_TOKEN = "x-app-token",
    SWITCH_STATE_INDENTIFIER = "switchState",
    PROD_DIRECTORY = "/StallionProd",
    STAGE_DIRECTORY = "/StallionStage",
    TEMP_FOLDER_SLOT = "/temp",
    NEW_FOLDER_SLOT = "/StallionNew",
    STABLE_FOLDER_SLOT = "/StallionStable",
    DEFAULT_FOLDER_SLOT = "/Default",
    CURRENT_PROD_SLOT_KEY = "stallionProdCurrentSlot",
    CURRENT_STAGE_SLOT_KEY = "stallionStageCurrentSlot"
}
export declare enum NativeEventTypesProd {
    DOWNLOAD_STARTED_PROD = "DOWNLOAD_STARTED_PROD",
    DOWNLOAD_ERROR_PROD = "DOWNLOAD_ERROR_PROD",
    DOWNLOAD_PROGRESS_PROD = "DOWNLOAD_PROGRESS_PROD",
    DOWNLOAD_COMPLETE_PROD = "DOWNLOAD_COMPLETE_PROD",
    SYNC_ERROR_PROD = "SYNC_ERROR_PROD",
    ROLLED_BACK_PROD = "ROLLED_BACK_PROD",
    INSTALLED_PROD = "INSTALLED_PROD",
    STABILIZED_PROD = "STABILIZED_PROD",
    EXCEPTION_PROD = "EXCEPTION_PROD",
    AUTO_ROLLED_BACK_PROD = "AUTO_ROLLED_BACK_PROD"
}
export declare enum NativeEventTypesStage {
    DOWNLOAD_ERROR_STAGE = "DOWNLOAD_ERROR_STAGE",
    DOWNLOAD_PROGRESS_STAGE = "DOWNLOAD_PROGRESS_STAGE",
    DOWNLOAD_COMPLETE_STAGE = "DOWNLOAD_COMPLETE_STAGE",
    INSTALLED_STAGE = "INSTALLED_STAGE"
}
export declare const STALLION_NATIVE_EVENT = "STALLION_NATIVE_EVENT";
export declare const RESTART_REQUIRED_MESSAGE = "Bundle change detected. Click to restart app.";
export declare const DEFAULT_STALLION_PARAMS: IStallionInitParams;
//# sourceMappingURL=appConstants.d.ts.map
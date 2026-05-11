export type SDKParams = {
  [key: string]: string | boolean | number;
  environment: "staging" | "production";
};

/**
 * Launch the ManageApp SDK screen.
 * All key/value pairs in `params` are forwarded as Intent extras to the native Activity.
 */
export function launchManageAppSDK(params?: SDKParams): void;

/**
 * Close the ManageApp SDK screen and return to the host app.
 */
export function closeManageAppSDK(): void;

/**
 * Preload the SDK React instance in the background.
 * Call this early (e.g. in your App's useEffect on mount) to warm up the
 * SDK so that launchManageAppSDK opens instantly.
 */
export function preloadManageAppSDKInstance(): void;

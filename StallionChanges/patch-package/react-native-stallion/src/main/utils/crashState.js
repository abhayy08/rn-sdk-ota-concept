/**
 * Simple module-level state to track if a JS crash has occurred.
 * This is used to prevent onLaunchNative from being called if a crash
 * was caught by ErrorBoundary.
 */
let hasCrashOccurred = false;
export const setCrashOccurred = () => {
  hasCrashOccurred = true;
};
export const hasCrashOccurredCheck = () => {
  return hasCrashOccurred;
};
export const resetCrashState = () => {
  hasCrashOccurred = false;
};
//# sourceMappingURL=crashState.js.map
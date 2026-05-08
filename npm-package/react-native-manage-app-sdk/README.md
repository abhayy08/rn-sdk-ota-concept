# react-native-manage-app-sdk

Drop-in React Native module for launching the ManageApp SDK inside your app. Supports CodePush OTA updates, both Old and New Architecture, and auto-links on Android.

---

## Installation

```bash
npm install react-native-manage-app-sdk
# or
yarn add react-native-manage-app-sdk
```

### Android

**1. Add the CodePush gradle plugin** in your app's `android/app/build.gradle` (bottom of file):

```groovy
apply from: "../../node_modules/@revopush/react-native-code-push/android/codepush.gradle"
```

> This is required because the SDK uses `@revopush/react-native-code-push` for OTA bundle updates.

**2. Copy the SDK bundle** into your app's assets folder:

```
android/app/src/main/assets/sdk.android.bundle
```

That's it. The `ManageAppSDKActivity` is declared in the library's own `AndroidManifest.xml` and is **automatically merged** into your app's manifest — no manual changes needed.

### iOS

```bash
cd ios && pod install
```

> iOS support is coming. The package installs cleanly on iOS but the launch methods are no-ops.

---

## Usage

```js
import {
  launchManageAppSDK,
  closeManageAppSDK,
  preloadManageAppSDKInstance,
} from 'react-native-manage-app-sdk';

// Warm up the SDK on app launch (optional but recommended)
useEffect(() => {
  preloadManageAppSDKInstance();
}, []);

// Launch the SDK screen, passing any params your SDK needs
launchManageAppSDK({
  userId: 'abc123',
  theme: 'dark',
  isPremium: true,
});

// Close the SDK and return to your app (call from inside the SDK if needed)
closeManageAppSDK();
```

---

## API

### `launchManageAppSDK(params?)`

Launches the ManageApp SDK Activity. All key/value pairs in `params` are forwarded as Intent extras.

| Param    | Type                                      | Default |
|----------|-------------------------------------------|---------|
| `params` | `{ [key: string]: string \| boolean \| number }` | `{}`    |

### `closeManageAppSDK()`

Finishes the SDK Activity and returns to the host app.

### `preloadManageAppSDKInstance()`

Starts warming up the SDK's React instance in the background. Call this early (e.g. on app mount) so the SDK opens instantly when `launchManageAppSDK` is called.

---

## How it works

The package bundles three Kotlin files:

| File | Role |
|------|------|
| `ManageAppSDKActivity` | Hosts a second, isolated React Native instance that loads `sdk.android.bundle`. Handles both Old Arch (`ReactNativeHost`) and New Arch (`ReactHost`). |
| `ManageAppSDKModule` | Exposes `launchManageAppSDK`, `closeManageAppSDK`, and `preloadManageAppSDKInstance` to JS via the bridge. |
| `ManageAppSDKPackage` | Registers `ManageAppSDKModule` with React Native's autolinking system. |

The library's `AndroidManifest.xml` declares `ManageAppSDKActivity`, which Android's manifest merger automatically merges into the host app — the same way libraries like Firebase and Stripe work.

---

## CodePush / OTA updates

The SDK bundle is loaded via `@revopush/react-native-code-push` (the Revopush fork — not the deprecated AppCenter/Microsoft CodePush). When a Revopush OTA update is available for `sdk.android.bundle`, it will be picked up automatically on the next SDK launch. If CodePush is not available (e.g. first install), the SDK falls back to the bundled `assets/sdk.android.bundle`.

The library's `android/build.gradle` references the CodePush Android module as `compileOnly project(':react-native-code-push')`. This works because RN autolinking registers `@revopush/react-native-code-push` under that Gradle project name in every host app that has it installed — no extra wiring needed.

---

## Troubleshooting

**"ManageAppSDKModule doesn't seem to be linked"**
→ Rebuild the app. Autolinking runs at build time, not at runtime.

**SDK screen is blank / crashes**
→ Make sure `sdk.android.bundle` exists at `android/app/src/main/assets/sdk.android.bundle`.

**`CodePush.getJSBundleFile` throws**
→ Make sure `@revopush/react-native-code-push` is installed (not the deprecated AppCenter version) and the Revopush gradle plugin is applied in `app/build.gradle`:
```groovy
apply from: "../../node_modules/@revopush/react-native-code-push/android/codepush.gradle"
```

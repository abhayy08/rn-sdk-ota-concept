# React Native Dynamic SDK Integration (OTA + Multi-Bundle Architecture)

## Overview

This repository demonstrates an **architecture pattern for integrating a React Native SDK into a host application using dynamic JavaScript bundle loading and OTA updates**.

It presents a modern alternative to the commonly used **WebView-based feature delivery**, enabling:

- Native rendering (no WebView overhead)
- Better performance
- Modular feature rollout
- OTA (Over-the-Air) updates support

---

## Problem Statement

In many apps (e.g., OTT platforms), certain screens like **pack pages, offers, or promotional flows** change frequently.

### Traditional Approach

- Implement these screens using a **WebView**
- Load UI/web-app from a remote server

### Limitations of WebView

- Performance bottlenecks
- Limited access to native capabilities
- Inconsistent UI/UX
- Harder debugging and state management

---

## Proposed Solution

This project replaces the WebView approach with a **React Native multi-bundle architecture**, where:

- The **host app** loads its main bundle
- A **secondary React Native bundle (SDK)** is dynamically loaded at runtime

This SDK acts like a **mini app inside the parent app**, enabling independent development and updates.

---

## Architecture

### Bundles

| Type       | Android Bundle Name    | iOS Bundle Name |
| ---------- | ---------------------- | --------------- |
| Host App   | `index.android.bundle` | `main.jsbundle` |
| SDK Bundle | `sdk.android.bundle`   | `sdk.jsbundle`  |

### Flow

1. Host app initializes normally
2. When required, it dynamically loads the **SDK bundle**
3. SDK renders its own React Native screens
4. OTA updates can update SDK independently of the host app

---

## Key Features

- 🔹 Dynamic loading of secondary React Native bundle
- 🔹 No WebView dependency
- 🔹 Fully native UI rendering
- 🔹 OTA update support
- 🔹 Modular feature delivery
- 🔹 Scalable architecture for large apps

---

## OTA Update Support

This repo includes integration with:

### 1. CodePush

- Works with **React Native Old Architecture only**
- Limited support for newer versions

### 2. React Native Stallion

- Works with **both Old and New Architecture**
- Recommended for future-proof implementation
- May require adjustments for newer React Native versions

---

## React Native Version

```
0.78.0
```

---

## Why This Approach?

| Feature            | WebView Approach | Multi-Bundle RN Approach       |
| ------------------ | ---------------- | ------------------------------ |
| Performance        | ❌ Slower        | ✅ Native speed                |
| UI Consistency     | ❌ Inconsistent  | ✅ Fully native (React native) |
| OTA Updates        | ✅ Yes           | ✅ Yes                         |
| Native Integration | ❌ Limited       | ✅ Full access                 |
| Debugging          | ❌ Hard          | ✅ Easier                      |

---

## Use Cases

- Frequently changing product pages
- Feature flags & experiments
- Marketing campaigns
- OTT dynamic content pages
- Micro-frontend architecture in mobile apps

---

## Implementation Notes

- The SDK bundle is treated as a **self-contained React Native module**

- Communication between host and SDK can be handled via:

  - Native modules (The SDK is launched through Native Modules)
  - Event emitters
  - Props/state injection

- Bundle loading is platform-specific:

  - Android: asset or file system loading
  - iOS: bundled or downloaded JS bundle execution

---

## Limitations

- Increased complexity compared to WebView
- Requires careful version compatibility management
- OTA strategy must be well planned
- New architecture support may evolve with React Native updates

---

## Future Improvements

- Better tooling for bundle splitting
- Version synchronization between host and SDK
- Improved debugging support
- CI/CD pipeline for SDK bundle deployment

---

## Getting Started

1. Clone the repository
2. Install dependencies

   ```
   npm install
   ```

3. Run the host app

   ```
   npx react-native run-android
   npx react-native run-ios
   ```

4. Trigger SDK bundle loading from the app

```
const { ManageAppSDKModule } = NativeModules
ManageAppSDKModule?.launchManageAppSDK()
```

---

## Conclusion

This architecture provides a **scalable and performant alternative to WebView-based feature delivery**, leveraging the full power of React Native while enabling **independent deployment and rapid iteration**.

---

## License

MIT

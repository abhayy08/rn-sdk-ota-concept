import UIKit
import React

#if RCT_NEW_ARCH_ENABLED
import React_RCTAppDelegate
import ReactAppDependencyProvider
#endif

// MARK: - ManageAppSDKViewController
//
// Core rule: ALWAYS reuse the host app's existing React Native bridge/host.
//
// Spinning up a second RCTReactNativeFactory or RCTBridge creates an isolated
// TurboModule / NativeModule registry. Any native module registered by the
// host app (Stallion, CodePush, etc.) will be missing from that registry,
// causing an ObjC exception → std::terminate on the turbomodulemanager queue.
//
// Resolution order:
//   1. New Arch  — host RCTAppDelegate.rootViewFactory (RN 0.74+)
//   2. Old Arch  — RCTBridge.current() (works for both Old Arch and New Arch
//                  bridge-compatibility mode)
//   3. Fallback  — standalone instance (only if host has no React at all;
//                  will crash if sdk.jsbundle uses host-registered modules)

class ManageAppSDKViewController: UIViewController {
    private var initialProps: [String: String]

    // Retain standalone factory so it isn't deallocated while the view is live.
    #if RCT_NEW_ARCH_ENABLED
    private var standaloneFactory: RCTReactNativeFactory?
    #endif

    init(initialProps: [String: String]) {
        self.initialProps = initialProps
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        self.initialProps = [:]
        super.init(coder: coder)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }

        if let sdkView = makeSDKView(props: props) {
            sdkView.frame = view.bounds
            sdkView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            view = sdkView
        } else {
            NSLog("SDK_DEBUG: ERROR — could not create SDK view. Check that sdk.jsbundle is bundled correctly.")
        }
    }

    // MARK: - View creation

    private func makeSDKView(props: [String: Any]) -> UIView? {

        // ── Path 1: New Arch — reuse host rootViewFactory ──────────────────
        #if RCT_NEW_ARCH_ENABLED
        if let appDelegate = UIApplication.shared.delegate as? RCTAppDelegate {
            NSLog("SDK_DEBUG: [New Arch] Reusing host RCTAppDelegate.rootViewFactory.")
            return appDelegate.rootViewFactory().view(
                withModuleName: "ManageAppSDK",
                initialProperties: props
            )
        }
        NSLog("SDK_DEBUG: [New Arch] Host AppDelegate is not RCTAppDelegate.")
        #endif

        // ── Path 2: Reuse host RCTBridge (Old Arch & New Arch bridge-mode) ─
        if let bridge = RCTBridge.current() {
            NSLog("SDK_DEBUG: [Bridge] Reusing host RCTBridge.")
            return RCTRootView(bridge: bridge, moduleName: "ManageAppSDK", initialProperties: props)
        }
        NSLog("SDK_DEBUG: No host bridge found — falling back to standalone instance.")

        // ── Path 3: Standalone fallback ─────────────────────────────────────
        // WARNING: This will crash at runtime if sdk.jsbundle calls any native
        // module that is registered only in the host app (e.g. Stallion).
        guard let bundleURL = ManageAppSDKViewController.resolveBundleURL() else {
            NSLog("SDK_DEBUG: ERROR — sdk.jsbundle not found.")
            return nil
        }

        #if RCT_NEW_ARCH_ENABLED
        let delegate = SDKStandaloneDelegate(bundleURL: bundleURL)
        delegate.dependencyProvider = RCTAppDependencyProvider()
        let factory = RCTReactNativeFactory(delegate: delegate)
        standaloneFactory = factory
        NSLog("SDK_DEBUG: [Standalone/NewArch] Starting isolated React instance.")
        return factory.rootViewFactory.view(withModuleName: "ManageAppSDK", initialProperties: props)
        #else
        NSLog("SDK_DEBUG: [Standalone/OldArch] Starting isolated React instance.")
        let bridge = RCTBridge(bundleURL: bundleURL, moduleProvider: nil, launchOptions: nil)!
        return RCTRootView(bridge: bridge, moduleName: "ManageAppSDK", initialProperties: props)
        #endif
    }

    // MARK: - Bundle URL Resolution

    static func resolveBundleURL() -> URL? {
        // 1. CodePush OTA via ObjC runtime (no compile-time dependency)
        if let codePushClass = NSClassFromString("CodePush") {
            let selector = NSSelectorFromString("bundleURLForResource:withExtension:")
            if codePushClass.responds(to: selector) {
                typealias BundleURLFunc = @convention(c) (AnyClass, Selector, NSString, NSString) -> Unmanaged<AnyObject>?
                if let imp = class_getMethodImplementation(object_getClass(codePushClass), selector) {
                    let fn = unsafeBitCast(imp, to: BundleURLFunc.self)
                    if let result = fn(codePushClass, selector, "sdk" as NSString, "jsbundle" as NSString),
                       let url = result.takeUnretainedValue() as? URL {
                        NSLog("SDK_DEBUG: Using CodePush bundle: \(url)")
                        return url
                    }
                }
            }
        }

        // 2. Named resource bundle (podspec resource_bundles)
        if let podBundleURL = Bundle.main.url(forResource: "react-native-manage-app-sdk", withExtension: "bundle"),
           let podBundle = Bundle(url: podBundleURL),
           let url = podBundle.url(forResource: "sdk", withExtension: "jsbundle") {
            NSLog("SDK_DEBUG: Using bundle from pod resource bundle: \(url)")
            return url
        }

        // 3. Main bundle root
        if let url = Bundle.main.url(forResource: "sdk", withExtension: "jsbundle") {
            NSLog("SDK_DEBUG: Using bundle from main bundle: \(url)")
            return url
        }

        // 4. Filesystem search fallback
        let mainBundlePath = Bundle.main.bundlePath
        if let enumerator = FileManager.default.enumerator(atPath: mainBundlePath) {
            for case let path as String in enumerator where path.hasSuffix("sdk.jsbundle") {
                let url = URL(fileURLWithPath: (mainBundlePath as NSString).appendingPathComponent(path))
                NSLog("SDK_DEBUG: Found bundle via search: \(url)")
                return url
            }
        }

        return nil
    }
}

// MARK: - Standalone delegate (only used in last-resort path)

#if RCT_NEW_ARCH_ENABLED
private class SDKStandaloneDelegate: RCTDefaultReactNativeFactoryDelegate {
    private let customBundleURL: URL?

    init(bundleURL: URL?) {
        self.customBundleURL = bundleURL
        super.init()
    }

    override func bundleURL() -> URL? { customBundleURL }
    override func sourceURL(for bridge: RCTBridge) -> URL? { bundleURL() }
}
#endif

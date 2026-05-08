import UIKit
import React

#if RCT_NEW_ARCH_ENABLED
import React_RCTAppDelegate
import ReactAppDependencyProvider
#endif

// MARK: - New Architecture delegate

#if RCT_NEW_ARCH_ENABLED
class SDKReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
    private let customBundleURL: URL?

    init(bundleURL: URL?) {
        self.customBundleURL = bundleURL
        super.init()
    }

    override func bundleURL() -> URL? {
        return customBundleURL
    }

    // Forces local bundle loading — prevents Metro banner from appearing
    override func sourceURL(for bridge: RCTBridge) -> URL? {
        return self.bundleURL()
    }
}
#endif

// MARK: - ManageAppSDKViewController

class ManageAppSDKViewController: UIViewController {
    private var initialProps: [String: String]

    #if RCT_NEW_ARCH_ENABLED
    private var reactNativeFactory: RCTReactNativeFactory?
    private var reactNativeDelegate: SDKReactNativeDelegate?
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
        let bundleURL = ManageAppSDKViewController.resolveBundleURL()
        NSLog("SDK_DEBUG: BundlePath: \(String(describing: bundleURL))")

        #if RCT_NEW_ARCH_ENABLED
        NSLog("SDK_DEBUG: Running on NEW Architecture")
        setupNewArchView(bundleURL: bundleURL)
        #else
        NSLog("SDK_DEBUG: Running on OLD Architecture")
        setupOldArchView(bundleURL: bundleURL)
        #endif
    }

    // MARK: - Bundle URL resolution

    /// Resolves the SDK bundle URL.
    /// Priority:
    ///   1. CodePush OTA bundle (via reflection — optional dependency)
    ///   2. sdk.jsbundle shipped inside the npm package (copied into main bundle by CocoaPods)
    static func resolveBundleURL() -> URL? {
        // Try CodePush via reflection — no compile-time dependency
        if let codePushURL = resolveCodePushBundleURL() {
            NSLog("SDK_DEBUG: Using CodePush bundle: \(codePushURL)")
            return codePushURL
        }

        // Fall back to the bundled sdk.jsbundle
        if let bundledURL = Bundle.main.url(forResource: "sdk", withExtension: "jsbundle") {
            NSLog("SDK_DEBUG: Using bundled sdk.jsbundle")
            return bundledURL
        }

        NSLog("SDK_DEBUG: WARNING — sdk.jsbundle not found in main bundle")
        return nil
    }

    private static func resolveCodePushBundleURL() -> URL? {
        // Call +[CodePush bundleURLForResource:withExtension:] via ObjC runtime
        // so there is zero compile-time dependency on CodePush.
        guard let codePushClass = NSClassFromString("CodePush") else {
            NSLog("SDK_DEBUG: CodePush class not found — skipping OTA check")
            return nil
        }
        let selector = NSSelectorFromString("bundleURLForResource:withExtension:")
        guard codePushClass.responds(to: selector) else {
            NSLog("SDK_DEBUG: CodePush does not respond to bundleURLForResource:withExtension:")
            return nil
        }
        // perform(_:with:) only supports one argument.
        // Use objc_msgSend with a typed function pointer to pass two string args.
        typealias BundleURLFunc = @convention(c) (AnyClass, Selector, NSString, NSString) -> Unmanaged<AnyObject>?
        let imp = class_getMethodImplementation(object_getClass(codePushClass), selector)
        guard let imp = imp else { return nil }
        let fn = unsafeBitCast(imp, to: BundleURLFunc.self)
        let result = fn(codePushClass, selector, "sdk" as NSString, "jsbundle" as NSString)
        return result?.takeUnretainedValue() as? URL
    }

    // MARK: - New Architecture setup

    private func setupNewArchView(bundleURL: URL?) {
        #if RCT_NEW_ARCH_ENABLED
        guard let bundleURL = bundleURL else {
            NSLog("SDK_DEBUG: No bundle URL — cannot launch SDK (New Arch)")
            return
        }

        reactNativeDelegate = SDKReactNativeDelegate(bundleURL: bundleURL)

        // Share the host app's dependency provider so the SDK gets all
        // the same native modules the host app has registered.
        // This is the iOS equivalent of PackageList on Android.
        if let appDelegate = UIApplication.shared.delegate as? RCTAppDelegate {
            reactNativeDelegate?.dependencyProvider = appDelegate.dependencyProvider
        }

        reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeDelegate!)

        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }

        if let sdkView = reactNativeFactory?.rootViewFactory.view(
            withModuleName: "ManageAppSDK",
            initialProperties: props
        ) {
            sdkView.frame = self.view.bounds
            sdkView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            self.view = sdkView
        }
        #endif
    }

    // MARK: - Old Architecture setup

    private func setupOldArchView(bundleURL: URL?) {
        guard let bundleURL = bundleURL else {
            NSLog("SDK_DEBUG: No bundle URL — cannot launch SDK (Old Arch)")
            return
        }
        let bridge = RCTBridge(bundleURL: bundleURL, moduleProvider: nil, launchOptions: nil)!
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }
        let rootView = RCTRootView(bridge: bridge, moduleName: "ManageAppSDK", initialProperties: props)
        rootView.frame = self.view.bounds
        rootView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        self.view = rootView
    }
}

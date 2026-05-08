import UIKit
import React
import CodePush

#if RCT_NEW_ARCH_ENABLED
import React_RCTAppDelegate
import ReactAppDependencyProvider
#endif

// MARK: - New Arch Delegate

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

        let jsCodeLocation = ManageAppSDKViewController.resolveBundleURL()
        NSLog("SDK_DEBUG: BundlePath: \(String(describing: jsCodeLocation))")

        #if RCT_NEW_ARCH_ENABLED
        NSLog("SDK_DEBUG: Running on NEW Architecture")
        setupNewArchView(bundleURL: jsCodeLocation)
        #else
        NSLog("SDK_DEBUG: Running on OLD Architecture")
        setupOldArchView(bundleURL: jsCodeLocation)
        #endif
    }

    // MARK: - Bundle URL Resolution

    static func resolveBundleURL() -> URL? {
        // 1. CodePush OTA bundle for "sdk" resource (only non-nil if an OTA
        //    update has been downloaded for the SDK's own deployment key)
        if let codePushURL = CodePush.bundleURL(forResource: "sdk", withExtension: "jsbundle") {
            NSLog("SDK_DEBUG: Using CodePush OTA bundle: \(codePushURL)")
            return codePushURL
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

    // MARK: - New Architecture

    private func setupNewArchView(bundleURL: URL?) {
        #if RCT_NEW_ARCH_ENABLED
        guard let bundleURL = bundleURL else { return }

        reactNativeDelegate = SDKReactNativeDelegate(bundleURL: bundleURL)

        // Share the host app's dependency provider so all TurboModules
        // registered by the host (gesture handler, SVG, CodePush, etc.)
        // are available to the SDK's React instance.
        if let appDelegate = UIApplication.shared.delegate as? RCTAppDelegate {
            reactNativeDelegate?.dependencyProvider = appDelegate.dependencyProvider
        }

        reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeDelegate!)

        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }

        // Install an ObjC exception handler to catch the exact module name
        // that fails before std::terminate kills the process.
        NSSetUncaughtExceptionHandler { exception in
            NSLog("SDK_DEBUG: *** UNCAUGHT EXCEPTION: %@", exception.name.rawValue)
            NSLog("SDK_DEBUG: *** REASON: %@", exception.reason ?? "nil")
            NSLog("SDK_DEBUG: *** CALL STACK: %@", exception.callStackSymbols.joined(separator: "\n"))
        }

        let sdkView = reactNativeFactory!.rootViewFactory.view(
            withModuleName: "ManageAppSDK",
            initialProperties: props
        )
        sdkView.frame = self.view.bounds
        sdkView.autoresizingMask = [UIView.AutoresizingMask.flexibleWidth, UIView.AutoresizingMask.flexibleHeight]
        self.view = sdkView
        #endif
    }

    // MARK: - Old Architecture

    private func setupOldArchView(bundleURL: URL?) {
        guard let bundleURL = bundleURL else { return }
        let bridge = RCTBridge(bundleURL: bundleURL, moduleProvider: nil, launchOptions: nil)!
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }
        let rootView = RCTRootView(bridge: bridge, moduleName: "ManageAppSDK", initialProperties: props)
        rootView.frame = self.view.bounds
        rootView.autoresizingMask = [UIView.AutoresizingMask.flexibleWidth, UIView.AutoresizingMask.flexibleHeight]
        self.view = rootView
    }
}

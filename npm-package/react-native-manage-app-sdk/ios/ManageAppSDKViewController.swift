import UIKit
import React

// ManageAppSDKViewController hosts an isolated React Native instance
// loaded from sdk.jsbundle using RCTBridge.
//
// RCTBridge is used on both Old Arch and New Arch host apps.
// Creating a second RCTReactNativeFactory on New Arch crashes because
// the TurboModule manager is a process-wide singleton.
// RCTBridge runs in its own isolated context and does not conflict.

class ManageAppSDKViewController: UIViewController {
    private var initialProps: [String: String]

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

        guard let bundleURL = ManageAppSDKViewController.resolveBundleURL() else {
            NSLog("SDK_DEBUG: ERROR - sdk.jsbundle not found. Run pod install.")
            return
        }

        NSLog("SDK_DEBUG: Resolved bundle: \(bundleURL)")

        let bridge = RCTBridge(bundleURL: bundleURL, moduleProvider: nil, launchOptions: nil)!
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }
        let rootView = RCTRootView(bridge: bridge, moduleName: "ManageAppSDK", initialProperties: props)
        rootView.frame = self.view.bounds
        rootView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        self.view = rootView
    }

    // MARK: - Bundle URL resolution

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

        // 2. Named resource bundle (resource_bundles in podspec)
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

        // 4. Filesystem search
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

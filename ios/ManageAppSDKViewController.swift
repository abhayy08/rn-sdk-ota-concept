import UIKit
import React
import react_native_stallion

#if RCT_NEW_ARCH_ENABLED
import React_RCTAppDelegate
import ReactAppDependencyProvider
#endif

// 1. Delegate for New Architecture instances
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

    // Forces local loading and removes the Metro banner
    override func sourceURL(for bridge: RCTBridge) -> URL? {
        return self.bundleURL()
    }

}
#endif

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

        let jsCodeLocation = StallionModule.getBundleURL(
            Bundle.main.url(forResource: "sdk", withExtension: "jsbundle")
        )

        #if RCT_NEW_ARCH_ENABLED
            NSLog("SDK_DEBUG: Running on NEW Architecture (0.78.0 Factory)")
            setupNewArchView(bundleURL: jsCodeLocation)
        #else
            NSLog("SDK_DEBUG: Running on OLD Architecture")
            setupOldArchView(bundleURL: jsCodeLocation)
        #endif
    }

    // MARK: - New Architecture (0.78.0+)
    private func setupNewArchView(bundleURL: URL?) {
        #if RCT_NEW_ARCH_ENABLED
        guard let bundleURL = bundleURL else { return }

        // Initialize Factory with Delegate
        reactNativeDelegate = SDKReactNativeDelegate(bundleURL: bundleURL)
        
        // Use the app's existing dependency provider for module sharing
        if let appDelegate = UIApplication.shared.delegate as? RCTAppDelegate {
            reactNativeDelegate?.dependencyProvider = appDelegate.dependencyProvider
        }

        reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeDelegate!)
        
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }
        
        // Create the view using the factory's rootViewFactory
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

    // MARK: - Old Architecture
    private func setupOldArchView(bundleURL: URL?) {
        guard let bundleURL = bundleURL else { return }
        let bridge = RCTBridge(bundleURL: bundleURL, moduleProvider: nil, launchOptions: nil)!
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }
        let rootView = RCTRootView(bridge: bridge, moduleName: "ManageAppSDK", initialProperties: props)
        rootView.frame = self.view.bounds
        rootView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        self.view = rootView
    }
}

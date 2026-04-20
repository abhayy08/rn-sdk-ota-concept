import ReactAppDependencyProvider
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

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [weak self] in
            guard let self = self else { return }
            
            let fallbackURL = Bundle.main.url(forResource: "sdk", withExtension: "jsbundle")
            let jsCodeLocation = StallionModule.getBundleURL(fallbackURL)
            
            NSLog("SDK_DEBUG: fallbackURL = \(String(describing: fallbackURL))")
            NSLog("SDK_DEBUG: jsCodeLocation (from Stallion) = \(String(describing: jsCodeLocation))")
            NSLog("SDK_DEBUG: Are they the same? \(fallbackURL == jsCodeLocation)")
            
            // Check if bundle file actually exists
            if let url = jsCodeLocation {
                let exists = FileManager.default.fileExists(atPath: url.path)
                NSLog("SDK_DEBUG: Bundle file exists at path? \(exists)")
                NSLog("SDK_DEBUG: Bundle path = \(url.path)")
                
                // List assets directory relative to bundle
                let assetDir = url.deletingLastPathComponent().appendingPathComponent("assets")
                let assetExists = FileManager.default.fileExists(atPath: assetDir.path)
                NSLog("SDK_DEBUG: Assets dir exists? \(assetExists)")
                NSLog("SDK_DEBUG: Assets dir path = \(assetDir.path)")
              
                // Temporarily add this to viewDidLoad to find assets
                let appBundlePath = Bundle.main.bundlePath
                NSLog("SDK_DEBUG: App bundle path = \(appBundlePath)")

                // List ALL contents of app bundle root
                let allFiles = try? FileManager.default.contentsOfDirectory(atPath: appBundlePath)
                allFiles?.sorted().forEach { NSLog("SDK_DEBUG: file = \($0)") }
                
                if assetExists {
                    let files = try? FileManager.default.contentsOfDirectory(atPath: assetDir.path)
                    NSLog("SDK_DEBUG: Asset count = \(files?.count ?? 0)")
                }
            }

            #if RCT_NEW_ARCH_ENABLED
                self.setupNewArchView(bundleURL: jsCodeLocation)
            #else
                self.setupOldArchView(bundleURL: jsCodeLocation)
            #endif
        }
    }

    // MARK: - New Architecture (0.78.0+)
    private func setupNewArchView(bundleURL: URL?) {
        #if RCT_NEW_ARCH_ENABLED
        guard let bundleURL = bundleURL else { return }

        // Initialize Factory with Delegate
//        reactNativeDelegate = SDKReactNativeDelegate(bundleURL: bundleURL)
        
        // Use the app's existing dependency provider for module sharing
//        if let appDelegate = UIApplication.shared.delegate as? RCTAppDelegate {
//            reactNativeDelegate?.dependencyProvider = appDelegate.dependencyProvider
//        }
        reactNativeDelegate = SDKReactNativeDelegate(bundleURL: bundleURL)
        reactNativeDelegate?.dependencyProvider = RCTAppDependencyProvider()
        NSLog("SDK_DEBUG: set dependency provider = \(type(of: reactNativeDelegate?.dependencyProvider))")
        
        NSLog("SDK_DEBUG: dependencyProvider type = \(type(of: reactNativeDelegate?.dependencyProvider))")
        NSLog("SDK_DEBUG: reactNativeFactory = \(String(describing: reactNativeFactory))")

        reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeDelegate!)
        
        let props: [String: Any] = initialProps.reduce(into: [:]) { $0[$1.key] = $1.value }
        
        // Create the view using the factory's rootViewFactory
        if let sdkView = reactNativeFactory?.rootViewFactory.view(
            withModuleName: "ManageAppSDK",
            initialProperties: props
        ) {
            sdkView.frame = self.view.bounds
            sdkView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
//            self.view.addSubview(sdkView)
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
//        self.view.addSubview(rootView)
        self.view = rootView
    }
}

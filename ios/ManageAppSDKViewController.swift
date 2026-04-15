import UIKit
import React
import CodePush
import react_native_stallion

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

//        let jsCodeLocation = CodePush.bundleURL(forResource: "sdk", withExtension: "jsbundle")
        let jsCodeLocation = StallionModule.getBundleURL(Bundle.main.url(forResource: "sdk", withExtension: "jsbundle"))

        let bridge = RCTBridge(bundleURL: jsCodeLocation, moduleProvider: nil, launchOptions: nil)

        NSLog("ManageAppSDK Props: \(initialProps)")

        let rootView = RCTRootView(
            bridge: bridge!,
            moduleName: "ManageAppSDK",
            initialProperties: initialProps
        )

        self.view = rootView
    }
}

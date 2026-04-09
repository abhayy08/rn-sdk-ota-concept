import UIKit
import React
import CodePush

class ManageAppSDKViewController: UIViewController {

    private var accessToken: String?

    init(accessToken: String?) {
        self.accessToken = accessToken
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        let jsCodeLocation = CodePush.bundleURL(forResource: "sdk", withExtension: "jsbundle")

        // ✅ Explicitly create RCTBridge
        let bridge = RCTBridge(bundleURL: jsCodeLocation, moduleProvider: nil, launchOptions: nil)

        let rootView = RCTRootView(
            bridge: bridge!,
            moduleName: "ManageAppSDK",
            initialProperties: [
                "accessToken": accessToken ?? ""
            ]
        )

        self.view = rootView
    }
}

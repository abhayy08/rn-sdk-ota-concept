import Foundation
import React
import UIKit

@objc(ManageAppSDKModule)
class ManageAppSDKModule: NSObject {

    @objc
    func launchManageAppSDK(_ params: NSDictionary) {
        DispatchQueue.main.async {
            var finalProps: [String: String] = [:]
            for (key, value) in params {
                guard let keyStr = key as? String else { continue }
                if value is NSNull {
                    finalProps[keyStr] = "null"
                } else {
                    finalProps[keyStr] = "\(value)"
                }
            }

            guard let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController else {
                NSLog("SDK_DEBUG: launchManageAppSDK — no root view controller found")
                return
            }

            let sdkVC = ManageAppSDKViewController(initialProps: finalProps)
            sdkVC.modalPresentationStyle = .fullScreen
            rootVC.present(sdkVC, animated: true, completion: nil)
        }
    }

    @objc
    func closeManageAppSDK() {
        DispatchQueue.main.async {
            guard let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController else {
                NSLog("SDK_DEBUG: closeManageAppSDK — no root view controller found")
                return
            }
            rootVC.presentedViewController?.dismiss(animated: true)
        }
    }

    @objc
    func preloadManageAppSDKInstance() {
        NSLog("SDK_DEBUG: preloadManageAppSDKInstance called (iOS no-op)")
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

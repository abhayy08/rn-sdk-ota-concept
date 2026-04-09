import Foundation
import React
import UIKit

@objc(ReactActivityModule)
class ReactActivityModule: NSObject {

    @objc
    func launchManageAppSDK(_ params: NSDictionary) {
        DispatchQueue.main.async {

            var finalParams: [String: String] = [:]

            for (key, value) in params {
                guard let keyStr = key as? String else { continue }

                if value is NSNull {
                    finalParams[keyStr] = "null"
                    NSLog("SDK_DEBUG \(keyStr): null")
                } else {
                    finalParams[keyStr] = "\(value)"
                    NSLog("SDK_DEBUG \(keyStr): \(value)")
                }
            }

            let sdkVC = ManageAppSDKViewController(initialProps: finalParams)
            sdkVC.modalPresentationStyle = .fullScreen

            if let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController {

                rootVC.present(sdkVC, animated: true, completion: nil)
            }
        }
    }

    @objc
    func closeManageAppSDK() {
        DispatchQueue.main.async {
            if let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController {

                rootVC.presentedViewController?.dismiss(animated: true)
            }
        }
    }
}

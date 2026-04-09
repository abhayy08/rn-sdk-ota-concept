import Foundation
import React
import UIKit

@objc(ReactActivityModule)
class ReactActivityModule: NSObject {

    // ✅ Launch SDK
    @objc
    func launchManageAppSDK(_ params: NSDictionary) {
        DispatchQueue.main.async {

            let accessToken = params["accessToken"] as? String

            let sdkVC = ManageAppSDKViewController(accessToken: accessToken)
          
          sdkVC.modalPresentationStyle = .fullScreen

            if let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController {

                rootVC.present(sdkVC, animated: true, completion: nil)
            }
        }
    }

    // ✅ Close SDK (Equivalent to Android finish())
    @objc
    func closeManageAppSDK() {
        DispatchQueue.main.async {

            if let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ ($0 as? UIWindowScene)?.keyWindow })
                .first?.rootViewController {

                if let presentedVC = rootVC.presentedViewController {
                    presentedVC.dismiss(animated: true, completion: nil)
                }
            }
        }
    }
}

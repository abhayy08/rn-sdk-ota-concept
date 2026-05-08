require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-manage-app-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/your-org/react-native-manage-app-sdk"
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/your-org/react-native-manage-app-sdk.git", :tag => "#{s.version}" }

  # Swift + ObjC bridge files
  s.source_files = "ios/**/*.{h,m,mm,swift}"

  # Ship the JS bundle + all image/gif assets inside the pod.
  # CocoaPods copies everything listed here into the host app's main bundle
  # during `pod install` — no manual step needed for the consumer.
  s.resources = [
    "ios/sdk.jsbundle",
    "ios/assets/**/*"
  ]

  # Required for Swift/ObjC interop in the module
  s.pod_target_xcconfig = {
    "SWIFT_VERSION" => "5.0",
    "DEFINES_MODULE" => "YES"
  }

  s.dependency "React-Core"

  # React_RCTAppDelegate is needed for New Architecture (RCTDefaultReactNativeFactoryDelegate)
  # It's conditionally imported in Swift with #if RCT_NEW_ARCH_ENABLED so this is safe
  # for both old and new arch consumers.
  s.dependency "React-RCTAppDelegate"
end

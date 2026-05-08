require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Detect New Architecture: explicit env var OR RN 0.74+ default (no explicit disable)
new_arch_enabled = ENV['RCT_NEW_ARCH_ENABLED'] != '0'

Pod::Spec.new do |s|
  s.name         = "react-native-manage-app-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/your-org/react-native-manage-app-sdk"
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/your-org/react-native-manage-app-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.resource_bundles = {
    'react-native-manage-app-sdk' => [
      'ios/sdk.jsbundle',
      'ios/assets/**/*.png',
      'ios/assets/**/*.gif',
      'ios/assets/**/*.jpg',
      'ios/assets/**/*.jpeg',
      'ios/assets/**/*.webp'
    ]
  }

  s.pod_target_xcconfig = {
    "SWIFT_VERSION" => "5.0",
    "DEFINES_MODULE" => "YES",
    "OTHER_SWIFT_FLAGS" => new_arch_enabled ? "-DRCT_NEW_ARCH_ENABLED" : ""
  }

  s.dependency "React-Core"
  if new_arch_enabled
    s.dependency "React-RCTAppDelegate"
    s.dependency "ReactAppDependencyProvider"
  end
end
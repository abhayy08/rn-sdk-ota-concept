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
    "SWIFT_VERSION" => "5.0"
  }

  s.dependency "React-Core"
end

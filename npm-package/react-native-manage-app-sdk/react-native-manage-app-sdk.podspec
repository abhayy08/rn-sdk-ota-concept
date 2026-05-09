require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

new_arch_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

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

  # sdk.jsbundle is copied flat into the app's main bundle so CodePush can find
  # it via [NSBundle mainBundle].
  # Assets use a resource_bundle named after the assets folder so the directory
  # structure (assets/images/...) is preserved inside the bundle.
  # The JS bundle resolves assets relative to its own location — when loaded
  # from the app bundle, RN looks for assets/ next to the bundle file.
  s.resources = [
    'ios/sdk.jsbundle',
    'ios/assets'
  ]

  s.pod_target_xcconfig = {
    "SWIFT_VERSION"      => "5.0",
    "OTHER_SWIFT_FLAGS"  => new_arch_enabled ? "$(inherited) -DRCT_NEW_ARCH_ENABLED" : "$(inherited)"
  }

  s.dependency "React-Core"
  s.dependency "CodePush"

  if new_arch_enabled
    s.dependency "React-RCTAppDelegate"
    s.dependency "ReactAppDependencyProvider"
  end
end

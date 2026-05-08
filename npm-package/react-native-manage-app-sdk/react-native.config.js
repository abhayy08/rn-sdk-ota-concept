module.exports = {
  dependency: {
    platforms: {
      android: {
        // Points RN CLI to the library's android folder
        sourceDir: './android',
        // The package class that RN CLI will register automatically
        packageImportPath: 'import com.manageappsdk.ManageAppSDKPackage;',
        packageInstance: 'new ManageAppSDKPackage()',
      },
      ios: {
        // iOS podspec is handled via CocoaPods — no extra config needed here
      },
    },
  },
};

package com.manageappsdk

import com.facebook.react.ReactPackage

/**
 * This class is referenced by react-native.config.js for autolinking.
 * RN CLI will call ManageAppSDKPackageProvider().createPackage() automatically.
 */
class ManageAppSDKPackageProvider {
    fun createPackage(): ReactPackage = ManageAppSDKPackage()
}

package com.sdk_as_module

import android.app.Application
import android.os.Bundle
import com.facebook.react.PackageList
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.microsoft.codepush.react.CodePush

class ManageAppSDKActivity: ReactActivity() {
    override fun getMainComponentName(): String = "ManageAppSDK"


    override fun createReactActivityDelegate(): ReactActivityDelegate? {
        return object: DefaultReactActivityDelegate(
            this,
            mainComponentName,
            fabricEnabled
        ) {

            override fun getLaunchOptions(): Bundle {
                val initialProps = Bundle()

                intent?.getStringExtra("accessToken")?.let {
                    android.util.Log.d("ManageAppSDK", "accessToken received: $it")
                    initialProps.putString("accessToken", it)
                } ?: android.util.Log.d("ManageAppSDK", "accessToken is NULL or not found in intent")

                return initialProps
            }

            override fun getReactNativeHost(): ReactNativeHost {
                return object : ReactNativeHost(application as Application) {

                    override fun getUseDeveloperSupport(): Boolean {
                        return false
                    }

                    override fun getPackages(): List<ReactPackage> =
                        PackageList(this).packages.apply {
                        // Packages that cannot be autolinked yet can be added manually here, for example:
                         add(ReactActivityPackage())
                    }

                    override fun getJSBundleFile(): String? {
                        return CodePush.getJSBundleFile("sdk.android.bundle")
                    }

                    override fun getBundleAssetName(): String {
                        return "sdk.android.bundle"
                    }
                }
            }

        }

    }
}
package com.sdk_as_module

import android.app.Application
import android.os.Bundle
import androidx.annotation.Nullable
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

//            override fun getLaunchOptions(): Bundle {
//                val initialProps = Bundle()
//
//                intent?.getStringExtra("accessToken")?.let {
//                    android.util.Log.d("ManageAppSDK", "accessToken received: $it")
//                    initialProps.putString("accessToken", it)
//                } ?: android.util.Log.d("ManageAppSDK", "accessToken is NULL or not found in intent")
//
//                return initialProps
//            }

            override fun getLaunchOptions(): Bundle {
                val initialProps = Bundle()

                intent?.extras?.let { bundle ->
                    for (key in bundle.keySet()) {
                        val value = bundle.get(key)
                        when (value) {
                            is String -> initialProps.putString(key, value)
                            is Boolean -> initialProps.putBoolean(key, value)
                            is Double -> initialProps.putDouble(key, value)
                            is Int -> initialProps.putInt(key, value)
                        }

                        android.util.Log.d("ManageAppSDK", "Prop -> $key: $value")
                    }
                }

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
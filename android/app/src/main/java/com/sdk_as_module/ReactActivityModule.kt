package com.sdk_as_module

import android.content.Intent
import com.facebook.react.bridge.*

class ReactActivityModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "ReactActivityModule"

    @ReactMethod
    fun launchManageAppSDK(accessToken: String) {
        val activity = reactContext.currentActivity ?: return

        android.util.Log.d("SDK_DEBUG", accessToken)


        val intent = Intent(activity, ManageAppSDKActivity::class.java)
        intent.putExtra("accessToken", accessToken)

        activity.startActivity(intent)
    }

    @ReactMethod
    fun closeManageAppSDK() {
        reactContext.currentActivity?.finish()
    }
}
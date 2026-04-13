package com.sdk_as_module

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*

class ReactActivityModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "ReactActivityModule"

    @ReactMethod
    fun launchManageAppSDK(params: ReadableMap) {
        val activity = reactContext.currentActivity ?: return
        val app = activity.application as MainApplication

        Log.d("SDK_DEBUG", "launchManageAppSDK called — isResetting: ${app.isResetting}")

        if (app.isResetting) {
            Log.d("SDK_DEBUG", "Launch blocked — SDK is resetting")
            return
        }

        val intent = Intent(activity, ManageAppSDKActivity::class.java)

        val iterator = params.keySetIterator()

        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()

            when (params.getType(key)) {
                ReadableType.String -> {
                    val value = params.getString(key)
                    intent.putExtra(key, value)
                    Log.d("SDK_DEBUG", "$key: $value")
                }

                ReadableType.Boolean -> {
                    val value = params.getBoolean(key)
                    intent.putExtra(key, value)
                    Log.d("SDK_DEBUG", "$key: $value")
                }

                ReadableType.Number -> {
                    val value = params.getDouble(key)
                    intent.putExtra(key, value)
                    Log.d("SDK_DEBUG", "$key: $value")
                }

                ReadableType.Map -> {
                    val value = params.getMap(key)?.toHashMap().toString()
                    intent.putExtra(key, value)
                    Log.d("SDK_DEBUG", "$key: $value")
                }

                ReadableType.Array -> {
                    val value = params.getArray(key)?.toString()
                    intent.putExtra(key, value)
                    Log.d("SDK_DEBUG", "$key: $value")
                }

                ReadableType.Null -> {
                    intent.putExtra(key, "null")
                    Log.d("SDK_DEBUG", "$key: null")
                }

                else -> {}

            }
        }

        activity.startActivity(intent)
    }

    @ReactMethod
    fun closeManageAppSDK() {
        reactContext.currentActivity?.finish()
    }
}
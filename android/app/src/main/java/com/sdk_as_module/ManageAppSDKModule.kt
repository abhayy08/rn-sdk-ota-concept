package com.sdk_as_module

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*

class ManageAppSDKModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "ManageAppSDKModule"

    @ReactMethod
    fun launchManageAppSDK(params: ReadableMap) {
        val activity = reactContext.currentActivity ?: return

        if (ManageAppSDKActivity.isResetting) {
            Log.d("MANAGE APP SDK", "Launch blocked — SDK is resetting")
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
                    Log.d("MANAGE APP SDK", "$key: $value")
                }

                ReadableType.Boolean -> {
                    val value = params.getBoolean(key)
                    intent.putExtra(key, value)
                    Log.d("MANAGE APP SDK", "$key: $value")
                }

                ReadableType.Number -> {
                    val value = params.getDouble(key)
                    intent.putExtra(key, value)
                    Log.d("MANAGE APP SDK", "$key: $value")
                }

                ReadableType.Map -> {
                    val value = params.getMap(key)?.toHashMap().toString()
                    intent.putExtra(key, value)
                    Log.d("MANAGE APP SDK", "$key: $value")
                }

                ReadableType.Array -> {
                    val value = params.getArray(key)?.toString()
                    intent.putExtra(key, value)
                    Log.d("MANAGE APP SDK", "$key: $value")
                }

                ReadableType.Null -> {
                    intent.putExtra(key, "null")
                    Log.d("MANAGE APP SDK", "$key: null")
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


    /*
    * This preloads the SDK before launching it
    * You can call this function to preload the SDK if the launching of SDK takes a bit of time,
    * */
    @ReactMethod
    fun preloadManageAppSDKInstance() {
        if (ManageAppSDKActivity.isResetting) {
            Log.d("MANAGE APP SDK", "Preloading blocked — SDK is resetting")
            return
        }else {
            Log.d("MANAGE APP SDK", "Preloading")
            ManageAppSDKActivity.preloadSDKInstance(reactContext)
        }
    }
}
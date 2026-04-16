package com.sdk_as_module

import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class ManageAppSDKActivity : ReactActivity() {

    override fun getMainComponentName(): String = "ManageAppSDK"

    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(androidx.appcompat.R.style.Theme_AppCompat_Light_NoActionBar)

        val mask = View(this).apply {
            background = android.graphics.drawable.GradientDrawable(
                android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM,
                intArrayOf(0xFF340368.toInt(), 0xFF140128.toInt())
            )
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        }
        (window.decorView as? ViewGroup)?.addView(mask)

        ensureSDKHostReady()
        super.onCreate(savedInstanceState)

        mask.postDelayed({
            mask.animate()
                .alpha(0f)
                .setDuration(400)
                .withEndAction { (mask.parent as? ViewGroup)?.removeView(mask) }
                .start()
        }, 500)
    }

    private fun ensureSDKHostReady() {
        val app = application as MainApplication
        try {
            if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                // sdkReactHost getter guarantees a fresh valid host
                app.sdkReactHost.start()
                Log.d("SDK_DEBUG", "ReactHost.start() called on launch (New Arch)")
            } else {
                val host = app.sdkHost
                if (!host.reactInstanceManager.hasStartedCreatingInitialContext()) {
                    Log.d("SDK_DEBUG", "Host cold on launch — starting context now")
                    host.reactInstanceManager.createReactContextInBackground()
                } else {
                    Log.d("SDK_DEBUG", "Host already warm — fast launch")
                }
            }
        } catch (e: Exception) {
            Log.e("SDK_DEBUG", "ensureSDKHostReady failed: ${e.message}")
        }
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {

            override fun getReactNativeHost(): ReactNativeHost {
                return (application as MainApplication).sdkHost
            }

            override fun getReactHost(): ReactHost {
                // Always returns the current valid host (never stale)
                return (application as MainApplication).sdkReactHost
            }

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
                        Log.d("ManageAppSDK", "Prop -> $key: $value")
                    }
                }
                return initialProps
            }
        }
    }

    override fun onPause() {
        (application as MainApplication).isResetting = true
        super.onPause()
    }

    override fun onDestroy() {
        // 1. Let the delegate clean up the surface first
        try {
            reactDelegate?.onHostDestroy()
        } catch (e: Exception) {
            Log.e("SDK_DEBUG", "delegate onHostDestroy failed: ${e.message}")
        }

        super.onDestroy()

        // 2. Trigger reset AFTER super.onDestroy
        // This ensures the Fabric Surface is detached before we wipe the JS engine
        (application as MainApplication).resetSDKInstance()
    }
}
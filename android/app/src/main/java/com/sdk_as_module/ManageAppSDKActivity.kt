@file:OptIn(UnstableReactNativeAPI::class)
package com.sdk_as_module

import android.app.Application
import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.ViewGroup
import com.facebook.react.PackageList
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.bridge.JSBundleLoader
import com.facebook.react.common.annotations.UnstableReactNativeAPI
import com.facebook.react.defaults.DefaultComponentsRegistry
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultReactHostDelegate
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.defaults.DefaultTurboModuleManagerDelegate
import com.facebook.react.fabric.ComponentFactory
import com.facebook.react.runtime.JSCInstance
import com.facebook.react.runtime.ReactHostImpl
import com.facebook.react.runtime.hermes.HermesInstance
import com.stallion.Stallion

class ManageAppSDKActivity : ReactActivity() {

    companion object {

        @Volatile private var _sdkHost: ReactNativeHost? = null
        @Volatile private var _sdkReactHost: ReactHost? = null

        private val sdkHostLock = Any()

        @Volatile var isResetting = false

        fun getSdkHost(context: Context): ReactNativeHost =
            _sdkHost ?: synchronized(sdkHostLock) {
                _sdkHost ?: createSdkHost(context).also { newHost ->
                    _sdkHost = newHost
                    // Always create the ReactHost alongside the ReactNativeHost
                    // so both references are never stale relative to each other.
                    _sdkReactHost = createSdkReactHost(context, newHost)
                    Log.d("SDK_DEBUG", "SDK host + reactHost created")
                }
            }

        fun getSdkReactHost(context: Context): ReactHost {
            getSdkHost(context) // ensures _sdkReactHost is set alongside _sdkHost
            return _sdkReactHost!!
        }

        private fun createSdkHost(context: Context): ReactNativeHost {
            return object : DefaultReactNativeHost(context.applicationContext as Application) {

                override fun getPackages() =
                    PackageList(this).packages.apply { add(ManageAppSDKPackage()) }

                // Stallion resolves to a downloaded file after OTA; falls back to
                // the bundled asset on first run or when no update is available.
                override fun getJSBundleFile(): String? =
                    Stallion.getJSBundleFile(context.applicationContext, "assets://sdk.android.bundle")

                override fun getBundleAssetName(): String = "sdk.android.bundle"
                override fun getJSMainModuleName(): String = "index"

                override fun getUseDeveloperSupport(): Boolean = false

                override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
                override val isHermesEnabled: Boolean  = BuildConfig.IS_HERMES_ENABLED
            }
        }

        private fun createSdkReactHost(context: Context, sdkHost: ReactNativeHost): ReactHost {
            val stallionPath = Stallion.getJSBundleFile(
                context.applicationContext,
                "assets://sdk.android.bundle"
            )

            // Choose the correct loader based on whether Stallion has a cached update.
            val bundleLoader = when {
                stallionPath == null || stallionPath.startsWith("assets://") ->
                    // No OTA update yet — serve the bundle that ships with the APK.
                    JSBundleLoader.createAssetLoader(
                        context.applicationContext,
                        stallionPath ?: "assets://sdk.android.bundle",
                        true
                    )
                else ->
                    // OTA update downloaded — load Stallion's file from disk.
                    JSBundleLoader.createFileLoader(stallionPath)
            }

            // Choose between Hermes (default, recommended) and JSC at build time.
            val jsRuntimeFactory = if (BuildConfig.IS_HERMES_ENABLED) HermesInstance() else JSCInstance()

            val delegate = DefaultReactHostDelegate(
                jsMainModulePath = "index",
                jsBundleLoader = bundleLoader,
                // Re-use the sdkHost to resolve auto-linked packages so this host
                // and the Old Arch host always share the same package list.
                reactPackages = PackageList(sdkHost).packages.apply {
                    add(ManageAppSDKPackage())
                },
                jsRuntimeFactory = jsRuntimeFactory,
                turboModuleManagerDelegateBuilder = DefaultTurboModuleManagerDelegate.Builder()
            )

            // Fabric components must be registered before ReactHostImpl is created.
            val componentFactory = ComponentFactory()
            DefaultComponentsRegistry.register(componentFactory)

            return ReactHostImpl(
                context.applicationContext,
                delegate,
                componentFactory,
                true,  // allowPackageManagerQueries
                false  // useDevSupport — SDK is always a bundle not a dev server
            )
        }

        fun preloadSDKInstance(context: Context) {
            Thread {
                try {
                    // Building the host pair may or mat not involve IO operation because of Stallion
                    // so we do this off the main thread
                    val host = getSdkHost(context)

                    Handler(Looper.getMainLooper()).post {
                        try {
                            if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                                _sdkReactHost?.start()
                                Log.d("SDK_DEBUG", "SDK ReactHost.start() called (New Arch)")
                            } else {
                                if (!host.reactInstanceManager.hasStartedCreatingInitialContext()) {
                                    host.reactInstanceManager.createReactContextInBackground()
                                    Log.d("SDK_DEBUG", "SDK context preload started (Old Arch)")
                                } else {
                                    Log.d("SDK_DEBUG", "SDK context already warming/warm")
                                }
                            }
                        } catch (e: Exception) {
                            Log.e("SDK_DEBUG", "Preload post to main thread failed: ${e.message}")
                        }
                    }
                } catch (e: Exception) {
                    Log.e("SDK_DEBUG", "SDK host creation failed during preload: ${e.message}")
                }
            }.start()
        }

        fun resetSDKInstance(context: Context) {
            Handler(Looper.getMainLooper()).post {
                synchronized(sdkHostLock) {
                    try {
                        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                            _sdkReactHost?.destroy("Resetting SDK Instance", null)
                            Log.d("SDK_DEBUG", "SDK ReactHost destroyed (New Arch)")
                        } else {
                            _sdkHost?.reactInstanceManager?.let {
                                it.onHostDestroy()
                                it.destroy()
                                Log.d("SDK_DEBUG", "SDK InstanceManager destroyed (Old Arch)")
                            }
                            // Null both so the next getSdkHost() rebuilds the pair from scratch.
                            _sdkHost = null
                            _sdkReactHost = null
                        }
                    } catch (e: Exception) {
                        Log.e("SDK_DEBUG", "Reset failed: ${e.message}")
                    }
                }

                if (!BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                    // Allow the old instance to fully wind down before starting a new one.
                    Handler(Looper.getMainLooper()).postDelayed({
                        isResetting = false
                        preloadSDKInstance(context)
                    }, 500)
                } else {
                    isResetting = false
                }
            }
        }
    }

    override fun getMainComponentName(): String = "ManageAppSDK"

    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(androidx.appcompat.R.style.Theme_AppCompat_Light_NoActionBar)

        val splashMask = buildSplashMask()
        (window.decorView as? ViewGroup)?.addView(splashMask)

        ensureSDKHostReady()

        super.onCreate(savedInstanceState)

        splashMask.postDelayed({
            splashMask.animate()
                .alpha(0f)
                .setDuration(400)
                .withEndAction { (splashMask.parent as? ViewGroup)?.removeView(splashMask) }
                .start()
        }, 500)
    }

    private fun ensureSDKHostReady() {
        try {
            if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                getSdkReactHost(applicationContext).start()
                Log.d("SDK_DEBUG", "ReactHost.start() called on launch (New Arch)")
            } else {
                val host = getSdkHost(applicationContext)
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

    private fun buildSplashMask(): View = View(this).apply {
        background = android.graphics.drawable.GradientDrawable(
            android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM,
            intArrayOf(0xFF340368.toInt(), 0xFF140128.toInt())
        )
        layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
    }


    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {

            override fun getReactNativeHost(): ReactNativeHost =
                getSdkHost(applicationContext)

            override fun getReactHost(): ReactHost =
                getSdkReactHost(applicationContext)

            override fun getLaunchOptions(): Bundle {
                val initialProps = Bundle()
                intent?.extras?.let { bundle ->
                    for (key in bundle.keySet()) {
                        when (val value = bundle.get(key)) {
                            is String  -> initialProps.putString(key, value)
                            is Boolean -> initialProps.putBoolean(key, value)
                            is Double  -> initialProps.putDouble(key, value)
                            is Int     -> initialProps.putInt(key, value)
                        }
                        Log.d("ManageAppSDK", "Prop -> $key: ${bundle.get(key)}")
                    }
                }
                return initialProps
            }
        }
    }

    override fun onPause() {
        isResetting = true
        super.onPause()
    }

    override fun onDestroy() {
        try {
            reactDelegate?.onHostDestroy()
        } catch (e: Exception) {
            Log.e("SDK_DEBUG", "delegate onHostDestroy failed: ${e.message}")
        }

        super.onDestroy()

        resetSDKInstance(applicationContext)
    }
}
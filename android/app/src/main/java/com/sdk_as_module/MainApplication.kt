// @file:OptIn(UnstableReactNativeAPI::class)
package com.sdk_as_module

import android.app.Application
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.stallion.Stallion
import android.content.Context
import com.facebook.react.runtime.ReactHostImpl
import com.facebook.react.runtime.hermes.HermesInstance
import com.facebook.react.runtime.JSCInstance
import com.facebook.react.bridge.JSBundleLoader
import com.facebook.react.defaults.DefaultReactHostDelegate
import com.facebook.react.defaults.DefaultTurboModuleManagerDelegate
import com.facebook.react.defaults.DefaultComponentsRegistry
import com.facebook.react.fabric.ComponentFactory

class MainApplication : Application(), ReactApplication {

    @Volatile private var _sdkHost: ReactNativeHost? = null
    @Volatile private var _sdkReactHost: ReactHost? = null

    private val sdkHostLock = Any()

    val sdkHost: ReactNativeHost
        get() = _sdkHost ?: synchronized(sdkHostLock) {
            _sdkHost ?: createSdkHost().also {
                _sdkHost = it
                // Always create sdkReactHost together with sdkHost
//                _sdkReactHost = getDefaultReactHost(applicationContext, it)
                _sdkReactHost = createSdkReactHost(applicationContext)
                Log.d("SDK_DEBUG", "SDK host + reactHost created")
            }
        }

    // Returns current valid sdkReactHost, creating pair if needed
    val sdkReactHost: ReactHost
        get() {
            // Accessing sdkHost ensures both _sdkHost and _sdkReactHost are set
            sdkHost
            return _sdkReactHost!!
        }

    private fun createSdkHost(): ReactNativeHost {
        return object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    add(ManageAppSDKPackage())
                }

            override fun getJSBundleFile(): String? =
                Stallion.getJSBundleFile(this@MainApplication, "assets://sdk.android.bundle")

            override fun getBundleAssetName(): String = "sdk.android.bundle"
            override fun getJSMainModuleName(): String = "index"
            override fun getUseDeveloperSupport(): Boolean = false
            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }
    }

    private fun createSdkReactHost(context: Context): ReactHost {
    val stallionPath = Stallion.getJSBundleFile(this, "assets://sdk.android.bundle")

    // ✅ Stallion returns a file path after update, asset path on first launch
    val bundleLoader = when {
        stallionPath == null || stallionPath.startsWith("assets://") -> {
            JSBundleLoader.createAssetLoader(
                context,
                stallionPath ?: "assets://sdk.android.bundle",
                true
            )
        }
        else -> {
            // Stallion has a downloaded bundle on disk
            JSBundleLoader.createFileLoader(stallionPath)
        }
    }

    val jsRuntimeFactory = if (BuildConfig.IS_HERMES_ENABLED) HermesInstance() else JSCInstance()

    val delegate = DefaultReactHostDelegate(
        jsMainModulePath = "index",
        jsBundleLoader = bundleLoader,
        reactPackages = PackageList(reactNativeHost).packages.apply {
            add(ManageAppSDKPackage())
        },
        jsRuntimeFactory = jsRuntimeFactory,
        turboModuleManagerDelegateBuilder = DefaultTurboModuleManagerDelegate.Builder()
    )

    val componentFactory = ComponentFactory()
    DefaultComponentsRegistry.register(componentFactory)

    return ReactHostImpl(
        context,
        delegate,
        componentFactory,
        true,
        false
    )
}


    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
                add(ManageAppSDKPackage())
            }
        override fun getJSMainModuleName(): String = "index"
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()

        SoLoader.init(this, OpenSourceMergedSoMapping)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            load()
        }

        reactHost
        preloadSDKInstance()
    }

    fun preloadSDKInstance() {
        Thread {
            try {
                val host = sdkHost // this also ensures _sdkReactHost is set
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
                        Log.e("SDK_DEBUG", "Preload failed: ${e.message}")
                    }
                }
            } catch (e: Exception) {
                Log.e("SDK_DEBUG", "SDK host creation failed: ${e.message}")
            }
        }.start()
    }

    @Volatile var isResetting = false

    fun resetSDKInstance() {
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
                        // Only null out for Old Arch to force recreation
                        _sdkHost = null
                        _sdkReactHost = null
                    }
                } catch (e: Exception) {
                    Log.e("SDK_DEBUG", "Reset failed: ${e.message}")
                }
            }

            if (!BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
                Handler(Looper.getMainLooper()).postDelayed({
                    isResetting = false
                    preloadSDKInstance()
                }, 500)
            } else {
                isResetting = false
            }
        }
    }
}
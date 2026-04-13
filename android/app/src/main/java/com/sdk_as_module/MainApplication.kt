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
import com.microsoft.codepush.react.CodePush

class MainApplication : Application(), ReactApplication {

  // SDK Host — never null after onCreate, always ready to launch
  @Volatile
  private var _sdkHost: ReactNativeHost? = null

  private val sdkHostLock = Any()

  val sdkHost: ReactNativeHost
    get() = _sdkHost ?: synchronized(sdkHostLock) {
      _sdkHost ?: createSdkHost().also {
        _sdkHost = it
        Log.d("SDK_DEBUG", "SDK host created")
      }
    }

  private fun createSdkHost(): ReactNativeHost {
    return object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          add(ReactActivityPackage())
        }

      override fun getJSBundleFile(): String? =
        CodePush.getJSBundleFile("sdk.android.bundle")

      override fun getBundleAssetName(): String = "sdk.android.bundle"
      override fun getJSMainModuleName(): String = "index"
      override fun getUseDeveloperSupport(): Boolean = false
      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }
  }

  // Main App Host — always stays alive, completely separate from SDK host
  override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
    override fun getPackages(): List<ReactPackage> =
      PackageList(this).packages.apply {
        add(ReactActivityPackage())
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

    // Preload SDK host immediately in background
    // so it's warm before user ever taps launch
    preloadSDKInstance()
  }

  fun preloadSDKInstance() {
    Thread {
      try {
        // Ensure host is created and context starts warming
        // sdkHost getter guarantees non-null
        val host = sdkHost
        Handler(Looper.getMainLooper()).post {
          try {
            if (!host.reactInstanceManager.hasStartedCreatingInitialContext()) {
              host.reactInstanceManager.createReactContextInBackground()
              Log.d("SDK_DEBUG", "SDK context preload started")
            } else {
              Log.d("SDK_DEBUG", "SDK context already warming/warm")
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

  // Called when SDK activity closes — resets host only if CodePush
  // has a new bundle ready, otherwise keeps the warm instance alive
  @Volatile
  var isResetting = false

  fun resetSDKInstance() {
    Handler(Looper.getMainLooper()).post {
      synchronized(sdkHostLock) {
        try {
          val host = _sdkHost
          if (host != null) {
            val manager = host.reactInstanceManager

            // Give JS side time to finish in-flight work
            // before tearing down the instance
            manager.onHostDestroy()
            manager.destroy()
            Log.d("SDK_DEBUG", "SDK Instance destroyed safely")
          }
          _sdkHost = null
        } catch (e: Exception) {
          Log.e("SDK_DEBUG", "Reset failed: ${e.message}")
        }
      }

      Handler(Looper.getMainLooper()).postDelayed({
        isResetting = false
        preloadSDKInstance()
      }, 500)
    }
  }

}
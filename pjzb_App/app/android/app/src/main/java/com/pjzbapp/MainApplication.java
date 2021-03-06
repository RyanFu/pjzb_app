package com.pjzbapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.update.UpdatePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

import com.theweflex.react.WeChatPackage;

import cn.reactnative.modules.update.UpdateContext;
import cn.jpush.reactnativejpush.JPushPackage;
import com.imagepicker.ImagePickerPackage;
public class MainApplication extends Application implements ReactApplication {
  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
   
    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UpdatePackage(),
             new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
             new LinearGradientPackage() ,
             new ImagePickerPackage(),
             new WeChatPackage()        // Add this line
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}

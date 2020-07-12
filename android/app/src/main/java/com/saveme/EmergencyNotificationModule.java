package com.saveme;

import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.saveme.notification.EmergencyNotificationService;
import com.saveme.notification.NotificationServiceState;

public class EmergencyNotificationModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static Callback callback;

    public static void triggerCallback(NotificationServiceState state) {
        if (callback != null) {
            Gson gson = new Gson();
            callback.invoke(gson.toJson(state));
        }
    }

    EmergencyNotificationModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "EmergencyNotification";
    }

    @ReactMethod
    public void startService() {
        this.reactContext.startService(new Intent(this.reactContext, EmergencyNotificationService.class));
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, EmergencyNotificationService.class));
    }

    @ReactMethod
    public void registerCallback(Callback cb) {
        callback = cb;
    }

    @ReactMethod
    public void refreshState() {
      triggerCallback(EmergencyNotificationService.getState());
    }
}
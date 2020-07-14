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
    public void refreshState(Callback cb) {
        if (cb != null) {
            Gson gson = new Gson();
            cb.invoke(gson.toJson(EmergencyNotificationService.getState()));
        }
    }
}
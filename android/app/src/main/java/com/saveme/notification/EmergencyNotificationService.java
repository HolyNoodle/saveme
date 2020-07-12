package com.saveme.notification;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;

import com.saveme.EmergencyNotificationModule;
import com.saveme.MainActivity;
import com.saveme.R;
import com.saveme.volume.EmergencyTriggerService;

public class EmergencyNotificationService extends Service {
    private static final int SERVICE_NOTIFICATION_ID = 3658794;
    private static final String CHANNEL_ID = "SAVEME";
    private static Notification notification;

    private static final NotificationServiceState state = new NotificationServiceState();

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "SAVEME", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    public static NotificationServiceState getState() {
        return state;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        stopService(new Intent(this, EmergencyTriggerService.class));

        NotificationManager notificationManager = getSystemService(NotificationManager.class);
        notificationManager.cancelAll();

        state.started = false;
        state.mode = NotificationMode.INACTIVE;

        EmergencyNotificationModule.triggerCallback(state);
    }

    public void createNotification(Notification notification) {
        createNotificationChannel();

        startForeground(SERVICE_NOTIFICATION_ID, notification);
    }

    public void updateNotification(Notification notification) {
        NotificationManager notificationManager = getSystemService(NotificationManager.class);

        notificationManager.notify(SERVICE_NOTIFICATION_ID, notification);
    }

    private NotificationCompat.Builder createNotificationObject() {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);

        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle(state.mode.toString() + " mode")
                .setContentText("We got you")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(contentIntent)
                .setOngoing(true);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Bundle extras = intent.getExtras();

        boolean isEmergencyTriggered = extras != null;
        if (isEmergencyTriggered) {
            NotificationMode notificationMode = NotificationMode.valueOf(extras.getString("GESTURE_TRIGGERED"));

            if (state.mode != notificationMode) {
                state.mode = notificationMode;
            } else {
                state.mode = NotificationMode.LISTENING;
            }

            Notification notification = createNotificationObject()
                    .setContentTitle(state.mode.toString() + " mode")
                    .setContentText("We got you")
                    .build();

            updateNotification(notification);
        } else {
            state.mode = NotificationMode.LISTENING;

            notification = createNotificationObject()
                    .setContentTitle(state.mode.toString() + " mode")
                    .setContentText("We got you")
                    .build();

            createNotification(notification);
            startService(new Intent(this, EmergencyTriggerService.class));
        }

        state.started = true;
        EmergencyNotificationModule.triggerCallback(state);

        return START_STICKY;
    }

}
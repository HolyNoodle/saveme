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

import com.facebook.flipper.plugins.databases.ObjectMapper;
import com.google.gson.Gson;
import com.saveme.MainActivity;
import com.saveme.R;
import com.saveme.session.Session;
import com.saveme.session.configuration.Config;
import com.saveme.volume.EmergencyTriggerService;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

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

        if(state.session != null) {
            try {
                state.session.stop();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        state.session = null;
        state.started = false;
        state.mode = NotificationMode.INACTIVE;
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

            if (state.mode == NotificationMode.EMERGENCY || state.mode == NotificationMode.HELP) {
                Config config = this.getConfig();

                state.session = new Session(config);
                state.session.start(this);

                Intent newIntent = new Intent(getApplicationContext(), MainActivity.class);
                newIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                this.startActivity(newIntent);
            }
            else {
                if(state.session != null) {
                    try {
                        state.session.stop();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    state.session = null;
                }
            }

            Notification notification = createNotificationObject()
                    .setContentTitle(state.mode.toString() + " mode")
                    .setContentText("We got you")
                    .build();

            updateNotification(notification);
        } else {
            state.mode = NotificationMode.LISTENING;

            if(state.session != null) {
                try {
                    state.session.stop();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                state.session = null;
            }

            notification = createNotificationObject()
                    .setContentTitle(state.mode.toString() + " mode")
                    .setContentText("We got you")
                    .build();

            createNotification(notification);
            startService(new Intent(this, EmergencyTriggerService.class));
        }

        state.started = true;

        return START_STICKY;
    }

    private Config getConfig() {
        String configFileName = this.getFilesDir() + File.separator + "config.json";
        Config config = new Config();

        try {
            File file = new File(configFileName);
            FileInputStream fis = new FileInputStream(configFileName);
            byte[] data = new byte[(int) file.length()];

            fis.read(data);
            fis.close();
            String str = new String(data, "UTF-8");

            Gson gson = new Gson();
            config = gson.fromJson(str, Config.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return config;
    }

}
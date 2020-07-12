package com.saveme.volume;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;

import androidx.media.VolumeProviderCompat;

import com.saveme.notification.EmergencyNotificationService;
import com.saveme.notification.NotificationMode;

public class EmergencyTriggerService extends Service {
    private static MediaSessionCompat mediaSession;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        PlaybackStateCompat playbackState = new PlaybackStateCompat.Builder()
                .setState(PlaybackStateCompat.STATE_PLAYING, 0, 0) //you simulate a player which plays something.
                .build();

        mediaSession = new MediaSessionCompat(this, "EmergencyTriggerService");
        mediaSession.setFlags(MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS | MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS);
        mediaSession.setPlaybackState(playbackState);

        VolumeGestureProvider.setCallbackInterface((String notificationMode) -> {
            Intent intent = new Intent(this, EmergencyNotificationService.class);
            intent.putExtra("GESTURE_TRIGGERED", notificationMode);
            startService(intent);
        });

        VolumeProviderCompat myVolumeProvider = new VolumeGestureProvider(VolumeProviderCompat.VOLUME_CONTROL_RELATIVE, 100, 50);

        mediaSession.setPlaybackToRemote(myVolumeProvider);
        mediaSession.setActive(true);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mediaSession.release();
    }

    public static void stop() {
        if (mediaSession != null) {
            mediaSession.setActive(false);
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }
}
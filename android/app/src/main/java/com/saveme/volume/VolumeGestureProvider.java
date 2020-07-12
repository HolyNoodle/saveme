package com.saveme.volume;

import androidx.media.VolumeProviderCompat;

import com.saveme.notification.NotificationMode;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//this will only work on Lollipop and up, see https://code.google.com/p/android/issues/detail?id=224134
public class VolumeGestureProvider extends VolumeProviderCompat {
    public static void setCallbackInterface(VolumeGestureProviderCallbackInterface callbackInterface) {
        VolumeGestureProvider.callbackInterface = callbackInterface;
    }

    public interface VolumeGestureProviderCallbackInterface {
        void onGesture(String notificationMode);
    }

    private static float gestureTiming = 5000;
    private static VolumeGestureProviderCallbackInterface callbackInterface;

    private static List<Integer> directions = new ArrayList<>();
    private static List<Date> timings = new ArrayList<>();

    /**
     * Create a new volume provider for handling volume events. You must specify
     * the type of volume control and the maximum volume that can be used.
     *
     * @param volumeControl The method for controlling volume that is used by
     *                      this provider.
     * @param maxVolume     The maximum allowed volume.
     * @param currentVolume The current volume.
     */
    public VolumeGestureProvider(int volumeControl, int maxVolume, int currentVolume) {
        super(volumeControl, maxVolume, currentVolume);

        patterns = new ArrayList<>();
        patterns.add(new VolumeTriggerPattern(new int[] {1, -1, 1, 1}, NotificationMode.EMERGENCY));
        patterns.add(new VolumeTriggerPattern(new int[] {1, -1, 1, -1}, NotificationMode.HELP));
    }

    private List<VolumeTriggerPattern> patterns;
    private VolumeTriggerPattern checkGestures() {
        purgeMemory();

        for (VolumeTriggerPattern pattern : patterns) {
            if (pattern.checkGesture(directions)) {
                return pattern;
            }
        }

        return null;
    }

    private static void purgeMemory() {
        long now = new Date().getTime();
        for (int i = 0; i < timings.size(); ) {
            if (now - timings.get(i).getTime() < gestureTiming) {
                break;
            }

            timings.remove(i);
            directions.remove(i);
        }
    }

    private static void triggerEmergencyIntent(VolumeTriggerPattern pattern) {
        callbackInterface.onGesture(pattern.getResult().toString());
    }

    @Override
    public void onAdjustVolume(int direction) {
        super.onAdjustVolume(direction);

        if (direction != 0) {
            directions.add(direction);
            timings.add(new Date());

            VolumeTriggerPattern pattern = checkGestures();
            if (pattern != null) {
                directions.clear();
                timings.clear();
                triggerEmergencyIntent(pattern);
            }
        }

        purgeMemory();
    }
}

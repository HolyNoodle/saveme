package com.saveme.volume;

import com.saveme.notification.NotificationMode;

import java.util.List;

public class VolumeTriggerPattern {
    private int[] pattern;
    private NotificationMode result;

    public VolumeTriggerPattern(int[] pattern, NotificationMode result) {
        this.pattern = pattern;
        this.result = result;
    }

    public NotificationMode getResult() {
        return result;
    }

    public boolean checkGesture(List<Integer> directions) {
        if (directions.size() < pattern.length) {
            return false;
        }

        int[] lastElements = directions.subList(directions.size() - pattern.length, directions.size()).stream().mapToInt(i->i).toArray();;

        for (Integer j = 0; j < pattern.length; ++j) {
            if (lastElements[j] != pattern[j]) {
                return false;
            }
        }

        return true;
    }
}

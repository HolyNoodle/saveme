package com.saveme.session.configuration;

import com.google.gson.annotations.Expose;

import java.util.Dictionary;
import java.util.List;

public class Config {
    @Expose
    private boolean isMicrophoneRecorderEnabled;
    @Expose
    private boolean isGoelocationRecorderEnabled;
    @Expose
    private boolean isDevicesRecorderEnabled;
    @Expose
    private List<TimelineActorConfig> timeline;


    public boolean isDevicesRecorderEnabled() {
        return isDevicesRecorderEnabled;
    }

    public boolean isMicrophoneRecorderEnabled() {
        return isMicrophoneRecorderEnabled;
    }

    public boolean isGoelocationRecorderEnabled() {
        return isGoelocationRecorderEnabled;
    }

    public List<TimelineActorConfig> getTimeline() {
        return timeline;
    }
}

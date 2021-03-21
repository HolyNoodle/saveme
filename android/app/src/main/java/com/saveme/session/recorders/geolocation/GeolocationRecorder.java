package com.saveme.session.recorders.geolocation;

import android.annotation.SuppressLint;
import android.location.Location;

import com.saveme.session.Logger;
import com.saveme.session.configuration.Config;
import com.saveme.session.log.EventLog;
import com.saveme.session.log.GeolocationLog;
import com.saveme.session.recorders.IRecorder;

public class GeolocationRecorder implements IRecorder, IGeolocationListener {
    private Logger logger = null;
    private transient GeolocationService service = null;

    public GeolocationRecorder(GeolocationService service) {
        this.service = service;
    }

    @SuppressLint("MissingPermission")
    @Override
    public void start(Logger logger) {
        this.logger = logger;
        logger.pushLog(new EventLog("GEOLOCATION_RECORDER_START"));
        service.setListener(this);
    }

    @Override
    public void stop() {
        logger.pushLog(new EventLog("GEOLOCATION_RECORDER_STOP"));
        service.setListener(null);
    }

    @Override
    public boolean isEnabled(Config config) {
        return config.isGoelocationRecorderEnabled();
    }

    @Override
    public void onUpdate(Location location) {
        if(logger != null) {
            logger.pushLog(new GeolocationLog(location));
        }
    }
}

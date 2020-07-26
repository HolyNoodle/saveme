package com.saveme.session;

import android.annotation.SuppressLint;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.saveme.session.log.EventLog;
import com.saveme.session.log.GeolocationLog;

public class GeolocationRecorder implements IRecorder, LocationListener {
    private LocationManager locationManager = null;
    private String fileName = null;
    private String provider = null;
    private Logger logger = null;

    public GeolocationRecorder(LocationManager locationManager) {
        this.locationManager = locationManager;
        Criteria criteria = new Criteria();
        int currentapiVersion = android.os.Build.VERSION.SDK_INT;

        if (currentapiVersion >= android.os.Build.VERSION_CODES.HONEYCOMB) {
            criteria.setSpeedAccuracy(Criteria.ACCURACY_HIGH);
            criteria.setAccuracy(Criteria.ACCURACY_FINE);
            criteria.setAltitudeRequired(true);
            criteria.setBearingRequired(true);
            criteria.setSpeedRequired(true);
        }

        provider = locationManager.getBestProvider(criteria, true);
    }

    @Override
    public void onLocationChanged(Location location) {
        logger.pushLog(new GeolocationLog(location));
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @SuppressLint("MissingPermission")
    @Override
    public void start(Logger logger) {
        this.logger = logger;
        logger.pushLog(new EventLog("GEOLOCATION_RECORDER_START"));
        locationManager.requestLocationUpdates(provider, 60 * 1000, 10, this);
    }

    @Override
    public void stop() {
        logger.pushLog(new EventLog("GEOLOCATION_RECORDER_STOP"));
        locationManager.removeUpdates(this);
    }
}

package com.saveme.session.recorders.geolocation;

import android.annotation.SuppressLint;
import android.app.Service;
import android.content.Context;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.saveme.session.Logger;
import com.saveme.session.configuration.Config;
import com.saveme.session.log.EventLog;
import com.saveme.session.log.GeolocationLog;

public class GeolocationService implements LocationListener {
    private LocationManager locationManager = null;
    private String provider = null;
    private Location location = null;

    private IGeolocationListener listener = null;

    public GeolocationService(Service owner) {
        this.locationManager = (LocationManager) owner.getSystemService(Context.LOCATION_SERVICE);

        Criteria criteria = new Criteria();
        int currentAPIVersion = android.os.Build.VERSION.SDK_INT;

        if (currentAPIVersion >= android.os.Build.VERSION_CODES.HONEYCOMB) {
            criteria.setSpeedAccuracy(Criteria.ACCURACY_LOW);
            criteria.setAccuracy(Criteria.ACCURACY_FINE);
            criteria.setAltitudeRequired(true);
            criteria.setBearingRequired(true);
            criteria.setSpeedRequired(true);
        }

        this.provider = locationManager.getBestProvider(criteria, true);
    }

    private void triggerLocationEvent() {
        if(this.listener != null && this.location != null) {
            this.listener.onUpdate(this.location);
        }
    }

    public void setListener(IGeolocationListener listener) {
        this.listener = listener;

        this.triggerLocationEvent();
    }

    @Override
    public void onLocationChanged(Location location) {
        if(this.location == location) {
            return;
        }

        this.location = location;

        this.triggerLocationEvent();
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
    public void start() {
        locationManager.requestLocationUpdates(provider, 60 * 1000, 10, this);
    }

    public void stop() {
        locationManager.removeUpdates(this);
    }
}

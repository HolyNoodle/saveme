package com.saveme.session.recorders.geolocation;

import android.location.Location;

public interface IGeolocationListener {
    public void onUpdate(Location location);
}

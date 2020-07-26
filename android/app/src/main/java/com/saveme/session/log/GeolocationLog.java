package com.saveme.session.log;

import android.location.Location;

public class GeolocationLog extends Log {
    public GeolocationLog(Location location) {
        super("geolocation");

        this.data.put("location", location);
    }
}

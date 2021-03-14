package com.saveme.session.log;

import android.location.Location;

public class GeolocationLog extends Log {
    public GeolocationLog(Location location) {
        super("geolocation");

        this.data.put("longitude", location.getLongitude());
        this.data.put("latitude", location.getLatitude());
        this.data.put("altitude", location.getAltitude());
        this.data.put("speed", location.getSpeed());
    }
}

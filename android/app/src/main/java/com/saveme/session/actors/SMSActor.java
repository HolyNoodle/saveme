package com.saveme.session.actors;

import android.location.Location;
import android.telephony.SmsManager;

import com.saveme.session.Logger;
import com.saveme.session.log.GeolocationLog;
import com.saveme.session.log.Log;
import com.saveme.session.log.SMSLog;

import java.util.List;
import java.util.ListIterator;
import java.util.Map;

public class SMSActor implements IActor {
    @Override
    public void act(Logger logger, Map<String, String> config) {
        SmsManager manager = SmsManager.getDefault();

        String number = config.get("number");
        String message = this.fillMessageTemplate(logger, config.get("message"));

        logger.pushLog(new SMSLog("SENDING", number, message));
        try {
            manager.sendTextMessage(number, null, message, null, null);
            logger.pushLog(new SMSLog("SENT", number, message));
        } catch(Exception ex) {
            logger.pushLog(new SMSLog("ERROR", number, ex.getMessage()));
        }
    }

    private String fillMessageTemplate(Logger logger, String message) {
        List<Log> logs = logger.getLogs();
        ListIterator<Log> iterator = logs.listIterator(logs.size());

        if(message.contains("{location}")) {
            String locationString = "";

            while (iterator.hasPrevious()) {
                Log log = iterator.previous();

                if (log instanceof GeolocationLog) {
                    Location location = (Location) log.getData().get("location");

                    locationString = "https://www.google.com/maps/place/" + location.getLatitude() + "," + location.getLongitude();
                    break;
                }
            }

            message.replaceAll("\\{location\\}", locationString);
        }

        return message;
    }
}
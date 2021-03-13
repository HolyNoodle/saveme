package com.saveme.session.log;

public class SMSLog extends Log {
    public SMSLog(String event, String number, String message) {
        super("SMS");

        this.data.put("event", event);
        this.data.put("message", message);
        this.data.put("number", number);
    }
}
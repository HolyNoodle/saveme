package com.saveme.session.log;

public class EventLog extends Log {
    public EventLog(String event) {
        super("event");

        this.data.put("message", event);
    }
}

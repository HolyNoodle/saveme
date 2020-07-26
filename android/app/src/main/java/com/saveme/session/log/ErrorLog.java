package com.saveme.session.log;

public class ErrorLog extends Log {
    public ErrorLog(String origin, Exception ex) {
        super("error");

        this.data.put("origin", origin);
        this.data.put("exception", ex);
    }
}

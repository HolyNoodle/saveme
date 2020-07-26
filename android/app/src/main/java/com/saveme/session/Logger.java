package com.saveme.session;

import com.google.gson.annotations.Expose;
import com.saveme.session.log.Log;

import java.util.ArrayList;
import java.util.List;

public class Logger {
    @Expose
    private List<Log> logs;

    public Logger() {
        logs = new ArrayList<>();
    }

    public void pushLog(Log log) {
        logs.add(log);
    }

    public List<Log> getLogs() {
        return logs;
    }
}

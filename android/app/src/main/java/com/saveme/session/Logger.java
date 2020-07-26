package com.saveme.session;

import com.saveme.session.log.Log;

import java.util.ArrayList;
import java.util.List;

public class Logger {
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

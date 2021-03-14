package com.saveme.session.log;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;

public class ErrorLog extends Log {
    public ErrorLog(String origin, Exception ex) {
        super("error");

        Writer writer = new StringWriter();
        ex.printStackTrace(new PrintWriter(writer));
        String stackTrace = writer.toString();

        this.data.put("origin", origin);
        this.data.put("exception", ex.getMessage());
        this.data.put("stacktrace", stackTrace);
    }
}

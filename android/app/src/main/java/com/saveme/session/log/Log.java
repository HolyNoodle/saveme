package com.saveme.session.log;

import java.util.Date;
import java.util.Dictionary;
import java.util.Hashtable;

public class Log {
    private String type;
    private Date date;
    protected Dictionary<String, Object> data;

    public Log(String type) {
        this.type = type;
        this.date = new Date();
        this.data = new Hashtable<>();
    }

    public String getType() {
        return type;
    }

    public Dictionary<String, Object> getData() {
        return data;
    }

    public void setData(Dictionary<String, Object> data) {
        this.data = data;
    }

    public Date getDate() {
        return date;
    }
}

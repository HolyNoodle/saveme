package com.saveme.session.log;

import com.google.gson.annotations.Expose;

import java.util.Date;
import java.util.Dictionary;
import java.util.Hashtable;

public class Log {
    @Expose
    private String type;
    @Expose
    private Date date;
    @Expose
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

package com.saveme.session.log;

import com.google.gson.annotations.Expose;

import java.util.Date;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.LinkedHashMap;

public class Log {
    @Expose
    private String type;
    @Expose
    private Date date;
    @Expose
    protected LinkedHashMap<String, Object> data;

    public Log(String type) {
        this.type = type;
        this.date = new Date();
        this.data = new LinkedHashMap<>();
    }

    public String getType() {
        return type;
    }

    public LinkedHashMap<String, Object> getData() {
        return data;
    }

    public void setData(LinkedHashMap<String, Object> data) {
        this.data = data;
    }

    public Date getDate() {
        return date;
    }
}

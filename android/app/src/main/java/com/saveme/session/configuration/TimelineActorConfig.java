package com.saveme.session.configuration;

import com.google.gson.annotations.Expose;
import com.saveme.session.Logger;
import com.saveme.session.actors.IActor;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Dictionary;

public class TimelineActorConfig {
    @Expose
    private String className;
    @Expose
    private int triggerTime;
    @Expose
    private int recurringTime;
    @Expose
    private Dictionary<String, Object> extra;

    public String getClassName() {
        return className;
    }

    public int getTriggerTime() {
        return triggerTime;
    }

    public int getRecurringTime() {
        return recurringTime;
    }

    public Dictionary<String, Object> getExtra() {
        return extra;
    }

    public void executeActor(Logger logger) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException  {
        Class<?> actorClass = Class.forName(this.className);
        Constructor<?> actorClassConstructor = actorClass.getConstructor(String.class);
        IActor actor = (IActor) actorClassConstructor.newInstance();

        actor.act(logger, this.getExtra());
    }
}

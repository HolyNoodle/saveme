package com.saveme.session.configuration;

import com.google.gson.annotations.Expose;
import com.saveme.session.Logger;
import com.saveme.session.actors.IActor;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Dictionary;
import java.util.Map;

public class TimelineActorConfig {
    @Expose
    private String className;
    @Expose
    private int triggerTime;
    @Expose
    private int recurringTime;
    @Expose
    private Map<String, String> extra;

    public String getClassName() {
        return className;
    }

    public int getTriggerTime() {
        return triggerTime;
    }

    public int getRecurringTime() {
        return recurringTime;
    }

    public Map<String, String> getExtra() {
        return extra;
    }

    public void executeActor(Logger logger) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException  {
        Class<?> actorClass = Class.forName(this.className);
        Constructor<?> actorClassConstructor = actorClass.getConstructor();
        IActor actor = (IActor) actorClassConstructor.newInstance();

        actor.act(logger, this.getExtra());
    }
}

package com.saveme.notification;

import com.google.gson.annotations.Expose;
import com.saveme.session.Session;

public class NotificationServiceState {
    @Expose
    public boolean started = false;
    @Expose
    public NotificationMode mode = NotificationMode.INACTIVE;
    @Expose
    public Session session = null;
}

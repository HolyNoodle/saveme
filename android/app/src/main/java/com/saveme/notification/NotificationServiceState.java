package com.saveme.notification;

import com.saveme.session.Session;

public class NotificationServiceState {
    public boolean started = false;
    public NotificationMode mode = NotificationMode.INACTIVE;
    public Session session = null;
}

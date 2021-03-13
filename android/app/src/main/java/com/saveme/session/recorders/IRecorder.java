package com.saveme.session.recorders;

import com.saveme.session.Logger;
import com.saveme.session.configuration.Config;

public interface IRecorder {
    void start(Logger logger);
    void stop();
    boolean isEnabled(Config config);
}

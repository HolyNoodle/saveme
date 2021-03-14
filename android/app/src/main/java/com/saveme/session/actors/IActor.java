package com.saveme.session.actors;

import com.saveme.session.Logger;

import java.util.Map;

public interface IActor {
    void act(Logger logger, Map<String, String> config);
}

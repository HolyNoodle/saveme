package com.saveme.session.actors;

import com.saveme.session.Logger;

import java.util.Dictionary;

public interface IActor {
    void act(Logger logger, Dictionary<String, Object> config);
}

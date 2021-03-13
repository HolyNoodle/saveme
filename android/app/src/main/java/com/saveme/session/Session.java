package com.saveme.session;

import android.app.Service;
import android.content.Context;
import android.location.LocationManager;

import com.google.gson.Gson;
import com.google.gson.annotations.Expose;
import com.saveme.session.actors.IActor;
import com.saveme.session.configuration.Config;
import com.saveme.session.configuration.TimelineActorConfig;
import com.saveme.session.log.ErrorLog;
import com.saveme.session.recorders.GeolocationRecorder;
import com.saveme.session.recorders.IRecorder;
import com.saveme.session.recorders.MicrophoneRecorder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

public class Session {
    private List<IRecorder> recorders;
    @Expose
    private String sessionName = null;
    @Expose
    private Logger logger = null;
    @Expose
    private Date startDate = null;
    @Expose
    private Date endDate = null;
    @Expose
    private Config config;

    private Timer timer = null;

    public Session(Config config) {
        this.config = config;
    }

    public void start(Service parent) {
        logger = new Logger();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateString = df.format(new Date());
        sessionName = parent.getFilesDir() + File.separator + dateString;

        File directory = new File(sessionName);
        directory.mkdirs();

        startDate = new Date();
        this.startRecorders(parent);
        this.startTimeline();
    }

    public void stop() throws IOException {
        this.stopTimeline();
        this.stopRecorders();

        endDate = new Date();

        File file = new File(sessionName, "session.json");
        file.createNewFile();
        FileOutputStream stream = new FileOutputStream(file);
        try {
            Gson gson = new Gson();
            stream.write(gson.toJson(this).getBytes());
        } finally {
            stream.close();
        }
    }

    private void startRecorders(Service parent) {
        recorders = new ArrayList<>();

        MicrophoneRecorder micRecorder = new MicrophoneRecorder();
        micRecorder.setFileName(sessionName);
        recorders.add(micRecorder);

        recorders.add(new GeolocationRecorder((LocationManager) parent.getSystemService(Context.LOCATION_SERVICE)));

        try {
            for (IRecorder recorder : recorders) {
                if(recorder.isEnabled(this.config)) {
                    recorder.start(logger);
                }
            }
        }
        catch(Exception ex) {
            logger.pushLog(new ErrorLog("SESSION_START", ex));
        }
    }
    private void stopRecorders() {
        try {
            for (IRecorder recorder : recorders) {
                if(recorder.isEnabled(this.config)) {
                    recorder.stop();
                }
            }
        }
        catch(Exception ex) {
            logger.pushLog(new ErrorLog("SESSION_STOP", ex));
        }
    }

    private void startTimeline() {
        List<TimelineActorConfig> timelineConfig = this.config.getTimeline();
        Date startDate = this.startDate;
        Set<TimelineActorConfig> executedActors = new HashSet<>();
        Logger logger = this.logger;

        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                Date now = new Date();
                long diffInMillies = Math.abs(now.getTime() - startDate.getTime());
                long diff = (int)TimeUnit.SECONDS.convert(diffInMillies, TimeUnit.MILLISECONDS);

                if(timelineConfig != null) {
                    for (TimelineActorConfig actorConfig : timelineConfig) {
                        if (diff >= actorConfig.getTriggerTime() && !executedActors.contains(actorConfig)) {
                            try {
                                actorConfig.executeActor(logger);
                            } catch (Exception ex) {
                                logger.pushLog(new ErrorLog("EXECUTE_ACTOR", ex));
                            }

                            executedActors.add(actorConfig);
                        }
                    }
                }
            }
        };
        this.timer = new Timer();
        this.timer.scheduleAtFixedRate(timerTask, 100, 100);
    }

    private void stopTimeline() {
        if(this.timer != null) {
            this.timer.cancel();
            this.timer.purge();
            this.timer = null;
        }
    }
}

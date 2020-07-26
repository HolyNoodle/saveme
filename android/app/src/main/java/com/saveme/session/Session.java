package com.saveme.session;

import android.app.Service;
import android.content.Context;
import android.location.LocationManager;
import android.os.Environment;

import com.google.gson.Gson;
import com.google.gson.annotations.Expose;
import com.saveme.notification.EmergencyNotificationService;
import com.saveme.session.log.ErrorLog;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    public void start(Service parent) {
        logger = new Logger();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateString = df.format(new Date());
        sessionName = Environment.getDataDirectory() + File.separator + dateString;

        File directory = new File(sessionName);
        directory.mkdirs();

        recorders = new ArrayList<>();

        MicrophoneRecorder micRecorder = new MicrophoneRecorder();

        micRecorder.setFileName(sessionName);
        recorders.add(micRecorder);

        recorders.add(new GeolocationRecorder((LocationManager) parent.getSystemService(Context.LOCATION_SERVICE)));

        startDate = new Date();
        for (IRecorder recorder : recorders) {
            recorder.start(logger);
        }
    }

    public void stop() throws IOException {
        try {
            for (IRecorder recorder : recorders) {
                recorder.stop();
            }
        }
        catch(Exception ex) {
            logger.pushLog(new ErrorLog("SESSION_STOP", ex));
        }

        Gson gson = new Gson();
        File file = new File(sessionName, "session.json");
        file.createNewFile();

        endDate = new Date();
        
        FileOutputStream stream = new FileOutputStream(file);
        try {
            stream.write(gson.toJson(EmergencyNotificationService.getState()).getBytes());
        } finally {
            stream.close();
        }
    }
}

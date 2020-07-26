package com.saveme.session;

import android.media.MediaRecorder;
import android.util.Log;

import com.saveme.session.log.ErrorLog;
import com.saveme.session.log.EventLog;

import java.io.File;
import java.io.IOException;

public class MicrophoneRecorder implements IRecorder {
    private MediaRecorder recorder = null;
    private String fileName = null;
    private Logger logger = null;

    public void setFileName(String path) {
        fileName = path + File.separator + "audio-record.mp4";
    }

    @Override
    public void start(Logger logger) {
        this.logger = logger;

        logger.pushLog(new EventLog("MICROPHONE_RECORDER_START"));
        recorder = new MediaRecorder();
        recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
        recorder.setOutputFile(fileName);
        recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

        try {
            recorder.prepare();
            recorder.start();
        } catch (IOException e) {
            logger.pushLog(new ErrorLog("MICROPHONE_RECORDER_ERROR", e));
        }
    }

    @Override
    public void stop() {
        logger.pushLog(new EventLog("MICROPHONE_RECORDER_STOP"));
        recorder.stop();
        recorder.release();
        recorder = null;
        fileName = null;
    }
}

package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class UA_02 {

    //TODO make this also command line arguments
    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "UA-02";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY));
        pics.writePNG();
        pics.writeDDlibPlaces();
    }
}
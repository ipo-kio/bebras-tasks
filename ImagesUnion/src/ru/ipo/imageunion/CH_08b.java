package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class CH_08b {

    //TODO make this also command line arguments
    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "CH-08b";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNG();
        pics.writeDDlibPlaces();
    }
}
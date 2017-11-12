package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class RU_03 {

    //TODO make this also command line arguments
    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "RU-03";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNG();
        pics.writeDDlibPlaces();
    }
}
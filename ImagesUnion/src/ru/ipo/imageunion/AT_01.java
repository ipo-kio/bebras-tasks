package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class AT_01 {

    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "AT-01";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNGTinify();
        pics.writePNG();
        pics.writeDDlibPlaces();
    }
}

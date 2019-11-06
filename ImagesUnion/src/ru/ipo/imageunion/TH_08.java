package ru.ipo.imageunion;

//неправильная картинка про Зою <img src="/~res/Ax3kqQkG9qbWUVZW6jLO1541754324801.png" title="bg" alt="an image" />

import java.io.File;
import java.io.IOException;

public class TH_08 {

    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "TH-08";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNGTinify();
        pics.writePNG();
        pics.writeDDlibPlaces();
    }

}

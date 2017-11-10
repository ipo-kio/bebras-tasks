package ru.ipo.imageunion;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class UA_04 {

    //TODO make this also command line arguments
    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "UA-04";

    //install https://github.com/haraldk/TwelveMonkeys as Maven Dependency

    public static void main(String[] args) throws IOException {
        File taskFolder = new File(TASKS_DIRECTORY, TASK_NAME);

        Pics pics = new Pics(taskFolder);
    }
}
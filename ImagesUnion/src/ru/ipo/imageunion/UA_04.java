package ru.ipo.imageunion;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class UA_04 {

    //TODO make this also command line arguments
    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "UA-04";


    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY));
        pics.writePNG();
        pics.writeCropPics();
    }
}
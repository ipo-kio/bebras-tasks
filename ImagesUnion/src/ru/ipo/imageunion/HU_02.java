package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class HU_02 {

    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "HU-02";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNGTinify();
        pics.writePNG();
        pics.writeDDlibPlaces();
    }

}

/*
new Place(0, 0, 24, 30, 'working', 2, {imageId: 'bg', crop: {x: 0, y: 291, width: 24, height: 30}}),
new Place(0, 0, 24, 30, 'faulty', 2, {imageId: 'bg', crop: {x: 24, y: 291, width: 24, height: 30}}),
new Place(0, 0, 24, 30, 'unclicked', 2, {imageId: 'bg', crop: {x: 48, y: 291, width: 24, height: 30}}),
new Place(0, 0, 572, 291, 'map', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 572, height: 291}}),
new Place(0, 0, 24, 30, 'unknown', 2, {imageId: 'bg', crop: {x: 72, y: 291, width: 24, height: 30}}),
 */

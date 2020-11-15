package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class DE_07 {

    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "DE-07";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNGTinify();
        pics.writePNG();
        pics.writeDDlibPlaces();
    }

}

/*
new Place(0, 0, 89, 103, '110', 2, {imageId: 'bg', crop: {x: 0, y: 425, width: 89, height: 103}}),
new Place(0, 0, 89, 102, '000', 2, {imageId: 'bg', crop: {x: 89, y: 425, width: 89, height: 102}}),
new Place(0, 0, 86, 102, '011', 2, {imageId: 'bg', crop: {x: 355, y: 425, width: 86, height: 102}}),
new Place(0, 0, 88, 102, '100', 2, {imageId: 'bg', crop: {x: 267, y: 425, width: 88, height: 102}}),
new Place(0, 0, 86, 103, '111', 2, {imageId: 'bg', crop: {x: 441, y: 425, width: 86, height: 103}}),
new Place(0, 0, 86, 102, '001', 2, {imageId: 'bg', crop: {x: 527, y: 425, width: 86, height: 102}}),
new Place(0, 0, 86, 102, '101', 2, {imageId: 'bg', crop: {x: 613, y: 425, width: 86, height: 102}}),
new Place(0, 0, 425, 425, 'clock', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 425, height: 425}}),
new Place(0, 0, 89, 102, '010', 2, {imageId: 'bg', crop: {x: 178, y: 425, width: 89, height: 102}}),
 */

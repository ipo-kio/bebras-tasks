package ru.ipo.imageunion;

import java.io.File;
import java.io.IOException;

public class ID_09 {

    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "ID-09";

    public static void main(String[] args) throws IOException {
        Pics.GLOBAL_SCALE = 0.65;
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 0);
        pics.writePNGTinify();
        pics.writePNG();
        pics.writeDDlibPlaces();
    }

}

/*
new Place(0, 0, 53, 70, 'eggs', 2, {imageId: 'bg', crop: {x: 190, y: 0, width: 53, height: 70}}),
new Place(0, 0, 53, 72, 'chicken', 2, {imageId: 'bg', crop: {x: 243, y: 0, width: 53, height: 72}}),
new Place(0, 0, 53, 63, 'spinach', 2, {imageId: 'bg', crop: {x: 296, y: 0, width: 53, height: 63}}),
new Place(0, 0, 59, 77, 'beaver3', 2, {imageId: 'bg', crop: {x: 72, y: 0, width: 59, height: 77}}),
new Place(0, 0, 59, 77, 'beaver4', 2, {imageId: 'bg', crop: {x: 131, y: 0, width: 59, height: 77}}),
new Place(0, 0, 72, 94, 'beaver1', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 72, height: 94}}),
new Place(0, 0, 53, 72, 'fruit', 2, {imageId: 'bg', crop: {x: 349, y: 0, width: 53, height: 72}}),
new Place(0, 0, 53, 64, 'fish', 2, {imageId: 'bg', crop: {x: 402, y: 0, width: 53, height: 64}}),
new Place(0, 0, 47, 62, 'beaver2', 2, {imageId: 'bg', crop: {x: 614, y: 0, width: 47, height: 62}}),
new Place(0, 0, 53, 70, 'beef', 2, {imageId: 'bg', crop: {x: 455, y: 0, width: 53, height: 70}}),
new Place(0, 0, 53, 72, 'rice', 2, {imageId: 'bg', crop: {x: 508, y: 0, width: 53, height: 72}}),
new Place(0, 0, 53, 67, 'sugar', 2, {imageId: 'bg', crop: {x: 561, y: 0, width: 53, height: 67}}),
 */

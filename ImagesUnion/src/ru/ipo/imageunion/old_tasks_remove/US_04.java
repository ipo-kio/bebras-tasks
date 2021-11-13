package ru.ipo.imageunion.old_tasks_remove;

import ru.ipo.imageunion.Pics;

import java.io.File;
import java.io.IOException;

public class US_04 {

    private static final String TASKS_DIRECTORY = "src";
    private static final String TASK_NAME = "US-04";

    public static void main(String[] args) throws IOException {
        Pics pics = new Pics(TASK_NAME, new File(TASKS_DIRECTORY), 1);
        pics.writePNGTinify();
        pics.writePNG();
        pics.writeDDlibPlaces();
    }

}

/*
new Place(0, 0, 90, 90, 'zebra', 2, {imageId: 'bg', crop: {x: 0, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'crocodile', 2, {imageId: 'bg', crop: {x: 90, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'monkey', 2, {imageId: 'bg', crop: {x: 180, y: 402, width: 90, height: 90}}),
new Place(0, 0, 642, 402, 'field', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 642, height: 402}}),
new Place(0, 0, 90, 90, 'turtle', 2, {imageId: 'bg', crop: {x: 270, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'duck', 2, {imageId: 'bg', crop: {x: 360, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'cat', 2, {imageId: 'bg', crop: {x: 450, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'bear', 2, {imageId: 'bg', crop: {x: 540, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'elephant', 2, {imageId: 'bg', crop: {x: 630, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'pinguin', 2, {imageId: 'bg', crop: {x: 720, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'fox', 2, {imageId: 'bg', crop: {x: 810, y: 402, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 'lion', 2, {imageId: 'bg', crop: {x: 900, y: 402, width: 90, height: 90}})
 */

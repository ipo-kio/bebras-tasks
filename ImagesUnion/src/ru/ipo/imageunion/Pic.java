package ru.ipo.imageunion;

public class Pic {

    public static final int PLACE_TARGET = 0;
    public static final int PLACE_STATIC = 1;
    public static final int PLACE_MOVABLE = 2;

    private String name;
    private int type = PLACE_MOVABLE;

    private int x;
    private int y;
    private int width;
    private int height;

    private int cropX;
    private int cropY;

    public String toCropString() {
        return String.format("crop: {x: %d, y: %d, width: %d, height: %d}", cropX, cropY, width, height);
    }

    public String toDDlibString() {
        return String.format(
                "new Place(%d, %d, %d, %d, '%s', %d, {imageId: 'bg', %s}),",
                x, y, width, height, name, type, toCropString()
        );
    }

    public Pic name(String name) {
        this.name = name;
        return this;
    }

    public Pic type(int type) {
        this.type = type;
        return this;
    }

    public Pic xy(int x, int y) {
        this.x = x;
        this.y = y;
        return this;
    }

    public Pic size(int width, int height) {
        this.width = width;
        this.height = height;
        return this;
    }

    public Pic cropXY(int x, int y) {
        this.cropX = x;
        this.cropY = y;
        return this;
    }

    // --- getters ---

    public String getName() {
        return name;
    }

    public int getType() {
        return type;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public int getCropX() {
        return cropX;
    }

    public int getCropY() {
        return cropY;
    }
}

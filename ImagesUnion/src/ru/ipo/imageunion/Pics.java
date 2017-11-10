package ru.ipo.imageunion;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Pics {

    private final Map<String, BufferedImage> images = new HashMap<>();
    private final Map<String, Pic> pics = new HashMap<>();

    private BufferedImage total;

    public Pics(String problemName, File folder) throws IOException {
        folder = new File(folder, problemName);

        File[] picsFiles = folder.listFiles(fname -> {
            String name = fname.getName().toLowerCase();
            return (name.endsWith(".png") || name.endsWith(".svg")) && name.startsWith("_");
        });

        for (File picsFile : picsFiles) {
            String name = picsFile.getName().toLowerCase();
            String id = name.substring(1, name.length() - 4);

            if (name.endsWith(".svg")) {
                String[] splitId = id.split("_");
                id = splitId[0];
                BufferedImage bi = SVG.loadSVG(
                        picsFile.toURI().toString(),
                        Integer.parseInt(splitId[1]),
                        Integer.parseInt(splitId[2])
                );
                for (int i = 3; i <= splitId.length; i++)
                    bi = process(bi, splitId[i]);
                images.put(id, bi);
            } else
                images.put(id, ImageIO.read(picsFile));
        }

        placeImages();
    }

    public Map<String, BufferedImage> getImages() {
        return images;
    }

    public void writePNG() {

    }

    private BufferedImage process(BufferedImage bi, String action) {
        Pattern middleCrop = Pattern.compile("mcr(\\d+)x(\\d+)");
        Matcher m1 = middleCrop.matcher(action);

        if (m1.matches()) {
            int w = Integer.parseInt(m1.group(1));
            int h = Integer.parseInt(m1.group(2));
            return cropCenter(bi, w, h);
        } else
            throw new IllegalArgumentException("unknown operation " + action);
    }

    public static BufferedImage cropCenter(BufferedImage bi, int newW, int newH) {
        BufferedImage res = new BufferedImage(newW, newH, BufferedImage.TYPE_INT_ARGB);
        res.createGraphics().drawImage(bi, (newW - bi.getWidth()) / 2, (newH - bi.getHeight()) / 2, null);
        return res;
    }

    private void placeImages() {
        ArrayList<Map.Entry<String, BufferedImage>> entries = new ArrayList<>(images.entrySet());

        //sort width descending
        entries.sort((e1, e2) -> e2.getValue().getWidth() - e1.getValue().getWidth());

        int widthSum = entries.stream().mapToInt(e -> e.getValue().getWidth()).sum();
        int maxHeight = entries.stream().mapToInt(e -> e.getValue().getHeight()).max().orElse(0);

        total = new BufferedImage(widthSum, maxHeight, BufferedImage.TYPE_INT_ARGB);

        Graphics2D g = total.createGraphics();
        int x = 0;
        for (Map.Entry<String, BufferedImage> entry : entries) {
            BufferedImage i = entry.getValue();
            String id = entry.getKey();

            pics.put(id, new Pic().name(id).cropXY(x, 0).size(i.getWidth(), i.getHeight()));

            g.drawImage(i, x, 0, null);
            x += i.getWidth();
        }
    }
}

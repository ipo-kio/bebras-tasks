package ru.ipo.imageunion;

import com.tinify.Source;
import com.tinify.Tinify;

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

/*<dependency>
<groupId>com.tinify</groupId>
<artifactId>tinify</artifactId>
<version>RELEASE</version>
</dependency>*/

//install  as Maven Dependency batik-transcoder

public class Pics {

    private final Map<String, BufferedImage> images = new HashMap<>();
    private final Map<String, Pic> pics = new HashMap<>();

    private BufferedImage total;
    private final String problemName;
    private final File problemFolder;

    public Pics(String problemName, File folder) throws IOException {
        this(problemName, folder, 0);
    }

    public Pics(String problemName, File folder, int placer) throws IOException {
        this.problemFolder = new File(folder, problemName);
        this.problemName = problemName;

        File[] picsFiles = problemFolder.listFiles(fname -> {
            String name = fname.getName().toLowerCase();
            return (name.endsWith(".png") || name.endsWith(".svg")) && name.startsWith("_");
        });

        for (File picsFile : picsFiles) {
            String name = picsFile.getName().toLowerCase();
            String id = name.substring(1, name.length() - 4);

            if (name.endsWith(".svg")) {
                String[] splitId = id.split("_");
                if (splitId.length < 3)
                    throw new IllegalArgumentException("in svg images you must have the following name: id_width_height");

                id = splitId[0];
                BufferedImage bi = SVG.loadSVG(
                        picsFile.toURI().toString(),
                        Integer.parseInt(splitId[1]),
                        Integer.parseInt(splitId[2])
                );
                for (int i = 3; i < splitId.length; i++)
                    bi = process(bi, splitId[i]);
                images.put(id, bi);
            } else
                images.put(id, ImageIO.read(picsFile));
        }

        if (placer == 0)
            placeImages();
        else if (placer == 1)
            placeImagesOneOver();
    }

    public Map<String, BufferedImage> getImages() {
        return images;
    }

    public void writePNG() throws IOException {
        File precompressedPNG = new File(problemFolder, problemName + ".nocompress.png");
        ImageIO.write(total, "png", precompressedPNG);
    }

    public void writePNGTinify() throws IOException {
        try {
            Tinify.setKey("HROGXDV8nMSfipDSma6I2DVl_R03I84y");

            File precompressedPNG = new File(problemFolder, problemName + ".nocompress.png");
            ImageIO.write(total, "png", precompressedPNG);

            File compressedPNG = new File(problemFolder, problemName + ".png");
            Source source = Tinify.fromFile(precompressedPNG.getAbsolutePath());
            source.toFile(compressedPNG.getAbsolutePath());
        } catch (Exception e) {
            System.out.println("failed to tinify");
        }
    }

    public void writeCropPics() {
        for (Pic pic : pics.values())
            System.out.println(pic.getName() + ": " + pic.toCropString());
    }

    public void writeDDlibPlaces() {
        for (Pic pic : pics.values())
            System.out.println(pic.toDDlibString());
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

        placePlease(entries, 0);
    }

    private void placeImagesOneOver() {
        ArrayList<Map.Entry<String, BufferedImage>> entries = new ArrayList<>(images.entrySet());

        //sort width descending
        entries.sort((e1, e2) -> e2.getValue().getWidth() - e1.getValue().getWidth());

        Map.Entry<String, BufferedImage> first = entries.remove(0);
        String id = first.getKey();
        BufferedImage i = first.getValue();

        int widthSum = entries.stream().mapToInt(e -> e.getValue().getWidth()).sum();
        int maxHeight = entries.stream().mapToInt(e -> e.getValue().getHeight()).max().orElse(0);

        total = new BufferedImage(Math.max(widthSum, i.getWidth()), i.getHeight() + maxHeight, BufferedImage.TYPE_INT_ARGB);

        pics.put(id, new Pic().name(id).cropXY(0, 0).size(i.getWidth(), i.getHeight()));
        Graphics2D g = total.createGraphics();
        g.drawImage(i, 0, 0, null);
        g.dispose();

        placePlease(entries, first.getValue().getHeight());
    }

    private void placePlease(List<Map.Entry<String, BufferedImage>> entries, int y0) {
        Graphics2D g = total.createGraphics();
        int x = 0;
        for (Map.Entry<String, BufferedImage> entry : entries) {
            BufferedImage i = entry.getValue();
            String id = entry.getKey();

            pics.put(id, new Pic().name(id).cropXY(x, y0).size(i.getWidth(), i.getHeight()));

            g.drawImage(i, x, y0, null);
            x += i.getWidth();
        }
        g.dispose();
    }
}

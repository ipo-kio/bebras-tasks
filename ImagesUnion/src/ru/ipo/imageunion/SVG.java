package ru.ipo.imageunion;

import org.apache.batik.anim.dom.SVGDOMImplementation;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscodingHints;
import org.apache.batik.transcoder.image.ImageTranscoder;
import org.apache.batik.util.SVGConstants;

import java.awt.image.BufferedImage;
import java.io.IOException;

// https://vibranttechie.wordpress.com/2015/05/15/svg-loading-to-javafx-stage-and-auto-scaling-when-stage-resize/
public class SVG {

    public static BufferedImage loadSVG(String uri, float width, float height) throws IOException {
        SVGTranscoder transcoder = new SVGTranscoder();
        TranscodingHints hints = new TranscodingHints();
        hints.put(ImageTranscoder.KEY_WIDTH, width); //your image width
        hints.put(ImageTranscoder.KEY_HEIGHT, height); //your image height
        hints.put(ImageTranscoder.KEY_DOM_IMPLEMENTATION, SVGDOMImplementation.getDOMImplementation());
        hints.put(ImageTranscoder.KEY_DOCUMENT_ELEMENT_NAMESPACE_URI, SVGConstants.SVG_NAMESPACE_URI);
        hints.put(ImageTranscoder.KEY_DOCUMENT_ELEMENT, SVGConstants.SVG_SVG_TAG);
        hints.put(ImageTranscoder.KEY_XML_PARSER_VALIDATING, false);

        transcoder.setTranscodingHints(hints);
        TranscoderInput input = new TranscoderInput(uri);
        try {
            transcoder.transcode(input, null);
        } catch (TranscoderException e) {
            e.printStackTrace();
            throw new IOException("failed to read SVG image");
        }
        return transcoder.getImage();
    }

}

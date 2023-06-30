```javascript
const cv = require('opencv4nodejs');

const openCV = {};

openCV.overlayVideo = async function(originalVideoPath, overlayVideoPath, outputPath) {
    try {
        const originalVideo = new cv.VideoCapture(originalVideoPath);
        const overlayVideo = new cv.VideoCapture(overlayVideoPath);

        let originalFrame = originalVideo.read();
        let overlayFrame = overlayVideo.read();

        const writer = new cv.VideoWriter(outputPath, originalVideo.get(cv.CAP_PROP_FOURCC), originalVideo.get(cv.CAP_PROP_FPS), new cv.Size(originalVideo.get(cv.CAP_PROP_FRAME_WIDTH), originalVideo.get(cv.CAP_PROP_FRAME_HEIGHT)), true);

        while (!originalFrame.empty && !overlayFrame.empty) {
            const overlayResized = overlayFrame.resize(originalFrame.rows, originalFrame.cols);
            const finalFrame = originalFrame.addWeighted(1, overlayResized, 0.5, 0);
            writer.write(finalFrame);

            originalFrame = originalVideo.read();
            overlayFrame = overlayVideo.read();
        }

        writer.release();
    } catch (error) {
        console.error(`Error in overlaying videos: ${error}`);
    }
};

module.exports = openCV;
```
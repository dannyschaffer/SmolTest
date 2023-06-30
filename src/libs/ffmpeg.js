```javascript
const ffmpeg = require('fluent-ffmpeg');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

const recordScreen = (url, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(url)
            .inputOptions([
                '-f', 'x11grab',
                '-r', '30',
                '-s', '1920x1080',
            ])
            .outputOptions('-c:v', 'libx264')
            .save(outputPath)
            .on('end', resolve)
            .on('error', reject);
    });
};

const overlayVideo = (inputPath, overlayPath, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .input(overlayPath)
            .complexFilter([
                "[0:v][1:v] overlay=25:25"
            ])
            .on('end', resolve)
            .on('error', reject)
            .save(outputPath);
    });
};

module.exports = {
    recordScreen,
    overlayVideo
};
```
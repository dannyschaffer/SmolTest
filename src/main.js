```javascript
const googleSheetsAPI = require('./libs/googleSheetsAPI.js');
const puppeteer = require('./libs/puppeteer.js');
const ffmpeg = require('./libs/ffmpeg.js');
const googleCloudStorage = require('./libs/googleCloudStorage.js');
const selenium = require('./libs/selenium.js');
const openCV = require('./libs/openCV.js');

async function main() {
    try {
        // Fetch URLs from Google Sheet
        const urls = await googleSheetsAPI.fetchURLs();

        for (let url of urls) {
            // Open webpage and scroll
            const page = await puppeteer.scrollPage(url);

            // Start screen recording
            const screenRecording = ffmpeg.recordScreen(page);

            // Overlay secondary video
            const finalVideo = ffmpeg.overlayVideo(screenRecording);

            // Save video to Google Cloud Storage
            const savedVideoURL = await googleCloudStorage.saveVideo(finalVideo);

            // Update Google Sheet with the URL of the saved video
            await googleSheetsAPI.updateSheet(url, savedVideoURL);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

main();
```
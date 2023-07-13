```javascript
const googleSheetsAPI = require('./libs/googleSheetsAPI.js');
const puppeteer = require('./libs/puppeteer.js');
const ffmpeg = require('./libs/ffmpeg.js');
const googleCloudStorage = require('./libs/googleCloudStorage.js');
const selenium = require('./libs/selenium.js');
const openCV = require('./libs/openCV.js');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'startRecording') {
        startRecordingProcess(request.URLSchema);
    } else if (request.message === 'stopRecording') {
        stopRecordingProcess();
    } else if (request.message === 'updateOptions') {
        updateOptions(request.options);
    }
});

async function startRecordingProcess(URLSchema) {
    try {
        const urls = await googleSheetsAPI.fetchURLs(URLSchema);
        for (let url of urls) {
            const page = await puppeteer.scrollPage(url);
            const rawVideo = await ffmpeg.recordScreen(page);
            const finalVideo = await ffmpeg.overlayVideo(rawVideo);
            const videoURL = await googleCloudStorage.saveVideo(finalVideo);
            await googleSheetsAPI.updateSheet(url, videoURL);
        }
    } catch (error) {
        console.error('Error in startRecordingProcess:', error);
    }
}

function stopRecordingProcess() {
    // Implementation depends on the specific libraries and methods used
}

function updateOptions(options) {
    // Implementation depends on the specific options provided
}
```
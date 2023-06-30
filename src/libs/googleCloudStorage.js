```javascript
const { Storage } = require('@google-cloud/storage');

const googleCloudStorage = new Storage();

const bucketName = 'your-bucket-name'; // replace with your bucket name

async function saveVideo(videoPath, videoName) {
  try {
    await googleCloudStorage.bucket(bucketName).upload(videoPath, {
      destination: videoName,
      public: true,
      metadata: {
        contentType: 'video/mp4',
      },
    });

    console.log(`${videoName} uploaded to ${bucketName}.`);

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${videoName}`;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

module.exports = {
  saveVideo,
};
```
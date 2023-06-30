```javascript
document.addEventListener('DOMContentLoaded', function() {
    let videoSettings = document.getElementById('videoSettings');
    videoSettings.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(videoSettings);
        let options = {};
        for (let entry of formData.entries()) {
            options[entry[0]] = entry[1];
        }
        chrome.runtime.sendMessage({message: 'updateOptions', options: options});
    });
});
```
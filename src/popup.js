```javascript
document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById('startButton');
    let optionsButton = document.getElementById('optionsButton');

    startButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: 'startRecording'}, function(response) {
            console.log(response);
        });
    });

    optionsButton.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });
});
```
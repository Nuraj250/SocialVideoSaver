chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractVideo") {
        let videoElement = document.querySelector("video");
        if (videoElement && videoElement.src) {
            sendResponse({ videoUrl: videoElement.src });
        } else {
            sendResponse({ error: "No video found on this page" });
        }
    }
});
